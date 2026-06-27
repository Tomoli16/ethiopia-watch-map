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
// Five-proxy priority score
// ---------------------------------------------------------------------------

export type ProxyKey =
  | "suitability"
  | "carbon"
  | "biodiversity"
  | "waterSoil"
  | "livelihood";

export interface ProxyMeta {
  key: ProxyKey;
  label: string;
  short: string;
  description: string;
  color: string;
}

export const PROXIES: ProxyMeta[] = [
  {
    key: "suitability",
    label: "Restoration Suitability",
    short: "Suitability",
    description:
      "Where restoration is biophysically feasible — rainfall, vegetation vigor, restoration opportunity density, low water stress.",
    color: "#22c55e",
  },
  {
    key: "carbon",
    label: "Carbon",
    short: "Carbon",
    description:
      "Climate value: aboveground biomass carbon (ESA CCI), soil organic carbon (SoilGrids) and remaining forest cover.",
    color: "#0ea5e9",
  },
  {
    key: "biodiversity",
    label: "Biodiversity",
    short: "Biodiv.",
    description:
      "KBA coverage, primary-forest share, species richness and protected-area share.",
    color: "#a855f7",
  },
  {
    key: "waterSoil",
    label: "Water & Soil",
    short: "Water/Soil",
    description:
      "Soil organic carbon, inverse erosion risk (RUSLE), inverse water stress (Aqueduct), rainfall adequacy.",
    color: "#06b6d4",
  },
  {
    key: "livelihood",
    label: "Livelihood",
    short: "Livelihood",
    description:
      "Rural population share, poverty headcount, forest-dependent households and beneficiary density.",
    color: "#f59e0b",
  },
];

export type Weights = Record<ProxyKey, number>;

export const DEFAULT_WEIGHTS: Weights = {
  suitability: 20,
  carbon: 20,
  biodiversity: 20,
  waterSoil: 20,
  livelihood: 20,
};

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const pct = (x: number) => Math.round(clamp01(x) * 100);

// Rainfall sweet-spot: 800–2000 mm (plateau), tapers to 0 at 300 / 2800
function rainfallAdequacy(mm: number): number {
  if (mm >= 800 && mm <= 2000) return 1;
  if (mm < 800) return Math.max(0, (mm - 300) / 500);
  return Math.max(0, (2800 - mm) / 800);
}

export interface ProxyScores {
  suitability: number;
  carbon: number;
  biodiversity: number;
  waterSoil: number;
  livelihood: number;
}

export function proxyScores(r: RegionRisk): ProxyScores {
  const regionHa = r.areaKm2 * 100;

  // 1. Restoration Suitability
  const oppDensity = clamp01(r.restorationPotentialHa / regionHa);
  const rain = rainfallAdequacy(r.annualRainfallMm);
  const vigor = clamp01(r.ndviMean);
  const waterOk = clamp01(1 - r.waterStressIndex / 5);
  const suitability = pct((oppDensity + rain + vigor + waterOk) / 4);

  // 2. Carbon
  const agc = clamp01(r.aboveGroundCarbonTha / 100);
  const soc = clamp01(r.soilOrganicCarbonTha / 100);
  const forestShare = clamp01(r.landCover.forest / 0.4);
  const carbon = pct((agc + soc + forestShare) / 3);

  // 3. Biodiversity
  const kba = clamp01(r.kbaCoveragePct / 0.3);
  const primaryShare = clamp01(r.primaryLossHa / Math.max(r.lossTotalHa, 1));
  const richness = clamp01(r.speciesRichnessIndex / 100);
  const pa = clamp01(r.protectedAreaPct / 0.25);
  const biodiversity = pct((kba + primaryShare + richness + pa) / 4);

  // 4. Water & Soil
  const socW = clamp01(r.soilOrganicCarbonTha / 100);
  const erosionOk = clamp01(1 - r.erosionRiskTHaYr / 40);
  const waterStressOk = clamp01(1 - r.waterStressIndex / 5);
  const waterSoil = pct((socW + erosionOk + waterStressOk + rain) / 4);

  // 5. Livelihood
  const rural = clamp01(r.ruralPopulationPct);
  const poverty = clamp01(r.povertyHeadcountPct / 0.4);
  const forestDep = clamp01(r.forestDependentPct / 0.4);
  const density = clamp01(populationDensity(r) / 200);
  const livelihood = pct((rural + poverty + forestDep + density) / 4);

  return { suitability, carbon, biodiversity, waterSoil, livelihood };
}

export function priorityScore(r: RegionRisk, weights: Weights): number {
  const p = proxyScores(r);
  const total =
    weights.suitability +
    weights.carbon +
    weights.biodiversity +
    weights.waterSoil +
    weights.livelihood;
  if (total <= 0) return 0;
  const sum =
    p.suitability * weights.suitability +
    p.carbon * weights.carbon +
    p.biodiversity * weights.biodiversity +
    p.waterSoil * weights.waterSoil +
    p.livelihood * weights.livelihood;
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
