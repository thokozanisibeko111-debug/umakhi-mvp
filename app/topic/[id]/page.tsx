'use client';

import { useEffect, useState } from 'react';
import { supabase, supabaseConfigError } from '@/utils/supabaseClient';
import { useParams } from 'next/navigation';
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
  source?: string | null;
  description?: string | null;
}

interface TopicNotes {
  id: string;
  introduction: string;
  notes_md: string;
  visuals_json: Array<{
    title: string;
    description?: string;
    svg: string;
  }>;
}

export default function TopicPage() {
  const params = useParams<{ id: string }>();
  const topicId = params.id;
  const [topic, setTopic] = useState<Topic | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [notes, setNotes] = useState<TopicNotes | null>(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (supabaseConfigError) {
      setError(supabaseConfigError);
      return;
    }
    if (topicId) {
      fetchTopic(topicId);
      fetchNotes(topicId);
      fetchVideos(topicId);
    }
  }, [topicId]);

  async function fetchTopic(id: string) {
    if (!supabase) {
      return;
    }
    const { data, error } = await supabase.from('topics').select('*').eq('id', id).single();
    if (!error && data) setTopic(data as Topic);
  }

  async function fetchVideos(id: string) {
    if (!supabase) {
      return;
    }
    const { data, error } = await supabase.from('videos').select('*').eq('topic_id', id);
    if (!error && data) setVideos(data as Video[]);
  }

  async function fetchNotes(id: string) {
    if (!supabase) {
      return;
    }
    const { data, error } = await supabase
      .from('topic_notes')
      .select('*')
      .eq('topic_id', id)
      .single();
    if (!error && data) {
      setNotes(data as TopicNotes);
    }
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
          {error && <p className="error-banner">{error}</p>}
        </section>
      </main>
    );
  }

  function renderNotesContent(content: string) {
    const lines = content.split('\n');
    const blocks: JSX.Element[] = [];
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        blocks.push(
          <ul key={`list-${blocks.length}`}>
            {listItems.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) {
        flushList();
        return;
      }
      if (trimmed.startsWith('## ')) {
        flushList();
        blocks.push(<h3 key={`h3-${index}`}>{trimmed.replace('## ', '')}</h3>);
        return;
      }
      if (trimmed.startsWith('### ')) {
        flushList();
        blocks.push(<h4 key={`h4-${index}`}>{trimmed.replace('### ', '')}</h4>);
        return;
      }
      if (trimmed.startsWith('- ')) {
        listItems.push(trimmed.replace('- ', ''));
        return;
      }
      flushList();
      blocks.push(<p key={`p-${index}`}>{trimmed}</p>);
    });

    flushList();
    return blocks;
  }

  function renderVideo(video: Video) {
    const youtubeMatch = video.url.match(
      /(?:youtube\\.com\\/watch\\?v=|youtu\\.be\\/)([a-zA-Z0-9_-]+)/
    );
    if (youtubeMatch) {
      const embedUrl = `https://www.youtube.com/embed/${youtubeMatch[1]}`;
      return (
        <iframe
          title={video.title}
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
    return (
      <video controls width="100%">
        <source src={video.url} />
      </video>
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
          <h2>Introduction & Notes</h2>
          <span className="badge">Study guide</span>
        </div>
        {notes ? (
          <div className="notes-content">
            <p className="muted">{notes.introduction}</p>
            {renderNotesContent(notes.notes_md)}
            {notes.visuals_json?.length > 0 && (
              <>
                <h3>Visuals</h3>
                <div className="visual-grid">
                  {notes.visuals_json.map((visual, index) => (
                    <div className="visual-card" key={`${visual.title}-${index}`}>
                      <h4>{visual.title}</h4>
                      {visual.description && <p className="muted">{visual.description}</p>}
                      <div
                        className="visual-frame"
                        dangerouslySetInnerHTML={{ __html: visual.svg }}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="muted">Notes are being prepared for this topic.</p>
        )}
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
                {video.description && <p className="muted">{video.description}</p>}
                <div className="video-frame">
                  {renderVideo(video)}
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
