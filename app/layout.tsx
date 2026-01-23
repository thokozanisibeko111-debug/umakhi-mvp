import './globals.css';
import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'uMakhi',
  description: 'CAPS-aligned Grade 12 Mathematics learning platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="top-bar">
            <div className="top-bar-content">
              <div className="brand">
                <span className="brand-title">uMakhi</span>
                <span className="brand-subtitle">Grade 12 Mathematics • CAPS</span>
              </div>
              <nav className="nav-links">
                <Link className="nav-link" href="/">
                  Home
                </Link>
                <Link className="nav-link" href="/paper/1">
                  Paper 1
                </Link>
                <Link className="nav-link" href="/paper/2">
                  Paper 2
                </Link>
                <Link className="nav-link" href="/login">
                  Log in
                </Link>
                <Link className="nav-link" href="/signup">
                  Sign up
                </Link>
                <Link className="nav-link" href="/admin">
                  Admin
                </Link>
              </nav>
            </div>
          </header>
          {children}
          <footer className="footer">Empowering learners with colorful, focused guidance.</footer>
        </div>
      </body>
    </html>
  );
}
