'use client';

import { useEffect, useState } from 'react';
import { supabase, supabaseConfigError } from '@/utils/supabaseClient';
import Link from 'next/link';
import {
  grade12Notes,
  grade12Questions,
  grade12Quizzes,
  grade12Topics,
  grade12Videos,
} from '../data/grade12Maths';

interface Topic {
  id: string;
  title: string;
  description?: string;
}

export default function AdminPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);

  useEffect(() => {
    if (supabaseConfigError) {
      setError(supabaseConfigError);
      return;
    }
    fetchTopics();
  }, []);

  async function fetchTopics() {
    if (!supabase) {
      return;
    }
    const { data, error } = await supabase.from('topics').select('*');
    if (!error && data) setTopics(data as Topic[]);
  }

  async function handleCreateTopic(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!supabase) {
      setError(supabaseConfigError ?? 'Supabase client is not available.');
      return;
    }
    const { data, error } = await supabase
      .from('topics')
      .insert({ title, description })
      .select();
    if (error) {
      setError(error.message);
    } else {
      setTitle('');
      setDescription('');
      fetchTopics();
    }
  }

  async function handleSeedContent() {
    setError(null);
    setSeedMessage(null);
    if (!supabase) {
      setError(supabaseConfigError ?? 'Supabase client is not available.');
      return;
    }
    try {
      setSeeding(true);
      const topicIds = grade12Topics.map((topic) => topic.id);

      const { error: topicError } = await supabase.from('topics').upsert(grade12Topics);
      if (topicError) {
        throw new Error(topicError.message);
      }

      await supabase.from('topic_notes').delete().in('topic_id', topicIds);
      await supabase.from('videos').delete().in('topic_id', topicIds);
      await supabase.from('quizzes').delete().in('topic_id', topicIds);

      const { error: notesError } = await supabase.from('topic_notes').insert(grade12Notes);
      if (notesError) {
        throw new Error(notesError.message);
      }

      const { error: videosError } = await supabase.from('videos').insert(grade12Videos);
      if (videosError) {
        throw new Error(videosError.message);
      }

      const { error: quizzesError } = await supabase.from('quizzes').insert(grade12Quizzes);
      if (quizzesError) {
        throw new Error(quizzesError.message);
      }

      const quizIds = grade12Quizzes.map((quiz) => quiz.id);
      await supabase.from('questions').delete().in('quiz_id', quizIds);

      const { error: questionsError } = await supabase.from('questions').insert(grade12Questions);
      if (questionsError) {
        throw new Error(questionsError.message);
      }

      setSeedMessage('Grade 12 Mathematics content seeded successfully.');
      fetchTopics();
    } catch (seedError) {
      setError(seedError instanceof Error ? seedError.message : 'Unable to seed content.');
    } finally {
      setSeeding(false);
    }
  }

  return (
    <main>
      <section className="hero">
        <span className="badge">Admin workspace</span>
        <h1>Manage topics and curriculum resources</h1>
        <p>Curate new topics, add descriptions, and keep learner content fresh.</p>
      </section>
      <section className="card">
        <div className="section-header">
          <h2>Create Topic</h2>
          <span className="badge">Curriculum focus</span>
        </div>
        <form onSubmit={handleCreateTopic}>
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
          <h2>Seed Grade 12 Mathematics</h2>
          <span className="badge">One-click setup</span>
        </div>
        <p className="muted">
          This will populate Paper 1 and Paper 2 topics with starter notes, visuals, videos, and quizzes.
        </p>
        <button className="btn-primary" type="button" onClick={handleSeedContent} disabled={seeding}>
          {seeding ? 'Seeding content…' : 'Seed Grade 12 Content'}
        </button>
        {seedMessage && <p className="info-banner">{seedMessage}</p>}
        {error && <p className="error-banner">{error}</p>}
      </section>
      <section className="card">
        <div className="section-header">
          <h2>Existing Topics</h2>
          <span className="badge">Manage content</span>
        </div>
        {topics.length === 0 ? (
          <p className="muted">No topics yet.</p>
        ) : (
          <ul className="list">
            {topics.map((topic) => (
              <li className="list-item" key={topic.id}>
                <h3>{topic.title}</h3>
                {topic.description && <p className="muted">{topic.description}</p>}
                <Link className="nav-link" href={`/admin/topics/${topic.id}`}>
                  Manage topic
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
