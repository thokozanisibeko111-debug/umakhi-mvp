'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/utils/supabaseClient';
import { User } from '@supabase/supabase-js';

export default function Home() {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null); // Track the logged-in user

  useEffect(() => {
    // 1. Check if user is already logged in
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      // Only fetch topics if we have a user (optional optimization)
      if (user) {
        loadTopics();
      } else {
        setLoading(false);
      }
    }

    checkUser();

    // 2. Listen for auth changes (e.g. if they log out in another tab)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) loadTopics();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function loadTopics() {
    const { data, error } = await supabase
      .from('topics')
      .select('id, title, description, paper, mastery')
      .order('paper', { ascending: true });

    if (data) setTopics(data);
    setLoading(false);
  }

  const paper1 = topics.filter(t => t.paper === 1);
  const paper2 = topics.filter(t => t.paper === 2);

  return (
    <main>
      <section className="hero">
        <span className="badge">Grade 12 CAPS</span>
        <h1>Welcome to uMakhi</h1>
        <p>Master Mathematics with visual learning.</p>
        
        {/* Show Login buttons only if NOT logged in */}
        {!user && (
          <div className="hero-actions">
             <Link href="/login" className="btn-primary">Log In to Start</Link>
             <Link href="/signup" className="btn-secondary">Create Account</Link>
          </div>
        )}

        {/* Show Admin button only if logged in */}
        {user && (
           <div className="hero-actions">
             <Link href="/admin" className="btn-secondary">Go to Admin Workspace</Link>
           </div>
        )}
      </section>

      {/* --- CONTENT PROTECTION CHECK --- */}
      {!user ? (
        // LOCKED STATE: Show this if user is NOT logged in
        <div style={{ 
          textAlign: 'center', 
          marginTop: '4rem', 
          padding: '3rem', 
          background: 'white', 
          borderRadius: '24px', 
          boxShadow: '0 20px 40px -5px rgba(0,0,0,0.1)' 
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔒</div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1e293b' }}>Content Locked</h2>
          <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '600px', margin: '0 auto 2rem' }}>
            To access the complete Grade 12 Mathematics curriculum, including Paper 1 and Paper 2 topics, please log in or create an account.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/login" className="btn-primary">
              Log In
            </Link>
            <Link href="/signup" className="btn-secondary">
              Sign Up
            </Link>
          </div>
        </div>
      ) : (
        // UNLOCKED STATE: Show this ONLY if user is logged in
        loading ? <p style={{textAlign: 'center', marginTop: '2rem'}}>Loading your curriculum...</p> : (
          <div className="dashboard-grid">
            <section>
              <h2 className="text-xl font-bold mb-4 text-purple-700">📄 Paper 1 (Algebra)</h2>
              <div className="list">
                {paper1.length === 0 && <p className="muted">No topics yet.</p>}
                {paper1.map(topic => (
                  <Link key={topic.id} href={`/topic/${topic.id}`} className="list-item topic-card">
                    <h3>{topic.title?.en || topic.title || 'Untitled'}</h3>
                    <p className="topic-subtitle">{topic.description?.en || topic.description}</p>
                    {topic.mastery !== undefined && (
                      <div className="progress-bar"><div style={{width: `${topic.mastery}%`}}></div></div>
                    )}
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 text-pink-600">📄 Paper 2 (Geometry)</h2>
              <div className="list">
                {paper2.length === 0 && <p className="muted">No topics yet.</p>}
                {paper2.map(topic => (
                  <Link key={topic.id} href={`/topic/${topic.id}`} className="list-item topic-card">
                    <h3>{topic.title?.en || topic.title || 'Untitled'}</h3>
                    <p className="topic-subtitle">{topic.description?.en || topic.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        )
      )}
    </main>
  );
}
