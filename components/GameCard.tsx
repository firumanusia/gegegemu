import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import type { Game } from "@/lib/types";

type Size = "sm" | "md" | "lg";

const sizeClasses: Record<Size, string> = {
  sm: "rounded-xl",
  md: "rounded-xl",
  lg: "rounded-2xl",
};

export function GameCard({
  game,
  size = "md",
  priority = false,
}: {
  game: Game;
  size?: Size;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/games/${game.slug}`}
      prefetch={false}
      className={`group relative block overflow-hidden ${sizeClasses[size]} border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/60 hover:shadow-[0_10px_30px_-10px_rgba(255,107,53,0.5)]`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-[var(--color-surface-2)] to-[var(--color-surface)]">
        <Image
          src={game.thumbnail}
          alt={game.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ffb627] shadow-lg shadow-orange-500/40">
            <Play className="h-5 w-5 fill-white text-white ml-0.5" />
          </span>
        </div>
      </div>
      <div className="px-3 py-2.5">
        <h3 className="truncate text-sm font-medium text-white">
          {game.title}
        </h3>
      </div>
    </Link>
  );
}
