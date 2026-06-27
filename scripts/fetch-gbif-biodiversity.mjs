import { readFile, writeFile } from "node:fs/promises";

const ADM1 = new URL("../public/data/eth-adm1.geojson", import.meta.url);
const OUT = new URL("../public/data/real/gbif-biodiversity-regions.json", import.meta.url);
const FOCUS_REGIONS = ["Oromia", "SNNPR", "Beneshangul Gumu", "Gambela"];

const GROUPS = [
  { key: "allOccurrences", label: "All coordinated occurrences", params: {} },
  { key: "plantOccurrences", label: "Plant occurrences", params: { kingdomKey: "6" } },
  { key: "birdOccurrences", label: "Bird occurrences", params: { classKey: "212" } },
];

function bbox(feature) {
  const xs = [];
  const ys = [];
  const walk = (coords) => {
    if (Array.isArray(coords[0])) {
      coords.forEach(walk);
      return;
    }
    xs.push(coords[0]);
    ys.push(coords[1]);
  };
  walk(feature.geometry.coordinates);
  return {
    minLon: Math.min(...xs),
    minLat: Math.min(...ys),
    maxLon: Math.max(...xs),
    maxLat: Math.max(...ys),
  };
}

function bboxPolygon(box) {
  return [
    "POLYGON((",
    `${box.minLon} ${box.minLat},`,
    `${box.maxLon} ${box.minLat},`,
    `${box.maxLon} ${box.maxLat},`,
    `${box.minLon} ${box.maxLat},`,
    `${box.minLon} ${box.minLat}`,
    "))",
  ].join("");
}

async function getJson(url) {
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  return response.json();
}

async function resolveSpecies(speciesKey, cache) {
  if (!speciesKey) return null;
  if (cache.has(speciesKey)) return cache.get(speciesKey);

  const url = `https://api.gbif.org/v1/species/${speciesKey}`;
  const data = await getJson(url);
  const resolved = {
    speciesKey,
    scientificName: data.scientificName ?? data.canonicalName ?? `GBIF taxon ${speciesKey}`,
    canonicalName: data.canonicalName ?? null,
    rank: data.rank ?? null,
    kingdom: data.kingdom ?? null,
    family: data.family ?? null,
    sourceUrl: url,
  };
  cache.set(speciesKey, resolved);
  return resolved;
}

async function fetchOccurrenceGroup(region, box, group, speciesCache) {
  const params = new URLSearchParams({
    country: "ET",
    hasCoordinate: "true",
    geometry: bboxPolygon(box),
    limit: "0",
    facet: "speciesKey",
    facetLimit: "8",
    ...group.params,
  });
  const sourceUrl = `https://api.gbif.org/v1/occurrence/search?${params.toString()}`;
  const data = await getJson(sourceUrl);
  const facet = data.facets?.find((item) => item.field === "SPECIES_KEY");
  const topSpecies = [];

  for (const item of facet?.counts ?? []) {
    const taxon = await resolveSpecies(item.name, speciesCache);
    topSpecies.push({
      ...taxon,
      count: item.count,
    });
  }

  return {
    key: group.key,
    label: group.label,
    sourceUrl,
    region,
    count: data.count,
    topSpecies,
  };
}

async function main() {
  const adm1 = JSON.parse(await readFile(ADM1, "utf8"));
  const speciesCache = new Map();
  const regions = [];

  for (const regionName of FOCUS_REGIONS) {
    const feature = adm1.features.find((f) => f.properties.shapeName === regionName);
    if (!feature) throw new Error(`Missing ADM1 feature for ${regionName}`);

    const box = bbox(feature);
    const groups = [];
    for (const group of GROUPS) {
      console.log(`Fetching GBIF ${group.key}: ${regionName}`);
      groups.push(await fetchOccurrenceGroup(regionName, box, group, speciesCache));
    }

    regions.push({
      region: regionName,
      bbox: box,
      geometryNote:
        "GBIF was queried with the ADM1 bounding box for speed. Counts may include records just outside the region and should be replaced with polygon filtering for production.",
      groups,
    });
  }

  await writeFile(
    OUT,
    `${JSON.stringify(
      {
        fetchedAt: new Date().toISOString(),
        source: "GBIF Occurrence API",
        description:
          "Regional biodiversity evidence for the four focus regions using GBIF coordinated occurrences. Includes occurrence counts and top species facets for all taxa, plants and birds. These values are real GBIF data but are not yet corrected for observer/sampling bias.",
        regions,
      },
      null,
      2,
    )}\n`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
