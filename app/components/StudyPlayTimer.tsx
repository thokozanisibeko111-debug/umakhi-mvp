'use client';

import { useEffect, useMemo, useState } from 'react';

const PRESET_MINUTES = [15, 25, 45];

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default function StudyPlayTimer() {
  const [minutes, setMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setSecondsLeft(minutes * 60);
  }, [minutes]);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [running]);

  useEffect(() => {
    if (secondsLeft === 0) {
      setRunning(false);
    }
  }, [secondsLeft]);

  const progress = useMemo(() => {
    if (minutes === 0) return 0;
    return Math.round(((minutes * 60 - secondsLeft) / (minutes * 60)) * 100);
  }, [minutes, secondsLeft]);

  return (
    <div className="play-card">
      <div className="play-info">
        <span className="badge badge--play">Play mode</span>
        <h2>Study with a focus timer</h2>
        <p>
          Tap Play to start a colorful focus sprint. Track your study time, collect streaks, and
          build healthy learning habits.
        </p>
        <div className="play-presets">
          {PRESET_MINUTES.map((preset) => (
            <button
              key={preset}
              type="button"
              className={preset === minutes ? 'chip chip--active' : 'chip'}
              onClick={() => setMinutes(preset)}
            >
              {preset} min
            </button>
          ))}
        </div>
        <div className="play-actions">
          <button
            type="button"
            className="btn-primary btn-primary--play"
            onClick={() => setRunning((prev) => !prev)}
            disabled={secondsLeft === 0}
          >
            {running ? 'Pause' : 'Play'}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setRunning(false);
              setSecondsLeft(minutes * 60);
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="play-timer">
        <div className="timer-ring">
          <svg viewBox="0 0 120 120">
            <defs>
              <linearGradient id="timer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
            <circle className="timer-ring__track" cx="60" cy="60" r="52" />
            <circle
              className="timer-ring__progress"
              cx="60"
              cy="60"
              r="52"
              strokeDasharray={`${(progress / 100) * 327} 327`}
            />
          </svg>
          <div className="timer-value">
            <span>{formatTime(secondsLeft)}</span>
            <small>{progress}% complete</small>
          </div>
        </div>
        <div className="timer-stats">
          <div>
            <p className="stat-label">Focus goal</p>
            <p className="stat-value">{minutes} minutes</p>
          </div>
          <div>
            <p className="stat-label">Session vibe</p>
            <p className="stat-value">Energized</p>
          </div>
        </div>
      </div>
    </div>
  );
}
