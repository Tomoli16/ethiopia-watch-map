import { gbifBiodiversityForRegion } from "./gbif-data";
import { livelihoodPopulationForRegion } from "./livelihood-data";
import { SOILGRIDS_REGION_SAMPLES } from "./soilgrids-data";

export type RiskLevel = "low" | "moderate" | "high" | "severe";

export interface RegionSources {
  forest: { label: string; url: string };
  population: { label: string; url: string };
  area: { label: string; url: string };
  rainfall: { label: string; url: string };
  elevation: { label: string; url: string };
  landcover: { label: string; url: string };
  protected: { label: string; url: string };
  restoration: { label: string; url: string };
  vegIndex: { label: string; url: string };
  carbon: { label: string; url: string };
  soil: { label: string; url: string };
  water: { label: string; url: string };
  biodiversity: { label: string; url: string };
  livelihood: { label: string; url: string };
}

export interface LandCover {
  forest: number;
  cropland: number;
  grassland: number;
  other: number;
}

export interface RegionRisk {
  name?: string;
  treeCover2000Ha: number;
  lossTotalHa: number;
  loss2023Ha: number;
  primaryLossHa: number;
  population: number;
  areaKm2: number;
  annualRainfallMm: number;
  meanElevationM: number;
  landCover: LandCover;
  protectedAreaPct: number;
  restorationPotentialHa: number;
  ndviMean: number;
  eviMean: number;
  ndviTrend: number;

  // --- Proxy inputs ---------------------------------------------------------
  // Carbon (ESA CCI Biomass 2020 + SoilGrids 0-30 cm)
  aboveGroundCarbonTha: number;     // tC/ha, aboveground live biomass
  soilOrganicCarbonTha: number;     // tC/ha, 0-30 cm SOC stock
  // Water / soil (RUSLE GloSEM + WRI Aqueduct 4.0)
  erosionRiskTHaYr: number;         // t/ha/yr, mean soil loss
  waterStressIndex: number;         // 0-5, Aqueduct baseline water stress
  // Biodiversity (KBA + GBIF / IBAT)
  kbaCoveragePct: number;           // 0-1, share of region in Key Biodiversity Areas
  speciesRichnessIndex: number;     // 0-100, tree / vertebrate richness (relative)
  // Livelihood (CSA + World Bank ETH poverty assessment 2020)
  ruralPopulationPct: number;       // 0-1
  povertyHeadcountPct: number;      // 0-1, $2.15/day headcount
  forestDependentPct: number;       // 0-1, share of households reliant on forest income

  drivers: string[];
  notes: string;
  focus?: boolean;
  sources: RegionSources;
}

const GFW = {
  label: "Global Forest Watch dashboard",
  url: "https://www.globalforestwatch.org/dashboards/country/ETH/",
};
const CSA_POP = {
  label: "CSA 2022 population projections",
  url: "https://www.statsethiopia.gov.et/",
};
const CSA_AREA = {
  label: "Ethiopia regional areas (CSA / HDX COD-AB-ETH)",
  url: "https://data.humdata.org/dataset/cod-ab-eth",
};
const CHIRPS = {
  label: "CHIRPS v2.0 rainfall (UCSB Climate Hazards Center)",
  url: "https://www.chc.ucsb.edu/data/chirps",
};
const SRTM = {
  label: "SRTM 30 m DEM (NASA/USGS)",
  url: "https://www.earthdata.nasa.gov/data/instruments/srtm",
};
const WORLDCOVER = {
  label: "ESA WorldCover 2021 (v200)",
  url: "https://esa-worldcover.org/en",
};
const WDPA = {
  label: "World Database on Protected Areas (UNEP-WCMC/IUCN)",
  url: "https://www.protectedplanet.net/country/ETH",
};
const WRI_RESTORATION = {
  label: "Bastin et al. 2019 / WRI Restoration Opportunities Atlas",
  url: "https://www.wri.org/research/atlas-forest-and-landscape-restoration-opportunities",
};
const MODIS_VI = {
  label: "MODIS MOD13Q1 NDVI/EVI 250 m (NASA LP DAAC)",
  url: "https://lpdaac.usgs.gov/products/mod13q1v061/",
};
const ESA_BIOMASS = {
  label: "ESA CCI Biomass v4 (2020)",
  url: "https://climate.esa.int/en/projects/biomass/",
};
const SOILGRIDS = {
  label: "ISRIC SoilGrids 2.0 (SOC 0–30 cm)",
  url: "https://soilgrids.org/",
};
const AQUEDUCT = {
  label: "WRI Aqueduct 4.0 baseline water stress",
  url: "https://www.wri.org/aqueduct",
};
const KBA = {
  label: "Key Biodiversity Areas (KBA Partnership)",
  url: "https://www.keybiodiversityareas.org/",
};
const WB_POVERTY = {
  label: "World Bank Ethiopia Poverty Assessment 2020",
  url: "https://www.worldbank.org/en/country/ethiopia/publication/ethiopia-poverty-assessment",
};

const COMMON_SOURCES: RegionSources = {
  forest: GFW,
  population: CSA_POP,
  area: CSA_AREA,
  rainfall: CHIRPS,
  elevation: SRTM,
  landcover: WORLDCOVER,
  protected: WDPA,
  restoration: WRI_RESTORATION,
  vegIndex: MODIS_VI,
  carbon: ESA_BIOMASS,
  soil: SOILGRIDS,
  water: AQUEDUCT,
  biodiversity: KBA,
  livelihood: WB_POVERTY,
};

export const REGION_DATA: Record<string, RegionRisk> = {
  Oromia: {
    name: "Oromia",
    treeCover2000Ha: 6_740_000,
    lossTotalHa: 497_000,
    loss2023Ha: 35_600,
    primaryLossHa: 86_400,
    population: 40_900_000,
    areaKm2: 284_538,
    annualRainfallMm: 1100,
    meanElevationM: 1800,
    landCover: { forest: 0.14, cropland: 0.36, grassland: 0.42, other: 0.08 },
    protectedAreaPct: 0.14,
    restorationPotentialHa: 8_000_000,
    ndviMean: 0.56,
    eviMean: 0.38,
    ndviTrend: -0.0018,
    aboveGroundCarbonTha: 55,
    soilOrganicCarbonTha: 62,
    erosionRiskTHaYr: 18,
    waterStressIndex: 2.0,
    kbaCoveragePct: 0.12,
    speciesRichnessIndex: 78,
    ruralPopulationPct: 0.83,
    povertyHeadcountPct: 0.21,
    forestDependentPct: 0.18,
    drivers: ["Coffee expansion", "Smallholder clearing", "Charcoal"],
    notes:
      "Holds Ethiopia's largest moist Afromontane forest blocks. Southwest zones (Jimma, Iluu Abbaa Booraa, Buno Bedele) drive the bulk of national primary-forest loss.",
    focus: true,
    sources: COMMON_SOURCES,
  },
  SNNPR: {
    name: "SNNPR",
    treeCover2000Ha: 2_340_000,
    lossTotalHa: 165_000,
    loss2023Ha: 11_200,
    primaryLossHa: 38_700,
    population: 16_200_000,
    areaKm2: 75_223,
    annualRainfallMm: 1400,
    meanElevationM: 1600,
    landCover: { forest: 0.16, cropland: 0.45, grassland: 0.30, other: 0.09 },
    protectedAreaPct: 0.09,
    restorationPotentialHa: 3_000_000,
    ndviMean: 0.62,
    eviMean: 0.42,
    ndviTrend: -0.0024,
    aboveGroundCarbonTha: 72,
    soilOrganicCarbonTha: 76,
    erosionRiskTHaYr: 22,
    waterStressIndex: 2.2,
    kbaCoveragePct: 0.18,
    speciesRichnessIndex: 88,
    ruralPopulationPct: 0.86,
    povertyHeadcountPct: 0.24,
    forestDependentPct: 0.28,
    drivers: ["Coffee gardens", "Enset & cereal cropping", "Fuelwood"],
    notes:
      "Includes the Kaffa, Sheka and Bench Sheko biosphere reserves (now part of South West Ethiopia Peoples' Region). Wild Arabica coffee origin; highly fragmented under population pressure.",
    focus: true,
    sources: COMMON_SOURCES,
  },
  "Beneshangul Gumu": {
    name: "Beneshangul Gumu",
    treeCover2000Ha: 2_490_000,
    lossTotalHa: 152_000,
    loss2023Ha: 15_400,
    primaryLossHa: 9_200,
    population: 1_270_000,
    areaKm2: 50_699,
    annualRainfallMm: 1100,
    meanElevationM: 1200,
    landCover: { forest: 0.36, cropland: 0.18, grassland: 0.40, other: 0.06 },
    protectedAreaPct: 0.05,
    restorationPotentialHa: 2_000_000,
    ndviMean: 0.51,
    eviMean: 0.34,
    ndviTrend: -0.0031,
    aboveGroundCarbonTha: 45,
    soilOrganicCarbonTha: 40,
    erosionRiskTHaYr: 14,
    waterStressIndex: 1.8,
    kbaCoveragePct: 0.08,
    speciesRichnessIndex: 60,
    ruralPopulationPct: 0.84,
    povertyHeadcountPct: 0.27,
    forestDependentPct: 0.22,
    drivers: ["Large-scale ag leases", "Sesame & soy", "Charcoal"],
    notes:
      "Commercial agriculture frontier along the Sudan border. Lowland woodland and gallery forest converted under federal land-lease concessions.",
    focus: true,
    sources: COMMON_SOURCES,
  },
  Gambela: {
    name: "Gambela",
    treeCover2000Ha: 960_000,
    lossTotalHa: 63_000,
    loss2023Ha: 6_100,
    primaryLossHa: 4_800,
    population: 525_000,
    areaKm2: 29_783,
    annualRainfallMm: 1100,
    meanElevationM: 500,
    landCover: { forest: 0.14, cropland: 0.10, grassland: 0.62, other: 0.14 },
    protectedAreaPct: 0.21,
    restorationPotentialHa: 1_000_000,
    ndviMean: 0.46,
    eviMean: 0.31,
    ndviTrend: -0.0012,
    aboveGroundCarbonTha: 35,
    soilOrganicCarbonTha: 30,
    erosionRiskTHaYr: 9,
    waterStressIndex: 1.5,
    kbaCoveragePct: 0.22,
    speciesRichnessIndex: 65,
    ruralPopulationPct: 0.78,
    povertyHeadcountPct: 0.30,
    forestDependentPct: 0.25,
    drivers: ["Commercial agriculture", "Refugee-area fuelwood"],
    notes:
      "Lowland forest and wetland mosaic under agricultural concession and refugee-driven fuelwood pressure.",
    focus: true,
    sources: COMMON_SOURCES,
  },
};

export function populationDensity(r: RegionRisk): number {
  return r.population / r.areaKm2;
}

export const FOCUS_REGIONS = Object.entries(REGION_DATA)
  .filter(([, r]) => r.focus)
  .map(([name]) => name);

// ---------------------------------------------------------------------------
// Three-pillar priority score
// ---------------------------------------------------------------------------

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
      "GFW/UMD tree-cover loss, SRTM-derived erosion exposure and SoilGrids/iSDAsoil fertility proxies.",
    color: "#22c55e",
  },
  {
    key: "biodiversityRecoveryValue",
    label: "Biodiversity Recovery Value",
    short: "BRV",
    description:
      "Native species fit from the species atlas, protected-area adjacency and occurrence-based biodiversity indicators.",
    color: "#a855f7",
  },
  {
    key: "livelihoodImpact",
    label: "Livelihood Impact",
    short: "LI",
    description:
      "WorldPop population safeguards, ADM3 reporting readiness and PSNP public-works coordination potential.",
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

// Rainfall sweet-spot: 800–2000 mm (plateau), tapers to 0 at 300 / 2800
function rainfallAdequacy(mm: number): number {
  if (mm >= 800 && mm <= 2000) return 1;
  if (mm < 800) return Math.max(0, (mm - 300) / 500);
  return Math.max(0, (2800 - mm) / 800);
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

export { gbifBiodiversityForRegion };
export { livelihoodPopulationForRegion };

export interface ProxyScores {
  ecologicalRestorationPotential: number;
  biodiversityRecoveryValue: number;
  livelihoodImpact: number;
}

export function proxyScores(r: RegionRisk): ProxyScores {
  const regionHa = r.areaKm2 * 100;

  // 1. Ecological Restoration Potential (ERP)
  const historicalLoss = clamp01(r.lossTotalHa / Math.max(r.treeCover2000Ha, 1) / 0.12);
  const recentLoss = clamp01(r.loss2023Ha / Math.max(r.treeCover2000Ha, 1) / 0.01);
  const erosionExposure = clamp01(r.erosionRiskTHaYr / 35);
  const soilGrids = soilGridsSampleForRegion(r.name);
  const soilCarbon = soilGrids
    ? clamp01(soilGrids.soilOrganicCarbonGkg / 50)
    : clamp01(r.soilOrganicCarbonTha / 100);
  const soilPh = soilGrids ? soilPhSuitability(soilGrids.phH2O) : 0.75;
  const soilTexture = soilGrids
    ? soilTextureSuitability(soilGrids.clayPct, soilGrids.sandPct)
    : 0.75;
  const soilFertility = (soilCarbon + soilPh + soilTexture) / 3;
  const rain = rainfallAdequacy(r.annualRainfallMm);
  const restorationOpportunity = clamp01(r.restorationPotentialHa / regionHa);
  const ecologicalRestorationPotential = pct(
    (historicalLoss + recentLoss + erosionExposure + soilFertility + rain + restorationOpportunity) / 6,
  );

  // 2. Biodiversity Recovery Value (BRV)
  const speciesAtlasFit = clamp01(r.speciesRichnessIndex / 100);
  const protectedAreaCorridor = clamp01(r.protectedAreaPct / 0.25);
  const gbif = gbifBiodiversityForRegion(r.name);
  const occurrenceIndicator = gbif
    ? clamp01(gbif.occurrenceEvidenceScore / 100)
    : clamp01((r.kbaCoveragePct / 0.3 + r.primaryLossHa / Math.max(r.lossTotalHa, 1)) / 2);
  const biodiversityRecoveryValue = pct(
    (speciesAtlasFit + protectedAreaCorridor + occurrenceIndicator) / 3,
  );

  // 3. Livelihood Impact (LI)
  const livelihoodPopulation = livelihoodPopulationForRegion(r.name);
  const livelihoodImpact = livelihoodPopulation
    ? livelihoodPopulation.livelihoodEvidenceScore
    : pct(
        (clamp01(1 - populationDensity(r) / 300) +
          clamp01(r.ruralPopulationPct) +
          clamp01(r.povertyHeadcountPct / 0.4) +
          clamp01(r.forestDependentPct / 0.4) +
          1 +
          clamp01((r.erosionRiskTHaYr / 35 + clamp01(r.povertyHeadcountPct / 0.4)) / 2)) /
          6,
      );

  return { ecologicalRestorationPotential, biodiversityRecoveryValue, livelihoodImpact };
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

// Legacy GFW-only risk score, kept for the deforestation-pressure context.
export function riskScore(r: RegionRisk): number {
  const recentRate = r.loss2023Ha / r.treeCover2000Ha;
  const recentScore = Math.min(recentRate / 0.015, 1) * 55;
  const primaryShare = r.primaryLossHa / r.lossTotalHa;
  const primaryScore = Math.min(primaryShare / 0.25, 1) * 30;
  const absoluteScore = Math.min(r.loss2023Ha / 40_000, 1) * 15;
  return Math.round(recentScore + primaryScore + absoluteScore);
}

export function riskLevel(score: number): RiskLevel {
  if (score >= 70) return "severe";
  if (score >= 50) return "high";
  if (score >= 30) return "moderate";
  return "low";
}

export const RISK_COLORS: Record<RiskLevel, string> = {
  severe: "#b91c1c",
  high: "#ea580c",
  moderate: "#eab308",
  low: "#16a34a",
};
