'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopBar() {
  const pathname = usePathname();

  const hiddenRoutes = ['/', '/login', '/signup'];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <header className="top-bar">
      <div className="top-bar-content">
        <div className="brand">
          <Link className="logo-link" href="/">
            <img className="logo-image" src="/logo.svg" alt="uMakhi logo" />
          </Link>
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
        </nav>
      </div>
    </header>
  );
}
