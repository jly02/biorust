"use client";

import React, { useState, useEffect } from "react";

const INDEXEDDB_VER = 1;

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface StatsResponse {
  titles: string[];
  sequences: string[];
  gc_content: number[];
  base_counts: number[][];
}

interface StoredFile {
  name: string;
  size: number;
  type: string;
  content: string;
}

export default function SequenceAnalyzerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [storedFiles, setStoredFiles] = useState<StoredFile[]>([]);
  const [selectedStoredFile, setSelectedStoredFile] = useState<StoredFile | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<StatsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 🔸 Load stored files on mount
  useEffect(() => {
    const dbRequest = indexedDB.open("uploads", INDEXEDDB_VER);

    dbRequest.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("uploads")) {
        db.createObjectStore("uploads", { keyPath: "name" });
      }
    };

    dbRequest.onsuccess = () => {
      const db = dbRequest.result;
      const transaction = db.transaction("uploads", "readonly");
      const store = transaction.objectStore("uploads");
      const getAllReq = store.getAll();
      getAllReq.onsuccess = () => {
        setStoredFiles(getAllReq.result);
      };
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setSelectedStoredFile(null);
    setError(null);
  };

  const handleStoredFileSelect = (name: string) => {
    if (!name) {
      setSelectedStoredFile(null);
      return;
    }
    const file = storedFiles.find((f) => f.name === name) || null;
    setSelectedStoredFile(file);
    setSelectedFile(null);
    setError(null);
  };

  const analyzeSequence = async () => {
    const fileContent = selectedFile
      ? await selectedFile.text()
      : selectedStoredFile
      ? selectedStoredFile.content
      : null;

    if (!fileContent) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch(BASE_API_URL + "/stats", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: fileContent,
      });

      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data: StatsResponse = await res.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-2xl shadow-lg p-6 space-y-4">
          <h1 className="text-2xl font-semibold">Sequence Analyzer</h1>
          <p className="text-neutral-400 text-sm">
            Upload a FASTA file or choose a stored file to compute GC content, base counts, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* File Upload */}
            <label className="cursor-pointer bg-neutral-700 hover:bg-neutral-600 px-4 py-2 rounded-lg">
              Choose File
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".fasta,.fa,.txt"
              />
            </label>
            {selectedFile && (
              <span className="text-sm text-neutral-300">{selectedFile.name}</span>
            )}

            or

            {/* Stored File Dropdown */}
            <select
              className="bg-neutral-700 px-4 py-2 rounded-lg"
              onChange={(e) => handleStoredFileSelect(e.target.value)}
              value={selectedStoredFile?.name || ""}
            >
              <option value="">Select From Uploads</option>
              {storedFiles.map((file) => (
                <option key={file.name} value={file.name}>
                  {file.name}
                </option>
              ))}
            </select>

            {/* Analyze Button */}
            <button
              onClick={analyzeSequence}
              disabled={!(selectedFile || selectedStoredFile) || loading}
              className={`px-4 py-2 rounded-lg transition ${
                loading || !(selectedFile || selectedStoredFile)
                  ? "bg-blue-900 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>

          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
        </div>

        {/* Results */}
        {results && (
          <div className="bg-neutral-800 border border-neutral-700 rounded-2xl shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold mb-2">Results</h2>
            {results.titles.map((title, index) => {
              const seq = results.sequences[index];
              const gc = results.gc_content[index];
              const [a, c, g, t] = results.base_counts[index];

              return (
                <div
                  key={index}
                  className="bg-neutral-900 border border-neutral-700 rounded-lg p-4 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <p className="font-semibold text-white">{title}</p>
                    <p className="text-sm text-neutral-400">
                      Length: {seq.length.toLocaleString()} bp
                    </p>
                  </div>

                  <p className="text-sm text-neutral-400">
                    GC Content:{" "}
                    <span className="text-white font-medium">
                      {gc.toFixed(2)}%
                    </span>
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-neutral-300">
                    <span>A: {a}</span>
                    <span>C: {c}</span>
                    <span>G: {g}</span>
                    <span>T: {t}</span>
                  </div>

                  <details className="mt-2">
                    <summary className="cursor-pointer text-blue-400 hover:text-blue-300">
                      View Sequence
                    </summary>
                    <pre className="mt-2 text-xs text-neutral-300 bg-neutral-800 rounded p-3 overflow-x-auto max-h-48">
                      {seq}
                    </pre>
                  </details>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
