'use client';

import { useState } from 'react';
import { supabase, supabaseConfigError } from '@/utils/supabaseClient';
import Link from 'next/link';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  function formatAuthError(message: string) {
    if (message.toLowerCase().includes('failed to fetch')) {
      return 'Unable to reach Supabase. Confirm NEXT_PUBLIC_SUPABASE_URL is correct and client-visible env vars are set in your deployment.';
    }
    return message;
  }

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (supabaseConfigError || !supabase) {
      setError(supabaseConfigError ?? 'Supabase is not available.');
      return;
    }
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(formatAuthError(error.message));
      } else {
        // On successful sign up the user must confirm email before sign in
        alert('Check your email for a confirmation link.');
        window.location.href = '/login';
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to reach Supabase.';
      setError(formatAuthError(message));
    }
  }

  return (
    <main>
      <h1>Sign up</h1>
      <form onSubmit={handleSignup}>
        <label>
          Email
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>
        <br />
        <label>
          Password
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
          />
        </label>
        <br />
        <button type="submit">Sign up</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </main>
  );
}
