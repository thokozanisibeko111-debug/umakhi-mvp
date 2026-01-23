'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase, supabaseConfigError } from '@/utils/supabaseClient';

interface Topic {
  id: string;
  title: string;
  description?: string;
}

export default function Home() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (supabaseConfigError || !supabase) {
      return;
    }
    // Fetch the current user if logged in
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
    fetchTopics();
  }, []);

  async function fetchTopics() {
    if (supabaseConfigError || !supabase) {
      return;
    }
    const { data, error } = await supabase.from('topics').select('*');
    if (!error && data) {
      setTopics(data as Topic[]);
    }
  }

  if (supabaseConfigError) {
    return (
      <main>
        <h1>Welcome to uMakhi</h1>
        <p>{supabaseConfigError}</p>
        <p>
          Please add your Supabase credentials, then refresh this page.
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main>
        <h1>Welcome to uMakhi</h1>
        <p>Please <Link href="/login">log in</Link> or <Link href="/signup">sign up</Link> to continue.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Topics</h1>
      {topics.length === 0 ? (
        <p>No topics found.  Ask an admin to add some.</p>
      ) : (
        <ul>
          {topics.map((topic) => (
            <li key={topic.id}>
              <Link href={`/topic/${topic.id}`}>{topic.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
