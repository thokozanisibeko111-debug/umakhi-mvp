import Link from 'next/link';
import { paperTopics, uiLabels } from '../../data/grade12';

type PaperPageProps = {
  params: { paper: string };
};

export default function PaperPage({ params }: PaperPageProps) {
  const paperNumber = params.paper === '2' ? 2 : 1;
  const topics = paperTopics[paperNumber];

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
        <ul className="list">
          {topics.map((topic) => (
            <li className="list-item topic-card" key={topic.id}>
              <div>
                <h3>{topic.title.en}</h3>
                <p className="muted">{topic.description.en}</p>
                <p className="topic-subtitle">Mastery: {topic.mastery}%</p>
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
