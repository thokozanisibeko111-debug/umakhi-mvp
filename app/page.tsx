'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/utils/supabaseClient';

export default function Home() {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTopics() {
      const { data, error } = await supabase
        .from('topics')
        .select('id, title, description, paper, mastery')
        .order('paper', { ascending: true });

      if (data) setTopics(data);
      setLoading(false);
    }
    loadTopics();
  }, []);

  const paper1 = topics.filter(t => t.paper === 1);
  const paper2 = topics.filter(t => t.paper === 2);

  return (
    <main>
      <section className="hero">
        <span className="badge">Grade 12 CAPS</span>
        <h1>Welcome to uMakhi</h1>
        <p>Master Mathematics with visual learning.</p>
        <div className="hero-actions">
           <Link href="/admin" className="btn-secondary">Go to Admin Workspace</Link>
        </div>
      </section>

      {loading ? <p>Loading your curriculum...</p> : (
        <div className="dashboard-grid">
          <section>
            <h2 className="text-xl font-bold mb-4 text-purple-700">📄 Paper 1 (Algebra)</h2>
            <div className="list">
              {paper1.map(topic => (
                <Link key={topic.id} href={`/topic/${topic.id}`} className="list-item topic-card">
                  <h3>{topic.title?.en || 'Untitled'}</h3>
                  <p className="topic-subtitle">{topic.description?.en}</p>
                  <div className="progress-bar"><div style={{width: `${topic.mastery}%`}}></div></div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-pink-600">📄 Paper 2 (Geometry)</h2>
            <div className="list">
              {paper2.map(topic => (
                <Link key={topic.id} href={`/topic/${topic.id}`} className="list-item topic-card">
                  <h3>{topic.title?.en || 'Untitled'}</h3>
                  <p className="topic-subtitle">{topic.description?.en}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
