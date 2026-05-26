"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar({ initial = "" }: { initial?: string }) {
  const [value, setValue] = useState(initial);
  const router = useRouter();

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const q = value.trim();
        router.push(q ? `/games?q=${encodeURIComponent(q)}` : "/games");
      }}
      className="relative w-full max-w-md"
    >
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]"
        aria-hidden
      />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search games…"
        aria-label="Search games"
        className="h-10 w-full rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 pl-10 pr-4 text-sm text-white placeholder:text-[var(--color-muted)] outline-none transition-colors focus:border-[var(--color-accent)] focus:bg-[var(--color-surface-2)]"
      />
    </form>
  );
}
