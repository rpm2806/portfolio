"use client";

import { useEffect, useState } from "react";

// Night-mode-only site: always apply the dark class on mount.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Force dark mode permanently
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return <>{children}</>;
}

// Stub – no toggle needed, but kept for any imports that use useTheme
export function useTheme() {
  return {
    theme: "dark" as const,
    toggleTheme: () => {},
    isDark: true,
  };
}
