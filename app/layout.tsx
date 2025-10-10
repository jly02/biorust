// app/layout.tsx
import React, { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Bioinformatics App',
  description: 'Analyze sequences and explore biological data',
};

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        fontFamily: "'Inter', sans-serif",
        backgroundColor: '#f5f5f5',
        color: '#111827',
        margin: 0
      }}>
        <header style={{
          padding: '1.5rem 2rem',
          backgroundColor: '#2563EB',
          color: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 600 }}>Bioinformatics App</h1>
        </header>

        <div style={{ display: 'flex', flex: 1 }}>
          <nav style={{
            width: '220px',
            padding: '2rem 1.5rem',
            borderRight: '1px solid #e5e7eb',
            backgroundColor: 'white'
          }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Sequence Analysis', 'Alignment Tool', 'Visualization', 'Data Import'].map((item) => (
                <li key={item} style={{ margin: '1.25rem 0' }}>
                  <a href="#" style={{
                    textDecoration: 'none',
                    color: '#2563EB',
                    fontWeight: 500,
                    fontSize: '1rem'
                  }}>{item}</a>
                </li>
              ))}
            </ul>
          </nav>

          <main style={{
            flex: 1,
            padding: '2.5rem',
            backgroundColor: '#f9fafb',
            overflowY: 'auto'
          }}>
            {children}
          </main>
        </div>

        <footer style={{
          padding: '1rem 2rem',
          backgroundColor: 'white',
          textAlign: 'center',
          borderTop: '1px solid #e5e7eb',
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
          &copy; {new Date().getFullYear()} Bioinformatics App
        </footer>
      </body>
    </html>
  );
};

export default Layout;
