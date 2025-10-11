import React from "react";

export default function ToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-100 mb-8">
        Tools
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Tool Card 1 */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-2">
            Sequence Analyzer
          </h2>
          <p className="text-sm text-gray-300 flex-1 mb-4">
            Analyze nucleotide or protein sequences for basic statistics and structure.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full transition">
            Launch
          </button>
        </div>

        {/* Tool Card 2 */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-2">
            Alignment Tool
          </h2>
          <p className="text-sm text-gray-300 flex-1 mb-4">
            Perform multiple or pairwise sequence alignments with customizable parameters.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full transition">
            Launch
          </button>
        </div>

        {/* Tool Card 3 */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-2">
            Data Visualization
          </h2>
          <p className="text-sm text-gray-300 flex-1 mb-4">
            Create visualizations of sequence data, alignments, or annotations.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full transition">
            Launch
          </button>
        </div>
      </div>
    </div>
  );
}
