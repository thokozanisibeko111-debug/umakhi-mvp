'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { topics, Difficulty, LocalizedText } from '../../../data/grade12';

type Language = 'en' | 'zu';

const masteryWeights: Record<Difficulty, number> = {
  Easy: 5,
  Medium: 10,
  Hard: 15,
};

function getText(text: LocalizedText, language: Language) {
  return text[language];
}

export default function QuizPage() {
  const params = useParams<{ id: string }>();
  const topic = useMemo(() => topics.find((item) => item.id === params.id), [params.id]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [mastery, setMastery] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  if (!topic) {
    return (
      <main>
        <p>Quiz not found.</p>
      </main>
    );
  }

  const questions = topic.quizzes;
  const currentQuestion = questions[current];

  function handleSubmit() {
    if (selected === null) {
      return;
    }
    const isCorrect = selected === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setMastery((prev) => Math.min(prev + masteryWeights[currentQuestion.difficulty], 100));
    }
    setShowExplanation(true);
  }

  function nextQuestion() {
    setShowExplanation(false);
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  }

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);

    return (
      <main>
        <section className="hero">
          <span className="badge">Quiz completed</span>
          <h1>{topic.title.en}</h1>
          <p>Your score: {score} / {questions.length} ({percent}%)</p>
          <p>Mastery gained: {mastery}%</p>
        </section>
        <section className="card">
          <h2>Next steps</h2>
          <ul>
            <li>Review questions you missed in the quiz.</li>
            <li>Revisit the Notes and Worked Examples sections.</li>
            <li>Try again to push mastery above 80%.</li>
          </ul>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="hero">
        <span className="badge">Quiz</span>
        <h1>{topic.title.en}</h1>
        <p>
          Question {current + 1} of {questions.length} • Difficulty {currentQuestion.difficulty}
        </p>
        <div className="progress-bar">
          <div style={{ width: `${(current / questions.length) * 100}%` }} />
        </div>
      </section>
      <section className="card">
        <div className="language-toggle">
          <label htmlFor="quiz-language">Language</label>
          <select
            id="quiz-language"
            value={language}
            onChange={(event) => setLanguage(event.target.value as Language)}
          >
            <option value="en">English</option>
            <option value="zu">isiZulu</option>
          </select>
        </div>
        <h2>{getText(currentQuestion.question, language)}</h2>
        <div className="quiz-options">
          {currentQuestion.options.map((option, index) => (
            <label key={option.en} className={`option-card ${selected === index ? 'selected' : ''}`}>
              <input
                type="radio"
                name="answer"
                value={index}
                checked={selected === index}
                onChange={() => setSelected(index)}
              />
              <span>{getText(option, language)}</span>
            </label>
          ))}
        </div>
        {!showExplanation && (
          <button className="btn-primary" onClick={handleSubmit} disabled={selected === null}>
            Submit
          </button>
        )}
        {showExplanation && (
          <div className="quiz-feedback">
            {selected === currentQuestion.correctIndex ? (
              <p className="success">Correct!</p>
            ) : (
              <p className="error">Incorrect.</p>
            )}
            <p>{getText(currentQuestion.solution, language)}</p>
            <p className="muted">{getText(currentQuestion.feedback, language)}</p>
            <button className="btn-secondary" onClick={nextQuestion}>
              Next question
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
