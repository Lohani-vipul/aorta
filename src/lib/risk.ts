export type Sex = "M" | "F";
export type ChestPain = "ATA" | "NAP" | "TA" | "ASY";
export type RestingEcg = "Normal" | "ST" | "LVH";
export type StSlope = "Up" | "Flat" | "Down";
export type Yn = "Y" | "N";

export type PatientInput = {
  age: number;
  sex: Sex;
  restingBp: number;
  cholesterol: number;
  fastingBs: 0 | 1;
  chestPain: ChestPain;
  restingEcg: RestingEcg;
  stSlope: StSlope;
  maxHr: number;
  oldpeak: number;
  exerciseAngina: Yn;
};

export type RiskBand = "low" | "elevated" | "high";

export type Factor = {
  id: string;
  label: string;
  detail: string;
  points: number;
  max: number;
};

export type RiskReport = {
  score: number;
  band: RiskBand;
  headline: string;
  summary: string;
  factors: Factor[];
  raw: number;
};

export const DEFAULT_INPUT: PatientInput = {
  age: 40,
  sex: "M",
  restingBp: 120,
  cholesterol: 200,
  fastingBs: 0,
  chestPain: "ATA",
  restingEcg: "Normal",
  stSlope: "Up",
  maxHr: 150,
  oldpeak: 1,
  exerciseAngina: "N",
};

export const PRESETS: { id: string; label: string; hint: string; value: PatientInput }[] = [
  {
    id: "baseline",
    label: "Baseline",
    hint: "Mid-40s, quiet markers",
    value: { ...DEFAULT_INPUT },
  },
  {
    id: "athlete",
    label: "Athlete",
    hint: "Young, high reserve",
    value: {
      age: 28,
      sex: "F",
      restingBp: 108,
      cholesterol: 168,
      fastingBs: 0,
      chestPain: "ATA",
      restingEcg: "Normal",
      stSlope: "Up",
      maxHr: 186,
      oldpeak: 0.2,
      exerciseAngina: "N",
    },
  },
  {
    id: "hypertensive",
    label: "Hypertensive",
    hint: "Older male, silent pain",
    value: {
      age: 64,
      sex: "M",
      restingBp: 162,
      cholesterol: 268,
      fastingBs: 1,
      chestPain: "ASY",
      restingEcg: "LVH",
      stSlope: "Flat",
      maxHr: 112,
      oldpeak: 2.4,
      exerciseAngina: "Y",
    },
  },
];

const CHEST: Record<ChestPain, { points: number; detail: string }> = {
  ATA: { points: 2, detail: "Atypical angina" },
  NAP: { points: 6, detail: "Non-anginal pain" },
  TA: { points: 10, detail: "Typical angina" },
  ASY: { points: 22, detail: "Asymptomatic presentation" },
};

const ECG: Record<RestingEcg, { points: number; detail: string }> = {
  Normal: { points: 0, detail: "Normal tracing" },
  ST: { points: 6, detail: "ST-T abnormality" },
  LVH: { points: 9, detail: "Left ventricular hypertrophy" },
};

const SLOPE: Record<StSlope, { points: number; detail: string }> = {
  Up: { points: 0, detail: "Upsloping ST" },
  Flat: { points: 12, detail: "Flat ST segment" },
  Down: { points: 16, detail: "Downsloping ST" },
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

export function estimateRisk(input: PatientInput): RiskReport {
  const expectedHr = 220 - input.age;
  const agePts = clamp((input.age - 28) * 0.72, 0, 28);
  const sexPts = input.sex === "M" ? 11 : 3;
  const bpPts = clamp((input.restingBp - 118) * 0.28, 0, 22);
  const cholPts = clamp((input.cholesterol - 190) * 0.07, 0, 18);
  const sugarPts = input.fastingBs === 1 ? 10 : 0;
  const hrPts = clamp((expectedHr - input.maxHr) * 0.32, 0, 22);
  const peakPts = clamp(input.oldpeak * 7.2, 0, 24);
  const anginaPts = input.exerciseAngina === "Y" ? 15 : 0;
  const chest = CHEST[input.chestPain];
  const ecg = ECG[input.restingEcg];
  const slope = SLOPE[input.stSlope];

  const factors: Factor[] = [
    {
      id: "age",
      label: "Age load",
      detail: `${input.age} years`,
      points: agePts,
      max: 28,
    },
    {
      id: "sex",
      label: "Sex",
      detail: input.sex === "M" ? "Male" : "Female",
      points: sexPts,
      max: 11,
    },
    {
      id: "pain",
      label: "Chest pain",
      detail: chest.detail,
      points: chest.points,
      max: 22,
    },
    {
      id: "bp",
      label: "Resting pressure",
      detail: `${input.restingBp} mm Hg`,
      points: bpPts,
      max: 22,
    },
    {
      id: "chol",
      label: "Cholesterol",
      detail: `${input.cholesterol} mg/dL`,
      points: cholPts,
      max: 18,
    },
    {
      id: "sugar",
      label: "Fasting sugar",
      detail: input.fastingBs === 1 ? "> 120 mg/dL" : "≤ 120 mg/dL",
      points: sugarPts,
      max: 10,
    },
    {
      id: "hr",
      label: "Heart-rate reserve",
      detail: `${input.maxHr} vs ${expectedHr} expected`,
      points: hrPts,
      max: 22,
    },
    {
      id: "peak",
      label: "ST depression",
      detail: `${input.oldpeak.toFixed(1)} mm`,
      points: peakPts,
      max: 24,
    },
    {
      id: "angina",
      label: "Exertional angina",
      detail: input.exerciseAngina === "Y" ? "Present" : "Absent",
      points: anginaPts,
      max: 15,
    },
    {
      id: "ecg",
      label: "Resting ECG",
      detail: ecg.detail,
      points: ecg.points,
      max: 9,
    },
    {
      id: "slope",
      label: "ST slope",
      detail: slope.detail,
      points: slope.points,
      max: 16,
    },
  ].map((f) => ({ ...f, points: Math.round(f.points * 10) / 10 }));

  const raw = factors.reduce((s, f) => s + f.points, 0);
  const score = Math.round(clamp(sigmoid((raw - 48) / 16) * 100, 3, 97));

  const band: RiskBand = score < 36 ? "low" : score < 66 ? "elevated" : "high";

  const headline =
    band === "high"
      ? "High composite risk"
      : band === "elevated"
        ? "Elevated composite risk"
        : "Low composite risk";

  const top = [...factors].sort((a, b) => b.points - a.points)[0];

  const summary =
    band === "high"
      ? `The estimator places this profile in the upper band. Strongest driver: ${top.label.toLowerCase()}. This is not a diagnosis — take it to a clinician.`
      : band === "elevated"
        ? `Markers sit above a quiet baseline. ${top.label} is the leading contributor. Review with a physician before acting on it.`
        : `Most markers sit in a quiet range. ${top.label} still leads the mix. Keep the usual preventive habits.`;

  return { score, band, headline, summary, factors, raw: Math.round(raw) };
}

export const BAND_COPY: Record<RiskBand, { kicker: string; tone: "ok" | "warn" | "danger" }> = {
  low: { kicker: "Quiet profile", tone: "ok" },
  elevated: { kicker: "Watch band", tone: "warn" },
  high: { kicker: "Action band", tone: "danger" },
};
