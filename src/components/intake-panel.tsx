import { Field } from "@/components/field";
import { Segmented } from "@/components/segmented";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type {
  ChestPain,
  PatientInput,
  RestingEcg,
  Sex,
  StSlope,
  Yn,
} from "@/lib/risk";

export function IntakePanel({
  value,
  onChange,
}: {
  value: PatientInput;
  onChange: (next: PatientInput) => void;
}) {
  const set = <K extends keyof PatientInput>(key: K, v: PatientInput[K]) =>
    onChange({ ...value, [key]: v });

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-5">
        <h2 className="text-xs font-medium tracking-[0.18em] text-subtle uppercase">Subject</h2>
        <Field label="Age" value={`${value.age} yr`}>
          <Slider
            min={18}
            max={100}
            step={1}
            value={[value.age]}
            onValueChange={([v]) => set("age", v)}
            aria-label="Age"
          />
        </Field>
        <Field label="Sex">
          <Segmented<Sex>
            ariaLabel="Sex"
            value={value.sex}
            onChange={(v) => set("sex", v)}
            options={[
              { value: "M", label: "Male" },
              { value: "F", label: "Female" },
            ]}
          />
        </Field>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Resting BP" value={`${value.restingBp} mm Hg`}>
            <Slider
              min={80}
              max={200}
              step={1}
              value={[value.restingBp]}
              onValueChange={([v]) => set("restingBp", v)}
              aria-label="Resting blood pressure"
            />
          </Field>
          <Field label="Cholesterol" value={`${value.cholesterol} mg/dL`}>
            <Slider
              min={100}
              max={600}
              step={1}
              value={[value.cholesterol]}
              onValueChange={([v]) => set("cholesterol", v)}
              aria-label="Cholesterol"
            />
          </Field>
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-xs font-medium tracking-[0.18em] text-subtle uppercase">Cardiac</h2>
        <Field label="Chest pain">
          <Select value={value.chestPain} onValueChange={(v) => set("chestPain", v as ChestPain)}>
            <SelectTrigger aria-label="Chest pain type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ATA">ATA · atypical angina</SelectItem>
              <SelectItem value="NAP">NAP · non-anginal</SelectItem>
              <SelectItem value="TA">TA · typical angina</SelectItem>
              <SelectItem value="ASY">ASY · asymptomatic</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Resting ECG">
            <Select
              value={value.restingEcg}
              onValueChange={(v) => set("restingEcg", v as RestingEcg)}
            >
              <SelectTrigger aria-label="Resting ECG">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="ST">ST-T change</SelectItem>
                <SelectItem value="LVH">LV hypertrophy</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="ST slope">
            <Select value={value.stSlope} onValueChange={(v) => set("stSlope", v as StSlope)}>
              <SelectTrigger aria-label="ST slope">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Up">Up</SelectItem>
                <SelectItem value="Flat">Flat</SelectItem>
                <SelectItem value="Down">Down</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field label="Max heart rate" value={`${value.maxHr} bpm`}>
          <Slider
            min={60}
            max={220}
            step={1}
            value={[value.maxHr]}
            onValueChange={([v]) => set("maxHr", v)}
            aria-label="Max heart rate"
          />
        </Field>
        <Field label="Oldpeak" value={`${value.oldpeak.toFixed(1)} mm`}>
          <Slider
            min={0}
            max={6}
            step={0.1}
            value={[value.oldpeak]}
            onValueChange={([v]) => set("oldpeak", Math.round(v * 10) / 10)}
            aria-label="Oldpeak ST depression"
          />
        </Field>
        <Field label="Exercise angina">
          <Segmented<Yn>
            ariaLabel="Exercise-induced angina"
            value={value.exerciseAngina}
            onChange={(v) => set("exerciseAngina", v)}
            options={[
              { value: "N", label: "Absent" },
              { value: "Y", label: "Present" },
            ]}
          />
        </Field>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-xs font-medium tracking-[0.18em] text-subtle uppercase">Metabolic</h2>
        <Field label="Fasting blood sugar">
          <Segmented<0 | 1>
            ariaLabel="Fasting blood sugar"
            value={value.fastingBs}
            onChange={(v) => set("fastingBs", v)}
            options={[
              { value: 0, label: "≤ 120" },
              { value: 1, label: "> 120" },
            ]}
          />
        </Field>
      </section>
    </div>
  );
}
