import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-3 flex items-center gap-1 text-xs text-[var(--color-muted)] sm:text-sm"
    >
      {items.map((c, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {c.href && !isLast ? (
              <Link
                href={c.href}
                className="hover:text-[var(--color-accent)] transition-colors truncate max-w-[160px] sm:max-w-none"
              >
                {c.label}
              </Link>
            ) : (
              <span className="text-white/85 truncate max-w-[200px] sm:max-w-none">
                {c.label}
              </span>
            )}
            {!isLast && (
              <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />
            )}
          </span>
        );
      })}
    </nav>
  );
}
