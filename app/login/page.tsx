'use client';

import { useState } from 'react';
import { supabase, supabaseConfigError } from '@/utils/supabaseClient';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (supabaseConfigError || !supabase) {
      setError(supabaseConfigError ?? 'Supabase is not available.');
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      // reload page to get user
      window.location.href = '/';
    }
  }

  return (
    <main>
      <section className="hero">
        <span className="badge">Welcome back</span>
        <h1>Log in to continue learning</h1>
        <p>Access your topics, videos, and personalized AI explanations.</p>
      </section>
      <section className="card">
        <div className="section-header">
          <h2>Log in</h2>
          <span className="badge">Secure access</span>
        </div>
        <form onSubmit={handleLogin}>
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
          <button className="btn-primary" type="submit">
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
