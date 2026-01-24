'use client';

import { useEffect, useState } from 'react';
import { supabase, supabaseConfigError } from '@/utils/supabaseClient';
import Link from 'next/link';

interface Topic {
  id: string;
  title: string;
  description?: string;
  paper?: number;
}

export default function AdminPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [paper, setPaper] = useState<1 | 2>(1);
  const [error, setError] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

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
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      fetchTopics();
    }
  }, [isAuthorized]);

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
      .insert({ title, description, paper })
      .select();
    if (error) {
      setError(error.message);
    } else {
      setTitle('');
      setDescription('');
      setPaper(1);
      fetchTopics();
    }
  }

  return (
    <main>
      <section className="hero">
        <span className="badge">Admin workspace</span>
        <h1>Manage topics and curriculum resources</h1>
        <p>
          Curate new topics, assign them to papers, and open each topic for full media, content, and
          assessment control.
        </p>
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
          <section className="card">
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
              <h2>Existing Topics</h2>
              <span className="badge">Manage content</span>
            </div>
            {topics.length === 0 ? (
              <p className="muted">No topics yet.</p>
            ) : (
              <ul className="list">
                {topics.map((topic) => (
                  <li className="list-item" key={topic.id}>
                    <div className="list-item-header">
                      <h3>{topic.title}</h3>
                      {topic.paper && <span className="badge">Paper {topic.paper}</span>}
                    </div>
                    {topic.description && <p className="muted">{topic.description}</p>}
                    <Link className="nav-link" href={`/admin/topics/${topic.id}`}>
                      Manage topic
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
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
