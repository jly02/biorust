'use client'; // required for client-side interactivity

import React, { useState } from 'react';

const HomePage: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ message: string; description: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('https://bio-rs.vercel.app/api/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sequence: input }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      setResult({ message: data.message, description: data.description });
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sequence Parser</h2>
      <p>Enter a biological sequence to parse it using the Rust backend API.</p>

      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter sequence..."
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
          Submit
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '1rem', border: '1px solid #ddd', padding: '1rem', borderRadius: '4px' }}>
          <h3>Result</h3>
          <p><strong>Message:</strong> {result.message}</p>
          <p><strong>Description:</strong> {result.description}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
