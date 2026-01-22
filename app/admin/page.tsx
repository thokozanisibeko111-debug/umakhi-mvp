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
      <h1>Admin</h1>
      <section>
        <h2>Create Topic</h2>
        <form onSubmit={handleCreateTopic}>
          <label>
            Title
            <br />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Description
            <br />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </label>
          <br />
          <button type="submit">Create</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </section>
      <section>
        <h2>Existing Topics</h2>
        {topics.length === 0 ? (
          <p>No topics yet.</p>
        ) : (
          <ul>
            {topics.map((topic) => (
              <li key={topic.id}>
                {topic.title} – <Link href={`/admin/topics/${topic.id}`}>Manage</Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
