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
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
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
            placeholder="Your password"
            required
          />
        </label>
        <br />
        <button type="submit">Log in</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>
        Don’t have an account? <Link href="/signup">Sign up</Link>
      </p>
    </main>
  );
}
