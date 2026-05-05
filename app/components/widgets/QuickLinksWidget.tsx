"use client";
import { useState } from "react";
import Card from "@/app/components/ui/Card";

type QuickLink = { id: string; name: string; url: string };

export default function QuickLinksWidget({
  initialLinks,
}: {
  initialLinks: QuickLink[];
}) {
  const [links, setLinks] = useState<QuickLink[]>(initialLinks);
  const [name, setName]   = useState("");
  const [url, setUrl]     = useState("");

  async function addLink(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;
    const href = url.startsWith("http") ? url : `https://${url}`;
    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, url: href }),
    });
    const newLink = await res.json();
    setLinks((prev) => [newLink, ...prev]);
    setName("");
    setUrl("");
  }

  async function deleteLink(id: string) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
    await fetch(`/api/links/${id}`, { method: "DELETE" });
  }

  function getHostname(linkUrl: string): string {
    try {
      return new URL(linkUrl).hostname;
    } catch {
      return "";
    }
  }

  return (
    <Card title="Quick Links">
      <div className="flex flex-wrap gap-2 mb-4 min-h-[2.5rem]">
        {links.map((link) => (
          <div key={link.id} className="group relative">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-dashboard-bg border border-dashboard-border hover:border-dashboard-accent text-dashboard-text text-sm px-3 py-1.5 rounded-full transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://www.google.com/s2/favicons?domain=${getHostname(link.url)}&sz=16`}
                alt=""
                className="w-4 h-4"
              />
              {link.name}
            </a>
            <button
              onClick={() => deleteLink(link.id)}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
            >
              ✕
            </button>
          </div>
        ))}
        {links.length === 0 && (
          <p className="text-dashboard-muted text-sm">No links yet</p>
        )}
      </div>

      <form onSubmit={addLink} className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-28 bg-dashboard-bg border border-dashboard-border rounded-lg px-3 py-1.5 text-sm text-dashboard-text placeholder-dashboard-muted focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL (e.g. github.com)"
          className="flex-1 bg-dashboard-bg border border-dashboard-border rounded-lg px-3 py-1.5 text-sm text-dashboard-text placeholder-dashboard-muted focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
        />
        <button
          type="submit"
          disabled={!name.trim() || !url.trim()}
          className="bg-dashboard-accent text-white px-4 py-1.5 rounded-lg text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
        >
          Add
        </button>
      </form>
    </Card>
  );
}
