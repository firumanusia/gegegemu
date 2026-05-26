"use client";

import { Dices } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Game } from "@/lib/types";

export function SurpriseButton({ games }: { games: Game[] }) {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        if (games.length === 0) return;
        setSpinning(true);
        const pick = games[Math.floor(Math.random() * games.length)];
        setTimeout(() => router.push(`/games/${pick.slug}`), 250);
      }}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-3.5 py-2 text-sm font-medium text-white transition-all hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-2)] active:scale-95"
      aria-label="Play a random game"
    >
      <Dices
        className={`h-4 w-4 transition-transform ${spinning ? "rotate-180" : ""}`}
      />
      <span className="hidden sm:inline">Surprise me</span>
    </button>
  );
}
