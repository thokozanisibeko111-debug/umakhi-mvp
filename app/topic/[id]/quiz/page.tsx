'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { topics, LocalizedText } from '../../../data/grade12';
import { supabase } from '@/utils/supabaseClient';
import ClassicQuiz from '../../../components/games/ClassicQuiz';
import SpeedRound from '../../../components/games/SpeedRound';
import ChallengeMode from '../../../components/games/ChallengeMode';
import MatchUp from '../../../components/games/MatchUp';

type Language = 'en' | 'zu';
type GameMode = 'hub' | 'classic' | 'speed' | 'challenge' | 'match';

function getText(text: LocalizedText, language: Language) {
  return text[language];
}

const gameModes = [
  {
    id: 'classic' as GameMode,
    title: { en: 'Classic Quiz', zu: 'Isivivinyo Esijwayelekile' },
    description: {
      en: 'Answer questions at your own pace. Get detailed explanations and build streaks for bonus points.',
      zu: 'Phendula imibuzo ngesivinini sakho. Thola izincazelo ezinzulu futhi wakhe uchungechunge ukuthola amaphuzu engeziwe.'
    },
    icon: 'quiz',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
  },
  {
    id: 'speed' as GameMode,
    title: { en: 'Speed Round', zu: 'Umjaho Wesivinini' },
    description: {
      en: 'Race against the clock! 60 seconds to answer as many as you can. Correct answers add bonus time.',
      zu: 'Jaha isikhathi! Imizuzwana engu-60 ukuphendula imibuzo eminingi. Izimpendulo ezilungile zengeza isikhathi.'
    },
    icon: 'speed',
    color: '#fb923c',
    gradient: 'linear-gradient(135deg, #fb923c, #ea580c)',
  },
  {
    id: 'challenge' as GameMode,
    title: { en: 'Challenge Mode', zu: 'Inselelo' },
    description: {
      en: 'You have 3 lives. Questions start easy and get harder. How far can you go?',
      zu: 'Unezimpilo ezintathu. Imibuzo iqala ilula bese iba nzima. Ungafinyelela kuphi?'
    },
    icon: 'challenge',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
  },
  {
    id: 'match' as GameMode,
    title: { en: 'Match Up', zu: 'Hlanganisa' },
    description: {
      en: 'Match questions to their correct answers. Test your understanding of key concepts and formulas.',
      zu: 'Hlanganisa imibuzo nezimpendulo zawo. Hlola ukuqonda kwakho imiqondo namafomula abalulekile.'
    },
    icon: 'match',
    color: '#f472b6',
    gradient: 'linear-gradient(135deg, #f472b6, #db2777)',
  },
];

function GameModeIcon({ icon, color }: { icon: string; color: string }) {
  switch (icon) {
    case 'quiz':
      return (
        <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke={color} strokeWidth="2.5">
          <rect x="8" y="6" width="32" height="36" rx="4"/>
          <path d="M16 16h16M16 24h16M16 32h8" strokeLinecap="round"/>
          <circle cx="34" cy="34" r="8" fill={color} stroke="none"/>
          <path d="M31 34l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'speed':
      return (
        <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke={color} strokeWidth="2.5">
          <circle cx="24" cy="26" r="18"/>
          <path d="M24 14v12l8 5" strokeLinecap="round"/>
          <path d="M20 6h8" strokeLinecap="round"/>
          <path d="M24 6v4"/>
          <path d="M36 12l-3 3M12 12l3 3"/>
        </svg>
      );
    case 'challenge':
      return (
        <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke={color} strokeWidth="2.5">
          <path d="M24 4l6 12 14 2-10 10 2 14-12-6-12 6 2-14L4 18l14-2z"/>
        </svg>
      );
    case 'match':
      return (
        <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke={color} strokeWidth="2.5">
          <rect x="4" y="10" width="16" height="28" rx="3"/>
          <rect x="28" y="10" width="16" height="28" rx="3"/>
          <path d="M20 20h8M20 28h8M20 36h8" strokeLinecap="round" strokeDasharray="2 3"/>
        </svg>
      );
    default:
      return null;
  }
}

export default function QuizPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const topic = useMemo(() => topics.find((item) => item.id === params.id), [params.id]);
  const [authChecked, setAuthChecked] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [activeMode, setActiveMode] = useState<GameMode>('hub');

  useEffect(() => {
    async function checkAuth() {
      if (!supabase) {
        router.replace('/login');
        return;
      }
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace('/login');
      } else {
        setAuthChecked(true);
      }
    }
    checkAuth();
  }, [router]);

  if (!authChecked) {
    return null;
  }

  if (!topic) {
    return (
      <main>
        <section className="hero">
          <h1>{getText({ en: 'Topic not found', zu: 'Isihloko asitholakali' }, language)}</h1>
          <p className="muted">{getText({ en: 'Return to choose another topic.', zu: 'Buyela ukuze ukhethe esinye isihloko.' }, language)}</p>
        </section>
      </main>
    );
  }

  if (activeMode === 'classic') {
    return (
      <main className="game-main">
        <ClassicQuiz
          questions={topic.quizzes}
          topicTitle={getText(topic.title, language)}
          language={language}
          onBack={() => setActiveMode('hub')}
        />
      </main>
    );
  }

  if (activeMode === 'speed') {
    return (
      <main className="game-main">
        <SpeedRound
          questions={topic.quizzes}
          topicTitle={getText(topic.title, language)}
          language={language}
          onBack={() => setActiveMode('hub')}
        />
      </main>
    );
  }

  if (activeMode === 'challenge') {
    return (
      <main className="game-main">
        <ChallengeMode
          questions={topic.quizzes}
          topicTitle={getText(topic.title, language)}
          language={language}
          onBack={() => setActiveMode('hub')}
        />
      </main>
    );
  }

  if (activeMode === 'match') {
    return (
      <main className="game-main">
        <MatchUp
          topic={topic}
          language={language}
          onBack={() => setActiveMode('hub')}
        />
      </main>
    );
  }

  // Game Mode Hub
  return (
    <main>
      <section className="hero game-hub-hero">
        <div className="game-hub-top">
          <Link href={`/topic/${topic.id}`} className="game-back-link">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            {getText({ en: 'Back to topic', zu: 'Buyela esihlokweni' }, language)}
          </Link>
          <div className="language-toggle">
            <label htmlFor="game-language">{getText({ en: 'Language', zu: 'Ulimi' }, language)}</label>
            <select
              id="game-language"
              value={language}
              onChange={(event) => setLanguage(event.target.value as Language)}
            >
              <option value="en">English</option>
              <option value="zu">isiZulu</option>
            </select>
          </div>
        </div>

        <div className="game-hub-header">
          <span className="badge badge--game">
            {getText({ en: 'Game Zone', zu: 'Indawo Yomdlalo' }, language)}
          </span>
          <h1>{getText(topic.title, language)}</h1>
          <p>
            {getText({
              en: 'Choose a game mode to practice and master this topic. Each mode tests your knowledge in a different way.',
              zu: 'Khetha uhlobo lomdlalo ukuze uprakthize futhi ube yingcweti kulesi sihloko. Uhlobo ngalunye luhlola ulwazi lwakho ngendlela ehlukile.'
            }, language)}
          </p>
        </div>

        <div className="game-stats-bar">
          <div className="game-stat">
            <span className="game-stat__value">{topic.quizzes.length}</span>
            <span className="game-stat__label">{getText({ en: 'Questions', zu: 'Imibuzo' }, language)}</span>
          </div>
          <div className="game-stat">
            <span className="game-stat__value">{topic.quizzes.filter(q => q.difficulty === 'Easy').length}</span>
            <span className="game-stat__label" style={{ color: '#10b981' }}>{getText({ en: 'Easy', zu: 'Lula' }, language)}</span>
          </div>
          <div className="game-stat">
            <span className="game-stat__value">{topic.quizzes.filter(q => q.difficulty === 'Medium').length}</span>
            <span className="game-stat__label" style={{ color: '#fb923c' }}>{getText({ en: 'Medium', zu: 'Phakathi' }, language)}</span>
          </div>
          <div className="game-stat">
            <span className="game-stat__value">{topic.quizzes.filter(q => q.difficulty === 'Hard').length}</span>
            <span className="game-stat__label" style={{ color: '#ef4444' }}>{getText({ en: 'Hard', zu: 'Nzima' }, language)}</span>
          </div>
        </div>
      </section>

      <section className="game-modes-grid">
        {gameModes.map((mode) => (
          <button
            key={mode.id}
            className="game-mode-card"
            onClick={() => setActiveMode(mode.id)}
            type="button"
          >
            <div className="game-mode-card__icon-wrap" style={{ background: mode.gradient }}>
              <GameModeIcon icon={mode.icon} color="white" />
            </div>
            <div className="game-mode-card__content">
              <h3 className="game-mode-card__title">{getText(mode.title, language)}</h3>
              <p className="game-mode-card__desc">{getText(mode.description, language)}</p>
            </div>
            <div className="game-mode-card__arrow" style={{ color: mode.color }}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </button>
        ))}
      </section>

      <section className="game-tips card">
        <h3>{getText({ en: 'Study Tips', zu: 'Amacebiso Okufunda' }, language)}</h3>
        <div className="game-tips__grid">
          <div className="game-tip">
            <div className="game-tip__number">1</div>
            <p>{getText({ en: 'Start with Classic Quiz to learn at your own pace.', zu: 'Qala nge-Classic Quiz ukuze ufunde ngesivinini sakho.' }, language)}</p>
          </div>
          <div className="game-tip">
            <div className="game-tip__number">2</div>
            <p>{getText({ en: 'Use Speed Round to build quick recall under pressure.', zu: 'Sebenzisa i-Speed Round ukwakha ukukhumbula okusheshayo ngaphansi kwengcindezi.' }, language)}</p>
          </div>
          <div className="game-tip">
            <div className="game-tip__number">3</div>
            <p>{getText({ en: 'Try Challenge Mode when you feel confident.', zu: 'Zama i-Challenge Mode uma uzizwa unethemba.' }, language)}</p>
          </div>
          <div className="game-tip">
            <div className="game-tip__number">4</div>
            <p>{getText({ en: 'Match Up reinforces formula and concept recall.', zu: 'I-Match Up iqinisa ukukhumbula amafomula nemiqondo.' }, language)}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
