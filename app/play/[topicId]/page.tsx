'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { topics, QuizQuestion, Difficulty } from '../../data/grade12';
import confetti from 'canvas-confetti'; // Optional: if you install canvas-confetti, else remove

export default function GamePage() {
  const { topicId } = useParams();
  const router = useRouter();

  // --- GAME STATE ---
  const [status, setStatus] = useState<'loading' | 'playing' | 'feedback' | 'finished'>('loading');
  const [topic, setTopic] = useState<any>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // Timer State
  const TIME_PER_QUESTION = 30; // Seconds
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);

  // Player Action
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  // 1. INITIALIZE GAME
  useEffect(() => {
    const foundTopic = topics.find((t) => t.id === topicId);
    if (!foundTopic) {
      alert('Topic not found!');
      router.push('/play');
      return;
    }
    setTopic(foundTopic);

    // Sort questions: Easy -> Medium -> Hard
    const difficultyOrder: Record<Difficulty, number> = { Easy: 1, Medium: 2, Hard: 3 };
    const sortedQuestions = [...foundTopic.quizzes].sort(
      (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
    );

    setQuestions(sortedQuestions);
    setStatus('playing');
  }, [topicId, router]);

  // 2. TIMER LOGIC
  useEffect(() => {
    if (status !== 'playing') return;

    if (timeLeft <= 0) {
      handleTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [status, timeLeft]);

  const handleTimeUp = () => {
    setSelectedOption(-1); // -1 indicates timeout
    setIsCorrect(false);
    setStreak(0);
    setStatus('feedback');
  };

  const handleAnswer = (optionIdx: number) => {
    if (status !== 'playing') return;

    setSelectedOption(optionIdx);
    const correct = optionIdx === questions[currentIdx].correctIndex;
    setIsCorrect(correct);

    if (correct) {
      // Calculate Score: Base 100 + Time Bonus + Streak Bonus
      const timeBonus = timeLeft * 10;
      const streakBonus = streak * 50;
      setScore((prev) => prev + 100 + timeBonus + streakBonus);
      setStreak((prev) => prev + 1);

      // Trigger confetti if streak is high (optional)
      if (streak > 2) confetti({ particleCount: 50, spread: 60 });
    } else {
      setStreak(0);
    }

    setStatus('feedback');
  };

  const handleNext = () => {
    if (currentIdx + 1 >= questions.length) {
      setStatus('finished');
      if (score > 1000) confetti(); // Big celebration
    } else {
      setCurrentIdx((prev) => prev + 1);
      setTimeLeft(TIME_PER_QUESTION);
      setSelectedOption(null);
      setStatus('playing');
    }
  };

  if (status === 'loading') return <div className="game-container">Loading Mission...</div>;

  // --- RENDER GAME OVER ---
  if (status === 'finished') {
    const percentage = Math.round((score / (questions.length * 400)) * 100); // Rough max score calc
    return (
      <main className="game-container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <div className="card" style={{ padding: '3rem' }}>
          <span className="badge">Mission Complete</span>
          <h1 style={{ fontSize: '3rem', margin: '1rem 0' }}>
            {score} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>PTS</span>
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            {percentage > 80 ? '🌟 Legendary Performance!' : percentage > 50 ? '👍 Good Job!' : '📚 Keep Practicing!'}
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Play Again
            </button>
            <Link href="/play" className="btn-secondary">
              Exit to Lobby
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const currentQ = questions[currentIdx];

  return (
    <main className="game-container">
      {/* HUD */}
      <div className="game-hud">
        <div className="hud-item">
          <div className="hud-label">Score</div>
          <div className="hud-value">{score}</div>
        </div>
        <div className="hud-item">
          <div className="hud-label">Streak</div>
          <div className="hud-value">🔥 {streak}</div>
        </div>
        <div className="hud-item">
          <div className="hud-label">Level</div>
          <div className="hud-value">{currentIdx + 1}/{questions.length}</div>
        </div>
      </div>

      {/* TIMER BAR */}
      <div className="timer-bar-container">
        <div 
          className="timer-bar" 
          style={{ 
            width: `${(timeLeft / TIME_PER_QUESTION) * 100}%`,
            background: timeLeft < 10 ? '#ef4444' : undefined 
          }} 
        />
      </div>

      {/* QUESTION CARD */}
      <div className="game-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span className={`diff-badge diff-${currentQ.difficulty}`}>
            {currentQ.difficulty}
          </span>
          <span style={{ fontWeight: 'bold', color: '#64748b' }}>
            ⏱ {timeLeft}s
          </span>
        </div>

        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>
          {currentQ.question.en}
        </h2>

        <div className="option-grid">
          {currentQ.options.map((opt, idx) => (
            <button
              key={idx}
              className="game-btn"
              onClick={() => handleAnswer(idx)}
              disabled={status !== 'playing'}
            >
              {opt.en}
            </button>
          ))}
        </div>
      </div>

      {/* FEEDBACK OVERLAY */}
      {status === 'feedback' && (
        <div className="feedback-overlay">
          <div className="feedback-icon">
            {isCorrect ? '🎉' : '💥'}
          </div>
          <h2 style={{ color: isCorrect ? '#10b981' : '#ef4444', fontSize: '2rem', margin: '0 0 1rem 0' }}>
            {isCorrect ? 'Correct!' : 'Missed it!'}
          </h2>
          
          <div className="card" style={{ maxWidth: '500px', width: '100%', marginBottom: '2rem', textAlign: 'left' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Solution:</p>
            <p style={{ marginBottom: '1rem' }}>{currentQ.solution.en}</p>
            <p className="muted" style={{ fontSize: '0.9rem' }}>
              💡 {currentQ.feedback.en}
            </p>
          </div>

          <button onClick={handleNext} className="btn-primary" style={{ minWidth: '200px' }}>
            {currentIdx + 1 >= questions.length ? 'Finish Game' : 'Next Level →'}
          </button>
        </div>
      )}
    </main>
  );
}
