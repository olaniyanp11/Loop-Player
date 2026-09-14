import {
  AudioWaveform,
  ChevronLeft,
  ChevronRight,
  Folder,
  FolderOpen,
  Gauge,
  ListMusic,
  Pause,
  Play,
  Repeat2,
  RotateCcw,
  Search,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";

import { cn } from "@/lib/utils";

const tracks = [
  ["Awake Pad", "100", "04:32"],
  ["Blue Hour", "92", "03:48"],
  ["Open Sky", "110", "05:16"],
  ["Still Waters", "74", "06:08"],
  ["The Gathering", "120", "04:04"],
];

const waveBars = [22, 42, 30, 66, 48, 78, 38, 58, 84, 52, 70, 32, 62, 88, 46, 74, 56, 92, 68, 44, 80, 52, 72, 36, 60, 82, 48, 68, 40, 56, 76, 34, 64, 86, 50, 70, 42, 78, 58, 88, 46, 66, 38, 72, 54, 82, 44, 62];

export function AppWindow({ className, annotated = false }: { className?: string; annotated?: boolean }) {
  return (
    <div className={cn("relative", className)}>
      {annotated && (
        <>
          <Callout className="-left-8 top-24 hidden xl:flex" label="Library" line="right" />
          <Callout className="-right-10 top-40 hidden xl:flex" label="Waveform" line="left" />
          <Callout className="-right-8 bottom-28 hidden xl:flex" label="Tempo + pitch" line="left" />
        </>
      )}
      <div className="overflow-hidden rounded-lg border border-app-border bg-app shadow-app">
        <div className="grid h-10 grid-cols-[1fr_auto_1fr] items-center border-b border-app-border bg-app-chrome px-3">
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-destructive/80" />
            <span className="size-2 rounded-full bg-warning/80" />
            <span className="size-2 rounded-full bg-success/80" />
          </div>
          <div className="flex items-center gap-2 text-[10px] font-medium text-app-muted">
            <AudioWaveform className="size-3 text-primary" /> Loop Player
          </div>
          <div />
        </div>

        <div className="grid min-h-[390px] grid-cols-[140px_minmax(0,1fr)] sm:min-h-[460px] sm:grid-cols-[190px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="border-r border-app-border bg-app-sidebar p-2.5 sm:p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-app-muted">Library</span>
              <FolderOpen className="size-3.5 text-primary" />
            </div>
            <div className="mb-3 flex h-7 items-center gap-2 rounded border border-app-border bg-app px-2 text-[9px] text-app-muted">
              <Search className="size-3" /> Search loops
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 rounded bg-primary/12 px-2 py-2 text-[10px] text-primary">
                <Folder className="size-3" /> Live Set
              </div>
              {tracks.map(([name, bpm, duration], index) => (
                <div
                  key={name}
                  className={cn(
                    "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded px-2 py-2 text-[8px] sm:text-[10px]",
                    index === 2 ? "bg-app-selected text-app-foreground" : "text-app-muted",
                  )}
                >
                  <span className="truncate">{name}</span>
                  <span className="hidden text-[8px] opacity-60 sm:block">{bpm} · {duration}</span>
                </div>
              ))}
            </div>
          </aside>

          <div className="flex min-w-0 flex-col p-3 sm:p-5 lg:p-7">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-primary">Now playing</span>
                <h3 className="mt-1 truncate font-display text-base font-semibold text-app-foreground sm:text-xl">Open Sky</h3>
                <p className="text-[9px] text-app-muted sm:text-[10px]">Live Set / Atmospheres</p>
              </div>
              <span className="rounded border border-app-border px-2 py-1 text-[8px] text-app-muted">WAV · 48 kHz</span>
            </div>

            <div className="my-auto py-6 sm:py-8">
              <div className="relative flex h-28 items-center gap-[2px] overflow-hidden sm:h-36 sm:gap-[3px]">
                <div className="absolute inset-y-0 left-[38%] z-10 w-px bg-primary shadow-playhead" />
                {waveBars.map((height, index) => (
                  <span
                    key={`${height}-${index}`}
                    className={cn("wave-bar min-w-[2px] flex-1 rounded-full", index < 19 ? "bg-primary" : "bg-wave")}
                    style={{ height: `${height}%`, animationDelay: `${index * -28}ms` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between font-mono text-[8px] text-app-muted">
                <span>01:47.2</span><span>05:16.0</span>
              </div>
            </div>

            <div className="grid items-center gap-3 border-t border-app-border pt-4 md:grid-cols-[1fr_auto_1fr]">
              <div className="hidden items-center gap-2 md:flex">
                <Volume2 className="size-3.5 text-app-muted" />
                <span className="h-1 w-16 overflow-hidden rounded-full bg-app-border"><span className="block h-full w-2/3 bg-app-muted" /></span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ControlIcon><SkipBack /></ControlIcon>
                <ControlIcon><RotateCcw /></ControlIcon>
                <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow sm:size-12"><Pause className="size-4 fill-current" /></span>
                <ControlIcon><SkipForward /></ControlIcon>
                <span className="grid size-8 place-items-center rounded border border-primary/40 bg-primary/10 text-primary"><Repeat2 className="size-3.5" /></span>
              </div>
              <div className="hidden justify-end text-[9px] text-app-muted md:flex">LOOP ON</div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-[1fr_1fr_auto]">
              <div className="rounded border border-app-border bg-app-panel p-2.5 sm:p-3">
                <div className="mb-2 flex items-center justify-between text-[8px] uppercase tracking-[0.12em] text-app-muted"><span>Tempo</span><Gauge className="size-3" /></div>
                <div className="flex items-center justify-between gap-1">
                  <MiniControl>−10</MiniControl><MiniControl>−1</MiniControl>
                  <span className="px-1 font-mono text-lg font-semibold text-primary sm:text-2xl">110<span className="ml-1 text-[8px] text-app-muted">BPM</span></span>
                  <MiniControl>+1</MiniControl><MiniControl>+10</MiniControl>
                </div>
              </div>
              <div className="rounded border border-app-border bg-app-panel p-2.5 sm:p-3">
                <div className="mb-2 text-[8px] uppercase tracking-[0.12em] text-app-muted">Pitch</div>
                <div className="flex items-center justify-between"><MiniControl>−</MiniControl><span className="font-mono text-lg text-app-foreground sm:text-2xl">0<span className="ml-1 text-[8px] text-app-muted">ST</span></span><MiniControl>+</MiniControl></div>
              </div>
              <div className="col-span-2 hidden items-center gap-2 rounded border border-app-border bg-app-panel px-3 text-app-muted sm:flex sm:col-span-1">
                <ChevronLeft className="size-3" /><ListMusic className="size-4 text-primary" /><ChevronRight className="size-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ControlIcon({ children }: { children: React.ReactNode }) {
  return <span className="grid size-8 place-items-center rounded text-app-muted [&_svg]:size-3.5">{children}</span>;
}

function MiniControl({ children }: { children: React.ReactNode }) {
  return <span className="grid h-6 min-w-6 place-items-center rounded border border-app-border bg-app text-[8px] text-app-muted">{children}</span>;
}

function Callout({ className, label, line }: { className: string; label: string; line: "left" | "right" }) {
  return (
    <div className={cn("absolute z-20 items-center gap-2", className)}>
      {line === "left" && <span className="h-px w-12 bg-primary/50" />}
      <span className="rounded border border-primary/30 bg-background/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary backdrop-blur">{label}</span>
      {line === "right" && <span className="h-px w-12 bg-primary/50" />}
    </div>
  );
}