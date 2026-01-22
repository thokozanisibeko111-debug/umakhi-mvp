'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

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
    if (topicId) {
      fetchVideos();
      fetchQuizzes();
    }
  }, [topicId]);

  async function fetchVideos() {
    const { data, error } = await supabase.from('videos').select('*').eq('topic_id', topicId);
    if (!error && data) setVideos(data as Video[]);
  }

  async function fetchQuizzes() {
    const { data, error } = await supabase.from('quizzes').select('*').eq('topic_id', topicId);
    if (!error && data) setQuizzes(data as Quiz[]);
  }

  async function handleVideoUpload(e: FormEvent) {
    e.preventDefault();
    setError(null);
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
      <h1>Manage Topic</h1>
      <section>
        <h2>Upload Video</h2>
        <form onSubmit={handleVideoUpload}>
          <label>
            Title
            <br />
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            File
            <br />
            <input type="file" accept="video/*" onChange={handleFileChange} />
          </label>
          <br />
          <button type="submit">Upload</button>
        </form>
      </section>
      <section>
        <h2>Existing Videos</h2>
        {videos.length === 0 ? (
          <p>No videos yet.</p>
        ) : (
          <ul>
            {videos.map((video) => (
              <li key={video.id}>{video.title}</li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h2>Create Quiz</h2>
        <form onSubmit={handleCreateQuiz}>
          <label>
            Quiz Title
            <br />
            <input
              type="text"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Create Quiz</button>
        </form>
        <h3>Existing Quizzes</h3>
        {quizzes.length === 0 ? (
          <p>No quizzes yet.</p>
        ) : (
          <ul>
            {quizzes.map((quiz) => (
              <li key={quiz.id}>{quiz.title}</li>
            ))}
          </ul>
        )}
      </section>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </main>
  );
}
