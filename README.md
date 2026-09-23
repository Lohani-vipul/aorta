# Aorta · Heart Risk Desk (React)

Premium clinical UI for an **educational** heart-risk score. Runs fully in the browser — no Python, no `.pkl` files.

> Not a medical device. Not a diagnosis.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- Radix UI (slider / select)
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Deploy on Vercel (live)

1. Push this folder to a **new** GitHub repo.
2. Go to [vercel.com](https://vercel.com) → sign in with GitHub.
3. **Add New Project** → import that repo.
4. Framework: **Vite** (auto-detected).
5. Build command: `npm run build`
6. Output directory: `dist`
7. Deploy.

Live URL: `https://your-project.vercel.app`

## Note on the model

This UI uses a **client-side weighted estimator** (`src/lib/risk.ts`), not your KNN `.pkl` files.

- Streamlit + pkls → real trained model  
- This React app → matching *look* + transparent JS score  

To use the real KNN later, add a small Python API and call it from the form.
