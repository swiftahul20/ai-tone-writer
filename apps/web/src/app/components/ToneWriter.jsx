"use client";

import React, { useState } from "react";
import { TONES } from "../constants/tones";
import { rewriteText } from "../lib/api";

const ToneWriter = () => {
  const [text, setText] = useState("");
  const [tone, setTone] = useState("formal");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRewrite = async () => {
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await rewriteText(text, tone);

      if (!res.success) {
        setError(res.error || "Something went wrong. Please try again.");
        return;
      }

      setResult(res.rewritten);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Could not reach the server. Is the API running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          AI Tone Rewriter
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Rewrite your text in any tone, instantly.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          rows={6}
          className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />

        <div className="flex items-center justify-between mt-4">
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {TONES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleRewrite}
            disabled={loading || !text.trim()}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Rewriting..." : "Rewrite"}
          </button>
        </div>

        {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

        {result && (
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
              Rewritten
            </p>
            <p className="text-sm text-gray-800 whitespace-pre-wrap">
              {result}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ToneWriter;
