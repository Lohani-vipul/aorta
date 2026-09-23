export function EcgField({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 640 80"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        className="ecg-trace"
        d="M0 42 H88 L96 42 L104 18 L112 62 L120 42 H176 L184 42 L190 8 L198 70 L206 42 H280 L288 42 L294 22 L302 58 L310 42 H390 L398 42 L406 14 L414 66 L422 42 H500 L508 42 L516 26 L524 54 L532 42 H640"
        stroke="currentColor"
        strokeWidth="1.25"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
