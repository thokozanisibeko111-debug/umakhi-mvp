import './globals.css';
import React from 'react';

export const metadata = {
  title: 'uMakhi MVP',
  description: 'Grade 12 Mathematics learning assistant',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
