'use client'; // Mark this component as client-side
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './layout.css';

export default function Layout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    window.location.href = '/'; 
  };

  return (
    <html lang="en">
      <head>
        <title>Next.js Project</title>
      </head>
      <body>
        <header>
          <nav>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/service">Service</Link></li>
              {!isLoggedIn ? (
                <li><Link href="/login">Login</Link></li>
              ) : (
                <>
                  <li><Link href="/brand">Create Brand</Link></li> 
                  <li><button onClick={handleLogout}>Logout</button></li>
                </>
              )}
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
