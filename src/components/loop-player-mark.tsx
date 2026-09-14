import { AudioLines } from "lucide-react";

export function LoopPlayerMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="grid size-8 shrink-0 place-items-center rounded-md border border-primary/40 bg-primary/15 text-primary shadow-glow">
        <AudioLines className="size-4" aria-hidden="true" />
      </span>
      {!compact && <span className="font-display text-sm font-semibold text-foreground">Loop Player</span>}
    </span>
  );
}
