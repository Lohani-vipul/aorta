import { Activity, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { EcgField } from "@/components/ecg-field";
import { IntakePanel } from "@/components/intake-panel";
import { ReadoutPanel } from "@/components/readout-panel";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_INPUT,
  estimateRisk,
  PRESETS,
  type PatientInput,
} from "@/lib/risk";
import { cn } from "@/lib/utils";

export function Desk() {
  const [input, setInput] = useState<PatientInput>(DEFAULT_INPUT);
  const [scanning, setScanning] = useState(false);
  const [activePreset, setActivePreset] = useState("baseline");
  const report = useMemo(() => estimateRisk(input), [input]);

  function applyPreset(id: string) {
    const p = PRESETS.find((x) => x.id === id);
    if (!p) return;
    setActivePreset(id);
    setInput(p.value);
  }

  function runScan() {
    setScanning(true);
    window.setTimeout(() => setScanning(false), 850);
  }

  return (
    <div className="relative min-h-dvh bg-bg">
      <EcgField className="pointer-events-none absolute top-16 right-0 left-0 h-20 w-full text-fg/40" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pt-10 pb-16 sm:px-8 sm:pt-14">
        <header className="stagger-in flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[0.65rem] tracking-[0.28em] text-subtle uppercase">
              Aorta · risk desk
            </p>
            <p className="font-mono text-[0.65rem] text-subtle tabular-nums">Educational use</p>
          </div>
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-fg sm:text-5xl">
              Read the profile.
              <span className="mt-1 block italic text-muted">Not the diagnosis.</span>
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
              A weighted clinical estimator using the same markers as a typical heart-disease
              notebook: pain class, ST geometry, pressure, lipids, reserve. It is a desk, not a
              doctor.
            </p>
          </div>
        </header>

        <div className="flex flex-wrap items-center gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => applyPreset(p.id)}
              className={cn(
                "rounded-full px-3 py-2 text-xs font-medium transition-[background-color,color] duration-(--motion-quick)",
                activePreset === p.id
                  ? "bg-accent text-accent-fg"
                  : "bg-elevated text-muted hover:text-fg",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="rounded-3xl bg-surface p-6 shadow-[var(--shadow-border)] sm:p-8">
            <IntakePanel
              value={input}
              onChange={(next) => {
                setActivePreset("");
                setInput(next);
              }}
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="flex-1" onClick={runScan}>
                <Activity />
                Run analysis
              </Button>
              <Button
                variant="outline"
                className="sm:w-40"
                onClick={() => {
                  setActivePreset("baseline");
                  setInput(DEFAULT_INPUT);
                }}
              >
                <RotateCcw />
                Reset
              </Button>
            </div>
          </div>

          <div className="lg:sticky lg:top-8">
            <ReadoutPanel report={report} scanning={scanning} />
          </div>
        </div>

        <footer className="border-t border-border pt-6 text-xs leading-relaxed text-subtle">
          Aorta is an educational model inspired by public heart-disease feature sets. It does not
          replace examination, imaging, or a licensed clinician. Do not use it for emergencies.
        </footer>
      </div>
    </div>
  );
}
