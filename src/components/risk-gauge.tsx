import { BAND_COPY, type RiskBand } from "@/lib/risk";
import { cn } from "@/lib/utils";

const R = 86;
const C = 2 * Math.PI * R;
const ARC = 0.75;

function toneClass(band: RiskBand) {
  if (band === "high") return "text-danger";
  if (band === "elevated") return "text-warn";
  return "text-ok";
}

export function RiskGauge({ score, band }: { score: number; band: RiskBand }) {
  const filled = C * ARC * (score / 100);
  const track = C * ARC;
  const copy = BAND_COPY[band];

  return (
    <div className="relative mx-auto w-full max-w-xs">
      <svg viewBox="0 0 220 180" className="w-full" aria-hidden="true">
        <g transform="translate(110,110) rotate(135)">
          <circle
            r={R}
            fill="none"
            stroke="currentColor"
            className="text-elevated"
            strokeWidth="12"
            strokeDasharray={`${track} ${C}`}
            strokeLinecap="round"
          />
          <circle
            r={R}
            fill="none"
            stroke="currentColor"
            className={cn("transition-[stroke-dasharray] duration-500 ease-(--ease-smooth-out)", toneClass(band))}
            strokeWidth="12"
            strokeDasharray={`${filled} ${C}`}
            strokeLinecap="round"
          />
        </g>
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-4">
        <p className="font-mono text-[0.65rem] tracking-[0.22em] text-subtle uppercase">{copy.kicker}</p>
        <p className="font-display text-6xl leading-none tracking-tight text-fg tabular-nums">{score}</p>
        <p className="mt-1 font-mono text-xs text-muted">composite / 100</p>
      </div>
    </div>
  );
}
