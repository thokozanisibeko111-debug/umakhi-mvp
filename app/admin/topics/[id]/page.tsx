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
  
  // Video Form State
  const [newVideo, setNewVideo] = useState({ title: '', url: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch Topic
    const { data: t } = await supabase.from('topics').select('*').eq('id', id).single();
    if (t) setTopic(t);
    
    // Fetch Videos
    const { data: v } = await supabase.from('videos').select('*').eq('topic_id', id);
    if (v) setVideos(v);
    
    setLoading(false);
  };

  const handleSaveTopic = async () => {
    // We assume 'topic.content' is a string in the textarea, need to parse it back to JSON
    let contentJson = topic.content;
    if (typeof topic.content === 'string') {
        try { contentJson = JSON.parse(topic.content); } catch (e) { alert("Invalid JSON in content"); return; }
    }

    const { error } = await supabase
      .from('topics')
      .update({
        title: topic.title, // Keep as JSON object
        description: topic.description, // Keep as JSON object
        paper: topic.paper,
        content: contentJson
      })
      .eq('id', id);

    if (error) alert('Error saving: ' + error.message);
    else alert('Topic saved successfully!');
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.from('videos').insert([{  
      topic_id: id,
      title: { en: newVideo.title }, // Simple English title for now
      url: newVideo.url
    }]).select();

    if (data) {
        setVideos([...videos, data[0]]);
        setNewVideo({ title: '', url: '' });
    }
  };

  const handleDeleteVideo = async (vidId: string) => {
    await supabase.from('videos').delete().eq('id', vidId);
    setVideos(videos.filter(v => v.id !== vidId));
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <main>
      <div className="section-header">
        <button onClick={() => router.back()} className="btn-tertiary">← Back</button>
        <h1>Edit Topic</h1>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        
        {/* LEFT: General Info & JSON Editor */}
        <section className="card">
          <h2>Topic Details</h2>
          <label className="block mb-2">Title (JSON):</label>
          <input 
            className="w-full mb-4 p-2 border rounded"
            value={JSON.stringify(topic.title)}
            onChange={e => {
                try { setTopic({...topic, title: JSON.parse(e.target.value)}) }
                catch(err) { /* Allow typing invalid JSON temporarily? Better to just edit English title */ }
            }} 
          />
          <small className="muted block mb-4">Edit as {"{\"en\": \"Title\"}"}</small>

          <label className="block mb-2">Content (Advanced JSON):</label>
          <textarea
            className="w-full p-2 border rounded font-mono text-sm"
            rows={15}
            value={typeof topic.content === 'object' ? JSON.stringify(topic.content, null, 2) : topic.content}
            onChange={e => setTopic({...topic, content: e.target.value})}
          />
          
          <button onClick={handleSaveTopic} className="btn-primary mt-4">Save Changes</button>
        </section>

        {/* RIGHT: Video Manager */}
        <section className="card">
          <h2>Manage Videos</h2>
          <form onSubmit={handleAddVideo} className="mb-6 p-4 bg-purple-50 rounded">
            <h3 className="text-sm font-bold mb-2">Add New Video</h3>
            <input 
              placeholder="Video Title" 
              className="w-full mb-2 p-2 rounded border"
              value={newVideo.title}
              onChange={e => setNewVideo({...newVideo, title: e.target.value})}
            />
            <input 
              placeholder="YouTube URL" 
              className="w-full mb-2 p-2 rounded border"
              value={newVideo.url}
              onChange={e => setNewVideo({...newVideo, url: e.target.value})}
            />
            <button type="submit" className="btn-secondary text-sm">+ Add Video</button>
          </form>

          <div className="list">
            {videos.map(v => (
              <div key={v.id} className="list-item flex justify-between items-center">
                <span>{v.title?.en || 'Video'}</span>
                <button onClick={() => handleDeleteVideo(v.id)} className="text-red-500">Delete</button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
