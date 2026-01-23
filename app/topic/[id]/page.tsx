'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Topic {
  id: string;
  title: string;
  description?: string;
}

interface Video {
  id: string;
  title: string;
  url: string;
}

export default function TopicPage() {
  const params = useParams<{ id: string }>();
  const topicId = params.id;
  const router = useRouter();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  useEffect(() => {
    if (topicId) {
      fetchTopic(topicId);
      fetchVideos(topicId);
    }
  }, [topicId]);

  async function fetchTopic(id: string) {
    const { data, error } = await supabase.from('topics').select('*').eq('id', id).single();
    if (!error && data) setTopic(data as Topic);
  }

  async function fetchVideos(id: string) {
    const { data, error } = await supabase.from('videos').select('*').eq('topic_id', id);
    if (!error && data) setVideos(data as Video[]);
  }

  async function askQuestion(e: React.FormEvent) {
    e.preventDefault();
    setLoadingAnswer(true);
    setAnswer(null);
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: question }),
    });
    const data = await res.json();
    setAnswer(data.answer);
    setLoadingAnswer(false);
  }

  if (!topic) {
    return (
      <main>
        <section className="hero">
          <h1>Loading topic…</h1>
          <p className="muted">Preparing your lesson experience.</p>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="hero">
        <span className="badge">Topic focus</span>
        <h1>{topic.title}</h1>
        {topic.description && <p>{topic.description}</p>}
      </section>
      <section className="card">
        <div className="section-header">
          <h2>Videos</h2>
          <span className="badge">Quick lessons</span>
        </div>
        {videos.length === 0 ? (
          <p className="muted">No videos yet for this topic.</p>
        ) : (
          <ul className="list">
            {videos.map((video) => (
              <li className="list-item" key={video.id}>
                <h3>{video.title}</h3>
                <div className="video-frame">
                  <video controls width="100%">
                    <source src={video.url} />
                  </video>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="card">
        <div className="section-header">
          <h2>Ask uMakhi</h2>
          <span className="badge">AI help</span>
        </div>
        <form onSubmit={askQuestion}>
          <label>
            Your question
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              placeholder="Ask a question about this topic…"
              required
            />
          </label>
          <button className="btn-primary" type="submit" disabled={loadingAnswer}>
            {loadingAnswer ? 'Sending…' : 'Ask'}
          </button>
        </form>
        {answer && (
          <div className="info-banner" style={{ marginTop: '1rem' }}>
            <strong>Answer:</strong> {answer}
          </div>
        )}
      </section>
      <section className="card">
        <div className="section-header">
          <h2>Quiz</h2>
          <span className="badge">Practice</span>
        </div>
        <p className="muted">
          Ready to test your knowledge? <Link href={`/topic/${topic.id}/quiz`}>Take the quiz</Link>.
        </p>
      </section>
    </main>
  );
}
