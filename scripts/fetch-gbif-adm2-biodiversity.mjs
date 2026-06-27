import { readFile, writeFile } from "node:fs/promises";
import { bbox, bboxPolygon, FOCUS_REGIONS, resolveAdm2Id } from "./adm2-utils.mjs";

const ADM2 = new URL("../public/data/eth-adm2.geojson", import.meta.url);
const LIVELIHOOD_ADM2 = new URL("../public/data/real/livelihood-population-adm2.json", import.meta.url);
const OUT = new URL("../public/data/real/gbif-biodiversity-adm2.json", import.meta.url);
const TS_OUT = new URL("../src/lib/gbif-adm2-data.ts", import.meta.url);

const GROUPS = [
  { key: "allOccurrences", params: {} },
  { key: "plantOccurrences", params: { kingdomKey: "6" } },
  { key: "birdOccurrences", params: { classKey: "212" } },
];

async function getJson(url) {
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const response = await fetch(url, { headers: { accept: "application/json" } });
    if (response.ok) return response.json();
    if (response.status !== 429 || attempt === 5) {
      throw new Error(`${response.status} ${response.statusText} for ${url}`);
    }
    const retryAfter = Number(response.headers.get("retry-after") ?? 8);
    await sleep((retryAfter + attempt) * 1000);
  }
  throw new Error(`Failed after retries for ${url}`);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function readExistingZones() {
  try {
    const data = JSON.parse(await readFile(OUT, "utf8"));
    return Array.isArray(data.zones) ? data.zones : [];
  } catch {
    return [];
  }
}

async function writeOutput(zones) {
  await writeFile(
    OUT,
    `${JSON.stringify(
      {
        fetchedAt: new Date().toISOString(),
        source: "GBIF Occurrence API",
        description:
          "ADM2 biodiversity evidence for focus-region boundaries using GBIF coordinated occurrences. Counts are queried by ADM2 bounding box and are not yet sampling-bias corrected.",
        zones,
      },
      null,
      2,
    )}\n`,
  );

  await writeFile(
    TS_OUT,
    `export interface GbifAdm2Biodiversity {
  id: string;
  region: string;
  zone: string;
  boundaryZone: string;
  fetchedAt: string;
  geometryNote: string;
  allOccurrences: number;
  plantOccurrences: number;
  birdOccurrences: number;
  occurrenceEvidenceScore: number;
  sourceUrls: Record<string, string>;
}

export const GBIF_ADM2_BIODIVERSITY: Record<string, GbifAdm2Biodiversity> = ${JSON.stringify(
      Object.fromEntries(zones.map((zone) => [zone.id, zone])),
      null,
      2,
    )};

export function gbifBiodiversityForAdm2(id?: string) {
  return id ? GBIF_ADM2_BIODIVERSITY[id] : undefined;
}
`,
  );
}

async function fetchCount(box, group) {
  const params = new URLSearchParams({
    country: "ET",
    hasCoordinate: "true",
    geometry: bboxPolygon(box),
    limit: "0",
    ...group.params,
  });
  const sourceUrl = `https://api.gbif.org/v1/occurrence/search?${params.toString()}`;
  const data = await getJson(sourceUrl);
  return { count: data.count, sourceUrl };
}

function evidenceScore(allOccurrences, plantOccurrences, birdOccurrences) {
  const all = Math.min(1, Math.log10(allOccurrences + 1) / 5);
  const plants = Math.min(1, Math.log10(plantOccurrences + 1) / 4);
  const birds = Math.min(1, Math.log10(birdOccurrences + 1) / 4);
  return Math.round((all * 0.4 + plants * 0.3 + birds * 0.3) * 100);
}

async function main() {
  const adm2 = JSON.parse(await readFile(ADM2, "utf8"));
  const livelihood = JSON.parse(await readFile(LIVELIHOOD_ADM2, "utf8"));
  const knownIds = new Set(livelihood.zones.map((zone) => zone.id));
  const zones = await readExistingZones();
  const seen = new Set(zones.map((zone) => zone.id));

  const features = adm2.features.filter((feature) => FOCUS_REGIONS.has(feature.properties?.parent));
  for (const feature of features) {
    const region = feature.properties.parent;
    const zone = feature.properties.shapeName;
    const id = resolveAdm2Id(region, zone, knownIds);
    if (seen.has(id)) continue;
    const box = bbox(feature);
    const counts = {};
    const sourceUrls = {};

    console.log(`Fetching GBIF ADM2: ${id}`);
    for (const group of GROUPS) {
      const result = await fetchCount(box, group);
      counts[group.key] = result.count;
      sourceUrls[group.key] = result.sourceUrl;
      await sleep(1800);
    }

    zones.push({
      id,
      region,
      zone: id.split("__")[1] ?? zone,
      boundaryZone: zone,
      fetchedAt: new Date().toISOString(),
      geometryNote:
        "GBIF was queried with the ADM2 boundary bounding box. Counts are real GBIF records but not polygon-clipped or corrected for observer effort.",
      allOccurrences: counts.allOccurrences,
      plantOccurrences: counts.plantOccurrences,
      birdOccurrences: counts.birdOccurrences,
      occurrenceEvidenceScore: evidenceScore(
        counts.allOccurrences,
        counts.plantOccurrences,
        counts.birdOccurrences,
      ),
      sourceUrls,
    });
    seen.add(id);
    await writeOutput(zones);
  }

  await writeOutput(zones);

  console.log(JSON.stringify({ zones: zones.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
