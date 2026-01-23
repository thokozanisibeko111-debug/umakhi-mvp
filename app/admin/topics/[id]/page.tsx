'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'next/navigation';
import { supabase, supabaseConfigError } from '@/utils/supabaseClient';

interface Video {
  id: string;
  title: string;
  url: string;
}

interface Quiz {
  id: string;
  title: string;
}

export default function AdminTopicPage() {
  const params = useParams<{ id: string }>();
  const topicId = params.id;
  const [videos, setVideos] = useState<Video[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [quizTitle, setQuizTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (supabaseConfigError) {
      setError(supabaseConfigError);
      return;
    }
    if (topicId) {
      fetchVideos();
      fetchQuizzes();
    }
  }, [topicId]);

  async function fetchVideos() {
    if (!supabase) {
      return;
    }
    const { data, error } = await supabase.from('videos').select('*').eq('topic_id', topicId);
    if (!error && data) setVideos(data as Video[]);
  }

  async function fetchQuizzes() {
    if (!supabase) {
      return;
    }
    const { data, error } = await supabase.from('quizzes').select('*').eq('topic_id', topicId);
    if (!error && data) setQuizzes(data as Quiz[]);
  }

  async function handleVideoUpload(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!supabase) {
      setError(supabaseConfigError ?? 'Supabase client is not available.');
      return;
    }
    if (!videoFile) {
      setError('Please select a video file.');
      return;
    }
    // Upload file to Supabase storage
    const fileExt = videoFile.name.split('.').pop();
    const filePath = `${topicId}/${Date.now()}.${fileExt}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('videos')
      .upload(filePath, videoFile, { contentType: videoFile.type });
    if (uploadError) {
      setError(uploadError.message);
      return;
    }
    // Generate a public URL
    const { data: urlData } = supabase.storage.from('videos').getPublicUrl(filePath);
    const publicUrl = urlData?.publicUrl;
    // Insert into videos table
    const { error: insertError } = await supabase
      .from('videos')
      .insert({ title: videoTitle, topic_id: topicId, url: publicUrl });
    if (insertError) {
      setError(insertError.message);
    } else {
      setVideoTitle('');
      setVideoFile(null);
      fetchVideos();
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      setVideoFile(files[0]);
    }
  }

  async function handleCreateQuiz(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!supabase) {
      setError(supabaseConfigError ?? 'Supabase client is not available.');
      return;
    }
    const { data, error } = await supabase
      .from('quizzes')
      .insert({ title: quizTitle, topic_id: topicId })
      .select();
    if (error) {
      setError(error.message);
    } else {
      setQuizTitle('');
      fetchQuizzes();
    }
  }

  return (
    <main>
      <section className="hero">
        <span className="badge">Topic management</span>
        <h1>Manage topic assets</h1>
        <p>Upload videos and craft quizzes that keep learners motivated.</p>
      </section>
      <section className="card">
        <div className="section-header">
          <h2>Upload Video</h2>
          <span className="badge">Add media</span>
        </div>
        <form onSubmit={handleVideoUpload}>
          <label>
            Title
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              required
            />
          </label>
          <label>
            File
            <input type="file" accept="video/*" onChange={handleFileChange} />
          </label>
          <button className="btn-primary" type="submit">
            Upload
          </button>
        </form>
      </section>
      <section className="card">
        <div className="section-header">
          <h2>Existing Videos</h2>
          <span className="badge">Library</span>
        </div>
        {videos.length === 0 ? (
          <p className="muted">No videos yet.</p>
        ) : (
          <ul className="list">
            {videos.map((video) => (
              <li className="list-item" key={video.id}>
                <h3>{video.title}</h3>
                <p className="muted">Uploaded video content</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="card">
        <div className="section-header">
          <h2>Create Quiz</h2>
          <span className="badge">Assessments</span>
        </div>
        <form onSubmit={handleCreateQuiz}>
          <label>
            Quiz Title
            <input
              type="text"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              required
            />
          </label>
          <button className="btn-primary" type="submit">
            Create Quiz
          </button>
        </form>
        <div style={{ marginTop: '1.5rem' }}>
          <h3>Existing Quizzes</h3>
          {quizzes.length === 0 ? (
            <p className="muted">No quizzes yet.</p>
          ) : (
            <ul className="list">
              {quizzes.map((quiz) => (
                <li className="list-item" key={quiz.id}>
                  <h3>{quiz.title}</h3>
                  <p className="muted">Quiz ready for learners</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      {error && <p className="error-banner">{error}</p>}
    </main>
  );
}
