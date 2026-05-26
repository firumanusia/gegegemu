import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 group"
      aria-label="gegegemu home"
    >
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#ffb627] shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-105">
        <Sparkles className="h-5 w-5 text-white" strokeWidth={2.5} />
      </span>
      {!compact && (
        <span
          className="text-xl font-semibold tracking-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          gege<span className="text-gradient">gemu</span>
        </span>
      )}
    </Link>
  );
}
