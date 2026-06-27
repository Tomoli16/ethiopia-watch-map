import { readFile, writeFile } from "node:fs/promises";

const INPUT = new URL("../public/data/real/eth-admpop-adm3-2022.csv", import.meta.url);
const OUT = new URL("../public/data/real/livelihood-population-regions.json", import.meta.url);

const REGION_MAP = {
  Oromia: "Oromia",
  SNNP: "SNNPR",
  Sidama: "SNNPR",
  "South West Ethiopia": "SNNPR",
  "Benishangul Gumz": "Beneshangul Gumu",
  Gambela: "Gambela",
};

const REGION_AREA_KM2 = {
  Oromia: 284_538,
  SNNPR: 75_223,
  "Beneshangul Gumu": 50_699,
  Gambela: 29_783,
};

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

function emptyRegion(region) {
  return {
    region,
    admin3Count: 0,
    populationTotal: 0,
    maleTotal: 0,
    femaleTotal: 0,
    childrenUnder15: 0,
    workingAge15To64: 0,
    older65Plus: 0,
  };
}

const rows = parseCsv(await readFile(INPUT, "utf8"));
const aggregates = {};

for (const row of rows) {
  const region = REGION_MAP[row.admin1Name_en];
  if (!region) continue;

  const agg = (aggregates[region] ??= emptyRegion(region));
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

const regions = Object.values(aggregates).map((region) => {
  const areaKm2 = REGION_AREA_KM2[region.region];
  const femaleShare = region.populationTotal > 0 ? region.femaleTotal / region.populationTotal : 0;
  const childShare = region.populationTotal > 0 ? region.childrenUnder15 / region.populationTotal : 0;
  const dependencyRatio =
    region.workingAge15To64 > 0
      ? (region.childrenUnder15 + region.older65Plus) / region.workingAge15To64
      : 0;
  const densityPerKm2 = areaKm2 ? region.populationTotal / areaKm2 : 0;
  const livelihoodEvidenceScore = Math.round(
    Math.min(1, densityPerKm2 / 220) * 35 +
      Math.min(1, childShare / 0.45) * 25 +
      Math.min(1, dependencyRatio / 1) * 25 +
      Math.min(1, femaleShare / 0.52) * 15,
  );

  return {
    ...region,
    areaKm2,
    densityPerKm2: Number(densityPerKm2.toFixed(1)),
    femaleShare: Number(femaleShare.toFixed(3)),
    childShare: Number(childShare.toFixed(3)),
    dependencyRatio: Number(dependencyRatio.toFixed(3)),
    livelihoodEvidenceScore,
  };
});

await writeFile(
  OUT,
  `${JSON.stringify(
    {
      fetchedAt: new Date().toISOString(),
      source: "HDX/OCHA Ethiopia Subnational Population Statistics, ADM3 projected population 2022",
      sourceFile: "public/data/real/eth-admpop-adm3-2022.csv",
      sourceUrl:
        "https://data.humdata.org/dataset/cod-ps-eth/resource/3f8150d4-6d5d-4659-a0a8-586e4689ae65",
      description:
        "Aggregated ADM3/woreda population statistics for the four focus regions. Used as the first real Livelihood Impact input. Scores combine population density, child share, dependency ratio and female population share as a proxy for safeguard and livelihood relevance.",
      regions,
    },
    null,
    2,
  )}\n`,
);

console.log(JSON.stringify(regions, null, 2));
