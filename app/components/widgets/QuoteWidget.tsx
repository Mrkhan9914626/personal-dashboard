"use client";
import { useState, useEffect } from "react";
import Card from "@/app/components/ui/Card";

type Quote = { content: string; author: string };

export default function QuoteWidget() {
  const [quote, setQuote]     = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = () => {
    setLoading(true);
    fetch("/api/quote")
      .then((r) => r.json())
      .then((d) => {
        setQuote(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <Card>
      <p className="text-xs text-dashboard-accent uppercase tracking-widest mb-3 font-semibold">
        Quote of the Hour
      </p>
      {loading ? (
        <div className="space-y-2">
          <div className="h-4 bg-dashboard-border rounded animate-pulse" />
          <div className="h-4 bg-dashboard-border rounded animate-pulse w-3/4" />
        </div>
      ) : (
        <>
          <blockquote className="text-dashboard-text text-sm italic leading-relaxed mb-3">
            &ldquo;{quote?.content}&rdquo;
          </blockquote>
          <p className="text-dashboard-muted text-xs text-right">
            — {quote?.author}
          </p>
        </>
      )}
      <button
        onClick={fetchQuote}
        className="mt-3 text-xs text-dashboard-accent hover:underline"
      >
        New quote →
      </button>
    </Card>
  );
}
