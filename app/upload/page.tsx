"use client";

import React, { useState, useEffect } from "react";

const INDEXEDDB_VER = 1;

interface UploadFile {
  file: File;
  progress: number;
}

interface StoredFile {
  name: string;
  size: number;
  type: string;
  content: string;
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [storedFiles, setStoredFiles] = useState<StoredFile[]>([]);
  
  // Handle file selection / drop
  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const newFiles: UploadFile[] = Array.from(incoming).map((f) => ({
      file: f,
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach((f) => uploadToIndexedDB(f));
  };

  // Upload file to IndexedDB
  const uploadToIndexedDB = (uploadFile: UploadFile) => {
    const dbRequest = indexedDB.open("uploads", INDEXEDDB_VER);

    dbRequest.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("uploads")) {
        db.createObjectStore("uploads", { keyPath: "name" });
      }
    };

    dbRequest.onsuccess = (event) => {
      const db = dbRequest.result;
      const transaction = db.transaction("uploads", "readwrite");

      const reader = new FileReader();
      reader.onload = () => {
        const tx = db.transaction("uploads", "readwrite");
        const store = tx.objectStore("uploads");
        const data = {
          name: uploadFile.file.name,
          type: uploadFile.file.type,
          size: uploadFile.file.size,
          content: reader.result,
        };
        store.put(data);
        tx.oncomplete = () => {
          fetchStoredFiles();
        };
      };
      reader.readAsText(uploadFile.file);
      // reader.readAsArrayBuffer(uploadFile.file); // line does not work?
    };
  };

  // Fetch all stored files
  const fetchStoredFiles = () => {
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
  };

  const viewFile = (name: string) => {
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
      const getReq = store.get(name);

      getReq.onsuccess = () => {
        const fileData = getReq.result;
        if (!fileData) return;

        const newWindow = window.open("", "_blank");
        if (!newWindow) return;

        newWindow.document.write(`
          <html>
            <head>
              <title>${fileData.name}</title>
              <style>
                body { font-family: sans-serif; background: #1f1f1f; color: #fff; padding: 20px; }
                pre { white-space: pre-wrap; word-wrap: break-word; }
              </style>
            </head>
            <body>
              <h1>${fileData.name}</h1>
              <pre>${fileData.content}</pre>
            </body>
          </html>
        `);
        newWindow.document.close();
      };
    };
  };

  // Delete stored file
  const deleteStoredFile = (name: string) => {
    const dbRequest = indexedDB.open("uploads", INDEXEDDB_VER);
    dbRequest.onsuccess = () => {
      const db = dbRequest.result;
      const transaction = db.transaction("uploads", "readwrite");
      const store = transaction.objectStore("uploads");
      store.delete(name);
      transaction.oncomplete = fetchStoredFiles;
    };
  };

  useEffect(() => {
    fetchStoredFiles();
  }, []);

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="bg-neutral-800 rounded-2xl shadow-lg p-6 border border-neutral-700">
          <h1 className="text-2xl font-semibold mb-2">Upload Your Dataset</h1>
          <p className="text-sm text-neutral-400 mb-4">
            Select or drag and drop your files. Supported formats: FASTA, FASTQ.
          </p>

          {/* Drop Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFiles(e.dataTransfer.files);
            }}
            className="border-2 border-dashed border-neutral-600 rounded-xl p-10 flex flex-col items-center justify-center text-neutral-400 hover:border-neutral-400 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mb-3"
              fill="grey"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99.09 122.88"><title>file-upload</title><path d="M64.64,13,86.77,36.21H64.64V13ZM42.58,71.67a3.25,3.25,0,0,1-4.92-4.25l9.42-10.91a3.26,3.26,0,0,1,4.59-.33,5.14,5.14,0,0,1,.4.41l9.3,10.28a3.24,3.24,0,0,1-4.81,4.35L52.8,67.07V82.52a3.26,3.26,0,1,1-6.52,0V67.38l-3.7,4.29ZM24.22,85.42a3.26,3.26,0,1,1,6.52,0v7.46H68.36V85.42a3.26,3.26,0,1,1,6.51,0V96.14a3.26,3.26,0,0,1-3.26,3.26H27.48a3.26,3.26,0,0,1-3.26-3.26V85.42ZM99.08,39.19c.15-.57-1.18-2.07-2.68-3.56L63.8,1.36A3.63,3.63,0,0,0,61,0H6.62A6.62,6.62,0,0,0,0,6.62V116.26a6.62,6.62,0,0,0,6.62,6.62H92.46a6.62,6.62,0,0,0,6.62-6.62V39.19Zm-7.4,4.42v71.87H7.4V7.37H57.25V39.9A3.71,3.71,0,0,0,61,43.61Z"/></svg>
            </svg>
            <p className="mb-2">Drag and drop files here or click to upload</p>
            <label className="cursor-pointer bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg mt-2 transition">
              Browse Files
              <input
                type="file"
                className="hidden"
                multiple
                onChange={(e) => handleFiles(e.target.files)}
              />
            </label>
          </div>
        </div>

        {/* Stored Files */}
        {storedFiles.length > 0 && (
          <div className="bg-neutral-800 rounded-2xl shadow-lg p-6 border border-neutral-700">
            <h2 className="text-lg font-semibold mb-4">Stored Files</h2>
            <ul className="space-y-2">
              {storedFiles.map((file) => (
                <li
                  key={file.name}
                  className="flex items-center justify-between bg-neutral-700 rounded-lg px-4 py-2"
                >
                  <div>
                    <span className="font-medium">{file.name}</span>
                    <span className="ml-2 text-sm text-neutral-400">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-5">
                    <button
                      onClick={() => viewFile(file.name)}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => deleteStoredFile(file.name)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
