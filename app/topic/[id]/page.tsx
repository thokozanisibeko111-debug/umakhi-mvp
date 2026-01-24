'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { topics, uiLabels, LocalizedText, Difficulty, QuizQuestion } from '../../data/grade12';

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

export default function TopicPage() {
  const params = useParams<{ id: string }>();
  const topic = useMemo(() => topics.find((item) => item.id === params.id), [params.id]);
  const [language, setLanguage] = useState<Language>('en');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

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

  async function askQuestion(e: React.FormEvent) {
    e.preventDefault();
    setLoadingAnswer(true);
    setAnswer(null);
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: question, language: language === 'zu' ? 'isiZulu' : 'English' }),
    });
    const data = await res.json();
    setAnswer(data.answer);
    setLoadingAnswer(false);
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
              <div className="video-frame">
                <iframe
                  title={getText(video.title, language)}
                  src={`https://www.youtube.com/embed/${video.url.split('v=')[1]}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

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
          <div>
            <h3>{getText({ en: 'Try asking', zu: 'Zama ukubuza' }, language)}</h3>
            <ul>
              {topic.askPrompts.map((prompt) => (
                <li key={prompt.en}>{getText(prompt, language)}</li>
              ))}
            </ul>
          </div>
          <form onSubmit={askQuestion}>
            <label>
              {getText({ en: 'Your question', zu: 'Umbuzo wakho' }, language)}
              <textarea
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                rows={4}
                placeholder={getText(
                  { en: 'Ask about this topic…', zu: 'Buza ngalesi sihloko…' },
                  language
                )}
                required
              />
            </label>
            <button className="btn-primary" type="submit" disabled={loadingAnswer}>
              {loadingAnswer
                ? getText({ en: 'Sending…', zu: 'Iyathumela…' }, language)
                : getText({ en: 'Ask', zu: 'Buza' }, language)}
            </button>
          </form>
        </div>
        {answer && (
          <div className="info-banner" style={{ marginTop: '1rem' }}>
            <strong>{getText({ en: 'Answer:', zu: 'Impendulo:' }, language)}</strong> {answer}
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
