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
}

export interface LandCover {
  // Shares of land area, 0-1, ESA WorldCover 2021 classes aggregated
  forest: number;
  cropland: number;
  grassland: number;
  other: number;
}

export interface RegionRisk {
  // Tree cover (>30% canopy) in 2000, hectares
  treeCover2000Ha: number;
  // Cumulative tree cover loss 2001-2023, hectares
  lossTotalHa: number;
  // Tree cover loss in 2023, hectares
  loss2023Ha: number;
  // Primary humid forest loss 2002-2023, hectares
  primaryLossHa: number;
  // Resident population (2022 CSA projection), persons
  population: number;
  // Region area, square kilometers
  areaKm2: number;
  // Long-term annual rainfall mean (CHIRPS 1981-2022), mm/yr
  annualRainfallMm: number;
  // Mean elevation from SRTM 30 m, metres above sea level
  meanElevationM: number;
  // Land cover composition (ESA WorldCover 2021)
  landCover: LandCover;
  // Share of region inside WDPA protected areas, 0-1
  protectedAreaPct: number;
  // Indicative restoration opportunity area, hectares (Bastin et al. 2019 / WRI Atlas)
  restorationPotentialHa: number;
  // MODIS MOD13Q1 long-term mean Normalized Difference Vegetation Index (2000-2023)
  ndviMean: number;
  // MODIS MOD13Q1 long-term mean Enhanced Vegetation Index (2000-2023)
  eviMean: number;
  // Annual NDVI trend (Sen slope) per year, 2001-2023. Negative = greening loss.
  ndviTrend: number;
  drivers: string[];
  notes: string;
  focus?: boolean;
  sources: RegionSources;
}

// Reference values are indicative — verify against the linked sources before
// operational use. Tree-cover-loss values are aligned with the Global Forest
// Watch country dashboard (Hansen/UMD v1.11, 30% canopy). Population values
// are 2022 projections derived from the 2007 census (CSA/ESS); area values
// are commonly cited regional figures from CSA / Wikipedia. Region
// boundaries shifted between 2020-2023 (SNNPR split into SNNPR, Sidama,
// South West Ethiopia Peoples', and Central Ethiopia regions) so the SNNPR
// row aggregates the pre-split footprint.
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

export function riskScore(r: RegionRisk): number {
  // Composite of GFW signals, normalized to the regions in scope:
  //  - recent loss intensity (2023 loss ÷ 2000 cover), capped at 1.5%
  //  - primary-forest loss share of total loss
  //  - absolute 2023 loss, capped at 40 kha
  const recentRate = r.loss2023Ha / r.treeCover2000Ha; // ~0–0.015
  const recentScore = Math.min(recentRate / 0.015, 1) * 55;
  const primaryShare = r.primaryLossHa / r.lossTotalHa; // 0–1
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

// Restoration Protection Score (RPS) — composite 0-100 prioritising where to
// act first. Combines:
//   - degradation pressure (GFW-derived risk score)         35%
//   - ecological value worth protecting (NDVI mean)         20%
//   - greening-loss trend (negative MODIS NDVI Sen slope)   25%
//   - restoration opportunity density (WRI ha / region ha)  20%
export interface RpsBreakdown {
  total: number;
  degradation: number; // 0-100
  vigor: number;       // 0-100
  trend: number;       // 0-100
  opportunity: number; // 0-100
}

export function rpsBreakdown(r: RegionRisk): RpsBreakdown {
  const degradation = riskScore(r); // already 0-100
  const vigor = Math.round(Math.min(Math.max(r.ndviMean, 0), 1) * 100);
  // Sen slope per year; -0.005/yr ≈ severe greening loss
  const trend01 = Math.min(Math.max(-r.ndviTrend / 0.005, 0), 1);
  const trend = Math.round(trend01 * 100);
  // Opportunity density: restoration ha vs. region ha (1 km² = 100 ha)
  const regionHa = r.areaKm2 * 100;
  const opp01 = Math.min(r.restorationPotentialHa / regionHa, 1);
  const opportunity = Math.round(opp01 * 100);
  const total = Math.round(
    degradation * 0.35 + vigor * 0.2 + trend * 0.25 + opportunity * 0.2,
  );
  return { total, degradation, vigor, trend, opportunity };
}

export function rpsScore(r: RegionRisk): number {
  return rpsBreakdown(r).total;
}

export const RISK_COLORS: Record<RiskLevel, string> = {
  severe: "#b91c1c",
  high: "#ea580c",
  moderate: "#eab308",
  low: "#16a34a",
};