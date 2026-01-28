'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { supabase } from '@/utils/supabaseClient';

export default function TopBar() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (!supabase) {
      return () => {
        isMounted = false;
      };
    }

    const supabaseClient = supabase;

    const loadSession = async () => {
      const { data } = await supabaseClient.auth.getSession();
      if (isMounted) {
        setIsAuthenticated(Boolean(data.session));
      }
    };

    loadSession();

    const { data: authListener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (pathname === '/') {
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
          {isAuthenticated ? (
            <>
              <Link className="nav-link" href="/paper/1">
                Paper 1
              </Link>
              <Link className="nav-link" href="/paper/2">
                Paper 2
              </Link>
            </>
          ) : null}
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
