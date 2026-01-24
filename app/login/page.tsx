'use client';

import { useEffect, useState } from 'react';
import { supabase, supabaseConfigError } from '@/utils/supabaseClient';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Login() {
  const [role, setRole] = useState<'learner' | 'admin'>('learner');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'admin' || roleParam === 'learner') {
      setRole(roleParam);
    }
  }, [searchParams]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!role) {
      setError('Please select whether you are logging in as a learner or an admin.');
      return;
    }
    if (supabaseConfigError || !supabase) {
      setError(supabaseConfigError ?? 'Supabase is not available.');
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      const userRole = data.user?.user_metadata?.role;
      if (userRole !== role) {
        await supabase.auth.signOut();
        setError(
          role === 'admin'
            ? 'This account is not registered as an admin.'
            : 'This account is not registered as a learner.'
        );
        return;
      }
      window.location.href = role === 'admin' ? '/admin' : '/';
    }
  }

  return (
    <main className="login-page">
      <section className="login-hero">
        <div>
          <span className="badge badge--highlight">Welcome back</span>
          <h1>Log in to a brighter learning experience</h1>
          <p>
            Jump back into your colorful study space, track your progress, and keep your streak
            alive with Play mode focus sprints.
          </p>
          <div className="login-highlights">
            <div className="highlight-card">
              <h3>Personalized content</h3>
              <p>Lessons, notes, and quizzes tailored to your current mastery.</p>
            </div>
            <div className="highlight-card">
              <h3>Play mode timer</h3>
              <p>Stay focused with time-boxed study sessions and progress streaks.</p>
            </div>
          </div>
        </div>
        <div className="hero-orb">
          <div className="orb-glow" />
          <div className="orb-core">
            <span>Caps</span>
            <strong>Level up</strong>
          </div>
        </div>
      </section>
      <section className="card login-card">
        <div className="section-header">
          <h2>Log in</h2>
          <span className="badge">Secure access</span>
        </div>
        <form onSubmit={handleLogin}>
          <fieldset className="role-switch">
            <legend>I am logging in as</legend>
            <div className="role-options">
              <label className="role-option">
                <input
                  type="radio"
                  name="role"
                  value="learner"
                  checked={role === 'learner'}
                  onChange={() => setRole('learner')}
                />
                Learner
              </label>
              <label className="role-option">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                />
                Admin
              </label>
            </div>
          </fieldset>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
            />
          </label>
          <button className="btn-primary btn-primary--wide" type="submit">
            Log in
          </button>
          {error && <p className="error-banner">{error}</p>}
        </form>
        <p className="muted">
          Don’t have an account? <Link href="/signup">Sign up</Link>
        </p>
      </section>
    </main>
  );
}
