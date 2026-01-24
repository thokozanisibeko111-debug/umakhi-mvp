'use client';

import { useState } from 'react';
import { supabase, supabaseConfigError } from '@/utils/supabaseClient';
import Link from 'next/link';

export default function Signup() {
  const [role, setRole] = useState<'learner' | 'admin'>('learner');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [school, setSchool] = useState('');
  const [occupation, setOccupation] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!role) {
      setError('Please select whether you are signing up as a learner or an admin.');
      return;
    }
    if (supabaseConfigError || !supabase) {
      setError(supabaseConfigError ?? 'Supabase is not available.');
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          school: role === 'learner' ? school.trim() : null,
          occupation: role === 'admin' ? occupation.trim() : null,
          securityQuestion: role === 'admin' ? securityQuestion.trim() : null,
          securityAnswer: role === 'admin' ? securityAnswer.trim() : null,
        },
      },
    });
    if (error) {
      setError(error.message);
    } else {
      // On successful sign up the user must confirm email before sign in
      alert('Check your email for a confirmation link.');
      window.location.href = `/login?role=${role}`;
    }
  }

  return (
    <main>
      <section className="hero">
        <span className="badge">Join uMakhi</span>
        <h1>Create your workspace</h1>
        <p>
          Choose the learner space to track progress, or set up an admin workspace to manage
          content.
        </p>
      </section>
      <section className="card">
        <div className="section-header">
          <h2>Sign up</h2>
          <span className="badge">Quick setup</span>
        </div>
        <form onSubmit={handleSignup}>
          <fieldset className="role-switch">
            <legend>I am signing up as</legend>
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
            First name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Naledi"
              required
            />
          </label>
          <label>
            Surname
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Mabaso"
              required
            />
          </label>
          {role === 'learner' ? (
            <label>
              School
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="School name"
                required
              />
            </label>
          ) : (
            <>
              <label>
                Occupation
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="e.g. Mathematics Teacher"
                  required
                />
              </label>
              <label>
                Security question
                <input
                  type="text"
                  value={securityQuestion}
                  onChange={(e) => setSecurityQuestion(e.target.value)}
                  placeholder="e.g. Name of your first school?"
                  required
                />
              </label>
              <label>
                Security answer
                <input
                  type="text"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  placeholder="Enter your answer"
                  required
                />
              </label>
            </>
          )}
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
