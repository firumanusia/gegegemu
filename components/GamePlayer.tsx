"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize2, RotateCcw, Play } from "lucide-react";
import { parseAspectRatio } from "@/lib/games";

export function GamePlayer({
  src,
  title,
  aspectRatio,
}: {
  src: string;
  title: string;
  aspectRatio: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [started, setStarted] = useState(false);
  const ratio = parseAspectRatio(aspectRatio);

  function fullscreen() {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen?.().catch(() => {});
    }
  }

  function reload() {
    if (!iframeRef.current) return;
    setLoaded(false);
    iframeRef.current.src = iframeRef.current.src;
  }

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setLoaded(true), 8000);
    return () => clearTimeout(t);
  }, [started]);

  // Container fits available width but also caps by viewport height so the
  // game never gets pushed below the fold. The CSS variable is used both as
  // max-height and to derive a height-driven max-width via aspect ratio.
  const containerStyle: React.CSSProperties = {
    aspectRatio: `${ratio}`,
    maxHeight: "var(--player-max-h)",
    maxWidth: `calc(var(--player-max-h) * ${ratio})`,
    width: "100%",
    marginInline: "auto",
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={containerRef}
        style={containerStyle}
        className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-black shadow-2xl"
      >
        {!started ? (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="group absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-surface-2)] to-[var(--color-surface)]"
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 30%, rgba(255,107,53,0.4), transparent 60%), radial-gradient(circle at 70% 70%, rgba(255,182,39,0.3), transparent 60%)",
              }}
            />
            <span className="relative z-10 flex items-center gap-3 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#ffb627] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-orange-500/30 transition-transform group-hover:scale-105 group-active:scale-95">
              <Play className="h-6 w-6 fill-white" />
              Play {title}
            </span>
          </button>
        ) : (
          <>
            <iframe
              ref={iframeRef}
              src={src}
              title={title}
              onLoad={() => setLoaded(true)}
              allow="autoplay; fullscreen; gamepad; pointer-lock"
              sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups allow-forms allow-modals allow-orientation-lock"
              className="absolute inset-0 h-full w-full border-0"
            />
            {!loaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--color-surface)]/90 backdrop-blur">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-accent)]" />
                <p className="text-sm text-[var(--color-muted)]">
                  Loading {title}…
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {started && (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={fullscreen}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-3 py-2 text-sm font-medium text-white transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-2)]"
          >
            <Maximize2 className="h-4 w-4" />
            Fullscreen
          </button>
          <button
            type="button"
            onClick={reload}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-3 py-2 text-sm font-medium text-white transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-2)]"
          >
            <RotateCcw className="h-4 w-4" />
            Restart
          </button>
        </div>
      )}
    </div>
  );
}
