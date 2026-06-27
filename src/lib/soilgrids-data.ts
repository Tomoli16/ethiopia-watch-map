export interface SoilGridsRegionSample {
  region: string;
  lon: number;
  lat: number;
  sourceUrl: string;
  fetchedAt: string;
  depthRangeCm: "0-30";
  phH2O: number;
  soilOrganicCarbonGkg: number;
  clayPct: number;
  sandPct: number;
  siltPct: number;
}

export const SOILGRIDS_REGION_SAMPLES: Record<string, SoilGridsRegionSample> = {
  Oromia: {
    region: "Oromia",
    lon: 39.4,
    lat: 7.8,
    sourceUrl:
      "https://rest.isric.org/soilgrids/v2.0/properties/query?lon=39.4&lat=7.8&property=phh2o&property=soc&property=clay&property=sand&property=silt&depth=0-5cm&depth=5-15cm&depth=15-30cm&value=mean",
    fetchedAt: "2026-06-27T19:21:07.260Z",
    depthRangeCm: "0-30",
    phH2O: 6.1,
    soilOrganicCarbonGkg: 47.37,
    clayPct: 29.58,
    sandPct: 34.98,
    siltPct: 35.42,
  },
  SNNPR: {
    region: "SNNPR",
    lon: 37.6,
    lat: 6.4,
    sourceUrl:
      "https://rest.isric.org/soilgrids/v2.0/properties/query?lon=37.6&lat=6.4&property=phh2o&property=soc&property=clay&property=sand&property=silt&depth=0-5cm&depth=5-15cm&depth=15-30cm&value=mean",
    fetchedAt: "2026-06-27T19:21:07.260Z",
    depthRangeCm: "0-30",
    phH2O: 5.9,
    soilOrganicCarbonGkg: 32.88,
    clayPct: 35.07,
    sandPct: 33.35,
    siltPct: 31.63,
  },
  "Beneshangul Gumu": {
    region: "Beneshangul Gumu",
    lon: 35.6,
    lat: 10.8,
    sourceUrl:
      "https://rest.isric.org/soilgrids/v2.0/properties/query?lon=35.6&lat=10.8&property=phh2o&property=soc&property=clay&property=sand&property=silt&depth=0-5cm&depth=5-15cm&depth=15-30cm&value=mean",
    fetchedAt: "2026-06-27T19:21:07.260Z",
    depthRangeCm: "0-30",
    phH2O: 5.7,
    soilOrganicCarbonGkg: 42.15,
    clayPct: 41.6,
    sandPct: 25.45,
    siltPct: 32.95,
  },
  Gambela: {
    region: "Gambela",
    lon: 34.6,
    lat: 7.9,
    sourceUrl:
      "https://rest.isric.org/soilgrids/v2.0/properties/query?lon=34.6&lat=7.9&property=phh2o&property=soc&property=clay&property=sand&property=silt&depth=0-5cm&depth=5-15cm&depth=15-30cm&value=mean",
    fetchedAt: "2026-06-27T19:21:07.260Z",
    depthRangeCm: "0-30",
    phH2O: 6.02,
    soilOrganicCarbonGkg: 22.68,
    clayPct: 28.68,
    sandPct: 40.22,
    siltPct: 31.1,
  },
};
