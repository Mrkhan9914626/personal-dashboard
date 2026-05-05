"use client";
import { useTheme } from "@/app/components/providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-dashboard-card border border-dashboard-border text-dashboard-muted hover:text-dashboard-text hover:border-dashboard-accent transition-colors text-xl"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
