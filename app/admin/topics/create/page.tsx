'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

export default function CreateTopicPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    paper: 1,
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from('topics')
      .insert([formData])
      .select()
      .single();

    if (error) {
      alert('Error creating topic: ' + error.message);
      setLoading(false);
    } else {
      // Redirect to the edit page to add videos immediately
      router.push(`/admin/topics/${data.id}`);
    }
  };

  return (
    <main>
      <div className="section-header">
        <h1>Create New Topic</h1>
        <button onClick={() => router.back()} className="btn-tertiary">Cancel</button>
      </div>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Topic Title</label>
            <input
              required
              type="text"
              placeholder="e.g. Algebra & Equations"
              style={{ width: '100%' }}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label>Paper</label>
            <select
              style={{ width: '100%' }}
              value={formData.paper}
              onChange={(e) => setFormData({ ...formData, paper: Number(e.target.value) })}
            >
              <option value={1}>Paper 1 (Algebra, Patterns, Functions)</option>
              <option value={2}>Paper 2 (Trig, Geometry, Stats)</option>
            </select>
          </div>

          <div>
            <label>Short Description (Optional)</label>
            <textarea
              placeholder="Brief summary of what this topic covers..."
              style={{ width: '100%', minHeight: '100px' }}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Topic & Add Videos \u2192'}
          </button>
        </form>
      </div>
    </main>
  );
}
