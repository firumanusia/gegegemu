"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Flame,
  Sparkles,
  Clock,
  Puzzle,
  Joystick,
  Swords,
  Smile,
  Brain,
  Car,
  Trophy,
  Target,
  Mountain,
  Spade,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
  puzzle: Puzzle,
  joystick: Joystick,
  swords: Swords,
  smile: Smile,
  brain: Brain,
  car: Car,
  trophy: Trophy,
  target: Target,
  mountain: Mountain,
  spade: Spade,
};

const primaryLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/games?sort=new", label: "New", icon: Sparkles },
  { href: "/games?sort=popular", label: "Popular", icon: Flame },
  { href: "/games?sort=recent", label: "Recently played", icon: Clock },
];

export function Sidebar({
  categories,
  onNavigate,
}: {
  categories: Category[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col gap-1 p-4 scrollbar-thin overflow-y-auto">
      <div className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted)]">
        Browse
      </div>
      {primaryLinks.map(({ href, label, icon: Icon }) => {
        const active =
          href === "/"
            ? pathname === "/"
            : pathname.startsWith(href.split("?")[0]);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              active
                ? "bg-[var(--color-surface-2)] text-white"
                : "text-[var(--color-muted)] hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}

      <div className="mt-6 px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted)]">
        Categories
      </div>
      {categories.map((cat) => {
        const Icon = iconMap[cat.icon] ?? Puzzle;
        const href = `/categories/${cat.slug}`;
        const active = pathname === href;
        return (
          <Link
            key={cat.slug}
            href={href}
            onClick={onNavigate}
            className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              active
                ? "bg-[var(--color-surface-2)] text-white"
                : "text-[var(--color-muted)] hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{cat.name}</span>
          </Link>
        );
      })}

      <div className="mt-auto px-3 pt-6 text-xs text-[var(--color-muted)]">
        <p className="leading-relaxed">
          All games here are open source. Built with love for browser play.
        </p>
      </div>
    </nav>
  );
}
