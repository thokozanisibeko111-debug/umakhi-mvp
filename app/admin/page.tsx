'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import Link from 'next/link';

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

  useEffect(() => {
    fetchTopics();
  }, []);

  async function fetchTopics() {
    const { data, error } = await supabase.from('topics').select('*');
    if (!error && data) setTopics(data as Topic[]);
  }

  async function handleCreateTopic(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
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
