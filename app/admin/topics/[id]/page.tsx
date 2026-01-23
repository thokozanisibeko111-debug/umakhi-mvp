'use client';

import { useEffect, useRef, useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'next/navigation';
import { supabase, supabaseConfigError } from '@/utils/supabaseClient';

interface Topic {
  id: string;
  title: string;
  description?: string;
  paper?: number;
}

interface Video {
  id: string;
  title: string;
  url: string;
}

interface Quiz {
  id: string;
  title: string;
}

interface TopicVisual {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  svg_markup?: string;
}

export default function AdminTopicPage() {
  const params = useParams<{ id: string }>();
  const topicId = params.id;
  const [topicTitle, setTopicTitle] = useState('');
  const [topicDescription, setTopicDescription] = useState('');
  const [topicPaper, setTopicPaper] = useState<1 | 2>(1);
  const [videos, setVideos] = useState<Video[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [visuals, setVisuals] = useState<TopicVisual[]>([]);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [quizTitle, setQuizTitle] = useState('');
  const [visualTitle, setVisualTitle] = useState('');
  const [visualDescription, setVisualDescription] = useState('');
  const [visualFile, setVisualFile] = useState<File | null>(null);
  const [contentRowId, setContentRowId] = useState<string | null>(null);
  const [contentDraft, setContentDraft] = useState('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState('#4f46e5');
  const [drawSize, setDrawSize] = useState(4);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (supabaseConfigError) {
      setError(supabaseConfigError);
      return;
    }
    if (topicId) {
      fetchTopic();
      fetchVideos();
      fetchQuizzes();
      fetchVisuals();
      fetchTopicContent();
    }
  }, [topicId]);

  async function fetchTopic() {
    if (!supabase) {
      return;
    }
    const { data, error } = await supabase.from('topics').select('*').eq('id', topicId).single();
    if (!error && data) {
      const topicData = data as Topic;
      setTopicTitle(topicData.title);
      setTopicDescription(topicData.description ?? '');
      setTopicPaper((topicData.paper ?? 1) as 1 | 2);
    }
  }

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

  async function fetchVisuals() {
    if (!supabase) {
      return;
    }
    const { data, error } = await supabase
      .from('topic_visuals')
      .select('*')
      .eq('topic_id', topicId);
    if (!error && data) setVisuals(data as TopicVisual[]);
  }

  async function fetchTopicContent() {
    if (!supabase) {
      return;
    }
    const { data, error } = await supabase
      .from('topic_content')
      .select('*')
      .eq('topic_id', topicId)
      .maybeSingle();
    if (!error && data) {
      setContentRowId(data.id);
      setContentDraft(data.content ?? '');
    }
  }

  async function handleUpdateTopic(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!supabase) {
      setError(supabaseConfigError ?? 'Supabase client is not available.');
      return;
    }
    const { error } = await supabase
      .from('topics')
      .update({ title: topicTitle, description: topicDescription, paper: topicPaper })
      .eq('id', topicId);
    if (error) {
      setError(error.message);
    } else {
      fetchTopic();
    }
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

  async function handleVideoLink(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!supabase) {
      setError(supabaseConfigError ?? 'Supabase client is not available.');
      return;
    }
    if (!videoUrl) {
      setError('Please provide a video link.');
      return;
    }
    const { error } = await supabase
      .from('videos')
      .insert({ title: videoTitle || 'External video', topic_id: topicId, url: videoUrl });
    if (error) {
      setError(error.message);
    } else {
      setVideoTitle('');
      setVideoUrl('');
      fetchVideos();
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      setVideoFile(files[0]);
    }
  }

  async function handleDeleteVideo(videoId: string) {
    if (!supabase) {
      setError(supabaseConfigError ?? 'Supabase client is not available.');
      return;
    }
    const { error } = await supabase.from('videos').delete().eq('id', videoId);
    if (error) {
      setError(error.message);
    } else {
      fetchVideos();
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

  function handleVisualFileChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      setVisualFile(files[0]);
    }
  }

  function getCanvasContext() {
    const canvas = canvasRef.current;
    if (!canvas) {
      return null;
    }
    return canvas.getContext('2d');
  }

  function startDrawing(e: React.PointerEvent<HTMLCanvasElement>) {
    const ctx = getCanvasContext();
    if (!ctx) {
      return;
    }
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = drawSize;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  }

  function draw(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing) {
      return;
    }
    const ctx = getCanvasContext();
    if (!ctx) {
      return;
    }
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  }

  function stopDrawing() {
    if (!isDrawing) {
      return;
    }
    setIsDrawing(false);
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = getCanvasContext();
    if (!canvas || !ctx) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  async function saveCanvasDrawing() {
    const canvas = canvasRef.current;
    if (!canvas) {
      setError('Canvas not ready.');
      return;
    }
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) {
      setError('Unable to export drawing.');
      return;
    }
    await uploadVisual(blob, `${topicId}-drawing-${Date.now()}.png`);
  }

  async function uploadVisual(blob: Blob, filename: string) {
    if (!supabase) {
      setError(supabaseConfigError ?? 'Supabase client is not available.');
      return;
    }
    const filePath = `${topicId}/${filename}`;
    const { error: uploadError } = await supabase.storage
      .from('visuals')
      .upload(filePath, blob, { contentType: blob.type });
    if (uploadError) {
      setError(uploadError.message);
      return;
    }
    const { data: urlData } = supabase.storage.from('visuals').getPublicUrl(filePath);
    const { error: insertError } = await supabase.from('topic_visuals').insert({
      title: visualTitle || 'Visual asset',
      description: visualDescription,
      topic_id: topicId,
      image_url: urlData?.publicUrl,
    });
    if (insertError) {
      setError(insertError.message);
    } else {
      setVisualTitle('');
      setVisualDescription('');
      setVisualFile(null);
      fetchVisuals();
    }
  }

  async function handleUploadVisual(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!visualFile) {
      setError('Select an image to upload.');
      return;
    }
    await uploadVisual(visualFile, `${Date.now()}-${visualFile.name}`);
  }

  async function handleDeleteVisual(visualId: string) {
    if (!supabase) {
      setError(supabaseConfigError ?? 'Supabase client is not available.');
      return;
    }
    const { error } = await supabase.from('topic_visuals').delete().eq('id', visualId);
    if (error) {
      setError(error.message);
    } else {
      fetchVisuals();
    }
  }

  async function handleSaveContent(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!supabase) {
      setError(supabaseConfigError ?? 'Supabase client is not available.');
      return;
    }
    if (contentRowId) {
      const { error } = await supabase
        .from('topic_content')
        .update({ content: contentDraft })
        .eq('id', contentRowId);
      if (error) {
        setError(error.message);
      }
    } else {
      const { data, error } = await supabase
        .from('topic_content')
        .insert({ topic_id: topicId, content: contentDraft })
        .select()
        .single();
      if (error) {
        setError(error.message);
      } else if (data) {
        setContentRowId(data.id);
      }
    }
  }

  return (
    <main>
      <section className="hero">
        <span className="badge">Topic management</span>
        <h1>Manage topic assets</h1>
        <p>Update lesson content, manage videos, and build visuals that make each topic clearer.</p>
      </section>
      <section className="card">
        <div className="section-header">
          <h2>Topic Overview</h2>
          <span className="badge">Edit content</span>
        </div>
        <form onSubmit={handleUpdateTopic}>
          <label>
            Paper
            <select value={topicPaper} onChange={(e) => setTopicPaper(Number(e.target.value) as 1 | 2)}>
              <option value={1}>Paper 1</option>
              <option value={2}>Paper 2</option>
            </select>
          </label>
          <label>
            Title
            <input
              type="text"
              value={topicTitle}
              onChange={(e) => setTopicTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Description
            <textarea
              value={topicDescription}
              onChange={(e) => setTopicDescription(e.target.value)}
              rows={3}
              placeholder="Short overview for learners"
            />
          </label>
          <button className="btn-primary" type="submit">
            Save topic changes
          </button>
        </form>
      </section>
      <section className="card">
        <div className="section-header">
          <h2>Topic Content</h2>
          <span className="badge">Full access</span>
        </div>
        <p className="muted">
          Paste or edit structured JSON for introductions, notes, worked examples, and prompts. This keeps the topic
          content editable in one place.
        </p>
        <form onSubmit={handleSaveContent}>
          <label>
            Topic content JSON
            <textarea
              value={contentDraft}
              onChange={(e) => setContentDraft(e.target.value)}
              rows={10}
              placeholder='{"intro": "..."}'
            />
          </label>
          <button className="btn-primary" type="submit">
            Save content
          </button>
        </form>
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
        <form className="split-form" onSubmit={handleVideoLink}>
          <label>
            Video link title
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="Video title"
            />
          </label>
          <label>
            Video URL
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://"
              required
            />
          </label>
          <button className="btn-secondary" type="submit">
            Add link
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
                <div className="list-item-header">
                  <h3>{video.title}</h3>
                  <button className="btn-tertiary" type="button" onClick={() => handleDeleteVideo(video.id)}>
                    Remove
                  </button>
                </div>
                <p className="muted">{video.url}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="card">
        <div className="section-header">
          <h2>Visuals &amp; Drawings</h2>
          <span className="badge">Pictures &amp; sketches</span>
        </div>
        <div className="visuals-grid">
          <form onSubmit={handleUploadVisual}>
            <label>
              Visual title
              <input
                type="text"
                value={visualTitle}
                onChange={(e) => setVisualTitle(e.target.value)}
                placeholder="Graph or diagram"
              />
            </label>
            <label>
              Description
              <textarea
                value={visualDescription}
                onChange={(e) => setVisualDescription(e.target.value)}
                rows={2}
                placeholder="Short description"
              />
            </label>
            <label>
              Upload image
              <input type="file" accept="image/*" onChange={handleVisualFileChange} />
            </label>
            <button className="btn-primary" type="submit">
              Upload visual
            </button>
          </form>
          <div className="draw-panel">
            <h3>Draw a visual</h3>
            <div className="draw-controls">
              <label>
                Color
                <input type="color" value={drawColor} onChange={(e) => setDrawColor(e.target.value)} />
              </label>
              <label>
                Brush
                <input
                  type="range"
                  min={2}
                  max={12}
                  value={drawSize}
                  onChange={(e) => setDrawSize(Number(e.target.value))}
                />
              </label>
              <button className="btn-tertiary" type="button" onClick={clearCanvas}>
                Clear
              </button>
            </div>
            <canvas
              ref={canvasRef}
              width={460}
              height={220}
              className="draw-canvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
            <button className="btn-secondary" type="button" onClick={saveCanvasDrawing}>
              Save drawing
            </button>
          </div>
        </div>
        {visuals.length === 0 ? (
          <p className="muted">No visuals yet.</p>
        ) : (
          <ul className="list">
            {visuals.map((visual) => (
              <li className="list-item" key={visual.id}>
                <div className="list-item-header">
                  <h3>{visual.title}</h3>
                  <button className="btn-tertiary" type="button" onClick={() => handleDeleteVisual(visual.id)}>
                    Remove
                  </button>
                </div>
                {visual.description && <p className="muted">{visual.description}</p>}
                {visual.image_url && (
                  <img className="visual-preview" src={visual.image_url} alt={visual.title} />
                )}
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
