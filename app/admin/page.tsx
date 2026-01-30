'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase, supabaseConfigError } from '@/utils/supabaseClient';
import Link from 'next/link';

interface Topic {
  id: string;
  title: string;
  description?: string;
  paper?: number;
}

interface TopicResourceCounts {
  videos: number;
  visuals: number;
  quizzes: number;
  links: number;
  hasVoice: boolean;
  hasContent: boolean;
}

interface TopicDraft {
  title: string;
  description: string;
  paper: 1 | 2;
}

export default function AdminPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [paper, setPaper] = useState<1 | 2>(1);
  const [error, setError] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [resourceCounts, setResourceCounts] = useState<Record<string, TopicResourceCounts>>({});
  const [editDrafts, setEditDrafts] = useState<Record<string, TopicDraft>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function checkAccess() {
      if (supabaseConfigError) {
        setError(supabaseConfigError);
        setIsAuthorized(false);
        return;
      }
      if (!supabase) {
        setError('Supabase client is not available.');
        setIsAuthorized(false);
        return;
      }
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        setError('Please log in as an admin to access this workspace.');
        setIsAuthorized(false);
        return;
      }
      const role = data.user.user_metadata?.role;
      if (role !== 'admin') {
        setError('This workspace is only available to admin accounts.');
        setIsAuthorized(false);
        return;
      }
      setIsAuthorized(true);
    }

    checkAccess();
  }, [supabase, supabaseConfigError]);

  useEffect(() => {
    if (isAuthorized) {
      fetchAdminData();
    }
  }, [isAuthorized]);

  const paper1Topics = useMemo(() => topics.filter((topic) => topic.paper !== 2), [topics]);
  const paper2Topics = useMemo(() => topics.filter((topic) => topic.paper === 2), [topics]);

  const totalCounts = useMemo(() => {
    return Object.values(resourceCounts).reduce(
      (acc, counts) => {
        acc.videos += counts.videos;
        acc.visuals += counts.visuals;
        acc.quizzes += counts.quizzes;
        acc.links += counts.links;
        acc.voice += counts.hasVoice ? 1 : 0;
        acc.content += counts.hasContent ? 1 : 0;
        return acc;
      },
      { videos: 0, visuals: 0, quizzes: 0, links: 0, voice: 0, content: 0 }
    );
  }, [resourceCounts]);

  function safeParseContent(draft?: string | null) {
    if (!draft) {
      return null;
    }
    try {
      return JSON.parse(draft);
    } catch (parseError) {
      return null;
    }
  }

  async function fetchAdminData() {
    if (!supabase) {
      return;
    }
    setIsLoading(true);
    const [topicsRes, videosRes, quizzesRes, visualsRes, contentRes] = await Promise.all([
      supabase.from('topics').select('*'),
      supabase.from('videos').select('id, topic_id'),
      supabase.from('quizzes').select('id, topic_id'),
      supabase.from('topic_visuals').select('id, topic_id'),
      supabase.from('topic_content').select('id, topic_id, content'),
    ]);

    if (topicsRes.error) {
      setError(topicsRes.error.message);
      setIsLoading(false);
      return;
    }

    const topicsData = (topicsRes.data ?? []) as Topic[];
    setTopics(topicsData);

    const counts: Record<string, TopicResourceCounts> = {};
    topicsData.forEach((topic) => {
      counts[topic.id] = {
        videos: 0,
        visuals: 0,
        quizzes: 0,
        links: 0,
        hasVoice: false,
        hasContent: false,
      };
    });

    (videosRes.data ?? []).forEach((video) => {
      const entry = counts[video.topic_id as string];
      if (entry) {
        entry.videos += 1;
      }
    });

    (quizzesRes.data ?? []).forEach((quiz) => {
      const entry = counts[quiz.topic_id as string];
      if (entry) {
        entry.quizzes += 1;
      }
    });

    (visualsRes.data ?? []).forEach((visual) => {
      const entry = counts[visual.topic_id as string];
      if (entry) {
        entry.visuals += 1;
      }
    });

    (contentRes.data ?? []).forEach((contentItem) => {
      const entry = counts[contentItem.topic_id as string];
      if (!entry) {
        return;
      }
      entry.hasContent = Boolean(contentItem.content);
      const parsed = safeParseContent(contentItem.content);
      if (parsed?.voice?.script || parsed?.voice?.audioUrl) {
        entry.hasVoice = true;
      }
      if (Array.isArray(parsed?.resourceLinks)) {
        entry.links = parsed.resourceLinks.length;
      }
    });

    setResourceCounts(counts);
    setEditDrafts(
      topicsData.reduce<Record<string, TopicDraft>>((acc, topic) => {
        acc[topic.id] = {
          title: topic.title,
          description: topic.description ?? '',
          paper: (topic.paper ?? 1) as 1 | 2,
        };
        return acc;
      }, {})
    );
    setIsLoading(false);
  }

  async function handleCreateTopic(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!supabase) {
      setError(supabaseConfigError ?? 'Supabase client is not available.');
      return;
    }
    const { error } = await supabase
      .from('topics')
      .insert({ title, description, paper })
      .select();
    if (error) {
      setError(error.message);
    } else {
      setTitle('');
      setDescription('');
      setPaper(1);
      fetchAdminData();
    }
  }

  async function handleUpdateTopic(topicId: string) {
    setError(null);
    if (!supabase) {
      setError(supabaseConfigError ?? 'Supabase client is not available.');
      return;
    }
    const draft = editDrafts[topicId];
    if (!draft) {
      return;
    }
    const { error } = await supabase
      .from('topics')
      .update({ title: draft.title, description: draft.description, paper: draft.paper })
      .eq('id', topicId);
    if (error) {
      setError(error.message);
    } else {
      fetchAdminData();
    }
  }

  async function handleDeleteTopic(topicId: string, topicTitle: string) {
    if (!supabase) {
      setError(supabaseConfigError ?? 'Supabase client is not available.');
      return;
    }
    const shouldDelete = window.confirm(`Delete ${topicTitle}? This removes all linked media.`);
    if (!shouldDelete) {
      return;
    }
    const { error } = await supabase.from('topics').delete().eq('id', topicId);
    if (error) {
      setError(error.message);
    } else {
      fetchAdminData();
    }
  }

  function handleDraftChange(topicId: string, field: keyof TopicDraft, value: string | number) {
    setEditDrafts((prev) => ({
      ...prev,
      [topicId]: {
        ...prev[topicId],
        [field]: value,
      } as TopicDraft,
    }));
  }

  return (
    <main>
      <section className="hero">
        <span className="badge">Admin workspace</span>
        <h1>Admin curriculum workspace</h1>
        <p>
          Build each paper from the ground up: update topics, curate videos, upload visuals, and
          shape the learner experience with full editing power.
        </p>
        <div className="hero-actions">
          <a className="btn-primary" href="#create-topic">
            Add a new topic
          </a>
          <button className="btn-secondary" type="button" onClick={fetchAdminData}>
            Refresh dashboard
          </button>
        </div>
      </section>
      {isAuthorized === null ? (
        <section className="card">
          <div className="section-header">
            <h2>Checking access</h2>
            <span className="badge">Please wait</span>
          </div>
          <p className="muted">Confirming your admin access.</p>
        </section>
      ) : isAuthorized ? (
        <>
          <section className="card admin-dashboard">
            <div className="section-header">
              <h2>Workspace overview</h2>
              <span className="badge">Admin snapshot</span>
            </div>
            <div className="admin-stats">
              <div className="admin-stat-card">
                <span>Topics managed</span>
                <strong>{topics.length}</strong>
              </div>
              <div className="admin-stat-card">
                <span>Videos</span>
                <strong>{totalCounts.videos}</strong>
              </div>
              <div className="admin-stat-card">
                <span>Visuals</span>
                <strong>{totalCounts.visuals}</strong>
              </div>
              <div className="admin-stat-card">
                <span>Quizzes</span>
                <strong>{totalCounts.quizzes}</strong>
              </div>
              <div className="admin-stat-card">
                <span>Resource links</span>
                <strong>{totalCounts.links}</strong>
              </div>
              <div className="admin-stat-card">
                <span>Topics with voice</span>
                <strong>{totalCounts.voice}</strong>
              </div>
            </div>
            <div className="admin-steps">
              <div>
                <h3>Admin flow</h3>
                <ul>
                  <li>Create or edit a topic.</li>
                  <li>Open the topic workspace to add videos, visuals, and voice scripts.</li>
                  <li>Save structured content so learners see the updated curriculum.</li>
                </ul>
              </div>
              <div>
                <h3>Media checklist</h3>
                <ul>
                  <li>Upload or link lesson videos.</li>
                  <li>Add diagrams, drawings, and supporting visuals.</li>
                  <li>Record voice narration or upload audio files.</li>
                  <li>Curate helpful links and external resources.</li>
                </ul>
              </div>
            </div>
            {isLoading && <p className="muted">Loading latest admin metrics…</p>}
          </section>
          <section className="card" id="create-topic">
            <div className="section-header">
              <h2>Create Topic</h2>
              <span className="badge">Curriculum focus</span>
            </div>
            <form onSubmit={handleCreateTopic}>
              <label>
                Paper
                <select value={paper} onChange={(e) => setPaper(Number(e.target.value) as 1 | 2)}>
                  <option value={1}>Paper 1</option>
                  <option value={2}>Paper 2</option>
                </select>
              </label>
              <label>
                Title
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label>
                Description
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Short overview for learners"
                />
              </label>
              <button className="btn-primary" type="submit">
                Create
              </button>
              {error && <p className="error-banner">{error}</p>}
            </form>
          </section>
          <section className="card">
            <div className="section-header">
              <h2>Paper 1 workspace</h2>
              <span className="badge">Core topics</span>
            </div>
            {paper1Topics.length === 0 ? (
              <p className="muted">No Paper 1 topics yet.</p>
            ) : (
              <ul className="list admin-topic-list">
                {paper1Topics.map((topic) => {
                  const counts = resourceCounts[topic.id];
                  const draft = editDrafts[topic.id];
                  return (
                    <li className="list-item admin-topic-card" key={topic.id}>
                      <div className="list-item-header admin-topic-header">
                        <div>
                          <h3>{topic.title}</h3>
                          <p className="muted">
                            {topic.description || 'Add a description to guide learners.'}
                          </p>
                        </div>
                        <div className="admin-topic-actions">
                          <Link className="btn-secondary" href={`/admin/topics/${topic.id}`}>
                            Open workspace
                          </Link>
                          <button
                            className="btn-tertiary"
                            type="button"
                            onClick={() => handleDeleteTopic(topic.id, topic.title)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="admin-meta">
                        <span className="badge">Paper {topic.paper ?? 1}</span>
                        <span className="badge badge--highlight">
                          {counts?.videos ?? 0} videos
                        </span>
                        <span className="badge badge--highlight">
                          {counts?.visuals ?? 0} visuals
                        </span>
                        <span className="badge badge--highlight">
                          {counts?.quizzes ?? 0} quizzes
                        </span>
                        <span className="badge badge--highlight">
                          {counts?.links ?? 0} links
                        </span>
                        {counts?.hasVoice ? (
                          <span className="badge badge--play">Voice ready</span>
                        ) : (
                          <span className="badge">No voice</span>
                        )}
                      </div>
                      <details className="admin-details">
                        <summary>Quick edit topic details</summary>
                        <form
                          onSubmit={(event) => {
                            event.preventDefault();
                            handleUpdateTopic(topic.id);
                          }}
                        >
                          <label>
                            Paper
                            <select
                              value={draft?.paper ?? 1}
                              onChange={(e) =>
                                handleDraftChange(topic.id, 'paper', Number(e.target.value))
                              }
                            >
                              <option value={1}>Paper 1</option>
                              <option value={2}>Paper 2</option>
                            </select>
                          </label>
                          <label>
                            Title
                            <input
                              type="text"
                              value={draft?.title ?? topic.title}
                              onChange={(e) => handleDraftChange(topic.id, 'title', e.target.value)}
                              required
                            />
                          </label>
                          <label>
                            Description
                            <textarea
                              value={draft?.description ?? topic.description ?? ''}
                              onChange={(e) =>
                                handleDraftChange(topic.id, 'description', e.target.value)
                              }
                              rows={3}
                            />
                          </label>
                          <button className="btn-primary" type="submit">
                            Save changes
                          </button>
                        </form>
                      </details>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
          <section className="card">
            <div className="section-header">
              <h2>Paper 2 workspace</h2>
              <span className="badge">Geometry &amp; stats</span>
            </div>
            {paper2Topics.length === 0 ? (
              <p className="muted">No Paper 2 topics yet.</p>
            ) : (
              <ul className="list admin-topic-list">
                {paper2Topics.map((topic) => {
                  const counts = resourceCounts[topic.id];
                  const draft = editDrafts[topic.id];
                  return (
                    <li className="list-item admin-topic-card" key={topic.id}>
                      <div className="list-item-header admin-topic-header">
                        <div>
                          <h3>{topic.title}</h3>
                          <p className="muted">
                            {topic.description || 'Add a description to guide learners.'}
                          </p>
                        </div>
                        <div className="admin-topic-actions">
                          <Link className="btn-secondary" href={`/admin/topics/${topic.id}`}>
                            Open workspace
                          </Link>
                          <button
                            className="btn-tertiary"
                            type="button"
                            onClick={() => handleDeleteTopic(topic.id, topic.title)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="admin-meta">
                        <span className="badge">Paper {topic.paper ?? 2}</span>
                        <span className="badge badge--highlight">
                          {counts?.videos ?? 0} videos
                        </span>
                        <span className="badge badge--highlight">
                          {counts?.visuals ?? 0} visuals
                        </span>
                        <span className="badge badge--highlight">
                          {counts?.quizzes ?? 0} quizzes
                        </span>
                        <span className="badge badge--highlight">
                          {counts?.links ?? 0} links
                        </span>
                        {counts?.hasVoice ? (
                          <span className="badge badge--play">Voice ready</span>
                        ) : (
                          <span className="badge">No voice</span>
                        )}
                      </div>
                      <details className="admin-details">
                        <summary>Quick edit topic details</summary>
                        <form
                          onSubmit={(event) => {
                            event.preventDefault();
                            handleUpdateTopic(topic.id);
                          }}
                        >
                          <label>
                            Paper
                            <select
                              value={draft?.paper ?? 2}
                              onChange={(e) =>
                                handleDraftChange(topic.id, 'paper', Number(e.target.value))
                              }
                            >
                              <option value={1}>Paper 1</option>
                              <option value={2}>Paper 2</option>
                            </select>
                          </label>
                          <label>
                            Title
                            <input
                              type="text"
                              value={draft?.title ?? topic.title}
                              onChange={(e) => handleDraftChange(topic.id, 'title', e.target.value)}
                              required
                            />
                          </label>
                          <label>
                            Description
                            <textarea
                              value={draft?.description ?? topic.description ?? ''}
                              onChange={(e) =>
                                handleDraftChange(topic.id, 'description', e.target.value)
                              }
                              rows={3}
                            />
                          </label>
                          <button className="btn-primary" type="submit">
                            Save changes
                          </button>
                        </form>
                      </details>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
          {error && <p className="error-banner">{error}</p>}
        </>
      ) : (
        <section className="card">
          <div className="section-header">
            <h2>Admin access required</h2>
            <span className="badge">Restricted</span>
          </div>
          <p className="muted">
            This workspace is reserved for admin accounts. Please log in with an admin profile to
            continue.
          </p>
          {error && <p className="error-banner">{error}</p>}
          <Link className="btn-primary" href="/login?role=admin">
            Go to admin login
          </Link>
        </section>
      )}
    </main>
  );
}
