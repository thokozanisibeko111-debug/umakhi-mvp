'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const { data, error } = await supabase
        .from('topics')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTopics(data || []);
    } catch (error) {
      console.error('Error fetching topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTopic = async (id: string) => {
    if (!confirm('Are you sure? This will delete the topic and all its videos.')) return;

    const { error } = await supabase.from('topics').delete().eq('id', id);
    if (error) {
      alert('Error deleting topic');
    } else {
      fetchTopics(); // Refresh list
    }
  };

  const paper1Topics = topics.filter((t) => t.paper === 1);
  const paper2Topics = topics.filter((t) => t.paper === 2);

  return (
    <main>
      <div className="section-header">
        <div>
          <span className="badge badge--highlight">Admin Workspace</span>
          <h1>Manage Content</h1>
        </div>
        <Link href="/admin/topics/create" className="btn-primary">
          + Create New Topic
        </Link>
      </div>

      {loading ? (
        <p>Loading workspace...</p>
      ) : (
        <div className="dashboard-grid">
          {/* Paper 1 Section */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-purple-700">📄 Paper 1 Topics</h2>
            <div className="list">
              {paper1Topics.length === 0 && <p className="muted">No topics yet.</p>}
              {paper1Topics.map((topic) => (
                <div key={topic.id} className="list-item topic-card">
                  <div>
                    <h3>{topic.title}</h3>
                    <p className="topic-subtitle">{topic.description || 'No description'}</p>
                  </div>
                  <div className="admin-topic-actions">
                    <Link
                      href={`/admin/topics/${topic.id}`}
                      className="btn-secondary"
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                    >
                      Edit Content
                    </Link>
                    <button
                      onClick={() => deleteTopic(topic.id)}
                      className="btn-tertiary"
                      style={{ color: '#ef4444', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr style={{ margin: '2rem 0', borderColor: 'var(--border)' }} />

          {/* Paper 2 Section */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-pink-600">📄 Paper 2 Topics</h2>
            <div className="list">
              {paper2Topics.length === 0 && <p className="muted">No topics yet.</p>}
              {paper2Topics.map((topic) => (
                <div key={topic.id} className="list-item topic-card">
                  <div>
                    <h3>{topic.title}</h3>
                    <p className="topic-subtitle">{topic.description || 'No description'}</p>
                  </div>
                  <div className="admin-topic-actions">
                    <Link
                      href={`/admin/topics/${topic.id}`}
                      className="btn-secondary"
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                    >
                      Edit Content
                    </Link>
                    <button
                      onClick={() => deleteTopic(topic.id)}
                      className="btn-tertiary"
                      style={{ color: '#ef4444', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
