"use client";
import { createContext, useContext, useState, useCallback } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({ theme: "dark", toggleTheme: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: string;
}) {
  const [theme, setTheme] = useState<Theme>(
    initialTheme === "light" ? "light" : "dark"
  );

  const toggleTheme = useCallback(async () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);

    document.documentElement.classList.toggle("dark", next === "dark");

    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme: next }),
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
