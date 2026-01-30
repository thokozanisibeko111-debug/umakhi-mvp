'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

export default function EditTopicPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [topic, setTopic] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [videoForm, setVideoForm] = useState({ title: '', url: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    if (!id) return;
    
    // 1. Get Topic
    const { data: topicData, error: topicError } = await supabase
      .from('topics')
      .select('*')
      .eq('id', id)
      .single();

    if (topicError) {
      alert('Topic not found!');
      router.push('/admin');
      return;
    }
    setTopic(topicData);

    // 2. Get Videos for this topic
    const { data: videoData, error: videoError } = await supabase
      .from('videos')
      .select('*')
      .eq('topic_id', id)
      .order('created_at', { ascending: true });

    if (!videoError) {
      setVideos(videoData || []);
    }
    setLoading(false);
  };

  // --- TOPIC ACTIONS ---
  const handleUpdateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const { error } = await supabase
      .from('topics')
      .update({
        title: topic.title,
        paper: topic.paper,
        description: topic.description
      })
      .eq('id', id);

    setIsSaving(false);
    if (error) alert('Error updating topic');
    else alert('Topic details updated successfully!');
  };

  // --- VIDEO ACTIONS ---
  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoForm.title || !videoForm.url) return;

    const { data, error } = await supabase
      .from('videos')
      .insert([{ 
        topic_id: id, 
        title: videoForm.title, 
        url: videoForm.url 
      }])
      .select()
      .single();

    if (error) {
      alert('Error adding video');
    } else {
      setVideos([...videos, data]);
      setVideoForm({ title: '', url: '' }); // Reset form
    }
  };

  const handleDeleteVideo = async (videoId: string) => {
    if (!confirm('Remove this video?')) return;
    
    const { error } = await supabase.from('videos').delete().eq('id', videoId);
    if (!error) {
      setVideos(videos.filter(v => v.id !== videoId));
    }
  };

  if (loading) return <main><p>Loading editor...</p></main>;

  return (
    <main>
      <div className="section-header">
        <button onClick={() => router.push('/admin')} className="btn-tertiary">
          ← Back to Dashboard
        </button>
        <span className="badge">Editing: {topic.title}</span>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1.5fr', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: Topic Details */}
        <section className="card">
          <h2 className="text-lg font-bold mb-4">Topic Details</h2>
          <form onSubmit={handleUpdateTopic} className="dashboard-grid" style={{ gap: '1rem' }}>
            <div>
              <label>Title</label>
              <input 
                value={topic.title} 
                onChange={(e) => setTopic({...topic, title: e.target.value})}
                style={{ width: '100%' }}
              />
            </div>
            
            <div>
              <label>Paper</label>
              <select 
                value={topic.paper} 
                onChange={(e) => setTopic({...topic, paper: Number(e.target.value)})}
                style={{ width: '100%' }}
              >
                <option value={1}>Paper 1</option>
                <option value={2}>Paper 2</option>
              </select>
            </div>

            <div>
              <label>Description</label>
              <textarea 
                value={topic.description || ''} 
                onChange={(e) => setTopic({...topic, description: e.target.value})}
                style={{ width: '100%', minHeight: '120px' }}
              />
            </div>

            <button type="submit" className="btn-primary" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </section>

        {/* RIGHT COLUMN: Video Management */}
        <section className="card">
          <h2 className="text-lg font-bold mb-4">📺 Learning Videos</h2>
          
          {/* Add Video Form */}
          <form onSubmit={handleAddVideo} style={{ background: 'var(--bg-accent)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
            <h3 style={{ marginTop: 0, fontSize: '1rem' }}>Add New Video</h3>
            <div style={{ display: 'grid', gap: '0.8rem' }}>
              <input 
                placeholder="Video Title (e.g. Intro to Calculus)"
                value={videoForm.title}
                onChange={(e) => setVideoForm({...videoForm, title: e.target.value})}
              />
              <input 
                placeholder="YouTube URL or Embed Link"
                value={videoForm.url}
                onChange={(e) => setVideoForm({...videoForm, url: e.target.value})}
              />
              <button type="submit" className="btn-secondary" style={{ justifySelf: 'start' }}>
                + Add Video
              </button>
            </div>
          </form>

          {/* Video List */}
          <div className="list">
            {videos.length === 0 && <p className="muted">No videos added yet.</p>}
            {videos.map((vid) => (
              <div key={vid.id} className="list-item" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', background: '#f00', borderRadius: '8px', display: 'grid', placeItems: 'center', color: 'white', fontWeight: 'bold' }}>▶</div>
                  <div>
                    <h4 style={{ margin: 0 }}>{vid.title}</h4>
                    <small className="muted" style={{ fontSize: '0.75rem' }}>{vid.url}</small>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => handleDeleteVideo(vid.id)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', padding: '0.5rem', cursor: 'pointer' }}
                  title="Delete Video"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
