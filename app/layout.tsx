import React, { ReactNode } from 'react';
import './globals.css';
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'BioRust',
  description: 'Explore tools and workflows in modern bioinformatics.',
};

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en" className={poppins.className}>
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#313131ff',
          color: '#f9fafb',
          margin: 0,
        }}
      >
        <header
          style={{
            backgroundColor: '#262626',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #374151',
          }}
        >
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
              BioRust
            </Link>
          </h1>
          <nav>
            <ul
              style={{
                display: 'flex',
                gap: '1.5rem',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              <li>
                <Link href="/" style={{ color: '#f9fafb', textDecoration: 'none' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/upload" style={{ color: '#f9fafb', textDecoration: 'none' }}>
                  Upload
                </Link>
              </li>
              <li>
                <Link href="/tools" style={{ color: '#f9fafb', textDecoration: 'none' }}>
                  Tools
                </Link>
              </li>
              <li>
                <Link href="/docs" style={{ color: '#f9fafb', textDecoration: 'none' }}>
                  Documentation
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main style={{ flex: 1 }}>{children}</main>

        <footer
          style={{
            backgroundColor: '#262626',
            padding: '1rem 2rem',
            borderTop: '1px solid #374151',
            fontSize: '0.875rem',
            color: '#9ca3af',
            textAlign: 'center',
          }}
        >
          &copy; {new Date().getFullYear()} BioRust. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
