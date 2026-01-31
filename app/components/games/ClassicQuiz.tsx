'use client';

import { useState, useCallback } from 'react';
import { QuizQuestion, Difficulty, LocalizedText } from '../../data/grade12';

type Language = 'en' | 'zu';

const masteryWeights: Record<Difficulty, number> = {
  Easy: 5,
  Medium: 10,
  Hard: 15,
};

const difficultyColors: Record<Difficulty, string> = {
  Easy: '#10b981',
  Medium: '#fb923c',
  Hard: '#ef4444',
};

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

interface ClassicQuizProps {
  questions: QuizQuestion[];
  topicTitle: string;
  language: Language;
  onBack: () => void;
}

export default function ClassicQuiz({ questions, topicTitle, language, onBack }: ClassicQuizProps) {
  const [shuffledQuestions] = useState(() => shuffleArray(questions));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [mastery, setMastery] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [animateResult, setAnimateResult] = useState<'correct' | 'incorrect' | null>(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean[]>([]);

  const currentQuestion = shuffledQuestions[current];
  const progress = ((current + (showExplanation ? 1 : 0)) / shuffledQuestions.length) * 100;

  const handleSubmit = useCallback(() => {
    if (selected === null) return;
    const correct = selected === currentQuestion.correctIndex;
    setIsCorrect(correct);
    setAnimateResult(correct ? 'correct' : 'incorrect');
    setAnsweredCorrectly(prev => [...prev, correct]);

    if (correct) {
      const streakBonus = streak >= 4 ? 3 : streak >= 2 ? 2 : 1;
      setScore(prev => prev + (masteryWeights[currentQuestion.difficulty] * streakBonus));
      setMastery(prev => Math.min(prev + masteryWeights[currentQuestion.difficulty], 100));
      setStreak(prev => {
        const newStreak = prev + 1;
        setBestStreak(best => Math.max(best, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }
    setShowExplanation(true);
    setTimeout(() => setAnimateResult(null), 600);
  }, [selected, currentQuestion, streak]);

  const nextQuestion = useCallback(() => {
    setShowExplanation(false);
    setSelected(null);
    setIsCorrect(false);
    if (current + 1 < shuffledQuestions.length) {
      setCurrent(prev => prev + 1);
    } else {
      setFinished(true);
    }
  }, [current, shuffledQuestions.length]);

  if (finished) {
    const percent = Math.round((score / (shuffledQuestions.length * 15)) * 100);
    const correctCount = answeredCorrectly.filter(Boolean).length;
    const accuracy = Math.round((correctCount / shuffledQuestions.length) * 100);

    let grade = 'Keep Practicing';
    let gradeClass = 'grade-bronze';
    if (accuracy >= 90) { grade = 'Outstanding'; gradeClass = 'grade-diamond'; }
    else if (accuracy >= 75) { grade = 'Excellent'; gradeClass = 'grade-gold'; }
    else if (accuracy >= 60) { grade = 'Good Work'; gradeClass = 'grade-silver'; }

    return (
      <div className="game-results">
        <div className={`game-results__badge ${gradeClass}`}>
          <div className="results-icon">
            {accuracy >= 75 ? (
              <svg viewBox="0 0 64 64" width="64" height="64"><circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="3"/><path d="M20 34l8 8 16-18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            ) : (
              <svg viewBox="0 0 64 64" width="64" height="64"><circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="3"/><path d="M22 42 Q32 34 42 42" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><circle cx="24" cy="26" r="3" fill="currentColor"/><circle cx="40" cy="26" r="3" fill="currentColor"/></svg>
            )}
          </div>
          <h2 className="results-grade">{grade}</h2>
        </div>

        <div className="results-stats">
          <div className="stat-card">
            <span className="stat-card__value">{correctCount}/{shuffledQuestions.length}</span>
            <span className="stat-card__label">{getText({ en: 'Correct', zu: 'Kulungile' }, language)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__value">{accuracy}%</span>
            <span className="stat-card__label">{getText({ en: 'Accuracy', zu: 'Ukunemba' }, language)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__value">{score}</span>
            <span className="stat-card__label">{getText({ en: 'Points', zu: 'Amaphuzu' }, language)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__value">{bestStreak}</span>
            <span className="stat-card__label">{getText({ en: 'Best Streak', zu: 'Uchungechunge' }, language)}</span>
          </div>
        </div>

        <div className="results-mastery">
          <p>{getText({ en: 'Mastery gained', zu: 'Ulwazi olutholile' }, language)}: <strong>+{mastery}%</strong></p>
          <div className="game-progress-bar">
            <div className="game-progress-bar__fill" style={{ width: `${mastery}%` }} />
          </div>
        </div>

        <div className="results-tips card">
          <h3>{getText({ en: 'Next Steps', zu: 'Izinyathelo Ezilandelayo' }, language)}</h3>
          <ul>
            {accuracy < 60 && <li>{getText({ en: 'Review the notes and worked examples before trying again.', zu: 'Buyekeza amanothi nezibonelo ngaphambi kokuzama futhi.' }, language)}</li>}
            {accuracy >= 60 && accuracy < 80 && <li>{getText({ en: 'Focus on the questions you missed and try Speed Round.', zu: 'Gxila emibuzweni oyiphuthile bese uzama i-Speed Round.' }, language)}</li>}
            {accuracy >= 80 && <li>{getText({ en: 'Great work! Try Challenge Mode for an extra test.', zu: 'Umsebenzi omuhle! Zama i-Challenge Mode ukuze uzivivinye.' }, language)}</li>}
            <li>{getText({ en: 'Try Match Up to test your formula knowledge.', zu: 'Zama i-Match Up ukuhlola ulwazi lwakho lwamafomula.' }, language)}</li>
          </ul>
        </div>

        <div className="results-actions">
          <button className="btn-primary game-btn" onClick={onBack}>
            {getText({ en: 'Back to Game Modes', zu: 'Buyela Emuva' }, language)}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`game-container ${animateResult ? `game-container--${animateResult}` : ''}`}>
      <div className="game-header">
        <button className="game-back-btn" onClick={onBack} type="button">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div className="game-header__info">
          <span className="game-badge" style={{ background: difficultyColors[currentQuestion.difficulty] }}>
            {currentQuestion.difficulty}
          </span>
          <span className="game-header__progress-text">
            {current + 1} / {shuffledQuestions.length}
          </span>
        </div>
        {streak >= 2 && (
          <div className="streak-badge">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z"/></svg>
            {streak}x {getText({ en: 'Streak', zu: 'Uchungechunge' }, language)}
          </div>
        )}
      </div>

      <div className="game-progress-bar">
        <div className="game-progress-bar__fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="game-question-card">
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
                {showExplanation && index === currentQuestion.correctIndex && (
                  <svg className="game-option__icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                )}
                {showExplanation && index === selected && !isCorrect && (
                  <svg className="game-option__icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
                )}
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
                  {streak >= 3
                    ? getText({ en: 'Incredible!', zu: 'Kuhle kakhulu!' }, language)
                    : getText({ en: 'Correct!', zu: 'Kulungile!' }, language)}
                  {streak >= 2 && ` ${streak}x`}
                </span>
              ) : (
                <span className="game-feedback__title game-feedback__title--incorrect">
                  {getText({ en: 'Not quite right', zu: 'Akukalungi kahle' }, language)}
                </span>
              )}
            </div>
            <div className="game-feedback__body">
              <p className="game-feedback__solution">{getText(currentQuestion.solution, language)}</p>
              <p className="game-feedback__tip">{getText(currentQuestion.feedback, language)}</p>
            </div>
            <button className="btn-primary game-btn" onClick={nextQuestion} type="button">
              {current + 1 < shuffledQuestions.length
                ? getText({ en: 'Next Question', zu: 'Umbuzo Olandelayo' }, language)
                : getText({ en: 'See Results', zu: 'Bona Imiphumela' }, language)}
            </button>
          </div>
        )}
      </div>

      <div className="game-score-bar">
        <span>{getText({ en: 'Score', zu: 'Amaphuzu' }, language)}: {score}</span>
        <span>{getText({ en: 'Mastery', zu: 'Ulwazi' }, language)}: +{mastery}%</span>
      </div>
    </div>
  );
}
