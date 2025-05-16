"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-300 to-red-500 text-white p-8">
      <AlertCircle className="w-20 h-20 text-white animate-pulse" />
      <h1 className="mt-6 text-6xl font-extrabold uppercase tracking-tight animate-bounce">
        Ooops!
      </h1>
      <p className="mt-4 text-lg max-w-md text-center opacity-90">
        Da ist wohl irgendwas schiefgelaufen. Keine Sorge, wir arbeiten daran!
      </p>
      <button
        onClick={() => reset()}
        className="mt-8 inline-flex items-center gap-2 bg-white text-red-500 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition"
      >
        <RefreshCcw className="w-5 h-5" />
        Erneut versuchen
      </button>
    </div>
  );
}
