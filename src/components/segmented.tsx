import { cn } from "@/lib/utils";

type Option<T extends string | number> = { value: T; label: string };

export function Segmented<T extends string | number>({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: T;
  onChange: (v: T) => void;
  options: Option<T>[];
  ariaLabel: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="flex rounded-lg bg-elevated p-1 shadow-[var(--shadow-border)]"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "h-9 min-w-0 flex-1 rounded-md px-2 text-xs font-medium transition-[background-color,color] duration-(--motion-quick) ease-(--ease-out)",
              active ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
