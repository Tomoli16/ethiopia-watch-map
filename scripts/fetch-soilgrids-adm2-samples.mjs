import { readFile, writeFile } from "node:fs/promises";
import { bbox, bboxCenter, FOCUS_REGIONS, resolveAdm2Id } from "./adm2-utils.mjs";

const ADM2 = new URL("../public/data/eth-adm2.geojson", import.meta.url);
const LIVELIHOOD_ADM2 = new URL("../public/data/real/livelihood-population-adm2.json", import.meta.url);
const OUT = new URL("../public/data/real/soilgrids-adm2-samples.json", import.meta.url);
const TS_OUT = new URL("../src/lib/soilgrids-adm2-data.ts", import.meta.url);

function depthWeighted(layers, propertyName, divisor = 1) {
  const layer = layers.find((item) => item.name === propertyName);
  if (!layer) return null;
  const ranges = [
    ["0-5cm", 5],
    ["5-15cm", 10],
    ["15-30cm", 15],
  ];
  let total = 0;
  let weight = 0;
  for (const [label, w] of ranges) {
    const depth = layer.depths.find((item) => item.label === label);
    const value = depth?.values?.mean;
    if (typeof value !== "number") continue;
    total += value * w;
    weight += w;
  }
  return weight > 0 ? total / weight / divisor : null;
}

async function getJson(url) {
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  return response.json();
}

async function main() {
  const adm2 = JSON.parse(await readFile(ADM2, "utf8"));
  const livelihood = JSON.parse(await readFile(LIVELIHOOD_ADM2, "utf8"));
  const knownIds = new Set(livelihood.zones.map((zone) => zone.id));
  const samples = [];

  const features = adm2.features.filter((feature) => FOCUS_REGIONS.has(feature.properties?.parent));
  for (const feature of features) {
    const region = feature.properties.parent;
    const zone = feature.properties.shapeName;
    const id = resolveAdm2Id(region, zone, knownIds);
    const box = bbox(feature);
    const center = bboxCenter(box);
    const params = new URLSearchParams({
      lon: String(center.lon),
      lat: String(center.lat),
    });
    for (const property of ["phh2o", "soc", "clay", "sand", "silt"]) {
      params.append("property", property);
    }
    for (const depth of ["0-5cm", "5-15cm", "15-30cm"]) {
      params.append("depth", depth);
    }
    params.append("value", "mean");

    const sourceUrl = `https://rest.isric.org/soilgrids/v2.0/properties/query?${params.toString()}`;
    console.log(`Fetching SoilGrids ADM2: ${id}`);
    const data = await getJson(sourceUrl);
    const layers = data.properties.layers;

    samples.push({
      id,
      region,
      zone,
      boundaryZone: zone,
      lon: center.lon,
      lat: center.lat,
      sourceUrl,
      fetchedAt: new Date().toISOString(),
      depthRangeCm: "0-30",
      phH2O: Number(depthWeighted(layers, "phh2o", 10).toFixed(2)),
      soilOrganicCarbonGkg: Number(depthWeighted(layers, "soc", 10).toFixed(2)),
      clayPct: Number(depthWeighted(layers, "clay", 10).toFixed(2)),
      sandPct: Number(depthWeighted(layers, "sand", 10).toFixed(2)),
      siltPct: Number(depthWeighted(layers, "silt", 10).toFixed(2)),
    });
  }

  await writeFile(
    OUT,
    `${JSON.stringify(
      {
        fetchedAt: new Date().toISOString(),
        source: "ISRIC SoilGrids v2.0 REST API",
        description:
          "ADM2 centroid point samples for focus-region boundaries. Values are depth-weighted across 0-30 cm and used for ADM2 ERP where available.",
        samples,
      },
      null,
      2,
    )}\n`,
  );

  await writeFile(
    TS_OUT,
    `export interface SoilGridsAdm2Sample {
  id: string;
  region: string;
  zone: string;
  boundaryZone: string;
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

export const SOILGRIDS_ADM2_SAMPLES: Record<string, SoilGridsAdm2Sample> = ${JSON.stringify(
      Object.fromEntries(samples.map((sample) => [sample.id, sample])),
      null,
      2,
    )};

export function soilGridsSampleForAdm2(id?: string) {
  return id ? SOILGRIDS_ADM2_SAMPLES[id] : undefined;
}
`,
  );

  console.log(JSON.stringify({ samples: samples.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
