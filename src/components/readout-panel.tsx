import { FactorChart } from "@/components/factor-chart";
import { RiskGauge } from "@/components/risk-gauge";
import { Badge } from "@/components/ui/badge";
import { BAND_COPY, type RiskReport } from "@/lib/risk";
import { cn } from "@/lib/utils";

export function ReadoutPanel({
  report,
  scanning,
}: {
  report: RiskReport;
  scanning: boolean;
}) {
  const tone = BAND_COPY[report.band].tone;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-surface p-6 shadow-[var(--shadow-border)] sm:p-8">
      {scanning ? (
        <div
          className="scan-line pointer-events-none absolute inset-x-6 top-0 z-10 h-24 bg-linear-to-b from-transparent via-accent/20 to-transparent"
          aria-hidden="true"
        />
      ) : null}

      <div className={cn("flex flex-col gap-8", scanning && "opacity-60")}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-subtle uppercase">Readout</p>
            <h2 className="font-display mt-1 text-2xl text-fg italic">{report.headline}</h2>
          </div>
          <Badge tone={tone}>{report.band}</Badge>
        </div>

        <RiskGauge score={report.score} band={report.band} />

        <p className="text-sm leading-relaxed text-muted">{report.summary}</p>

        <div>
          <p className="mb-4 text-xs font-medium tracking-[0.18em] text-subtle uppercase">
            Factor load
          </p>
          <FactorChart factors={report.factors} />
        </div>
      </div>
    </div>
  );
}
