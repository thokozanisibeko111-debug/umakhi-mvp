'use client';

import { useState, useCallback } from 'react';
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

const POINTS: Record<Difficulty, number> = { Easy: 10, Medium: 25, Hard: 50 };
const MAX_LIVES = 3;

interface ChallengeModeProps {
  questions: QuizQuestion[];
  topicTitle: string;
  language: Language;
  onBack: () => void;
}

export default function ChallengeMode({ questions, topicTitle, language, onBack }: ChallengeModeProps) {
  const [orderedQuestions] = useState(() => {
    const easy = shuffleArray(questions.filter(q => q.difficulty === 'Easy'));
    const medium = shuffleArray(questions.filter(q => q.difficulty === 'Medium'));
    const hard = shuffleArray(questions.filter(q => q.difficulty === 'Hard'));
    return [...easy, ...medium, ...hard];
  });

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [finished, setFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [animateResult, setAnimateResult] = useState<'correct' | 'incorrect' | null>(null);
  const [animateLoss, setAnimateLoss] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion = orderedQuestions[current];
  const progress = ((current + (showExplanation ? 1 : 0)) / orderedQuestions.length) * 100;

  const handleSubmit = useCallback(() => {
    if (selected === null) return;
    const correct = selected === currentQuestion.correctIndex;
    setIsCorrect(correct);
    setAnimateResult(correct ? 'correct' : 'incorrect');

    if (correct) {
      const streakMultiplier = streak >= 5 ? 4 : streak >= 3 ? 3 : streak >= 1 ? 2 : 1;
      setScore(prev => prev + (POINTS[currentQuestion.difficulty] * streakMultiplier));
      setStreak(prev => {
        const newStreak = prev + 1;
        setBestStreak(best => Math.max(best, newStreak));
        return newStreak;
      });
      setCorrectCount(prev => prev + 1);
      if ((correctCount + 1) % 3 === 0) {
        setLevel(prev => prev + 1);
      }
    } else {
      setStreak(0);
      setLives(prev => prev - 1);
      setAnimateLoss(true);
      setTimeout(() => setAnimateLoss(false), 600);
    }

    setShowExplanation(true);
    setTimeout(() => setAnimateResult(null), 600);
  }, [selected, currentQuestion, streak, correctCount]);

  const nextQuestion = useCallback(() => {
    setShowExplanation(false);
    setSelected(null);
    setIsCorrect(false);

    if (lives <= 0 && !isCorrect) {
      setFinished(true);
      return;
    }

    if (current + 1 < orderedQuestions.length) {
      setCurrent(prev => prev + 1);
    } else {
      setFinished(true);
    }
  }, [current, orderedQuestions.length, lives, isCorrect]);

  // Check if game over after lives update
  if (lives <= 0 && !showExplanation && !finished) {
    setFinished(true);
  }

  if (finished) {
    const total = orderedQuestions.length;
    const reached = current + 1;
    const accuracy = reached > 0 ? Math.round((correctCount / reached) * 100) : 0;
    const survived = lives > 0;

    return (
      <div className="game-results">
        <div className={`game-results__badge ${survived ? 'grade-gold' : 'grade-challenge-over'}`}>
          <div className="results-icon">
            {survived ? (
              <svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M32 4l8 16 18 3-13 13 3 18-16-8-16 8 3-18L6 23l18-3z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="3">
                <circle cx="32" cy="32" r="28"/>
                <path d="M22 22l20 20M42 22L22 42"/>
              </svg>
            )}
          </div>
          <h2 className="results-grade">
            {survived
              ? getText({ en: 'Challenge Conquered!', zu: 'Inselelo Inqotshiwe!' }, language)
              : getText({ en: 'Game Over', zu: 'Umdlalo Uphelile' }, language)}
          </h2>
        </div>

        <div className="results-stats">
          <div className="stat-card">
            <span className="stat-card__value">{score}</span>
            <span className="stat-card__label">{getText({ en: 'Points', zu: 'Amaphuzu' }, language)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__value">{correctCount}/{reached}</span>
            <span className="stat-card__label">{getText({ en: 'Correct', zu: 'Kulungile' }, language)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__value">{getText({ en: `Level ${level}`, zu: `Izinga ${level}` }, language)}</span>
            <span className="stat-card__label">{getText({ en: 'Reached', zu: 'Kufinyelelwe' }, language)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__value">{bestStreak}</span>
            <span className="stat-card__label">{getText({ en: 'Best Streak', zu: 'Uchungechunge' }, language)}</span>
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

  const livesArray = Array.from({ length: MAX_LIVES }, (_, i) => i < lives);

  return (
    <div className={`game-container ${animateResult ? `game-container--${animateResult}` : ''}`}>
      <div className="game-header challenge-header">
        <button className="game-back-btn" onClick={onBack} type="button">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <div className={`challenge-lives ${animateLoss ? 'challenge-lives--shake' : ''}`}>
          {livesArray.map((alive, i) => (
            <svg key={i} viewBox="0 0 24 24" width="24" height="24" className={`heart-icon ${alive ? 'heart-icon--alive' : 'heart-icon--dead'}`}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill={alive ? '#ef4444' : '#cbd5e1'} stroke={alive ? '#dc2626' : '#94a3b8'} strokeWidth="1"/>
            </svg>
          ))}
        </div>

        <div className="challenge-level">
          <span className="challenge-level__label">{getText({ en: 'Level', zu: 'Izinga' }, language)}</span>
          <span className="challenge-level__value">{level}</span>
        </div>
      </div>

      <div className="game-progress-bar">
        <div className="game-progress-bar__fill game-progress-bar__fill--challenge" style={{ width: `${progress}%` }} />
      </div>

      {streak >= 2 && (
        <div className="streak-banner streak-banner--challenge">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z"/></svg>
          {streak}x {getText({ en: 'Streak', zu: 'Uchungechunge' }, language)}
          <span className="streak-multiplier">
            ({streak >= 5 ? '4' : streak >= 3 ? '3' : '2'}x {getText({ en: 'points', zu: 'amaphuzu' }, language)})
          </span>
        </div>
      )}

      <div className="game-question-card">
        <div className="game-badge" style={{ background: { Easy: '#10b981', Medium: '#fb923c', Hard: '#ef4444' }[currentQuestion.difficulty] }}>
          {currentQuestion.difficulty}
        </div>
        <h2 className="game-question">{getText(currentQuestion.question, language)}</h2>

        <div className="game-options">
          {currentQuestion.options.map((option, index) => {
            let optionClass = 'game-option';
            if (showExplanation) {
              if (index === currentQuestion.correctIndex) optionClass += ' game-option--correct';
              else if (index === selected && !isCorrect) optionClass += ' game-option--incorrect';
              else optionClass += ' game-option--disabled';
            } else if (selected === index) {
              optionClass += ' game-option--selected';
            }

            return (
              <button
                key={option.en}
                className={optionClass}
                onClick={() => !showExplanation && setSelected(index)}
                disabled={showExplanation}
                type="button"
              >
                <span className="game-option__letter">{String.fromCharCode(65 + index)}</span>
                <span className="game-option__text">{getText(option, language)}</span>
              </button>
            );
          })}
        </div>

        {!showExplanation && (
          <button className="btn-primary game-btn game-btn--submit" onClick={handleSubmit} disabled={selected === null} type="button">
            {getText({ en: 'Check Answer', zu: 'Hlola Impendulo' }, language)}
          </button>
        )}

        {showExplanation && (
          <div className={`game-feedback ${isCorrect ? 'game-feedback--correct' : 'game-feedback--incorrect'}`}>
            <div className="game-feedback__header">
              {isCorrect ? (
                <span className="game-feedback__title game-feedback__title--correct">
                  {getText({ en: 'Correct!', zu: 'Kulungile!' }, language)}
                </span>
              ) : (
                <span className="game-feedback__title game-feedback__title--incorrect">
                  {lives > 0
                    ? getText({ en: `Wrong! ${lives} ${lives === 1 ? 'life' : 'lives'} left`, zu: `Iphutha! ${lives} ${lives === 1 ? 'impilo' : 'izimpilo'} ezisele` }, language)
                    : getText({ en: 'Last life lost!', zu: 'Impilo yokugcina ilahlekile!' }, language)}
                </span>
              )}
            </div>
            <div className="game-feedback__body">
              <p className="game-feedback__solution">{getText(currentQuestion.solution, language)}</p>
            </div>
            <button className="btn-primary game-btn" onClick={nextQuestion} type="button">
              {lives <= 0 && !isCorrect
                ? getText({ en: 'See Results', zu: 'Bona Imiphumela' }, language)
                : current + 1 < orderedQuestions.length
                  ? getText({ en: 'Next Question', zu: 'Umbuzo Olandelayo' }, language)
                  : getText({ en: 'See Results', zu: 'Bona Imiphumela' }, language)}
            </button>
          </div>
        )}
      </div>

      <div className="game-score-bar">
        <span>{getText({ en: 'Score', zu: 'Amaphuzu' }, language)}: {score}</span>
        <span>{getText({ en: 'Question', zu: 'Umbuzo' }, language)}: {current + 1}/{orderedQuestions.length}</span>
      </div>
    </div>
  );
}
