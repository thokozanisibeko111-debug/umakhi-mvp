import './globals.css';
import React from 'react';
import TopBar from './components/TopBar';

export const metadata = {
  title: 'uMakhi',
  description: 'CAPS-aligned Grade 12 Mathematics learning platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <TopBar />
          {children}
          <footer className="footer">Empowering learners with colorful, focused guidance.</footer>
        </div>
      </body>
    </html>
  );
}
