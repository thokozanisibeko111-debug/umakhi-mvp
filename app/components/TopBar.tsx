'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { supabase } from '@/utils/supabaseClient';

export default function TopBar() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const supabaseClient = supabase;

    if (!supabaseClient) {
      return () => {
        isMounted = false;
      };
    }

    const loadSession = async () => {
      const { data } = await supabaseClient.auth.getSession();
      const role = data.session?.user?.user_metadata?.role;
      if (isMounted) {
        setIsAuthenticated(Boolean(data.session));
        setIsAdmin(role === 'admin');
      }
    };

    loadSession();

    const { data: authListener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
      setIsAdmin(session?.user?.user_metadata?.role === 'admin');
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
          {isAdmin ? (
            <Link className="nav-link" href="/admin">
              Admin workspace
            </Link>
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
