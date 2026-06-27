import { readFile, writeFile } from "node:fs/promises";

const POP_INPUT = new URL("../public/data/real/eth-admpop-adm3-2022.csv", import.meta.url);
const ADM2_INPUT = new URL("../public/data/eth-adm2.geojson", import.meta.url);
const OUT = new URL("../public/data/real/livelihood-population-adm2.json", import.meta.url);
const TS_OUT = new URL("../src/lib/livelihood-adm2-data.ts", import.meta.url);

const REGION_MAP = {
  Oromia: "Oromia",
  SNNP: "SNNPR",
  Sidama: "SNNPR",
  "South West Ethiopia": "SNNPR",
  "Benishangul Gumz": "Beneshangul Gumu",
  Gambela: "Gambela",
};

const FOCUS_REGIONS = new Set(["Oromia", "SNNPR", "Beneshangul Gumu", "Gambela"]);

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].replace(/^\uFEFF/, "").split(",");
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  });
}

function num(value) {
  return Number(String(value).replace(/,/g, "")) || 0;
}

function ringArea(coords) {
  let area = 0;
  for (let i = 0; i < coords.length - 1; i += 1) {
    const [lon1, lat1] = coords[i];
    const [lon2, lat2] = coords[i + 1];
    area +=
      ((lon2 - lon1) * Math.PI) /
      180 *
      (2 + Math.sin((lat1 * Math.PI) / 180) + Math.sin((lat2 * Math.PI) / 180));
  }
  return Math.abs((area * 6378137 * 6378137) / 2);
}

function polygonArea(coords) {
  const [outer, ...holes] = coords;
  return ringArea(outer) - holes.reduce((sum, hole) => sum + ringArea(hole), 0);
}

function geometryAreaKm2(geometry) {
  if (!geometry) return 0;
  if (geometry.type === "Polygon") return polygonArea(geometry.coordinates) / 1_000_000;
  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.reduce((sum, polygon) => sum + polygonArea(polygon), 0) / 1_000_000;
  }
  return 0;
}

function emptyAdm2(region, zone, admin2Pcode) {
  return {
    id: `${region}__${zone}`,
    region,
    zone,
    admin2Pcode,
    admin3Count: 0,
    populationTotal: 0,
    maleTotal: 0,
    femaleTotal: 0,
    childrenUnder15: 0,
    workingAge15To64: 0,
    older65Plus: 0,
  };
}

const rows = parseCsv(await readFile(POP_INPUT, "utf8"));
const adm2 = JSON.parse(await readFile(ADM2_INPUT, "utf8"));

const areas = {};
for (const feature of adm2.features) {
  const region = feature.properties?.parent;
  const zone = feature.properties?.shapeName;
  if (!FOCUS_REGIONS.has(region) || !zone) continue;
  areas[`${region}__${zone}`] = Number(geometryAreaKm2(feature.geometry).toFixed(1));
}

const aggregates = {};
for (const row of rows) {
  const region = REGION_MAP[row.admin1Name_en];
  if (!region) continue;

  const zone = row.admin2Name_en;
  const id = `${region}__${zone}`;
  const agg = (aggregates[id] ??= emptyAdm2(region, zone, row.admin2Pcode));

  agg.admin3Count += 1;
  agg.populationTotal += num(row.T_TL);
  agg.maleTotal += num(row.M_TL);
  agg.femaleTotal += num(row.F_TL);
  agg.childrenUnder15 += num(row.T_00_04) + num(row.T_05_09) + num(row.T_10_14);
  agg.workingAge15To64 +=
    num(row.T_15_19) +
    num(row.T_20_24) +
    num(row.T_25_29) +
    num(row.T_30_34) +
    num(row.T_35_39) +
    num(row.T_40_44) +
    num(row.T_45_49) +
    num(row.T_50_54) +
    num(row.T_55_59) +
    num(row.T_60_64);
  agg.older65Plus += num(row.T_65plus);
}

const zones = Object.values(aggregates)
  .map((zone) => {
    const areaKm2 = areas[zone.id] ?? 0;
    const femaleShare = zone.populationTotal > 0 ? zone.femaleTotal / zone.populationTotal : 0;
    const childShare = zone.populationTotal > 0 ? zone.childrenUnder15 / zone.populationTotal : 0;
    const dependencyRatio =
      zone.workingAge15To64 > 0
        ? (zone.childrenUnder15 + zone.older65Plus) / zone.workingAge15To64
        : 0;
    const densityPerKm2 = areaKm2 > 0 ? zone.populationTotal / areaKm2 : 0;
    const populationPressure = Math.min(1, Math.log10(zone.populationTotal + 1) / 6.5);
    const settlementPressure = areaKm2 > 0 ? Math.min(1, densityPerKm2 / 220) : populationPressure;
    const livelihoodEvidenceScore = Math.round(
      settlementPressure * 35 +
        Math.min(1, childShare / 0.45) * 25 +
        Math.min(1, dependencyRatio / 1) * 25 +
        Math.min(1, femaleShare / 0.52) * 15,
    );

    return {
      ...zone,
      areaKm2,
      densityPerKm2: Number(densityPerKm2.toFixed(1)),
      femaleShare: Number(femaleShare.toFixed(3)),
      childShare: Number(childShare.toFixed(3)),
      dependencyRatio: Number(dependencyRatio.toFixed(3)),
      livelihoodEvidenceScore,
    };
  })
  .sort((a, b) => a.region.localeCompare(b.region) || a.zone.localeCompare(b.zone));

await writeFile(
  OUT,
  `${JSON.stringify(
    {
      fetchedAt: new Date().toISOString(),
      source: "HDX/OCHA Ethiopia Subnational Population Statistics, ADM3 projected population 2022",
      sourceFile: "public/data/real/eth-admpop-adm3-2022.csv",
      boundarySource: "public/data/eth-adm2.geojson",
      description:
        "ADM3/woreda population statistics aggregated to ADM2/zones for the focus regions. Area is calculated from HDX ADM2 geometries. Used for ADM2 Livelihood Impact scoring.",
      zones,
    },
    null,
    2,
  )}\n`,
);

await writeFile(
  TS_OUT,
  `export interface LivelihoodPopulationAdm2 {
  id: string;
  region: string;
  zone: string;
  admin2Pcode: string;
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

export const LIVELIHOOD_POPULATION_ADM2: Record<string, LivelihoodPopulationAdm2> = ${JSON.stringify(
    Object.fromEntries(zones.map((zone) => [zone.id, zone])),
    null,
    2,
  )};

export function livelihoodPopulationForAdm2(id?: string) {
  return id ? LIVELIHOOD_POPULATION_ADM2[id] : undefined;
}
`,
);

console.log(JSON.stringify({ zones: zones.length }, null, 2));
