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
        <p>Loading topic…</p>
      </main>
    );
  }

  return (
    <main>
      <h1>{topic.title}</h1>
      {topic.description && <p>{topic.description}</p>}
      <h2>Videos</h2>
      {videos.length === 0 ? (
        <p>No videos yet for this topic.</p>
      ) : (
        <ul>
          {videos.map((video) => (
            <li key={video.id}>
              <h3>{video.title}</h3>
              {/* Simple HTML5 video player; adapt as needed */}
              <video controls width="100%">
                <source src={video.url} />
              </video>
            </li>
          ))}
        </ul>
      )}
      <h2>Ask uMakhi</h2>
      <form onSubmit={askQuestion}>
        <label>
          Your question
          <br />
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            cols={50}
            placeholder="Ask a question about this topic…"
            required
          />
        </label>
        <br />
        <button type="submit" disabled={loadingAnswer}>
          {loadingAnswer ? 'Sending…' : 'Ask'}
        </button>
      </form>
      {answer && (
        <div>
          <h3>Answer</h3>
          <p>{answer}</p>
        </div>
      )}
      <h2>Quiz</h2>
      <p>
        Ready to test your knowledge? <Link href={`/topic/${topic.id}/quiz`}>Take the quiz</Link>.
      </p>
    </main>
  );
}
