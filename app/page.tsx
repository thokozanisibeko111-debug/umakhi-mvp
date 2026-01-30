export default function Home() {
  return (
    <main>
      <section className="hero">
        <span className="badge">uMakhi Grade 12 CAPS</span>
        <h1>Welcome to <br /> uMakhi Learning</h1>
        <p>
          Master Grade 12 Mathematics in your own native language. 
          A colorful, focused journey awaits you.
        </p>
        <div className="hero-actions">
          <a className="btn-primary" href="/login">
            Start Learning
          </a>
          <a className="btn-secondary" href="/signup">
            Create Account
          </a>
        </div>
      </section>
      
      {/* Added a small feature preview section for color */}
      <div className="progress-summary" style={{ marginTop: '2rem' }}>
        <div className="card">
          <h3>📚 Native Languages</h3>
          <p style={{ color: 'var(--text-muted)' }}>Learn complex topics in the language you understand best.</p>
        </div>
        <div className="card">
          <h3>🎨 Visual Learning</h3>
          <p style={{ color: 'var(--text-muted)' }}>Colorful diagrams and interactive quizzes to boost memory.</p>
        </div>
        <div className="card">
          <h3>🚀 Track Progress</h3>
          <p style={{ color: 'var(--text-muted)' }}>Watch your skills grow with real-time analytics.</p>
        </div>
      </div>
    </main>
  );
}
