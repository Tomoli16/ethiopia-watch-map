import { gbifBiodiversityForRegion } from "./gbif-data";
import { livelihoodPopulationForRegion } from "./livelihood-data";
import { SOILGRIDS_REGION_SAMPLES } from "./soilgrids-data";

export type RiskLevel = "low" | "moderate" | "high" | "severe";

export interface RegionRisk {
  name: string;
  focus?: boolean;
}

export const REGION_DATA: Record<string, RegionRisk> = {
  Oromia: { name: "Oromia", focus: true },
  SNNPR: { name: "SNNPR", focus: true },
  "Beneshangul Gumu": { name: "Beneshangul Gumu", focus: true },
  Gambela: { name: "Gambela", focus: true },
};

export const FOCUS_REGIONS = Object.entries(REGION_DATA)
  .filter(([, r]) => r.focus)
  .map(([name]) => name);

export type ProxyKey =
  | "ecologicalRestorationPotential"
  | "biodiversityRecoveryValue"
  | "livelihoodImpact";

export interface ProxyMeta {
  key: ProxyKey;
  label: string;
  short: string;
  description: string;
  color: string;
}

export const PROXIES: ProxyMeta[] = [
  {
    key: "ecologicalRestorationPotential",
    label: "Ecological Restoration Potential",
    short: "ERP",
    description:
      "Real ISRIC SoilGrids v2.0 centroid sample: soil organic carbon, pH and texture.",
    color: "#22c55e",
  },
  {
    key: "biodiversityRecoveryValue",
    label: "Biodiversity Recovery Value",
    short: "BRV",
    description:
      "Real GBIF coordinated occurrence evidence by regional bounding box.",
    color: "#a855f7",
  },
  {
    key: "livelihoodImpact",
    label: "Livelihood Impact",
    short: "LI",
    description:
      "Real HDX/OCHA ADM3 2022 projected population aggregation.",
    color: "#f59e0b",
  },
];

export type Weights = Record<ProxyKey, number>;

export const DEFAULT_WEIGHTS: Weights = {
  ecologicalRestorationPotential: 40,
  biodiversityRecoveryValue: 30,
  livelihoodImpact: 30,
};

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const pct = (x: number) => Math.round(clamp01(x) * 100);

function soilPhSuitability(ph: number): number {
  if (ph >= 5.5 && ph <= 7.5) return 1;
  if (ph < 5.5) return clamp01((ph - 4) / 1.5);
  return clamp01((8.5 - ph) / 1);
}

function soilTextureSuitability(clayPct: number, sandPct: number): number {
  const clayOk = clayPct <= 45 ? 1 : clamp01((65 - clayPct) / 20);
  const sandOk = sandPct <= 55 ? 1 : clamp01((75 - sandPct) / 20);
  return clamp01((clayOk + sandOk) / 2);
}

export function soilGridsSampleForRegion(regionName?: string) {
  return regionName ? SOILGRIDS_REGION_SAMPLES[regionName] : undefined;
}

export function soilSuitabilityScoreForRegion(regionName?: string): number | null {
  const sample = soilGridsSampleForRegion(regionName);
  if (!sample) return null;

  const carbon = clamp01(sample.soilOrganicCarbonGkg / 50);
  const ph = soilPhSuitability(sample.phH2O);
  const texture = soilTextureSuitability(sample.clayPct, sample.sandPct);

  return pct((carbon + ph + texture) / 3);
}

export { gbifBiodiversityForRegion };
export { livelihoodPopulationForRegion };

export interface ProxyScores {
  ecologicalRestorationPotential: number;
  biodiversityRecoveryValue: number;
  livelihoodImpact: number;
}

export function proxyScores(r: RegionRisk): ProxyScores {
  return {
    ecologicalRestorationPotential: soilSuitabilityScoreForRegion(r.name) ?? 0,
    biodiversityRecoveryValue:
      gbifBiodiversityForRegion(r.name)?.occurrenceEvidenceScore ?? 0,
    livelihoodImpact:
      livelihoodPopulationForRegion(r.name)?.livelihoodEvidenceScore ?? 0,
  };
}

export function priorityScore(r: RegionRisk, weights: Weights): number {
  const p = proxyScores(r);
  const total = PROXIES.reduce((sum, proxy) => sum + weights[proxy.key], 0);
  if (total <= 0) return 0;
  const sum = PROXIES.reduce((acc, proxy) => acc + p[proxy.key] * weights[proxy.key], 0);
  return Math.round(sum / total);
}

export function priorityLevel(score: number): RiskLevel {
  if (score >= 70) return "severe";
  if (score >= 55) return "high";
  if (score >= 40) return "moderate";
  return "low";
}

export interface ColorStop {
  value: number;
  color: string;
  label: string;
}

export const PRIORITY_COLOR_STOPS: ColorStop[] = [
  { value: 0, color: "#2dd4bf", label: "0" },
  { value: 40, color: "#84cc16", label: "40" },
  { value: 55, color: "#facc15", label: "55" },
  { value: 70, color: "#f97316", label: "70" },
  { value: 100, color: "#dc2626", label: "100" },
];

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  return [
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16),
  ];
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  return `#${[r, g, b]
    .map((v) => Math.round(v).toString(16).padStart(2, "0"))
    .join("")}`;
}

export function colorForScore(score: number, stops: ColorStop[] = PRIORITY_COLOR_STOPS): string {
  const value = Math.min(100, Math.max(0, score));
  const sorted = [...stops].sort((a, b) => a.value - b.value);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  if (!first || !last) return "#737373";
  if (value <= first.value) return first.color;
  if (value >= last.value) return last.color;

  const upperIndex = sorted.findIndex((stop) => value <= stop.value);
  const lower = sorted[upperIndex - 1];
  const upper = sorted[upperIndex];
  const t = (value - lower.value) / (upper.value - lower.value);
  const lowerRgb = hexToRgb(lower.color);
  const upperRgb = hexToRgb(upper.color);

  return rgbToHex([
    lowerRgb[0] + (upperRgb[0] - lowerRgb[0]) * t,
    lowerRgb[1] + (upperRgb[1] - lowerRgb[1]) * t,
    lowerRgb[2] + (upperRgb[2] - lowerRgb[2]) * t,
  ]);
}

export const RISK_COLORS: Record<RiskLevel, string> = {
  severe: colorForScore(85),
  high: colorForScore(62),
  moderate: colorForScore(48),
  low: colorForScore(28),
};
