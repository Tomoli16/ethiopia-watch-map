import { readFile, writeFile } from "node:fs/promises";
import { bbox, FOCUS_REGIONS, resolveAdm2Id } from "./adm2-utils.mjs";

const ADM2_GEOJSON = new URL("../public/data/eth-adm2.geojson", import.meta.url);
const LANDCOVER_ADM2 = new URL("../public/data/real/esa-worldcover-adm2-samples.json", import.meta.url);
const OUT = new URL("../public/data/real/gfw-tree-cover-loss-adm2.json", import.meta.url);
const TS_OUT = new URL("../src/lib/gfw-adm2-data.ts", import.meta.url);

const BASE_URL = "https://data-api.globalforestwatch.org";
const CANOPY_COVER = Number(process.env.GFW_CANOPY_COVER ?? 30);
const POLL_MS = Number(process.env.GFW_POLL_MS ?? 4000);
const POLL_ATTEMPTS = Number(process.env.GFW_POLL_ATTEMPTS ?? 60);
const GFW_ORIGIN = process.env.GFW_ORIGIN ?? "http://localhost";

async function loadLocalEnv() {
  try {
    const envText = await readFile(new URL("../.env.local", import.meta.url), "utf8");
    for (const line of envText.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (!match) continue;
      const [, key, rawValue] = match;
      if (process.env[key]) continue;
      process.env[key] = rawValue.trim().replace(/^["']|["']$/g, "");
    }
  } catch {
    // Optional local env file. Direct shell env still works.
  }
}

await loadLocalEnv();

const apiKey = process.env.GFW_API_KEY;

if (!apiKey) {
  console.error("Missing GFW_API_KEY. Run for example: GFW_API_KEY='...' npm run data:fetch:gfw:adm2");
  process.exit(1);
}

async function gfwFetch(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-api-key": apiKey,
      origin: GFW_ORIGIN,
      ...(options.headers ?? {}),
    },
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    throw new Error(`GFW ${response.status} ${response.statusText} for ${path}: ${text.slice(0, 500)}`);
  }
  return data;
}

function featureForGeostore(feature) {
  return {
    type: feature.geometry.type,
    coordinates: feature.geometry.coordinates,
  };
}

async function createGeostore(feature) {
  const data = await gfwFetch("/geostore/", {
    method: "POST",
    body: JSON.stringify({ geometry: featureForGeostore(feature) }),
  });
  return data.data.gfw_geostore_id;
}

function resourceIdFromLink(link) {
  const parts = String(link).split("/").filter(Boolean);
  return parts[parts.length - 1];
}

async function ensureTreeCoverLossResource(geostoreId) {
  const body = {
    aoi: { type: "geostore", geostore_id: geostoreId },
    canopy_cover: CANOPY_COVER,
  };
  const data = await gfwFetch("/v0/land/tree_cover_loss_by_driver", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return resourceIdFromLink(data.data.link);
}

async function getTreeCoverLossResource(resourceId) {
  return gfwFetch(`/v0/land/tree_cover_loss_by_driver/${resourceId}`);
}

async function waitForTreeCoverLoss(resourceId) {
  for (let attempt = 1; attempt <= POLL_ATTEMPTS; attempt += 1) {
    const data = await getTreeCoverLossResource(resourceId);
    const status = data.data?.status;
    if (status === "saved") return data.data;
    if (status === "failed") {
      throw new Error(data.data?.message ?? `GFW tree cover loss resource ${resourceId} failed`);
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_MS));
  }
  throw new Error(`Timed out waiting for GFW tree cover loss resource ${resourceId}`);
}

function rowAreaHa(row) {
  return Number(row.loss_area_ha ?? row.area__ha ?? row.area_ha ?? 0);
}

function rowDriver(row) {
  return String(row.drivers_type ?? row.tsc_tree_cover_loss_drivers__driver ?? row.driver ?? "Unknown");
}

function rowYear(row) {
  return String(row.loss_year ?? row.umd_tree_cover_loss__year ?? row.year ?? "");
}

function yearlyLoss(rows) {
  const out = {};
  for (const row of rows) {
    const year = rowYear(row);
    if (!year) continue;
    out[year] = Number(((out[year] ?? 0) + rowAreaHa(row)).toFixed(3));
  }
  return out;
}

function driverLoss(rows) {
  const out = {};
  for (const row of rows) {
    const driver = rowDriver(row);
    out[driver] = Number(((out[driver] ?? 0) + rowAreaHa(row)).toFixed(3));
  }
  return out;
}

function pressureScore(totalLossHa, areaKm2, recentLossShare) {
  if (areaKm2 <= 0) return 0;
  const density = totalLossHa / areaKm2;
  const densityScore = Math.min(1, Math.log10(Math.max(0.01, density)) / Math.log10(20));
  return Math.round(Math.max(0, Math.min(1, densityScore * 0.75 + recentLossShare * 0.25)) * 100);
}

async function main() {
  const geojson = JSON.parse(await readFile(ADM2_GEOJSON, "utf8"));
  const landcover = JSON.parse(await readFile(LANDCOVER_ADM2, "utf8"));
  const previous = await readFile(OUT, "utf8")
    .then((text) => JSON.parse(text).samples ?? {})
    .catch(() => ({}));
  const knownIds = new Set(Object.keys(landcover.adm2 ?? {}));
  const rows = [];

  const features = geojson.features.filter((feature) => FOCUS_REGIONS.has(feature.properties?.parent));
  for (const feature of features) {
    const props = feature.properties ?? {};
    const region = props.parent;
    const boundaryZone = props.shapeName;
    const id = resolveAdm2Id(region, boundaryZone, knownIds);
    const areaKm2 = landcover.adm2?.[id]?.areaKm2 ?? 0;
    if (!knownIds.has(id) || areaKm2 <= 0) continue;

    console.log(`Fetching GFW tree cover loss ADM2: ${id}`);
    const geostoreId = previous[id]?.geostoreId ?? (await createGeostore(feature));
    const resourceId = previous[id]?.resourceId ?? (await ensureTreeCoverLossResource(geostoreId));
    const result = await waitForTreeCoverLoss(resourceId);
    const annualRows = result.result?.yearly_tree_cover_loss_by_driver ?? [];
    const driverRows = result.result?.tree_cover_loss_by_driver ?? [];
    const yearlyLossHa = yearlyLoss(annualRows);
    const lossByDriverHa = driverLoss(driverRows.length ? driverRows : annualRows);
    const totalLossHa = Number(Object.values(yearlyLossHa).reduce((sum, value) => sum + value, 0).toFixed(3));
    const recentLossHa = Number(
      Object.entries(yearlyLossHa)
        .filter(([year]) => Number(year) >= 2015)
        .reduce((sum, [, value]) => sum + value, 0)
        .toFixed(3),
    );
    const recentLossShare = totalLossHa > 0 ? Number((recentLossHa / totalLossHa).toFixed(4)) : 0;
    const dominantDriver =
      Object.entries(lossByDriverHa).sort((a, b) => Number(b[1]) - Number(a[1]))[0]?.[0] ?? "Unknown";

    rows.push({
      id,
      region,
      zone: id.split("__")[1] ?? boundaryZone,
      boundaryZone,
      bbox: bbox(feature),
      geostoreId,
      resourceId,
      fetchedAt: new Date().toISOString(),
      areaKm2,
      canopyCoverThreshold: CANOPY_COVER,
      totalLossHa,
      lossDensityHaPerKm2: Number((totalLossHa / areaKm2).toFixed(4)),
      recentLossHa,
      recentLossShare,
      dominantDriver,
      degradationPressureScore: pressureScore(totalLossHa, areaKm2, recentLossShare),
      yearlyLossHa,
      lossByDriverHa,
    });
  }

  rows.sort((a, b) => a.region.localeCompare(b.region) || a.zone.localeCompare(b.zone));
  const samples = Object.fromEntries(rows.map((row) => [row.id, row]));
  await writeFile(
    OUT,
    `${JSON.stringify(
      {
        source: "Global Forest Watch Data API",
        sourceUrl: `${BASE_URL}/v0/land/tree_cover_loss_by_driver`,
        dataset: "umd_tree_cover_loss",
        datasetVersion: "latest",
        canopyCoverThreshold: CANOPY_COVER,
        fetchedAt: new Date().toISOString(),
        description:
          "ADM2 tree cover loss by driver for focus-region HDX/OCHA zone geometries. Used as a real GFW/UMD degradation pressure input inside ERP.",
        caveats:
          "The GFW Land endpoint reports tree-cover loss by canopy threshold and driver. It is not a full restoration suitability model and should be combined with soil, climate, terrain and land-use safeguards.",
        count: rows.length,
        samples,
      },
      null,
      2,
    )}\n`,
  );

  await writeFile(
    TS_OUT,
    `export interface GfwTreeCoverLossAdm2 {
  id: string;
  region: string;
  zone: string;
  boundaryZone: string;
  bbox?: {
    minLon: number;
    minLat: number;
    maxLon: number;
    maxLat: number;
  };
  geostoreId: string;
  resourceId: string;
  fetchedAt?: string;
  areaKm2: number;
  canopyCoverThreshold: number;
  totalLossHa: number;
  lossDensityHaPerKm2: number;
  recentLossHa: number;
  recentLossShare: number;
  dominantDriver: string;
  degradationPressureScore: number;
  yearlyLossHa: Record<string, number>;
  lossByDriverHa: Record<string, number>;
}

export const GFW_TREE_COVER_LOSS_ADM2: Record<string, GfwTreeCoverLossAdm2> = ${JSON.stringify(samples, null, 2)};

export function gfwTreeCoverLossForAdm2(id?: string) {
  return id ? GFW_TREE_COVER_LOSS_ADM2[id] : undefined;
}
`,
  );

  console.log(`Wrote ${rows.length} ADM2 GFW tree cover loss samples`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
