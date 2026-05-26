"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { SurpriseButton } from "./SurpriseButton";
import categoriesData from "@/data/categories.json";
import gamesData from "@/data/games.json";
import type { Category, Game } from "@/lib/types";

const categories = categoriesData as Category[];
const games = gamesData as Game[];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-[240px] lg:shrink-0 lg:flex-col lg:border-r lg:border-[var(--color-border)] lg:bg-[var(--color-surface)]/40 lg:backdrop-blur">
        <div className="flex h-16 items-center px-6 border-b border-[var(--color-border)]">
          <Logo />
        </div>
        <div className="flex-1 min-h-0">
          <Sidebar categories={categories} />
        </div>
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-hidden
          />
          <aside className="relative flex h-full w-[280px] flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl">
            <div className="flex h-16 items-center justify-between px-4 border-b border-[var(--color-border)]">
              <Logo />
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="rounded-lg p-2 text-[var(--color-muted)] hover:bg-white/5 hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 min-h-0">
              <Sidebar
                categories={categories}
                onNavigate={() => setDrawerOpen(false)}
              />
            </div>
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-bg)]/70 px-4 backdrop-blur-md sm:px-6">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="rounded-lg p-2 text-[var(--color-muted)] hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="lg:hidden">
            <Logo compact />
          </div>
          <div className="flex-1 flex justify-center">
            <SearchBar />
          </div>
          <SurpriseButton games={games} />
        </header>

        <main className="flex-1 min-w-0">{children}</main>

        <footer className="mt-12 border-t border-[var(--color-border)] px-6 py-10 text-xs text-[var(--color-muted)]">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div>
                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white">Play</h3>
                <ul className="space-y-2">
                  <li><a className="hover:text-[var(--color-accent)]" href="/">Home</a></li>
                  <li><a className="hover:text-[var(--color-accent)]" href="/games">All games</a></li>
                  <li><a className="hover:text-[var(--color-accent)]" href="/games?sort=new">New</a></li>
                  <li><a className="hover:text-[var(--color-accent)]" href="/games?sort=popular">Popular</a></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white">Categories</h3>
                <ul className="space-y-2">
                  {categories.slice(0, 6).map((cat) => (
                    <li key={cat.slug}>
                      <a className="hover:text-[var(--color-accent)]" href={`/categories/${cat.slug}`}>
                        {cat.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white">Site</h3>
                <ul className="space-y-2">
                  <li><a className="hover:text-[var(--color-accent)]" href="/about">About</a></li>
                  <li><a className="hover:text-[var(--color-accent)]" href="/contact">Contact</a></li>
                  <li><a className="hover:text-[var(--color-accent)]" href="/sitemap.xml">Sitemap</a></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white">Legal</h3>
                <ul className="space-y-2">
                  <li><a className="hover:text-[var(--color-accent)]" href="/privacy">Privacy</a></li>
                  <li><a className="hover:text-[var(--color-accent)]" href="/terms">Terms</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-[var(--color-border)] pt-6 sm:flex-row">
              <p>© {new Date().getFullYear()} gegegemu. All games belong to their respective authors.</p>
              <p>No downloads · No sign-ups · Just press play</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
