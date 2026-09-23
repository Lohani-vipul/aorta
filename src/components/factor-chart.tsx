import type { Factor } from "@/lib/risk";
import { cn } from "@/lib/utils";

export function FactorChart({ factors }: { factors: Factor[] }) {
  const ranked = [...factors].sort((a, b) => b.points - a.points);

  return (
    <ul className="flex flex-col gap-3">
      {ranked.map((f) => {
        const pct = Math.max(4, (f.points / f.max) * 100);
        return (
          <li key={f.id} className="grid grid-cols-[7.5rem_1fr_2.4rem] items-center gap-3">
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-fg">{f.label}</p>
              <p className="truncate text-[0.6875rem] text-subtle">{f.detail}</p>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-elevated">
              <div
                className={cn(
                  "h-full rounded-full bg-accent transition-[width] duration-500 ease-(--ease-smooth-out)",
                )}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-right font-mono text-xs text-muted tabular-nums">
              {f.points.toFixed(0)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
