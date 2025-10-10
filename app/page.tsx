'use client';

import React, { useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const HomePage: React.FC = () => {
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ message: string; description: string; extra: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let bodyData: BodyInit;

      // Attach either the file or the text sequence
      if (file) {
        bodyData = file;
      } else if (input.trim()) {
        bodyData = input.trim()
      } else {
        throw new Error('Please provide a sequence or upload a file.');
      }

      const res = await fetch(`${API_BASE_URL}/parse`, {
        method: 'POST',
        body: bodyData,
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      setResult({ 
        message: data.message, 
        description: data.description, 
        extra: data.extra 
      });
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sequence Parser</h2>
      <p>Enter a biological sequence or upload a FASTA/FASTQ file to parse it using the Rust backend API.</p>

      <form onSubmit={handleSubmit} style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', width: '350px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter sequence..."
          style={{ padding: '0.5rem' }}
        />

        <div>
          <label htmlFor="file-upload" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Or upload a sequence file:
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".fasta,.fa,.fastq,.fq,.txt"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <button
          type="submit"
          style={{ padding: '0.5rem 1rem', backgroundColor: '#1E3A8A', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '1rem', border: '1px solid #ddd', padding: '1rem', borderRadius: '4px' }}>
          <h3>Result</h3>
          <p><strong>Message:</strong> {result.message}</p>
          <p><strong>Description:</strong> {result.description}</p>
          <p><strong>File contents:</strong> {result.extra}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
