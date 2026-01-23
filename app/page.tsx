import Link from 'next/link';
import { paperTopics, uiLabels } from './data/grade12';

export default function Home() {
  const allTopics = [...paperTopics[1], ...paperTopics[2]];
  const completed = allTopics.filter((topic) => topic.mastery >= 80).length;
  const average = Math.round(
    allTopics.reduce((sum, topic) => sum + topic.mastery, 0) / allTopics.length
  );

  return (
    <main>
      <section className="hero">
        <span className="badge">uMakhi Grade 12 CAPS</span>
        <h1>{uiLabels.dashboardTitle.en}</h1>
        <p>
          Navigate Paper 1 and Paper 2 topics, learn with simple notes and visuals, practice with
          worked examples, and get instant feedback on quizzes.
        </p>
      </section>
      <section className="card dashboard-grid">
        <div className="section-header">
          <h2>{uiLabels.progressSummary.en}</h2>
          <span className="badge">CAPS aligned</span>
        </div>
        <div className="progress-summary">
          <div className="progress-card">
            <h3>{uiLabels.topicsCompleted.en}</h3>
            <p className="metric">
              {completed} / {allTopics.length}
            </p>
          </div>
          <div className="progress-card">
            <h3>{uiLabels.averageMastery.en}</h3>
            <p className="metric">{average}%</p>
          </div>
        </div>
      </section>
      <section className="card">
        <div className="section-header">
          <h2>Pick your paper</h2>
          <span className="badge">Learner view</span>
        </div>
        <div className="paper-grid">
          <div className="paper-card">
            <h3>{uiLabels.paper1.en}</h3>
            <p className="muted">
              Functions, sequences, finance, algebra, calculus, and probability.
            </p>
            <Link className="btn-primary" href="/paper/1">
              Open Paper 1
            </Link>
          </div>
          <div className="paper-card">
            <h3>{uiLabels.paper2.en}</h3>
            <p className="muted">
              Trigonometry, analytical geometry, Euclidean geometry, and statistics.
            </p>
            <Link className="btn-primary" href="/paper/2">
              Open Paper 2
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
