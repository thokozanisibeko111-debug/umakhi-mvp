'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { supabase, supabaseConfigError } from '@/utils/supabaseClient';
import { paperTopics, uiLabels } from '../../data/grade12';

type PaperTopicSummary = {
  id: string;
  title: string;
  description: string;
  mastery: number;
  source: 'supabase' | 'local';
};

type PaperPageProps = {
  params: { paper: string };
};

export default function PaperPage({ params }: PaperPageProps) {
  const paperNumber = params.paper === '2' ? 2 : 1;
  const [topics, setTopics] = useState<PaperTopicSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  const localTopics = useMemo(
    () =>
      paperTopics[paperNumber].map((topic) => ({
        id: topic.id,
        title: topic.title.en,
        description: topic.description.en,
        mastery: topic.mastery,
        source: 'local' as const,
      })),
    [paperNumber]
  );

  useEffect(() => {
    async function fetchTopics() {
      if (!supabase) {
        setError(supabaseConfigError ?? null);
        setTopics(localTopics);
        return;
      }
      const { data, error } = await supabase
        .from('topics')
        .select('id, title, description, paper')
        .eq('paper', paperNumber);
      if (error || !data || data.length === 0) {
        if (error) {
          setError(error.message);
        }
        setTopics(localTopics);
        return;
      }
      setTopics(
        data.map((topic) => ({
          id: topic.id as string,
          title: topic.title as string,
          description: (topic.description as string) ?? 'Add a topic description.',
          mastery: 0,
          source: 'supabase' as const,
        }))
      );
    }

    fetchTopics();
  }, [localTopics, paperNumber]);

  return (
    <main>
      <section className="hero">
        <span className="badge">Grade 12 Mathematics</span>
        <h1>{paperNumber === 1 ? uiLabels.paper1.en : uiLabels.paper2.en}</h1>
        <p className="muted">
          {paperNumber === 1
            ? 'Work through Paper 1 topics in CAPS order with clear mastery scores.'
            : 'Explore Paper 2 topics with geometry, trig, and statistics support.'}
        </p>
      </section>
      <section className="card">
        <div className="section-header">
          <h2>Topics</h2>
          <span className="badge">CAPS sequence</span>
        </div>
        {error && <p className="error-banner">{error}</p>}
        <ul className="list">
          {topics.map((topic) => (
            <li className="list-item topic-card" key={topic.id}>
              <div>
                <h3>{topic.title}</h3>
                <p className="muted">{topic.description}</p>
                <p className="topic-subtitle">
                  Mastery: {topic.mastery}% {topic.source === 'supabase' ? '• Admin curated' : ''}
                </p>
              </div>
              <Link className="btn-secondary" href={`/topic/${topic.id}`}>
                {topic.mastery > 0 ? uiLabels.continueTopic.en : uiLabels.startTopic.en}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
