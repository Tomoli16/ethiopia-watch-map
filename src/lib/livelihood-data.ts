export interface LivelihoodPopulationRegion {
  region: string;
  admin3Count: number;
  populationTotal: number;
  maleTotal: number;
  femaleTotal: number;
  childrenUnder15: number;
  workingAge15To64: number;
  older65Plus: number;
  areaKm2: number;
  densityPerKm2: number;
  femaleShare: number;
  childShare: number;
  dependencyRatio: number;
  livelihoodEvidenceScore: number;
}

export const LIVELIHOOD_POPULATION_REGIONS: Record<string, LivelihoodPopulationRegion> = {
  Oromia: {
    region: "Oromia",
    admin3Count: 336,
    populationTotal: 39_075_002,
    maleTotal: 19_548_349,
    femaleTotal: 19_526_650,
    childrenUnder15: 18_317_540,
    workingAge15To64: 19_302_289,
    older65Plus: 1_455_172,
    areaKm2: 284_538,
    densityPerKm2: 137.3,
    femaleShare: 0.5,
    childShare: 0.469,
    dependencyRatio: 1.024,
    livelihoodEvidenceScore: 86,
  },
  SNNPR: {
    region: "SNNPR",
    admin3Count: 231,
    populationTotal: 20_691_545,
    maleTotal: 10_259_364,
    femaleTotal: 10_432_183,
    childrenUnder15: 9_613_723,
    workingAge15To64: 10_542_304,
    older65Plus: 535_510,
    areaKm2: 75_223,
    densityPerKm2: 275.1,
    femaleShare: 0.504,
    childShare: 0.465,
    dependencyRatio: 0.963,
    livelihoodEvidenceScore: 99,
  },
  "Beneshangul Gumu": {
    region: "Beneshangul Gumu",
    admin3Count: 24,
    populationTotal: 1_187_997,
    maleTotal: 602_572,
    femaleTotal: 585_426,
    childrenUnder15: 526_212,
    workingAge15To64: 634_700,
    older65Plus: 27_078,
    areaKm2: 50_699,
    densityPerKm2: 23.4,
    femaleShare: 0.493,
    childShare: 0.443,
    dependencyRatio: 0.872,
    livelihoodEvidenceScore: 64,
  },
  Gambela: {
    region: "Gambela",
    admin3Count: 15,
    populationTotal: 492_002,
    maleTotal: 256_002,
    femaleTotal: 236_000,
    childrenUnder15: 216_006,
    workingAge15To64: 268_234,
    older65Plus: 7_760,
    areaKm2: 29_783,
    densityPerKm2: 16.5,
    femaleShare: 0.48,
    childShare: 0.439,
    dependencyRatio: 0.834,
    livelihoodEvidenceScore: 62,
  },
};

export function livelihoodPopulationForRegion(regionName?: string) {
  return regionName ? LIVELIHOOD_POPULATION_REGIONS[regionName] : undefined;
}
