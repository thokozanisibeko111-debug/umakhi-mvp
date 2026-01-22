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
