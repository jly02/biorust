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
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <header style={{ padding: '1rem 2rem', backgroundColor: '#1E3A8A', color: 'white' }}>
          <h1>Bioinformatics App</h1>
        </header>

        <div style={{ display: 'flex', flex: 1 }}>
          {/* Sidebar / Function menu */}
          <nav style={{ width: '200px', padding: '1rem', borderRight: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ margin: '1rem 0' }}><a href="#" style={{ textDecoration: 'none', color: '#1E3A8A' }}>Sequence Analysis</a></li>
              <li style={{ margin: '1rem 0' }}><a href="#" style={{ textDecoration: 'none', color: '#1E3A8A' }}>Alignment Tool</a></li>
              <li style={{ margin: '1rem 0' }}><a href="#" style={{ textDecoration: 'none', color: '#1E3A8A' }}>Visualization</a></li>
              <li style={{ margin: '1rem 0' }}><a href="#" style={{ textDecoration: 'none', color: '#1E3A8A' }}>Data Import</a></li>
            </ul>
          </nav>

          {/* Main content area */}
          <main style={{ flex: 1, padding: '2rem' }}>
            {children}
          </main>
        </div>

        <footer style={{ padding: '1rem 2rem', backgroundColor: '#f1f1f1', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} Bioinformatics App
        </footer>
      </body>
    </html>
  );
};

export default Layout;