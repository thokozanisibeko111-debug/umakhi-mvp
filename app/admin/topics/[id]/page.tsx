'use client';

import { useEffect, useRef, useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'next/navigation';
import { supabase, supabaseConfigError } from '@/utils/supabaseClient';
import Link from 'next/link';

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

interface ResourceLink {
  id: string;
  title: string;
  url: string;
  description?: string;
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
  const [recordingTitle, setRecordingTitle] = useState('');
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedPreviewUrl, setRecordedPreviewUrl] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [visualTitle, setVisualTitle] = useState('');
  const [visualDescription, setVisualDescription] = useState('');
  const [visualFile, setVisualFile] = useState<File | null>(null);
  const [contentRowId, setContentRowId] = useState<string | null>(null);
  const [contentDraft, setContentDraft] = useState('');
  const [voiceScript, setVoiceScript] = useState('');
  const [voiceAudioUrl, setVoiceAudioUrl] = useState('');
  const [voiceAudioFile, setVoiceAudioFile] = useState<File | null>(null);
  const [isVoicePreviewing, setIsVoicePreviewing] = useState(false);
  const [resourceLinks, setResourceLinks] = useState<ResourceLink[]>([]);
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  const [resourceDescription, setResourceDescription] = useState('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState('#4f46e5');
  const [drawSize, setDrawSize] = useState(4);
  const [error, setError] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recordingChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    async function checkAccess() {
      if (supabaseConfigError) {
        setError(supabaseConfigError);
        setIsAuthorized(false);
        return;
      }
      if (!supabase) {
        setError('Supabase client is not available.');
        setIsAuthorized(false);
        return;
      }
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        setError('Please log in as an admin to access this workspace.');
        setIsAuthorized(false);
        return;
      }
      const role = data.user.user_metadata?.role;
      if (role !== 'admin') {
        setError('This workspace is only available to admin accounts.');
        setIsAuthorized(false);
        return;
      }
      setIsAuthorized(true);
    }

    checkAccess();
  }, [topicId]);

  useEffect(() => {
    if (isAuthorized && topicId) {
      fetchTopic();
      fetchVideos();
      fetchQuizzes();
      fetchVisuals();
      fetchTopicContent();
    }
  }, [isAuthorized, topicId]);

  useEffect(() => {
    return () => {
      if (recordedPreviewUrl) {
        URL.revokeObjectURL(recordedPreviewUrl);
      }
    };
  }, [recordedPreviewUrl]);

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
      const parsed = parseContentDraft(data.content ?? '');
      if (parsed?.voice?.script) {
        setVoiceScript(parsed.voice.script);
      }
      if (parsed?.voice?.audioUrl) {
        setVoiceAudioUrl(parsed.voice.audioUrl);
      }
      if (parsed?.resourceLinks) {
        setResourceLinks(normalizeResourceLinks(parsed.resourceLinks));
      }
    }
  }

  function parseContentDraft(draft: string) {
    if (!draft) {
      return null;
    }
    try {
      return JSON.parse(draft);
    } catch (parseError) {
      return null;
    }
  }

  function normalizeResourceLinks(links: unknown): ResourceLink[] {
    if (!Array.isArray(links)) {
      return [];
    }
    return links.map((link, index) => {
      if (!link || typeof link !== 'object') {
        return {
          id: `${Date.now()}-${index}`,
          title: 'Resource link',
          url: '',
          description: '',
        };
      }
      const typedLink = link as Partial<ResourceLink>;
      return {
        id: typedLink.id ?? `${Date.now()}-${index}`,
        title: typedLink.title ?? 'Resource link',
        url: typedLink.url ?? '',
        description: typedLink.description ?? '',
      };
    });
  }

  function buildTopicTemplate() {
    return JSON.stringify(
      {
        title: topicTitle || 'New topic title',
        description: topicDescription || 'Add a learner-friendly description.',
        paper: topicPaper,
        introduction: {
          outcomes: ['Outcome 1', 'Outcome 2', 'Outcome 3'],
          importance: 'Explain why this topic matters.',
          starterExample: {
            question: 'Starter question',
            steps: ['Step 1', 'Step 2'],
            answer: 'Final answer',
            why: 'Why this works.',
          },
        },
        notes: {
          intro: 'Short intro to the notes section.',
          sections: [
            { title: 'Concept 1', content: ['Key idea', 'Second idea'] },
            { title: 'Concept 2', content: ['Key idea', 'Second idea'] },
          ],
          formulas: ['Formula 1', 'Formula 2'],
          commonMistakes: ['Common mistake 1', 'Common mistake 2'],
          examTips: ['Exam tip 1', 'Exam tip 2'],
          summary: ['Summary point 1', 'Summary point 2'],
        },
        visuals: [
          { title: 'Visual title', description: 'Short description', svg: '<svg></svg>' },
        ],
        examples: {
          Easy: [
            { question: 'Easy question', steps: ['Step 1'], answer: 'Answer', why: 'Why it works' },
          ],
          Medium: [
            {
              question: 'Medium question',
              steps: ['Step 1', 'Step 2'],
              answer: 'Answer',
              why: 'Why it works',
            },
          ],
          Hard: [
            {
              question: 'Hard question',
              steps: ['Step 1', 'Step 2', 'Step 3'],
              answer: 'Answer',
              why: 'Why it works',
            },
          ],
        },
        quizzes: [
          {
            question: 'Quiz question',
            options: ['A', 'B', 'C', 'D'],
            correctIndex: 0,
            solution: 'Explain the solution.',
            feedback: 'Short feedback.',
            difficulty: 'Easy',
          },
        ],
        videos: [
          { title: 'Video title', url: 'https://', description: 'Video summary' },
        ],
        askPrompts: ['Ask prompt 1', 'Ask prompt 2'],
        progress: {
          strengths: ['Strength 1'],
          weakAreas: ['Weak area 1'],
          nextSteps: ['Next step 1'],
        },
        resourceLinks:
          resourceLinks.length > 0
            ? resourceLinks
            : [
                {
                  id: 'resource-1',
                  title: 'Past paper memo',
                  url: 'https://',
                  description: 'Link to a supporting memo or worksheet.',
                },
              ],
        voice: {
          script: voiceScript || 'Short voice explanation for learners.',
          audioUrl: voiceAudioUrl || '',
        },
      },
      null,
      2
    );
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
    const filePath = `${topicId}/${Date.now()}-${videoFile.name}`;
    await uploadVideoAsset(videoFile, filePath, videoTitle);
    setVideoTitle('');
    setVideoFile(null);
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

  function getFileExtensionFromMime(mimeType: string) {
    if (!mimeType) {
      return 'webm';
    }
    const [type, subtype] = mimeType.split('/');
    if (!type || !subtype) {
      return 'webm';
    }
    return subtype.split(';')[0] || 'webm';
  }

  async function uploadVideoAsset(file: Blob, filePath: string, title: string) {
    if (!supabase) {
      setError(supabaseConfigError ?? 'Supabase client is not available.');
      return;
    }
    const { error: uploadError } = await supabase.storage
      .from('videos')
      .upload(filePath, file, { contentType: file.type || 'video/webm' });
    if (uploadError) {
      setError(uploadError.message);
      return;
    }
    const { data: urlData } = supabase.storage.from('videos').getPublicUrl(filePath);
    const publicUrl = urlData?.publicUrl;
    const { error: insertError } = await supabase
      .from('videos')
      .insert({ title: title || 'Video upload', topic_id: topicId, url: publicUrl });
    if (insertError) {
      setError(insertError.message);
    } else {
      fetchVideos();
    }
  }

  async function startRecording() {
    setError(null);
    if (isRecording) {
      return;
    }
    if (
      typeof window === 'undefined' ||
      !navigator.mediaDevices?.getUserMedia ||
      typeof MediaRecorder === 'undefined'
    ) {
      setError('Recording is not supported in this browser.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      mediaStreamRef.current = stream;
      recordingChunksRef.current = [];
      if (recordedPreviewUrl) {
        URL.revokeObjectURL(recordedPreviewUrl);
      }
      setRecordedPreviewUrl('');
      setRecordedBlob(null);
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordingChunksRef.current.push(event.data);
        }
      };
      recorder.onstop = () => {
        const mimeType = recorder.mimeType || 'video/webm';
        const recordingBlob = new Blob(recordingChunksRef.current, { type: mimeType });
        setRecordedBlob(recordingBlob);
        setRecordedPreviewUrl(URL.createObjectURL(recordingBlob));
        setIsRecording(false);
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (recordError) {
      setError('Unable to access your camera or microphone.');
    }
  }

  function stopRecording() {
    const recorder = mediaRecorderRef.current;
    if (!recorder) {
      return;
    }
    if (recorder.state !== 'inactive') {
      recorder.stop();
    }
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
  }

  function resetRecording() {
    if (recordedPreviewUrl) {
      URL.revokeObjectURL(recordedPreviewUrl);
    }
    setRecordedPreviewUrl('');
    setRecordedBlob(null);
    setRecordingTitle('');
    recordingChunksRef.current = [];
  }

  async function handleRecordedUpload(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!recordedBlob) {
      setError('Record a video before uploading.');
      return;
    }
    const extension = getFileExtensionFromMime(recordedBlob.type);
    const filePath = `${topicId}/${Date.now()}-recording.${extension}`;
    await uploadVideoAsset(recordedBlob, filePath, recordingTitle || 'Recorded video');
    resetRecording();
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
    let updatedDraft = contentDraft;
    const parsed = parseContentDraft(contentDraft);
    if (parsed) {
      parsed.voice = {
        script: voiceScript || parsed.voice?.script || '',
        audioUrl: voiceAudioUrl || parsed.voice?.audioUrl || '',
      };
      parsed.resourceLinks = resourceLinks;
      updatedDraft = JSON.stringify(parsed, null, 2);
      setContentDraft(updatedDraft);
    }
    if (contentRowId) {
      const { error } = await supabase
        .from('topic_content')
        .update({ content: updatedDraft })
        .eq('id', contentRowId);
      if (error) {
        setError(error.message);
      }
    } else {
      const { data, error } = await supabase
        .from('topic_content')
        .insert({ topic_id: topicId, content: updatedDraft })
        .select()
        .single();
      if (error) {
        setError(error.message);
      } else if (data) {
        setContentRowId(data.id);
      }
    }
  }

  async function handleVoiceUpload(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!supabase) {
      setError(supabaseConfigError ?? 'Supabase client is not available.');
      return;
    }
    if (!voiceAudioFile) {
      setError('Select an audio file to upload.');
      return;
    }
    const filePath = `${topicId}/${Date.now()}-${voiceAudioFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from('voice')
      .upload(filePath, voiceAudioFile, { contentType: voiceAudioFile.type });
    if (uploadError) {
      setError(uploadError.message);
      return;
    }
    const { data: urlData } = supabase.storage.from('voice').getPublicUrl(filePath);
    setVoiceAudioUrl(urlData?.publicUrl ?? '');
  }

  function handleVoiceFileChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      setVoiceAudioFile(files[0]);
    }
  }

  function previewVoiceScript() {
    if (!voiceScript) {
      return;
    }
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    const utterance = new SpeechSynthesisUtterance(voiceScript);
    utterance.onend = () => setIsVoicePreviewing(false);
    window.speechSynthesis.cancel();
    setIsVoicePreviewing(true);
    window.speechSynthesis.speak(utterance);
  }

  function addResourceLink(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!resourceUrl) {
      setError('Add a URL for the resource link.');
      return;
    }
    const newLink: ResourceLink = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: resourceTitle || 'Resource link',
      url: resourceUrl,
      description: resourceDescription,
    };
    setResourceLinks((prev) => [...prev, newLink]);
    setResourceTitle('');
    setResourceUrl('');
    setResourceDescription('');
  }

  function removeResourceLink(linkId: string) {
    setResourceLinks((prev) => prev.filter((link) => link.id !== linkId));
  }

  function stopVoicePreview() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    window.speechSynthesis.cancel();
    setIsVoicePreviewing(false);
  }

  return (
    <main>
      <section className="hero">
        <span className="badge">Topic management</span>
        <h1>Manage topic assets</h1>
        <p>Update lesson content, manage videos, and build visuals that make each topic clearer.</p>
      </section>
      {isAuthorized === null ? (
        <section className="card">
          <div className="section-header">
            <h2>Checking access</h2>
            <span className="badge">Please wait</span>
          </div>
          <p className="muted">Confirming your admin access.</p>
        </section>
      ) : isAuthorized ? (
        <>
          <section className="card">
            <div className="section-header">
              <h2>Topic Overview</h2>
              <span className="badge">Edit content</span>
            </div>
            <form onSubmit={handleUpdateTopic}>
              <label>
                Paper
                <select
                  value={topicPaper}
                  onChange={(e) => setTopicPaper(Number(e.target.value) as 1 | 2)}
                >
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
              Paste or edit structured JSON for introductions, notes, worked examples, and prompts.
              This keeps the topic content editable in one place.
            </p>
            <button
              className="btn-secondary"
              type="button"
              onClick={() => setContentDraft(buildTopicTemplate())}
            >
              Load full topic template
            </button>
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
              <h2>Add Video</h2>
              <span className="badge">Files, links, recording</span>
            </div>
            <p className="muted">
              Add videos from files, paste a YouTube/Vimeo link, or record a short clip directly in
              the browser.
            </p>
            <form onSubmit={handleVideoUpload}>
              <label>
                Title for uploaded file
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
            <form className="split-form" onSubmit={handleRecordedUpload}>
              <label>
                Recording title
                <input
                  type="text"
                  value={recordingTitle}
                  onChange={(e) => setRecordingTitle(e.target.value)}
                  placeholder="Recorded walkthrough"
                />
              </label>
              <div className="recording-actions">
                <button
                  className="btn-secondary"
                  type="button"
                  onClick={startRecording}
                  disabled={isRecording}
                >
                  {isRecording ? 'Recording…' : 'Start recording'}
                </button>
                <button
                  className="btn-tertiary"
                  type="button"
                  onClick={stopRecording}
                  disabled={!isRecording}
                >
                  Stop
                </button>
                <button
                  className="btn-tertiary"
                  type="button"
                  onClick={resetRecording}
                  disabled={!recordedBlob || isRecording}
                >
                  Discard
                </button>
              </div>
              {recordedPreviewUrl && (
                <video className="video-preview" controls src={recordedPreviewUrl}>
                  <track kind="captions" />
                </video>
              )}
              <button className="btn-primary" type="submit" disabled={!recordedBlob || isRecording}>
                Upload recording
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
                      <button
                        className="btn-tertiary"
                        type="button"
                        onClick={() => handleDeleteVideo(video.id)}
                      >
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
              <h2>Resource links</h2>
              <span className="badge">External support</span>
            </div>
            <p className="muted">
              Add helpful links such as past papers, PDF worksheets, or interactive tools. These
              save into the topic content JSON when you click “Save content.”
            </p>
            <form className="split-form" onSubmit={addResourceLink}>
              <label>
                Link title
                <input
                  type="text"
                  value={resourceTitle}
                  onChange={(e) => setResourceTitle(e.target.value)}
                  placeholder="Past paper memo"
                />
              </label>
              <label>
                URL
                <input
                  type="url"
                  value={resourceUrl}
                  onChange={(e) => setResourceUrl(e.target.value)}
                  placeholder="https://"
                  required
                />
              </label>
              <label>
                Description
                <textarea
                  value={resourceDescription}
                  onChange={(e) => setResourceDescription(e.target.value)}
                  rows={2}
                  placeholder="Why this link helps learners"
                />
              </label>
              <button className="btn-secondary" type="submit">
                Add link
              </button>
            </form>
            {resourceLinks.length === 0 ? (
              <p className="muted">No resource links yet.</p>
            ) : (
              <ul className="list resource-link-list">
                {resourceLinks.map((link) => (
                  <li className="list-item" key={link.id}>
                    <div className="list-item-header">
                      <h3>{link.title}</h3>
                      <button
                        className="btn-tertiary"
                        type="button"
                        onClick={() => removeResourceLink(link.id)}
                      >
                        Remove
                      </button>
                    </div>
                    <p className="muted resource-link-url">{link.url}</p>
                    {link.description && <p className="muted">{link.description}</p>}
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="card">
            <div className="section-header">
              <h2>Voice narration</h2>
              <span className="badge">Audio support</span>
            </div>
            <form className="split-form" onSubmit={handleVoiceUpload}>
              <label>
                Voice script
                <textarea
                  value={voiceScript}
                  onChange={(e) => setVoiceScript(e.target.value)}
                  rows={4}
                  placeholder="Short narration script for learners"
                />
              </label>
              <label>
                Audio URL
                <input
                  type="url"
                  value={voiceAudioUrl}
                  onChange={(e) => setVoiceAudioUrl(e.target.value)}
                  placeholder="https://"
                />
              </label>
              <label>
                Upload narration audio
                <input type="file" accept="audio/*" onChange={handleVoiceFileChange} />
              </label>
              <div className="voice-controls">
                <button className="btn-primary" type="submit">
                  Upload audio
                </button>
                <button
                  className="btn-secondary"
                  type="button"
                  onClick={previewVoiceScript}
                  disabled={isVoicePreviewing || !voiceScript}
                >
                  {isVoicePreviewing ? 'Previewing…' : 'Preview script'}
                </button>
                <button
                  className="btn-tertiary"
                  type="button"
                  onClick={stopVoicePreview}
                  disabled={!isVoicePreviewing}
                >
                  Stop
                </button>
              </div>
            </form>
            {voiceAudioUrl && (
              <audio className="audio-player" controls src={voiceAudioUrl}>
                <track kind="captions" />
              </audio>
            )}
            <p className="muted" style={{ marginTop: '0.75rem' }}>
              Voice narration is saved in the topic content JSON when you click “Save content.”
            </p>
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
                    <input
                      type="color"
                      value={drawColor}
                      onChange={(e) => setDrawColor(e.target.value)}
                    />
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
                      <button
                        className="btn-tertiary"
                        type="button"
                        onClick={() => handleDeleteVisual(visual.id)}
                      >
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
        </>
      ) : (
        <section className="card">
          <div className="section-header">
            <h2>Admin access required</h2>
            <span className="badge">Restricted</span>
          </div>
          <p className="muted">
            Only admin accounts can edit topic content. Please sign in with an admin profile.
          </p>
          {error && <p className="error-banner">{error}</p>}
          <Link className="btn-primary" href="/login?role=admin">
            Go to admin login
          </Link>
        </section>
      )}
    </main>
  );
}
