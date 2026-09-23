import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

export function Field({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <Label>{label}</Label>
        {value ? <span className="font-mono text-xs text-fg tabular-nums">{value}</span> : null}
      </div>
      {children}
    </div>
  );
}
