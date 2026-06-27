export interface GbifTopSpecies {
  scientificName: string;
  canonicalName: string | null;
  count: number;
  family: string | null;
  kingdom: string | null;
}

export interface GbifRegionBiodiversity {
  region: string;
  fetchedAt: string;
  sourceFile: string;
  geometryNote: string;
  allOccurrences: number;
  plantOccurrences: number;
  birdOccurrences: number;
  occurrenceEvidenceScore: number;
  topPlantSpecies: GbifTopSpecies[];
  topBirdSpecies: GbifTopSpecies[];
}

export const GBIF_REGION_BIODIVERSITY: Record<string, GbifRegionBiodiversity> = {
  Oromia: {
    region: "Oromia",
    fetchedAt: "2026-06-27T20:05:09.058Z",
    sourceFile: "public/data/real/gbif-biodiversity-regions.json",
    geometryNote:
      "Queried with ADM1 bounding box. Counts are real GBIF records but not yet corrected for observer effort or clipped to exact polygons.",
    allOccurrences: 942_941,
    plantOccurrences: 159_471,
    birdOccurrences: 717_513,
    occurrenceEvidenceScore: 100,
    topPlantSpecies: [
      { scientificName: "Triticum turgidum L.", canonicalName: "Triticum turgidum", count: 9_877, family: "Poaceae", kingdom: "Plantae" },
      { scientificName: "Sorghum bicolor (L.) Moench", canonicalName: "Sorghum bicolor", count: 3_558, family: "Poaceae", kingdom: "Plantae" },
      { scientificName: "Hordeum vulgare L.", canonicalName: "Hordeum vulgare", count: 2_473, family: "Poaceae", kingdom: "Plantae" },
    ],
    topBirdSpecies: [
      { scientificName: "Grus grus (Linnaeus, 1758)", canonicalName: "Grus grus", count: 18_423, family: "Gruidae", kingdom: "Animalia" },
      { scientificName: "Milvus migrans (Boddaert, 1783)", canonicalName: "Milvus migrans", count: 9_248, family: "Accipitridae", kingdom: "Animalia" },
      { scientificName: "Columba guinea Linnaeus, 1758", canonicalName: "Columba guinea", count: 8_309, family: "Columbidae", kingdom: "Animalia" },
    ],
  },
  SNNPR: {
    region: "SNNPR",
    fetchedAt: "2026-06-27T20:05:09.058Z",
    sourceFile: "public/data/real/gbif-biodiversity-regions.json",
    geometryNote:
      "Queried with ADM1 bounding box. Counts are real GBIF records but not yet corrected for observer effort or clipped to exact polygons.",
    allOccurrences: 374_994,
    plantOccurrences: 52_999,
    birdOccurrences: 289_840,
    occurrenceEvidenceScore: 93,
    topPlantSpecies: [
      { scientificName: "Sorghum bicolor (L.) Moench", canonicalName: "Sorghum bicolor", count: 727, family: "Poaceae", kingdom: "Plantae" },
      { scientificName: "Hordeum vulgare L.", canonicalName: "Hordeum vulgare", count: 566, family: "Poaceae", kingdom: "Plantae" },
      { scientificName: "Triticum turgidum L.", canonicalName: "Triticum turgidum", count: 561, family: "Poaceae", kingdom: "Plantae" },
    ],
    topBirdSpecies: [
      { scientificName: "Pycnonotus barbatus (Desfontaines, 1789)", canonicalName: "Pycnonotus barbatus", count: 3_214, family: "Pycnonotidae", kingdom: "Animalia" },
      { scientificName: "Alopochen aegyptiaca (Linnaeus, 1766)", canonicalName: "Alopochen aegyptiaca", count: 3_021, family: "Anatidae", kingdom: "Animalia" },
      { scientificName: "Streptopelia semitorquata (Rüppell, 1837)", canonicalName: "Streptopelia semitorquata", count: 2_940, family: "Columbidae", kingdom: "Animalia" },
    ],
  },
  "Beneshangul Gumu": {
    region: "Beneshangul Gumu",
    fetchedAt: "2026-06-27T20:05:09.058Z",
    sourceFile: "public/data/real/gbif-biodiversity-regions.json",
    geometryNote:
      "Queried with ADM1 bounding box. Counts are real GBIF records but not yet corrected for observer effort or clipped to exact polygons.",
    allOccurrences: 10_751,
    plantOccurrences: 6_703,
    birdOccurrences: 3_395,
    occurrenceEvidenceScore: 67,
    topPlantSpecies: [
      { scientificName: "Sorghum bicolor (L.) Moench", canonicalName: "Sorghum bicolor", count: 151, family: "Poaceae", kingdom: "Plantae" },
      { scientificName: "Eragrostis tef (Zuccagni) Trotter", canonicalName: "Eragrostis tef", count: 60, family: "Poaceae", kingdom: "Plantae" },
      { scientificName: "Urochloa brizantha (A.Rich.) R.D.Webster", canonicalName: "Urochloa brizantha", count: 53, family: "Poaceae", kingdom: "Plantae" },
    ],
    topBirdSpecies: [
      { scientificName: "Aquila pomarina C.L.Brehm, 1831", canonicalName: "Aquila pomarina", count: 612, family: "Accipitridae", kingdom: "Animalia" },
      { scientificName: "Pycnonotus barbatus (Desfontaines, 1789)", canonicalName: "Pycnonotus barbatus", count: 56, family: "Pycnonotidae", kingdom: "Animalia" },
      { scientificName: "Cinnyris cupreus (Shaw, 1812)", canonicalName: "Cinnyris cupreus", count: 51, family: "Nectariniidae", kingdom: "Animalia" },
    ],
  },
  Gambela: {
    region: "Gambela",
    fetchedAt: "2026-06-27T20:05:09.058Z",
    sourceFile: "public/data/real/gbif-biodiversity-regions.json",
    geometryNote:
      "Queried with ADM1 bounding box. Counts are real GBIF records but not yet corrected for observer effort or clipped to exact polygons.",
    allOccurrences: 14_499,
    plantOccurrences: 4_882,
    birdOccurrences: 7_665,
    occurrenceEvidenceScore: 69,
    topPlantSpecies: [
      { scientificName: "Sorghum bicolor (L.) Moench", canonicalName: "Sorghum bicolor", count: 580, family: "Poaceae", kingdom: "Plantae" },
      { scientificName: "Combretum adenogonium Steud. ex A.Rich.", canonicalName: "Combretum adenogonium", count: 50, family: "Combretaceae", kingdom: "Plantae" },
      { scientificName: "Crossopteryx febrifuga (Afzel. ex G.Don) Benth.", canonicalName: "Crossopteryx febrifuga", count: 40, family: "Rubiaceae", kingdom: "Plantae" },
    ],
    topBirdSpecies: [
      { scientificName: "Aquila pomarina C.L.Brehm, 1831", canonicalName: "Aquila pomarina", count: 681, family: "Accipitridae", kingdom: "Animalia" },
      { scientificName: "Pycnonotus barbatus (Desfontaines, 1789)", canonicalName: "Pycnonotus barbatus", count: 137, family: "Pycnonotidae", kingdom: "Animalia" },
      { scientificName: "Uraeginthus bengalus (Linnaeus, 1766)", canonicalName: "Uraeginthus bengalus", count: 128, family: "Estrildidae", kingdom: "Animalia" },
    ],
  },
};

export function gbifBiodiversityForRegion(regionName?: string) {
  return regionName ? GBIF_REGION_BIODIVERSITY[regionName] : undefined;
}
