'use client';

import { useState, useCallback, useMemo } from 'react';
import { LocalizedText, TopicContent } from '../../data/grade12';

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

interface MatchPair {
  id: string;
  left: LocalizedText;
  right: LocalizedText;
}

interface MatchUpProps {
  topic: TopicContent;
  language: Language;
  onBack: () => void;
}

function buildPairs(topic: TopicContent): MatchPair[] {
  const pairs: MatchPair[] = [];

  // Use formulas as matching pairs: formula text <-> formula description from notes sections
  topic.notes.formulas.forEach((formula, i) => {
    if (i < topic.notes.summary.length) {
      pairs.push({
        id: `formula-${i}`,
        left: formula,
        right: topic.notes.summary[i],
      });
    }
  });

  // Use quiz questions and correct answers as pairs
  topic.quizzes.forEach((quiz, i) => {
    const correctOption = quiz.options[quiz.correctIndex];
    pairs.push({
      id: `quiz-${i}`,
      left: quiz.question,
      right: correctOption,
    });
  });

  // Take only 6 pairs for a good game length
  return shuffleArray(pairs).slice(0, 6);
}

type CardSide = 'left' | 'right';
type CardState = 'default' | 'selected' | 'matched' | 'wrong';

interface CardItem {
  pairId: string;
  side: CardSide;
  text: LocalizedText;
  state: CardState;
}

export default function MatchUp({ topic, language, onBack }: MatchUpProps) {
  const pairs = useMemo(() => buildPairs(topic), [topic]);

  const [leftCards] = useState<CardItem[]>(() =>
    shuffleArray(pairs.map(p => ({ pairId: p.id, side: 'left' as CardSide, text: p.left, state: 'default' as CardState })))
  );
  const [rightCards] = useState<CardItem[]>(() =>
    shuffleArray(pairs.map(p => ({ pairId: p.id, side: 'right' as CardSide, text: p.right, state: 'default' as CardState })))
  );

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ left: string; right: string } | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const checkMatch = useCallback((leftId: string, rightId: string) => {
    setAttempts(prev => prev + 1);

    if (leftId === rightId) {
      // Correct match
      const streakBonus = streak >= 3 ? 30 : streak >= 1 ? 20 : 10;
      setScore(prev => prev + streakBonus);
      setStreak(prev => prev + 1);
      setMatchedPairs(prev => {
        const next = new Set(prev);
        next.add(leftId);
        return next;
      });
      setSelectedLeft(null);
      setSelectedRight(null);

      if (matchedPairs.size + 1 === pairs.length) {
        setTimeout(() => setFinished(true), 500);
      }
    } else {
      // Wrong match
      setStreak(0);
      setWrongPair({ left: leftId, right: rightId });
      setTimeout(() => {
        setWrongPair(null);
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 800);
    }
  }, [streak, matchedPairs.size, pairs.length]);

  const handleLeftClick = useCallback((pairId: string) => {
    if (matchedPairs.has(pairId) || wrongPair) return;
    setSelectedLeft(pairId);
    if (selectedRight) {
      checkMatch(pairId, selectedRight);
    }
  }, [matchedPairs, wrongPair, selectedRight, checkMatch]);

  const handleRightClick = useCallback((pairId: string) => {
    if (matchedPairs.has(pairId) || wrongPair) return;
    setSelectedRight(pairId);
    if (selectedLeft) {
      checkMatch(selectedLeft, pairId);
    }
  }, [matchedPairs, wrongPair, selectedLeft, checkMatch]);

  if (!started) {
    return (
      <div className="game-container">
        <div className="game-header">
          <button className="game-back-btn" onClick={onBack} type="button">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
        </div>
        <div className="speed-intro">
          <div className="speed-intro__icon">
            <svg viewBox="0 0 64 64" width="72" height="72" fill="none" stroke="var(--accent-pink)" strokeWidth="3">
              <rect x="6" y="14" width="22" height="36" rx="4"/>
              <rect x="36" y="14" width="22" height="36" rx="4"/>
              <path d="M28 28h8M28 36h8" strokeLinecap="round"/>
            </svg>
          </div>
          <h2>{getText({ en: 'Match Up', zu: 'Hlanganisa' }, language)}</h2>
          <p className="speed-intro__desc">
            {getText({
              en: 'Match questions with their correct answers. Select one item from each column to make a pair. Build streaks for bonus points!',
              zu: 'Hlanganisa imibuzo nezimpendulo zawo ezilungile. Khetha into eyodwa kulolu hlangothi ngalunye ukwenza ipheya. Yakha uchungechunge ukuthola amaphuzu engeziwe!'
            }, language)}
          </p>
          <div className="speed-intro__rules">
            <div className="speed-rule">
              <span className="speed-rule__icon" style={{ color: '#10b981' }}>10</span>
              <span>{getText({ en: 'Points per match', zu: 'Amaphuzu ngomatch' }, language)}</span>
            </div>
            <div className="speed-rule">
              <span className="speed-rule__icon" style={{ color: '#fb923c' }}>20</span>
              <span>{getText({ en: 'Points with streak', zu: 'Amaphuzu nochungechunge' }, language)}</span>
            </div>
            <div className="speed-rule">
              <span className="speed-rule__icon" style={{ color: '#8b5cf6' }}>30</span>
              <span>{getText({ en: '3+ streak bonus', zu: 'Ibhonasi yochungechunge 3+' }, language)}</span>
            </div>
          </div>
          <button className="btn-primary game-btn game-btn--large" onClick={() => setStarted(true)} type="button">
            {getText({ en: 'Start Matching', zu: 'Qala Ukuhlanganisa' }, language)}
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const accuracy = attempts > 0 ? Math.round((pairs.length / attempts) * 100) : 0;

    return (
      <div className="game-results">
        <div className="game-results__badge grade-gold">
          <div className="results-icon">
            <svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="3">
              <rect x="6" y="14" width="22" height="36" rx="4"/>
              <rect x="36" y="14" width="22" height="36" rx="4"/>
              <path d="M20 32l-4 4 8 8 16-18" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="results-grade">
            {getText({ en: 'All Matched!', zu: 'Konke Kuhlanganisiwe!' }, language)}
          </h2>
        </div>

        <div className="results-stats">
          <div className="stat-card">
            <span className="stat-card__value">{pairs.length}</span>
            <span className="stat-card__label">{getText({ en: 'Pairs', zu: 'Amapheya' }, language)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__value">{attempts}</span>
            <span className="stat-card__label">{getText({ en: 'Attempts', zu: 'Imizamo' }, language)}</span>
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

  function getCardState(card: CardItem): CardState {
    if (matchedPairs.has(card.pairId)) return 'matched';
    if (wrongPair && ((card.side === 'left' && card.pairId === wrongPair.left) || (card.side === 'right' && card.pairId === wrongPair.right))) return 'wrong';
    if ((card.side === 'left' && selectedLeft === card.pairId) || (card.side === 'right' && selectedRight === card.pairId)) return 'selected';
    return 'default';
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <button className="game-back-btn" onClick={onBack} type="button">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div className="game-header__info">
          <span className="game-header__progress-text">
            {matchedPairs.size} / {pairs.length} {getText({ en: 'matched', zu: 'kuhlanganisiwe' }, language)}
          </span>
        </div>
        <div className="speed-score">
          <span className="speed-score__points">{score}</span>
          <span className="speed-score__label">{getText({ en: 'pts', zu: 'pts' }, language)}</span>
        </div>
      </div>

      <div className="game-progress-bar">
        <div className="game-progress-bar__fill game-progress-bar__fill--match" style={{ width: `${(matchedPairs.size / pairs.length) * 100}%` }} />
      </div>

      {streak >= 2 && (
        <div className="streak-banner streak-banner--match">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z"/></svg>
          {streak}x {getText({ en: 'Streak!', zu: 'Uchungechunge!' }, language)}
        </div>
      )}

      <div className="match-board">
        <div className="match-column">
          <h3 className="match-column__title">
            {getText({ en: 'Questions', zu: 'Imibuzo' }, language)}
          </h3>
          {leftCards.map(card => {
            const state = getCardState(card);
            return (
              <button
                key={card.pairId}
                className={`match-card match-card--${state}`}
                onClick={() => handleLeftClick(card.pairId)}
                disabled={state === 'matched'}
                type="button"
              >
                <span className="match-card__text">{getText(card.text, language)}</span>
                {state === 'matched' && (
                  <svg className="match-card__check" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                )}
              </button>
            );
          })}
        </div>

        <div className="match-divider">
          <svg viewBox="0 0 24 80" width="24" height="80">
            <path d="M12 0v80" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4"/>
          </svg>
        </div>

        <div className="match-column">
          <h3 className="match-column__title">
            {getText({ en: 'Answers', zu: 'Izimpendulo' }, language)}
          </h3>
          {rightCards.map(card => {
            const state = getCardState(card);
            return (
              <button
                key={card.pairId}
                className={`match-card match-card--right match-card--${state}`}
                onClick={() => handleRightClick(card.pairId)}
                disabled={state === 'matched'}
                type="button"
              >
                <span className="match-card__text">{getText(card.text, language)}</span>
                {state === 'matched' && (
                  <svg className="match-card__check" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="game-score-bar">
        <span>{getText({ en: 'Attempts', zu: 'Imizamo' }, language)}: {attempts}</span>
        <span>{getText({ en: 'Score', zu: 'Amaphuzu' }, language)}: {score}</span>
      </div>
    </div>
  );
}
