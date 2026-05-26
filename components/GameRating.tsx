"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { track } from "@/lib/analytics";

const KEY = "gegegemu_ratings_v1";

type RatingMap = Record<string, number>;

function readRatings(): RatingMap {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as RatingMap) : {};
  } catch {
    return {};
  }
}

function writeRating(slug: string, value: number) {
  try {
    const data = readRatings();
    data[slug] = value;
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* localStorage unavailable */
  }
}

export function GameRating({ slug }: { slug: string }) {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [justSet, setJustSet] = useState(false);

  useEffect(() => {
    setRating(readRatings()[slug] ?? 0);
  }, [slug]);

  function setStar(value: number) {
    setRating(value);
    writeRating(slug, value);
    track("rate_game", { game_slug: slug, rating: value });
    setJustSet(true);
    setTimeout(() => setJustSet(false), 1400);
  }

  // SSR: skip render until hydrated to avoid hydration mismatch on the star fills
  if (rating === null) return null;

  const display = hover ?? rating;
  const hasRating = rating > 0;

  return (
    <div className="inline-flex items-center gap-2">
      <div
        className="inline-flex items-center gap-0.5"
        onMouseLeave={() => setHover(null)}
        role="radiogroup"
        aria-label="Rate this game"
      >
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = i <= display;
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={i === rating}
              aria-label={`Rate ${i} star${i === 1 ? "" : "s"}`}
              onMouseEnter={() => setHover(i)}
              onClick={() => setStar(i)}
              className="rounded-md p-1 transition-transform hover:scale-110 active:scale-95"
            >
              <Star
                className={`h-4 w-4 transition-colors ${
                  filled
                    ? "fill-[#ffb627] text-[#ffb627]"
                    : "text-[var(--color-muted)]/40"
                }`}
                strokeWidth={1.8}
              />
            </button>
          );
        })}
      </div>
      <span className="text-[11px] font-medium text-[var(--color-muted)] min-w-[88px]">
        {justSet
          ? "Thanks!"
          : hasRating
            ? `Your rating: ${rating}/5`
            : "Rate this game"}
      </span>
    </div>
  );
}
