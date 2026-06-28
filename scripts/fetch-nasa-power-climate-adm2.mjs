import { readFile, writeFile } from "node:fs/promises";
import { bbox, bboxCenter, FOCUS_REGIONS, resolveAdm2Id } from "./adm2-utils.mjs";

const ADM2 = new URL("../public/data/eth-adm2.geojson", import.meta.url);
const LIVELIHOOD_ADM2 = new URL("../public/data/real/livelihood-population-adm2.json", import.meta.url);
const OUT = new URL("../public/data/real/nasa-power-climate-adm2.json", import.meta.url);
const TS_OUT = new URL("../src/lib/climate-adm2-data.ts", import.meta.url);

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

async function getJson(url) {
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  return response.json();
}

function rainfallSuitability(annualMm) {
  if (annualMm >= 800 && annualMm <= 2000) return 1;
  if (annualMm < 800) return Math.max(0, (annualMm - 300) / 500);
  return Math.max(0, (2800 - annualMm) / 800);
}

function temperatureSuitability(annualC) {
  if (annualC >= 12 && annualC <= 24) return 1;
  if (annualC < 12) return Math.max(0, (annualC - 5) / 7);
  return Math.max(0, (32 - annualC) / 8);
}

function climateScore(annualRainfallMm, annualTemperatureC) {
  return Math.round(
    Math.max(0, Math.min(1, (rainfallSuitability(annualRainfallMm) + temperatureSuitability(annualTemperatureC)) / 2)) *
      100,
  );
}

async function fetchClimate(center) {
  const params = new URLSearchParams({
    parameters: "PRECTOTCORR,T2M",
    community: "AG",
    longitude: String(center.lon),
    latitude: String(center.lat),
    format: "JSON",
  });
  const sourceUrl = `https://power.larc.nasa.gov/api/temporal/climatology/point?${params.toString()}`;
  const data = await getJson(sourceUrl);
  const rainfall = data.properties.parameter.PRECTOTCORR;
  const temperature = data.properties.parameter.T2M;
  const annualRainfallMm = Number((rainfall.ANN * 365).toFixed(1));
  const annualTemperatureC = Number(temperature.ANN.toFixed(2));

  return {
    sourceUrl,
    elevationM: Number(data.geometry.coordinates[2].toFixed(1)),
    annualRainfallMm,
    annualTemperatureC,
    monthlyRainfallMmPerDay: Object.fromEntries(MONTHS.map((month) => [month, rainfall[month]])),
    monthlyTemperatureC: Object.fromEntries(MONTHS.map((month) => [month, temperature[month]])),
    climateSuitabilityScore: climateScore(annualRainfallMm, annualTemperatureC),
  };
}

async function main() {
  const adm2 = JSON.parse(await readFile(ADM2, "utf8"));
  const livelihood = JSON.parse(await readFile(LIVELIHOOD_ADM2, "utf8"));
  const knownIds = new Set(livelihood.zones.map((zone) => zone.id));
  const samples = [];

  const features = adm2.features.filter((feature) => FOCUS_REGIONS.has(feature.properties?.parent));
  for (const feature of features) {
    const region = feature.properties.parent;
    const boundaryZone = feature.properties.shapeName;
    const id = resolveAdm2Id(region, boundaryZone, knownIds);
    const center = bboxCenter(bbox(feature));
    console.log(`Fetching NASA POWER climate ADM2: ${id}`);
    const climate = await fetchClimate(center);

    samples.push({
      id,
      region,
      zone: id.split("__")[1] ?? boundaryZone,
      boundaryZone,
      lon: center.lon,
      lat: center.lat,
      fetchedAt: new Date().toISOString(),
      ...climate,
    });
  }

  await writeFile(
    OUT,
    `${JSON.stringify(
      {
        fetchedAt: new Date().toISOString(),
        source: "NASA POWER Climatology API",
        sourceDataset: "MERRA2",
        climatologyPeriod: "January 2001 - December 2020",
        description:
          "ADM2 centroid climate samples for focus-region boundaries. Values use NASA POWER 20-year climatology and are used as an additional ADM2 ERP climate suitability input.",
        samples,
      },
      null,
      2,
    )}\n`,
  );

  await writeFile(
    TS_OUT,
    `export interface ClimateAdm2Sample {
  id: string;
  region: string;
  zone: string;
  boundaryZone: string;
  lon: number;
  lat: number;
  fetchedAt: string;
  sourceUrl: string;
  elevationM: number;
  annualRainfallMm: number;
  annualTemperatureC: number;
  monthlyRainfallMmPerDay: Record<string, number>;
  monthlyTemperatureC: Record<string, number>;
  climateSuitabilityScore: number;
}

export const CLIMATE_ADM2_SAMPLES: Record<string, ClimateAdm2Sample> = ${JSON.stringify(
      Object.fromEntries(samples.map((sample) => [sample.id, sample])),
      null,
      2,
    )};

export function climateSampleForAdm2(id?: string) {
  return id ? CLIMATE_ADM2_SAMPLES[id] : undefined;
}
`,
  );

  console.log(JSON.stringify({ samples: samples.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
