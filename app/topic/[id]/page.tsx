'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

export default function TopicPage() {
  const { id } = useParams();
  const [topic, setTopic] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<'en' | 'zu'>('en');

  useEffect(() => {
    async function loadContent() {
      // 1. Fetch Topic Details
      const { data: topicData } = await supabase
        .from('topics')
        .select('*')
        .eq('id', id)
        .single();
      
      setTopic(topicData);

      // 2. Fetch Videos
      const { data: videoData } = await supabase
        .from('videos')
        .select('*')
        .eq('topic_id', id);
      
      if (videoData) setVideos(videoData);
      setLoading(false);
    }
    if (id) loadContent();
  }, [id]);

  if (loading) return <main><p>Loading content...</p></main>;
  if (!topic) return <main><p>Topic not found.</p></main>;

  // Helper to safely get text
  const t = (obj: any) => obj?.[language] || obj?.en || '';

  // Destructure the rich content JSON
  const content = topic.content || {};
  const { introduction, notes, visuals } = content;

  return (
    <main>
      <section className="hero">
        <div className="hero-top">
           <span className="badge">Paper {topic.paper}</span>
           <select 
             value={language} 
             onChange={e => setLanguage(e.target.value as any)}
             style={{ padding: '0.5rem', borderRadius: '8px' }}
           >
             <option value="en">English</option>
             <option value="zu">isiZulu</option>
           </select>
        </div>
        <h1>{t(topic.title)}</h1>
        <p>{t(topic.description)}</p>
      </section>

      {/* INTRODUCTION SECTION */}
      {introduction && (
        <section className="card">
          <h2>Introduction</h2>
          <div className="intro-grid">
            <div>
              <h3>Outcomes</h3>
              <ul>
                {introduction.outcomes?.map((o: any, i: number) => <li key={i}>{t(o)}</li>)}
              </ul>
            </div>
            {introduction.starterExample && (
              <div className="example-card">
                 <h3>Starter Example</h3>
                 <p><strong>Q:</strong> {t(introduction.starterExample.question)}</p>
                 <p className="highlight"><strong>A:</strong> {t(introduction.starterExample.answer)}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* NOTES & VISUALS SECTION */}
      {notes && (
        <section className="card">
          <h2>Study Notes</h2>
          <p className="muted">{t(notes.intro)}</p>
          
          {/* Visuals Gallery */}
          {visuals && (
            <div className="visual-grid">
              {visuals.map((vis: any, i: number) => (
                <div key={i} className="visual-card">
                  <h4>{t(vis.title)}</h4>
                  <div dangerouslySetInnerHTML={{ __html: vis.svg }} />
                  <p className="muted">{t(vis.description)}</p>
                </div>
              ))}
            </div>
          )}

          <div className="notes-sections">
            {notes.sections?.map((sec: any, i: number) => (
               <div key={i} className="note-block">
                 <h3>{t(sec.title)}</h3>
                 <ul>{sec.content?.map((c: any, j: number) => <li key={j}>{t(c)}</li>)}</ul>
               </div>
            ))}
          </div>
        </section>
      )}

      {/* VIDEOS SECTION (Now Dynamic!) */}
      <section className="card">
        <h2>Video Lessons</h2>
        {videos.length === 0 ? <p className="muted">No videos added yet by Admin.</p> : (
          <div className="list">
            {videos.map((vid) => (
              <div key={vid.id} className="list-item">
                <h3>{t(vid.title) || vid.title}</h3>
                <a href={vid.url} target="_blank" className="btn-secondary">Watch Video</a>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
