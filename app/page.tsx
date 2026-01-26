export default function Home() {
  return (
    <main>
      <section className="hero">
        <span className="badge">uMakhi Grade 12 CAPS</span>
        <h1>Welcome to the platform</h1>
        <p>
          This platform helps Grade 12 Mathematics learners study in their own native language.
          Please log in or sign up to get started.
        </p>
        <div className="hero-actions">
          <a className="btn-primary" href="/login">
            Log in
          </a>
          <a className="btn-secondary" href="/signup">
            Sign up
          </a>
        </div>
      </section>
    </main>
  );
}
