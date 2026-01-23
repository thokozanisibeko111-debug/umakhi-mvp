'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import Link from 'next/link';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else {
      // On successful sign up the user must confirm email before sign in
      alert('Check your email for a confirmation link.');
      window.location.href = '/login';
    }
  }

  return (
    <main>
      <section className="hero">
        <span className="badge">Join uMakhi</span>
        <h1>Create your learner profile</h1>
        <p>Track topics, revisit videos, and get guided practice questions.</p>
      </section>
      <section className="card">
        <div className="section-header">
          <h2>Sign up</h2>
          <span className="badge">Quick setup</span>
        </div>
        <form onSubmit={handleSignup}>
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
              placeholder="Create a password"
              required
            />
          </label>
          <button className="btn-primary" type="submit">
            Sign up
          </button>
          {error && <p className="error-banner">{error}</p>}
        </form>
        <p className="muted">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}
