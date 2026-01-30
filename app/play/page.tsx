import React from 'react';
import Link from 'next/link';
import { topics } from '../data/grade12';

export default function PlayLobby() {
  const paper1 = topics.filter((t) => t.paper === 1);
  const paper2 = topics.filter((t) => t.paper === 2);

  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge" style={{ background: '#facc15', color: '#854d0e', border: 'none' }}>
          Game Arcade
        </span>
        <h1 style={{ fontSize: '3rem', margin: '0.5rem 0' }}>Choose Your Challenge</h1>
        <p className="muted" style={{ fontSize: '1.2rem' }}>
          Beat the clock, earn points, and master Mathematics.
        </p>
      </header>

      <div className="dashboard-grid">
        <section>
          <div className="section-header">
            <h2 style={{ color: '#7c3aed' }}>⚡ Paper 1: Algebra</h2>
          </div>
          <div className="list">
            {paper1.map((topic) => (
              <Link 
                href={`/play/${topic.id}`} 
                key={topic.id}
                className="card"
                style={{ 
                  textDecoration: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  border: '2px solid transparent'
                }}
              >
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>{topic.title.en}</h3>
                  <p className="muted" style={{ margin: 0, fontSize: '0.9rem' }}>
                    {topic.quizzes.length} Levels
                  </p>
                </div>
                <div style={{ 
                  background: '#f3e8ff', 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  display: 'grid', 
                  placeItems: 'center',
                  fontWeight: 'bold',
                  color: '#7c3aed'
                }}>
                  ▶
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="section-header">
            <h2 style={{ color: '#db2777' }}>📀 Paper 2: Geometry</h2>
          </div>
          <div className="list">
            {paper2.map((topic) => (
              <Link 
                href={`/play/${topic.id}`} 
                key={topic.id}
                className="card"
                style={{ 
                  textDecoration: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  border: '2px solid transparent'
                }}
              >
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>{topic.title.en}</h3>
                  <p className="muted" style={{ margin: 0, fontSize: '0.9rem' }}>
                    {topic.quizzes.length} Levels
                  </p>
                </div>
                <div style={{ 
                  background: '#fce7f3', 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  display: 'grid', 
                  placeItems: 'center',
                  fontWeight: 'bold',
                  color: '#db2777'
                }}>
                  ▶
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
