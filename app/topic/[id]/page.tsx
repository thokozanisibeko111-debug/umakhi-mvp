'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase, supabaseConfigError } from '@/utils/supabaseClient';
import {
  topics,
  uiLabels,
  LocalizedText,
  Difficulty,
  QuizQuestion,
  TopicContent,
} from '../../data/grade12';

type Language = 'en' | 'zu';

const difficultyOrder: Record<Difficulty, number> = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

function getText(text: LocalizedText, language: Language) {
  return text[language];
}

function groupByDifficulty(items: QuizQuestion[]) {
  return items.reduce<Record<Difficulty, QuizQuestion[]>>(
    (acc, item) => {
      acc[item.difficulty].push(item);
      return acc;
    },
    { Easy: [], Medium: [], Hard: [] }
  );
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

function toLocalizedText(value: unknown, fallback = ''): LocalizedText {
  if (typeof value === 'string') {
    return { en: value, zu: value };
  }
  if (value && typeof value === 'object' && 'en' in value) {
    const record = value as LocalizedText;
    return { en: record.en ?? fallback, zu: record.zu ?? record.en ?? fallback };
  }
  return { en: fallback, zu: fallback };
}

function toLocalizedList(values: unknown[] | undefined) {
  if (!Array.isArray(values)) {
    return [];
  }
  return values.map((value) => toLocalizedText(value));
}

function normalizeExamples(examples: Record<string, unknown> | undefined) {
  const empty = { Easy: [], Medium: [], Hard: [] } as Record<Difficulty, TopicContent['examples'][Difficulty]>;
  if (!examples || typeof examples !== 'object') {
    return empty;
  }
  (['Easy', 'Medium', 'Hard'] as Difficulty[]).forEach((level) => {
    const list = (examples as Record<string, unknown>)[level];
    if (Array.isArray(list)) {
      empty[level] = list.map((example) => {
        const exampleItem = example as Record<string, unknown>;
        return {
          question: toLocalizedText(exampleItem.question),
          steps: toLocalizedList(exampleItem.steps as unknown[]),
          answer: toLocalizedText(exampleItem.answer),
          why: toLocalizedText(exampleItem.why),
        };
      });
    }
  });
  return empty;
}

function normalizeQuizzes(quizzes: unknown[] | undefined) {
  if (!Array.isArray(quizzes)) {
    return [];
  }
  return quizzes.map((quiz) => {
    const quizItem = quiz as Record<string, unknown>;
    return {
      question: toLocalizedText(quizItem.question),
      options: toLocalizedList(quizItem.options as unknown[]),
      correctIndex: typeof quizItem.correctIndex === 'number' ? quizItem.correctIndex : 0,
      solution: toLocalizedText(quizItem.solution),
      feedback: toLocalizedText(quizItem.feedback),
      difficulty: (quizItem.difficulty as Difficulty) ?? 'Easy',
    } as QuizQuestion;
  });
}

function normalizeSections(sections: unknown[] | undefined) {
  if (!Array.isArray(sections)) {
    return [];
  }
  return sections.map((section) => {
    const sectionItem = section as Record<string, unknown>;
    return {
      title: toLocalizedText(sectionItem.title),
      content: toLocalizedList(sectionItem.content as unknown[]),
    };
  });
}

function normalizeVisuals(visuals: unknown[] | undefined) {
  if (!Array.isArray(visuals)) {
    return [];
  }
  return visuals.map((visual) => {
    const visualItem = visual as Record<string, unknown>;
    return {
      title: toLocalizedText(visualItem.title),
      description: toLocalizedText(visualItem.description),
      svg: (visualItem.svg as string) ?? '',
    };
  });
}

function normalizeVideos(videos: unknown[] | undefined) {
  if (!Array.isArray(videos)) {
    return [];
  }
  return videos.map((video) => {
    const videoItem = video as Record<string, unknown>;
    return {
      title: toLocalizedText(videoItem.title, 'Video'),
      url: (videoItem.url as string) ?? '',
      description: toLocalizedText(videoItem.description, 'Video resource'),
    };
  });
}

function buildTopicFromContent(
  topicRow: { id: string; title: string; description?: string; paper?: number },
  content: Record<string, unknown> | null,
  storedVideos: Array<{ title?: string; url?: string; description?: string }>
): TopicContent {
  const title = toLocalizedText(content?.title ?? topicRow.title);
  const description = toLocalizedText(content?.description ?? topicRow.description ?? '');
  const paper = (content?.paper as 1 | 2) ?? ((topicRow.paper ?? 1) as 1 | 2);
  const introductionContent = (content?.introduction as Record<string, unknown>) ?? {};
  const starterExample = (introductionContent.starterExample as Record<string, unknown>) ?? {};
  const notesContent = (content?.notes as Record<string, unknown>) ?? {};
  const progressContent = (content?.progress as Record<string, unknown>) ?? {};
  const introduction = {
    outcomes: toLocalizedList(introductionContent.outcomes as unknown[]),
    importance: toLocalizedText(introductionContent.importance),
    starterExample: {
      question: toLocalizedText(starterExample.question),
      steps: toLocalizedList(starterExample.steps as unknown[]),
      answer: toLocalizedText(starterExample.answer),
      why: toLocalizedText(starterExample.why),
    },
  };
  const notes = {
    intro: toLocalizedText(notesContent.intro),
    sections: normalizeSections(notesContent.sections as unknown[]),
    formulas: toLocalizedList(notesContent.formulas as unknown[]),
    commonMistakes: toLocalizedList(notesContent.commonMistakes as unknown[]),
    examTips: toLocalizedList(notesContent.examTips as unknown[]),
    summary: toLocalizedList(notesContent.summary as unknown[]),
  };
  const contentVideos = normalizeVideos(content?.videos as unknown[]);
  const databaseVideos = (storedVideos ?? []).map((video) => ({
    title: toLocalizedText(video.title ?? 'Video'),
    url: video.url ?? '',
    description: toLocalizedText(video.description ?? 'Video resource'),
  }));
  return {
    id: topicRow.id,
    title,
    paper,
    description,
    mastery: (content?.mastery as number) ?? 0,
    subtopics: toLocalizedList((content?.subtopics as unknown[]) ?? []),
    introduction,
    notes,
    visuals: normalizeVisuals(content?.visuals as unknown[]),
    examples: normalizeExamples(content?.examples as Record<string, unknown>),
    quizzes: normalizeQuizzes(content?.quizzes as unknown[]),
    videos: [...contentVideos, ...databaseVideos],
    askPrompts: toLocalizedList((content?.askPrompts as unknown[]) ?? []),
    progress: {
      strengths: toLocalizedList(progressContent.strengths as unknown[]),
      weakAreas: toLocalizedList(progressContent.weakAreas as unknown[]),
      nextSteps: toLocalizedList(progressContent.nextSteps as unknown[]),
    },
    voice: content?.voice
      ? {
          script: toLocalizedText((content.voice as Record<string, unknown>)?.script),
          audioUrl: (content.voice as Record<string, unknown>)?.audioUrl as string,
        }
      : undefined,
  };
}

function getVideoEmbedUrl(url: string) {
  if (!url) {
    return null;
  }
  if (url.includes('youtube.com') && url.includes('v=')) {
    return `https://www.youtube.com/embed/${url.split('v=')[1]}`;
  }
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return null;
}

export default function TopicPage() {
  const params = useParams<{ id: string }>();
  const localTopic = useMemo(() => topics.find((item) => item.id === params.id), [params.id]);
  const [topicData, setTopicData] = useState<TopicContent | null>(null);
  const [resourceLinks, setResourceLinks] = useState<
    Array<{ id?: string; title: string; url: string; description?: string }>
  >([]);
  const [uploadedVisuals, setUploadedVisuals] = useState<
    Array<{ id: string; title: string; description?: string; imageUrl: string }>
  >([]);
  const [language, setLanguage] = useState<Language>('en');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    async function fetchTopicData() {
      if (!supabase) {
        if (localTopic) {
          setTopicData(localTopic);
        } else if (supabaseConfigError) {
          setError(supabaseConfigError);
        }
        return;
      }
      const { data: topicRow, error: topicError } = await supabase
        .from('topics')
        .select('id, title, description, paper')
        .eq('id', params.id)
        .maybeSingle();
      if (topicError) {
        setError(topicError.message);
      }
      if (!topicRow) {
        if (localTopic) {
          setTopicData(localTopic);
        }
        return;
      }
      const [contentRes, videosRes, visualsRes] = await Promise.all([
        supabase.from('topic_content').select('content').eq('topic_id', topicRow.id).maybeSingle(),
        supabase.from('videos').select('title, url, description').eq('topic_id', topicRow.id),
        supabase
          .from('topic_visuals')
          .select('id, title, description, image_url')
          .eq('topic_id', topicRow.id),
      ]);
      const parsedContent = parseContentDraft(contentRes.data?.content ?? '');
      const normalizedTopic = buildTopicFromContent(topicRow, parsedContent, videosRes.data ?? []);
      setTopicData(normalizedTopic);
      setResourceLinks(parsedContent?.resourceLinks ?? []);
      setUploadedVisuals(
        (visualsRes.data ?? [])
          .filter((visual) => Boolean(visual.image_url))
          .map((visual) => ({
            id: visual.id as string,
            title: (visual.title as string) ?? 'Visual upload',
            description: (visual.description as string) ?? undefined,
            imageUrl: visual.image_url as string,
          }))
      );
    }

    fetchTopicData();
  }, [localTopic, params.id]);

  const topic = topicData;

  if (!topic) {
    return (
      <main>
        <section className="hero">
          <h1>Topic not found</h1>
          <p className="muted">Return to the paper list to choose another topic.</p>
        </section>
      </main>
    );
  }
  function buildTopicContext(activeTopic: TopicContent) {
    const outcomes = activeTopic.introduction.outcomes.map((outcome) => getText(outcome, language));
    const formulas = activeTopic.notes.formulas.map((formula) => getText(formula, language));
    const commonMistakes = activeTopic.notes.commonMistakes.map((mistake) =>
      getText(mistake, language)
    );
    const summary = activeTopic.notes.summary.map((item) => getText(item, language));
    const sections = activeTopic.notes.sections
      .map(
        (section) =>
          `${getText(section.title, language)}: ${section.content
            .map((item) => getText(item, language))
            .join('; ')}`
      )
      .join(' | ');

    return [
      `Topic: ${getText(activeTopic.title, language)}`,
      `Overview: ${getText(activeTopic.description, language)}`,
      `Learning outcomes: ${outcomes.join('; ')}`,
      `Key formulas: ${formulas.join('; ')}`,
      `Common mistakes: ${commonMistakes.join('; ')}`,
      `Notes summary: ${summary.join('; ')}`,
      `Notes sections: ${sections}`,
    ].join('\n');
  }

  async function askQuestion(e: React.FormEvent) {
    e.preventDefault();
    if (!topic) {
      return;
    }
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
      return;
    }
    setLoadingAnswer(true);
    setAnswer(null);
    setError(null);
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: trimmedQuestion,
          language: language === 'zu' ? 'isiZulu' : 'English',
          topicContext: buildTopicContext(topic),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Unable to fetch a response right now.');
        return;
      }
      setAnswer(data.answer);
    } catch (err) {
      setError('Unable to reach uMakhi right now. Please try again.');
    } finally {
      setLoadingAnswer(false);
    }
  }

  function playVoiceExplanation() {
    if (!topic?.voice?.script) {
      return;
    }
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    const utterance = new SpeechSynthesisUtterance(getText(topic.voice.script, language));
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.cancel();
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  function stopVoiceExplanation() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }

  const quizzesByDifficulty = groupByDifficulty(topic.quizzes);
  const examplesByDifficulty = Object.entries(topic.examples).sort(
    ([a], [b]) => difficultyOrder[a as Difficulty] - difficultyOrder[b as Difficulty]
  );

  return (
    <main>
      <section className="hero">
        <div className="hero-top">
          <span className="badge">Paper {topic.paper}</span>
          <div className="language-toggle">
            <label htmlFor="language-select">{uiLabels.chooseLanguage.en}</label>
            <select
              id="language-select"
              value={language}
              onChange={(event) => setLanguage(event.target.value as Language)}
            >
              <option value="en">{uiLabels.english.en}</option>
              <option value="zu">{uiLabels.zulu.en}</option>
            </select>
          </div>
        </div>
        <h1>{getText(topic.title, language)}</h1>
        <p>{getText(topic.description, language)}</p>
        <div className="progress-bar">
          <div style={{ width: `${topic.mastery}%` }} />
        </div>
        <p className="topic-subtitle">
          {uiLabels.masteryScore.en}: {topic.mastery}%
        </p>
      </section>

      <section className="card">
        <div className="section-header">
          <h2>{uiLabels.introduction.en}</h2>
          <span className="badge">Starter focus</span>
        </div>
        <div className="intro-grid">
          <div>
            <h3>{getText({ en: 'What you will learn', zu: 'Ozokufunda' }, language)}</h3>
            <ul>
              {topic.introduction.outcomes.map((outcome) => (
                <li key={outcome.en}>{getText(outcome, language)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{getText({ en: 'Why it matters', zu: 'Kungani kubalulekile' }, language)}</h3>
            <p className="muted">{getText(topic.introduction.importance, language)}</p>
          </div>
        </div>
        <div className="example-card">
          <h3>{getText({ en: 'Starter example', zu: 'Isibonelo sokuqala' }, language)}</h3>
          <p>{getText(topic.introduction.starterExample.question, language)}</p>
          <ol>
            {topic.introduction.starterExample.steps.map((step) => (
              <li key={step.en}>{getText(step, language)}</li>
            ))}
          </ol>
          <p className="highlight">{getText(topic.introduction.starterExample.answer, language)}</p>
          <p className="muted">{getText(topic.introduction.starterExample.why, language)}</p>
        </div>
      </section>

      <section className="card">
        <div className="section-header">
          <h2>{uiLabels.notes.en}</h2>
          <span className="badge">Visual study notes</span>
        </div>
        <p className="muted">{getText(topic.notes.intro, language)}</p>
        {topic.notes.sections.map((section) => (
          <div key={section.title.en} className="notes-section">
            <h3>{getText(section.title, language)}</h3>
            <ul>
              {section.content.map((item) => (
                <li key={item.en}>{getText(item, language)}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="notes-grid">
          <div>
            <h3>{getText({ en: 'Key formulas', zu: 'Amafomula abalulekile' }, language)}</h3>
            <ul>
              {topic.notes.formulas.map((formula) => (
                <li key={formula.en}>{getText(formula, language)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{getText({ en: 'Common mistakes', zu: 'Amaphutha ajwayelekile' }, language)}</h3>
            <ul>
              {topic.notes.commonMistakes.map((mistake) => (
                <li key={mistake.en}>{getText(mistake, language)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{getText({ en: 'Exam tips', zu: 'Amacebiso e-exam' }, language)}</h3>
            <ul>
              {topic.notes.examTips.map((tip) => (
                <li key={tip.en}>{getText(tip, language)}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="notes-summary">
          <h3>{getText({ en: 'Summary', zu: 'Isifinyezo' }, language)}</h3>
          <ul>
            {topic.notes.summary.map((summary) => (
              <li key={summary.en}>{getText(summary, language)}</li>
            ))}
          </ul>
        </div>
        <h3>{getText({ en: 'Visuals', zu: 'Izithombe' }, language)}</h3>
        <div className="visual-grid">
          {topic.visuals.map((visual) => (
            <div className="visual-card" key={visual.title.en}>
              <h4>{getText(visual.title, language)}</h4>
              <p className="muted">{getText(visual.description, language)}</p>
              <div className="visual-frame" dangerouslySetInnerHTML={{ __html: visual.svg }} />
            </div>
          ))}
        </div>
        {uploadedVisuals.length > 0 && (
          <>
            <h3 style={{ marginTop: '1.5rem' }}>
              {getText({ en: 'Uploaded visuals', zu: 'Izithombe ezilayishiwe' }, language)}
            </h3>
            <div className="visual-grid">
              {uploadedVisuals.map((visual) => (
                <div className="visual-card" key={visual.id}>
                  <h4>{visual.title}</h4>
                  {visual.description && <p className="muted">{visual.description}</p>}
                  <img className="visual-preview" src={visual.imageUrl} alt={visual.title} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <section className="card">
        <div className="section-header">
          <h2>{uiLabels.workedExamples.en}</h2>
          <span className="badge">Easy → Medium → Hard</span>
        </div>
        {examplesByDifficulty.map(([difficulty, examples]) => (
          <div key={difficulty} className="difficulty-group">
            <h3>{difficulty}</h3>
            <div className="example-grid">
              {examples.map((example) => (
                <div className="example-card" key={example.question.en}>
                  <p className="example-question">{getText(example.question, language)}</p>
                  <ol>
                    {example.steps.map((step) => (
                      <li key={step.en}>{getText(step, language)}</li>
                    ))}
                  </ol>
                  <p className="highlight">{getText(example.answer, language)}</p>
                  <p className="muted">{getText(example.why, language)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="card">
        <div className="section-header">
          <h2>{uiLabels.quizzes.en}</h2>
          <span className="badge">Practice & feedback</span>
        </div>
        <p className="muted">
          Ready to test yourself? <Link href={`/topic/${topic.id}/quiz`}>Take the quiz</Link>.
        </p>
        <div className="quiz-preview">
          {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((difficulty) => (
            <div key={difficulty} className="quiz-card">
              <h3>{difficulty}</h3>
              <ul>
                {quizzesByDifficulty[difficulty].map((quiz) => (
                  <li key={quiz.question.en}>{getText(quiz.question, language)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="section-header">
          <h2>{uiLabels.videos.en}</h2>
          <span className="badge">Topic videos</span>
        </div>
        <ul className="list">
          {topic.videos.map((video) => (
            <li className="list-item" key={video.url}>
              <h3>{getText(video.title, language)}</h3>
              <p className="muted">{getText(video.description, language)}</p>
              {getVideoEmbedUrl(video.url) ? (
                <div className="video-frame">
                  <iframe
                    title={getText(video.title, language)}
                    src={getVideoEmbedUrl(video.url) ?? ''}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <video className="video-preview" controls src={video.url}>
                  <track kind="captions" />
                </video>
              )}
            </li>
          ))}
        </ul>
      </section>
      {resourceLinks.length > 0 && (
        <section className="card">
          <div className="section-header">
            <h2>{getText({ en: 'Resources', zu: 'Izinsiza' }, language)}</h2>
            <span className="badge">Extra support</span>
          </div>
          <ul className="list">
            {resourceLinks.map((link, index) => (
              <li className="list-item" key={link.id ?? `${link.url}-${index}`}>
                <h3>{link.title}</h3>
                <p className="muted resource-link-url">{link.url}</p>
                {link.description && <p className="muted">{link.description}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {topic.voice && (
        <section className="card">
          <div className="section-header">
            <h2>Voice explainer</h2>
            <span className="badge">Audio guidance</span>
          </div>
          <p className="muted">{getText(topic.voice.script, language)}</p>
          {topic.voice.audioUrl ? (
            <audio className="audio-player" controls src={topic.voice.audioUrl}>
              <track kind="captions" />
            </audio>
          ) : (
            <div className="voice-controls">
              <button
                className="btn-secondary"
                type="button"
                onClick={playVoiceExplanation}
                disabled={isSpeaking}
              >
                {isSpeaking ? 'Playing…' : 'Play voice explanation'}
              </button>
              <button
                className="btn-tertiary"
                type="button"
                onClick={stopVoiceExplanation}
                disabled={!isSpeaking}
              >
                Stop
              </button>
            </div>
          )}
        </section>
      )}

      <section className="card">
        <div className="section-header">
          <h2>{uiLabels.ask.en}</h2>
          <span className="badge">Interactive help</span>
        </div>
        <div className="ask-grid">
          <div className="ask-panel">
            <h3>{getText({ en: 'Try asking', zu: 'Zama ukubuza' }, language)}</h3>
            <p className="muted">
              {getText(
                { en: 'Tap a prompt to fill the question box instantly.', zu: 'Chofoza isiphakamiso ukuze kugcwale umbuzo.' },
                language
              )}
            </p>
            <div className="ask-prompts">
              {topic.askPrompts.map((prompt) => (
                <button
                  className="ask-chip"
                  type="button"
                  key={prompt.en}
                  onClick={() => setQuestion(getText(prompt, language))}
                >
                  {getText(prompt, language)}
                </button>
              ))}
            </div>
            <div className="ask-helper">
              <h4>{getText({ en: 'What you will get', zu: 'Okuzotholwa' }, language)}</h4>
              <ul>
                <li>{getText({ en: 'Step-by-step guidance', zu: 'Isiqondiso esinyathelweni ngesinyathelo' }, language)}</li>
                <li>{getText({ en: 'Relevant formulas & tips', zu: 'Amafomula namacebiso afanele' }, language)}</li>
                <li>{getText({ en: 'Common mistakes to avoid', zu: 'Amaphutha okufanele uwagweme' }, language)}</li>
              </ul>
            </div>
          </div>
          <form className="ask-form" onSubmit={askQuestion}>
            <label>
              {getText({ en: 'Your question', zu: 'Umbuzo wakho' }, language)}
              <textarea
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                rows={5}
                placeholder={getText(
                  { en: 'Ask about this topic…', zu: 'Buza ngalesi sihloko…' },
                  language
                )}
                required
              />
            </label>
            <button className="btn-primary btn-primary--wide" type="submit" disabled={loadingAnswer}>
              {loadingAnswer
                ? getText({ en: 'Sending…', zu: 'Iyathumela…' }, language)
                : getText({ en: 'Ask uMakhi', zu: 'Buza uMakhi' }, language)}
            </button>
            <p className="ask-note">
              {getText(
                { en: 'Be specific for better help. Example: “Show the steps for compound interest over 3 years.”', zu: 'Chaza kahle ukuze uthole usizo olungcono.' },
                language
              )}
            </p>
          </form>
        </div>
        {error && (
          <div className="info-banner info-banner--warning" style={{ marginTop: '1rem' }}>
            <strong>{getText({ en: 'Notice:', zu: 'Isaziso:' }, language)}</strong> {error}
          </div>
        )}
        {answer && (
          <div className="ask-answer" style={{ marginTop: '1rem' }}>
            <div className="ask-answer__header">
              <strong>{getText({ en: 'Answer', zu: 'Impendulo' }, language)}</strong>
              <span className="badge">uMakhi</span>
            </div>
            <p>{answer}</p>
          </div>
        )}
      </section>

      <section className="card">
        <div className="section-header">
          <h2>{uiLabels.progress.en}</h2>
          <span className="badge">Mastery feedback</span>
        </div>
        <div className="progress-grid">
          <div>
            <h3>{getText({ en: 'Strengths', zu: 'Amandla' }, language)}</h3>
            <ul>
              {topic.progress.strengths.map((item) => (
                <li key={item.en}>{getText(item, language)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{getText({ en: 'Weak areas', zu: 'Izindawo ezibuthakathaka' }, language)}</h3>
            <ul>
              {topic.progress.weakAreas.map((item) => (
                <li key={item.en}>{getText(item, language)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{getText({ en: 'What to revise next', zu: 'Okulandelayo okufanele ukubuyekeze' }, language)}</h3>
            <ul>
              {topic.progress.nextSteps.map((item) => (
                <li key={item.en}>{getText(item, language)}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
