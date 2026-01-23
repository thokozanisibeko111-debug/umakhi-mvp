'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase, supabaseConfigError } from '@/utils/supabaseClient';

interface Topic {
  id: string;
  title: string;
  description?: string;
}

export default function Home() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (supabaseConfigError || !supabase) {
      return;
    }
    // Fetch the current user if logged in
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
    fetchTopics();
  }, []);

  async function fetchTopics() {
    if (supabaseConfigError || !supabase) {
      return;
    }
    const { data, error } = await supabase.from('topics').select('*');
    if (!error && data) {
      setTopics(data as Topic[]);
    }
  }

  if (supabaseConfigError) {
    return (
      <main>
        <h1>Welcome to uMakhi</h1>
        <p>{supabaseConfigError}</p>
        <p>
          Please add your Supabase credentials, then refresh this page.
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main>
        <section className="hero">
          <span className="badge">Welcome to uMakhi</span>
          <h1>Bring clarity to Grade 12 Mathematics.</h1>
          <p>
            Learn with guided topics, short videos, and AI-powered answers. Sign in to unlock
            topics curated for your syllabus.
          </p>
        </section>
        <section className="card">
          <div className="section-header">
            <h2>Get started</h2>
            <span className="badge">Free to explore</span>
          </div>
          <p className="muted">
            Create an account to access personalized topics, quizzes, and tailored explanations.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link className="nav-link" href="/login">
              Log in
            </Link>
            <Link className="nav-link" href="/signup">
              Sign up
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="hero">
        <span className="badge">Your learning dashboard</span>
        <h1>Topics</h1>
        <p>Pick a topic to review key ideas, watch quick lessons, and quiz yourself.</p>
      </section>
      <section className="card">
        <div className="section-header">
          <h2>Available topics</h2>
          <span className="badge">Updated weekly</span>
        </div>
        {topics.length === 0 ? (
          <p className="muted">
            No topics found yet. Ask an admin to seed Grade 12 content from the Admin page.
          </p>
        ) : (
          <ul className="list">
            {topics.map((topic) => (
              <li className="list-item" key={topic.id}>
                <h3>{topic.title}</h3>
                {topic.description && <p className="muted">{topic.description}</p>}
                <Link className="nav-link" href={`/topic/${topic.id}`}>
                  Explore topic
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
