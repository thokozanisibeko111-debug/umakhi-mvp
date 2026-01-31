'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { QuizQuestion, Difficulty, LocalizedText } from '../../data/grade12';

type Language = 'en' | 'zu';

function getText(text: LocalizedText, language: Language) {
  return text[language];
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const INITIAL_TIME = 60;
const BONUS_TIME: Record<Difficulty, number> = { Easy: 3, Medium: 5, Hard: 8 };
const POINTS: Record<Difficulty, number> = { Easy: 10, Medium: 20, Hard: 35 };

interface SpeedRoundProps {
  questions: QuizQuestion[];
  topicTitle: string;
  language: Language;
  onBack: () => void;
}

export default function SpeedRound({ questions, topicTitle, language, onBack }: SpeedRoundProps) {
  const [shuffledQuestions] = useState(() => shuffleArray([...questions, ...questions]).slice(0, Math.max(questions.length, 15)));
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [flashResult, setFlashResult] = useState<'correct' | 'incorrect' | 'bonus' | null>(null);
  const [bonusText, setBonusText] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const currentQuestion = shuffledQuestions[current % shuffledQuestions.length];

  const endGame = useCallback(() => {
    setFinished(true);
    setStarted(false);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!started || finished) return;
    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [started, finished, endGame]);

  const handleAnswer = useCallback((index: number) => {
    if (!started || finished) return;
    const isCorrect = index === currentQuestion.correctIndex;

    if (isCorrect) {
      const bonus = BONUS_TIME[currentQuestion.difficulty];
      const points = POINTS[currentQuestion.difficulty];
      const streakMultiplier = streak >= 4 ? 3 : streak >= 2 ? 2 : 1;

      setScore(prev => prev + (points * streakMultiplier));
      setCorrect(prev => prev + 1);
      setTimeLeft(prev => Math.min(prev + bonus, 90));
      setStreak(prev => {
        const newStreak = prev + 1;
        setBestStreak(best => Math.max(best, newStreak));
        return newStreak;
      });

      setFlashResult('correct');
      if (bonus > 0) {
        setBonusText(`+${bonus}s`);
        setTimeout(() => setBonusText(null), 800);
      }
    } else {
      setIncorrect(prev => prev + 1);
      setStreak(0);
      setFlashResult('incorrect');
    }

    setTimeout(() => setFlashResult(null), 400);
    setCurrent(prev => prev + 1);
  }, [started, finished, currentQuestion, streak]);

  if (!started && !finished) {
    return (
      <div className="game-container">
        <div className="game-header">
          <button className="game-back-btn" onClick={onBack} type="button">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
        </div>
        <div className="speed-intro">
          <div className="speed-intro__icon">
            <svg viewBox="0 0 64 64" width="72" height="72" fill="none" stroke="var(--accent-orange)" strokeWidth="3">
              <circle cx="32" cy="32" r="28"/>
              <path d="M32 18v16l10 6"/>
            </svg>
          </div>
          <h2>{getText({ en: 'Speed Round', zu: 'Umjaho Wesivinini' }, language)}</h2>
          <p className="speed-intro__desc">
            {getText({
              en: `You have ${INITIAL_TIME} seconds to answer as many questions as you can. Correct answers add bonus time. Build streaks for score multipliers!`,
              zu: `Unomzuzwana ongu-${INITIAL_TIME} ukuphendula imibuzo eminingi. Izimpendulo ezilungile zengeza isikhathi. Yakha uchungechunge ukuthola amaphuzu engeziwe!`
            }, language)}
          </p>
          <div className="speed-intro__rules">
            <div className="speed-rule">
              <span className="speed-rule__icon" style={{ color: '#10b981' }}>+3s</span>
              <span>{getText({ en: 'Easy question bonus', zu: 'Ibhonasi yombuzo olula' }, language)}</span>
            </div>
            <div className="speed-rule">
              <span className="speed-rule__icon" style={{ color: '#fb923c' }}>+5s</span>
              <span>{getText({ en: 'Medium question bonus', zu: 'Ibhonasi yombuzo ophakathi' }, language)}</span>
            </div>
            <div className="speed-rule">
              <span className="speed-rule__icon" style={{ color: '#ef4444' }}>+8s</span>
              <span>{getText({ en: 'Hard question bonus', zu: 'Ibhonasi yombuzo onzima' }, language)}</span>
            </div>
          </div>
          <button className="btn-primary game-btn game-btn--large" onClick={() => setStarted(true)} type="button">
            {getText({ en: 'Start Speed Round', zu: 'Qala Umjaho' }, language)}
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const total = correct + incorrect;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    return (
      <div className="game-results">
        <div className="game-results__badge grade-speed">
          <div className="results-icon">
            <svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="3">
              <circle cx="32" cy="32" r="28"/>
              <path d="M32 18v16l10 6"/>
            </svg>
          </div>
          <h2 className="results-grade">
            {getText({ en: 'Time\'s Up!', zu: 'Isikhathi Siphelile!' }, language)}
          </h2>
        </div>

        <div className="results-stats">
          <div className="stat-card">
            <span className="stat-card__value">{correct}</span>
            <span className="stat-card__label">{getText({ en: 'Correct', zu: 'Kulungile' }, language)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__value">{total}</span>
            <span className="stat-card__label">{getText({ en: 'Answered', zu: 'Kuphendulwe' }, language)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__value">{accuracy}%</span>
            <span className="stat-card__label">{getText({ en: 'Accuracy', zu: 'Ukunemba' }, language)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__value">{score}</span>
            <span className="stat-card__label">{getText({ en: 'Points', zu: 'Amaphuzu' }, language)}</span>
          </div>
        </div>

        <div className="results-actions">
          <button className="btn-primary game-btn" onClick={onBack} type="button">
            {getText({ en: 'Back to Game Modes', zu: 'Buyela Emuva' }, language)}
          </button>
        </div>
      </div>
    );
  }

  const timerPercent = (timeLeft / 90) * 100;
  const timerUrgent = timeLeft <= 10;

  return (
    <div className={`game-container ${flashResult ? `game-container--${flashResult}` : ''}`}>
      <div className="speed-header">
        <button className="game-back-btn" onClick={endGame} type="button">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <div className={`speed-timer ${timerUrgent ? 'speed-timer--urgent' : ''}`}>
          <svg viewBox="0 0 100 100" width="64" height="64">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#e2e8f0" strokeWidth="6"/>
            <circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke={timerUrgent ? '#ef4444' : '#8b5cf6'}
              strokeWidth="6"
              strokeDasharray={`${(timerPercent / 100) * 276.5} 276.5`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              style={{ transition: 'stroke-dasharray 0.3s ease' }}
            />
          </svg>
          <span className={`speed-timer__text ${timerUrgent ? 'speed-timer__text--urgent' : ''}`}>
            {timeLeft}
          </span>
          {bonusText && <span className="speed-timer__bonus">{bonusText}</span>}
        </div>

        <div className="speed-score">
          <span className="speed-score__points">{score}</span>
          <span className="speed-score__label">{getText({ en: 'pts', zu: 'pts' }, language)}</span>
        </div>
      </div>

      {streak >= 2 && (
        <div className="streak-banner">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z"/></svg>
          {streak}x {getText({ en: 'Streak!', zu: 'Uchungechunge!' }, language)}
          {streak >= 2 && <span className="streak-multiplier">({streak >= 4 ? '3' : '2'}x {getText({ en: 'points', zu: 'amaphuzu' }, language)})</span>}
        </div>
      )}

      <div className="game-question-card speed-question-card">
        <div className="game-badge" style={{ background: { Easy: '#10b981', Medium: '#fb923c', Hard: '#ef4444' }[currentQuestion.difficulty] }}>
          {currentQuestion.difficulty}
        </div>
        <h2 className="game-question">{getText(currentQuestion.question, language)}</h2>

        <div className="game-options speed-options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={`${current}-${option.en}`}
              className="game-option speed-option"
              onClick={() => handleAnswer(index)}
              type="button"
            >
              <span className="game-option__letter">{String.fromCharCode(65 + index)}</span>
              <span className="game-option__text">{getText(option, language)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="game-score-bar">
        <span>{getText({ en: 'Correct', zu: 'Kulungile' }, language)}: {correct}</span>
        <span>{getText({ en: 'Wrong', zu: 'Iphutha' }, language)}: {incorrect}</span>
      </div>
    </div>
  );
}
