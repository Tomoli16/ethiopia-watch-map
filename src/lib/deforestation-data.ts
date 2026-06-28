import { climateSampleForAdm2 } from "./climate-adm2-data";
import { gbifBiodiversityForRegion } from "./gbif-data";
import { gbifBiodiversityForAdm2 } from "./gbif-adm2-data";
import { gfwTreeCoverLossForAdm2 } from "./gfw-adm2-data";
import { LANDCOVER_ADM2, landCoverForAdm2 } from "./landcover-adm2-data";
import {
  LIVELIHOOD_POPULATION_ADM2,
  livelihoodPopulationForAdm2,
  type LivelihoodPopulationAdm2,
} from "./livelihood-adm2-data";
import { livelihoodPopulationForRegion } from "./livelihood-data";
import { SOILGRIDS_ADM2_SAMPLES, soilGridsSampleForAdm2 } from "./soilgrids-adm2-data";
import { SOILGRIDS_REGION_SAMPLES } from "./soilgrids-data";
import { terrainSampleForAdm2 } from "./terrain-adm2-data";

export type RiskLevel = "low" | "moderate" | "high" | "severe";

export interface RegionRisk {
  name: string;
  focus?: boolean;
}

export type AnalysisLevel = "adm1" | "adm2";

export interface AnalysisUnit {
  id: string;
  name: string;
  level: AnalysisLevel;
  region: string;
  livelihoodAdm2?: LivelihoodPopulationAdm2;
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

export const ADM1_ANALYSIS_UNITS: AnalysisUnit[] = FOCUS_REGIONS.map((name) => ({
  id: name,
  name,
  level: "adm1",
  region: name,
}));

export const ADM2_ANALYSIS_UNITS: AnalysisUnit[] = Object.values(LIVELIHOOD_POPULATION_ADM2)
  .filter((zone) => SOILGRIDS_ADM2_SAMPLES[zone.id])
  .map((zone) => ({
    id: zone.id,
    name: zone.zone,
    level: "adm2" as const,
    region: zone.region,
    livelihoodAdm2: zone,
  }))
  .sort((a, b) => a.region.localeCompare(b.region) || a.name.localeCompare(b.name));

export function analysisUnitsForLevel(level: AnalysisLevel): AnalysisUnit[] {
  return level === "adm2" ? ADM2_ANALYSIS_UNITS : ADM1_ANALYSIS_UNITS;
}

export function analysisUnitById(id?: string): AnalysisUnit | undefined {
  if (!id) return undefined;
  return ADM1_ANALYSIS_UNITS.find((unit) => unit.id === id) ?? ADM2_ANALYSIS_UNITS.find((unit) => unit.id === id);
}

function normalizeAdm2Name(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\(r4\)/g, "or")
    .replace(/\(or\)/g, "or")
    .replace(/special woreda/g, "special")
    .replace(/special$/g, "")
    .replace(/zone$/g, "")
    .replace(/[^a-z0-9]+/g, "");
}

const ADM2_NAME_ALIASES: Record<string, string> = {
  "Beneshangul Gumu__Asosa": "Beneshangul Gumu__Assosa",
  "Beneshangul Gumu__Kemashi": "Beneshangul Gumu__Kamashi",
  "Gambela__Agnuak": "Gambela__Agnewak",
  "Gambela__Nuer": "Gambela__Nuwer",
  "Oromia__East Harerge": "Oromia__East Hararge",
  "Oromia__West Harerge": "Oromia__West Hararge",
  "Oromia__Horo Guduru": "Oromia__Horo Gudru Wellega",
  "Oromia__Ilubabor": "Oromia__Ilu Aba Bora",
  "Oromia__North Shewa(R4)": "Oromia__North Shewa (OR)",
  "SNNPR__Alaba": "SNNPR__Halaba",
  "SNNPR__Bench Maji": "SNNPR__Bench Sheko",
  "SNNPR__Dawro": "SNNPR__Dawuro",
  "SNNPR__Gamo Gofa": "SNNPR__Gamo",
  "SNNPR__Gedio": "SNNPR__Gedeo",
  "SNNPR__Gurage": "SNNPR__Guraghe",
  "SNNPR__Keffa": "SNNPR__Kefa",
  "SNNPR__Konta": "SNNPR__Konta Special",
  "SNNPR__KT": "SNNPR__Kembata Tembaro",
  "SNNPR__Selti": "SNNPR__Siltie",
  "SNNPR__Yem": "SNNPR__Yem Special",
};

export function adm2UnitId(region?: string, zone?: string): string | undefined {
  if (!region || !zone) return undefined;
  const exact = `${region}__${zone}`;
  if (LIVELIHOOD_POPULATION_ADM2[exact]) return exact;
  const alias = ADM2_NAME_ALIASES[exact];
  if (alias && LIVELIHOOD_POPULATION_ADM2[alias]) return alias;
  const normalizedZone = normalizeAdm2Name(zone);
  return ADM2_ANALYSIS_UNITS.find(
    (unit) => unit.region === region && normalizeAdm2Name(unit.name) === normalizedZone,
  )?.id;
}

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
      "Real GFW/UMD tree-cover loss, SoilGrids soil suitability, NASA POWER climate suitability and Open-Meteo terrain relief where ADM2 inputs are available.",
    color: "#22c55e",
  },
  {
    key: "biodiversityRecoveryValue",
    label: "Biodiversity Recovery Value",
    short: "BRV",
    description:
      "Real GBIF occurrence density plus ESA WorldCover habitat context where ADM2 inputs are available.",
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

function scaleRange(value: number, low: number, high: number): number {
  if (high <= low) return Math.round(value);
  return pct((value - low) / (high - low));
}

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

function soilSuitabilityScoreFromSample(sample?: {
  soilOrganicCarbonGkg: number;
  phH2O: number;
  clayPct: number;
  sandPct: number;
}): number | null {
  if (!sample) return null;
  const carbon = clamp01(sample.soilOrganicCarbonGkg / 50);
  const ph = soilPhSuitability(sample.phH2O);
  const texture = soilTextureSuitability(sample.clayPct, sample.sandPct);

  return pct((carbon + ph + texture) / 3);
}

export function soilSuitabilityScoreForRegion(regionName?: string): number | null {
  return soilSuitabilityScoreFromSample(soilGridsSampleForRegion(regionName));
}

export function soilSuitabilityScoreForAdm2(id?: string): number | null {
  return soilSuitabilityScoreFromSample(soilGridsSampleForAdm2(id));
}

export { gbifBiodiversityForAdm2 };
export { gbifBiodiversityForRegion };
export { gfwTreeCoverLossForAdm2 };
export { LANDCOVER_ADM2 };
export { landCoverForAdm2 };
export { livelihoodPopulationForAdm2 };
export { livelihoodPopulationForRegion };
export { soilGridsSampleForAdm2 };
export { terrainSampleForAdm2 };

export interface ProxyScores {
  ecologicalRestorationPotential: number;
  biodiversityRecoveryValue: number;
  livelihoodImpact: number;
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function weightedAverage(items: { value: number; weight: number }[]): number {
  const usable = items.filter((item) => item.weight > 0);
  if (usable.length === 0) return average(items.map((item) => item.value));
  const totalWeight = usable.reduce((sum, item) => sum + item.weight, 0);
  return Math.round(usable.reduce((sum, item) => sum + item.value * item.weight, 0) / totalWeight);
}

function adm2AreaKm2(id?: string): number {
  if (!id) return 0;
  return landCoverForAdm2(id)?.areaKm2 ?? livelihoodPopulationForAdm2(id)?.areaKm2 ?? 0;
}

function logScale(value: number, low: number, high: number): number {
  if (value <= 0 || high <= low) return 0;
  return clamp01((Math.log10(value) - Math.log10(low)) / (Math.log10(high) - Math.log10(low)));
}

export function gbifAreaNormalizedEvidenceScoreForAdm2(id?: string): number | null {
  const gbif = gbifBiodiversityForAdm2(id);
  const areaKm2 = adm2AreaKm2(id);
  if (!gbif || areaKm2 <= 0) return null;
  const allDensity = gbif.allOccurrences / areaKm2;
  const plantDensity = gbif.plantOccurrences / areaKm2;
  const birdDensity = gbif.birdOccurrences / areaKm2;
  return pct(
    logScale(allDensity, 0.05, 30) * 0.4 +
      logScale(plantDensity, 0.005, 3) * 0.3 +
      logScale(birdDensity, 0.02, 25) * 0.3,
  );
}

export function landCoverHabitatContextScoreForAdm2(id?: string): number | null {
  const landCover = landCoverForAdm2(id);
  if (!landCover) return null;
  const rawHabitat =
    landCover.treeCoverShare * 0.35 +
    landCover.openVegetationShare * 0.45 +
    landCover.waterWetlandShare * 0.2;
  return scaleRange(Math.round(rawHabitat * 100), 6, 41);
}

export function biodiversityRecoveryEvidenceScoreForAdm2(id?: string): number | null {
  const gbifScore = gbifAreaNormalizedEvidenceScoreForAdm2(id);
  const habitatScore = landCoverHabitatContextScoreForAdm2(id);
  if (gbifScore === null && habitatScore === null) return null;
  if (gbifScore === null) return habitatScore;
  if (habitatScore === null) return gbifScore;
  return Math.round(gbifScore * 0.75 + habitatScore * 0.25);
}

export function proxyScores(r: RegionRisk): ProxyScores {
  return proxyScoresForUnit({ id: r.name, name: r.name, level: "adm1", region: r.name });
}

export function proxyScoresForUnit(unit: AnalysisUnit): ProxyScores {
  if (unit.level === "adm1") {
    const children = ADM2_ANALYSIS_UNITS.filter((child) => child.region === unit.region);
    if (children.length > 0) {
      const childScores = children.map((child) => proxyScoresForUnit(child));
      return {
        ecologicalRestorationPotential: weightedAverage(
          childScores.map((score, index) => ({
            value: score.ecologicalRestorationPotential,
            weight: adm2AreaKm2(children[index].id),
          })),
        ),
        biodiversityRecoveryValue: weightedAverage(
          childScores.map((score, index) => ({
            value: score.biodiversityRecoveryValue,
            weight: adm2AreaKm2(children[index].id),
          })),
        ),
        livelihoodImpact: weightedAverage(
          childScores.map((score, index) => ({
            value: score.livelihoodImpact,
            weight: adm2AreaKm2(children[index].id),
          })),
        ),
      };
    }
  }

  const region = unit.region;
  const soilAdm2 = unit.level === "adm2" ? soilSuitabilityScoreForAdm2(unit.id) : null;
  const gfwAdm2 = unit.level === "adm2" ? gfwTreeCoverLossForAdm2(unit.id)?.degradationPressureScore : null;
  const climateAdm2 = unit.level === "adm2" ? climateSampleForAdm2(unit.id)?.climateSuitabilityScore : null;
  const terrainAdm2 = unit.level === "adm2" ? terrainSampleForAdm2(unit.id)?.terrainReliefScore : null;
  const gbifAdm2 = unit.level === "adm2" ? gbifBiodiversityForAdm2(unit.id) : undefined;
  const livelihoodAdm1 = livelihoodPopulationForRegion(region);
  const livelihoodAdm2 = unit.level === "adm2" ? livelihoodPopulationForAdm2(unit.id) : undefined;
  const soilScore = soilAdm2 ?? soilSuitabilityScoreForRegion(region) ?? null;
  // GFW tree-cover-loss is a sparse signal across Ethiopia: many ADM2 units have
  // genuinely 0 ha of recent loss, which does NOT mean "no restoration potential".
  // Treat GFW=0 as "no degradation pressure signal" so it doesn't drag ERP to 0,
  // and weight it lightly even when present (soil/climate/terrain are the primary
  // ecological-restoration drivers).
  const gfwSignal = typeof gfwAdm2 === "number" && gfwAdm2 > 0 ? gfwAdm2 : null;
  const ecologicalWeighted: { value: number; weight: number }[] = [
    { value: soilScore ?? 0, weight: soilScore !== null ? 1 : 0 },
    { value: climateAdm2 ?? 0, weight: climateAdm2 !== null && climateAdm2 !== undefined ? 1 : 0 },
    { value: terrainAdm2 ?? 0, weight: terrainAdm2 !== null && terrainAdm2 !== undefined ? 1 : 0 },
    { value: gfwSignal ?? 0, weight: gfwSignal !== null ? 0.4 : 0 },
  ];
  const rawEcologicalRestorationPotential = weightedAverage(ecologicalWeighted);
  const rawBiodiversityRecoveryValue =
    biodiversityRecoveryEvidenceScoreForAdm2(unit.id) ??
    gbifAdm2?.occurrenceEvidenceScore ??
    gbifBiodiversityForRegion(region)?.occurrenceEvidenceScore ??
    0;
  const rawLivelihoodImpact = livelihoodAdm2?.livelihoodEvidenceScore ?? livelihoodAdm1?.livelihoodEvidenceScore ?? 0;

  return {
    ecologicalRestorationPotential:
      unit.level === "adm2" ? scaleRange(rawEcologicalRestorationPotential, 50, 90) : rawEcologicalRestorationPotential,
    biodiversityRecoveryValue:
      unit.level === "adm2" ? scaleRange(rawBiodiversityRecoveryValue, 12, 98) : rawBiodiversityRecoveryValue,
    livelihoodImpact: unit.level === "adm2" ? scaleRange(rawLivelihoodImpact, 64, 99) : rawLivelihoodImpact,
  };
}

export function proxySourceLevelForUnit(unit: AnalysisUnit, key: ProxyKey): AnalysisLevel | "adm2-aggregate" | "none" {
  if (unit.level === "adm1") {
    return ADM2_ANALYSIS_UNITS.some((child) => child.region === unit.region) ? "adm2-aggregate" : "adm1";
  }
  if (key === "ecologicalRestorationPotential") {
    return gfwTreeCoverLossForAdm2(unit.id) ||
      soilGridsSampleForAdm2(unit.id) ||
      climateSampleForAdm2(unit.id) ||
      terrainSampleForAdm2(unit.id)
      ? "adm2"
      : soilGridsSampleForRegion(unit.region)
        ? "adm1"
        : "none";
  }
  if (key === "biodiversityRecoveryValue") {
    return gbifBiodiversityForAdm2(unit.id) ? "adm2" : gbifBiodiversityForRegion(unit.region) ? "adm1" : "none";
  }
  if (key === "livelihoodImpact") {
    return livelihoodPopulationForAdm2(unit.id) ? "adm2" : livelihoodPopulationForRegion(unit.region) ? "adm1" : "none";
  }
  return "none";
}

export function priorityScore(r: RegionRisk, weights: Weights): number {
  return priorityScoreForUnit({ id: r.name, name: r.name, level: "adm1", region: r.name }, weights);
}

export function priorityScoreForUnit(unit: AnalysisUnit, weights: Weights): number {
  const p = proxyScoresForUnit(unit);
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

export { climateSampleForAdm2 };

export const RISK_COLORS: Record<RiskLevel, string> = {
  severe: colorForScore(85),
  high: colorForScore(62),
  moderate: colorForScore(48),
  low: colorForScore(28),
};
