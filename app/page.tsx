"use client";

import React from 'react';

export default function HomePage() {
  const quickLinks = [
    {
      title: 'Basic Statistics',
      description: 'Start your analysis with essential sequence statistics, including length, GC content, and composition.',
      image: 'basic_stats.png', // placeholder image
      link: "/tools/sequence-analyzer"
    },
    {
      title: 'Alignment Tool',
      description: 'Align DNA, RNA, or protein sequences to reveal conserved regions and mutations.',
      image: 'Histone_Alignment.png', // placeholder image
    },
  ];

  const updates = [
    { title: 'Sequence analyzer implemented.', date: '2025-10-13', description: 'For now, only covers basic statistics and information about each sequence. File uploads are limited to 4 MB, but will soon be increased.' },
    { title: 'Site is live!', date: '2025-10-11', description: 'Functionality is non-existent... more to come!' },
  ];

  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Welcome to BioRust</h2>
        <p style={{ fontSize: '1.125rem', color: '#d1d5db', marginTop: '0.75rem' }}>
          A platform for advanced bioinformatics tools and workflows, built on Rust.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Quick Links</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {quickLinks.map((ql) => (
            <div
              key={ql.title}
              style={{
                backgroundColor: '#262626',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}
            >
              <img
                src={ql.image}
                alt={ql.title}
                style={{ width: '100%', height: '180px', objectFit: 'contain', objectPosition: 'left', backgroundColor: '#181818ff' }}
              />
              <div style={{ padding: '1rem' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                  <a
                    href={ql.link}              // 👈 your target URL
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
                  >
                    {ql.title}
                  </a>
                </h4>
                <p style={{ color: '#d1d5db', marginTop: '0.5rem' }}>{ql.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Recent Updates</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {updates.map((u) => (
            <div
              key={u.title}
              style={{
                backgroundColor: '#262626',
                padding: '1rem 1.5rem',
                borderRadius: '6px',
                border: '1px solid #424242ff',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{u.title}</h4>
                <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{u.date}</span>
              </div>
              <p style={{ color: '#d1d5db' }}>{u.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
