import { readFile, writeFile } from "node:fs/promises";
import { fromUrl } from "geotiff";
import { bbox, bboxCenter, FOCUS_REGIONS, resolveAdm2Id } from "./adm2-utils.mjs";

const ADM2_GEOJSON = new URL("../public/data/eth-adm2.geojson", import.meta.url);
const SOILGRIDS_ADM2 = new URL("../public/data/real/soilgrids-adm2-samples.json", import.meta.url);
const OUT = new URL("../public/data/real/esa-worldcover-adm2-samples.json", import.meta.url);
const TS_OUT = new URL("../src/lib/landcover-adm2-data.ts", import.meta.url);

const TILE_SIZE_DEGREES = 3;
const TILE_BASE = "https://esa-worldcover.s3.eu-central-1.amazonaws.com/v200/2021/map";

const CLASSES = {
  10: { label: "Tree cover", safeguardWeight: 0.65 },
  20: { label: "Shrubland", safeguardWeight: 0.9 },
  30: { label: "Grassland", safeguardWeight: 0.9 },
  40: { label: "Cropland", safeguardWeight: 0.25 },
  50: { label: "Built-up", safeguardWeight: 0 },
  60: { label: "Bare / sparse vegetation", safeguardWeight: 0.8 },
  70: { label: "Snow and ice", safeguardWeight: 0 },
  80: { label: "Permanent water bodies", safeguardWeight: 0 },
  90: { label: "Herbaceous wetland", safeguardWeight: 0.35 },
  95: { label: "Mangroves", safeguardWeight: 0.2 },
  100: { label: "Moss and lichen", safeguardWeight: 0.5 },
};

const geotiffCache = new Map();
const EARTH_RADIUS_KM = 6371;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function tileOrigin(value) {
  return Math.floor(value / TILE_SIZE_DEGREES) * TILE_SIZE_DEGREES;
}

function signedTile(value, positive, negative, width) {
  const prefix = value >= 0 ? positive : negative;
  return `${prefix}${String(Math.abs(value)).padStart(width, "0")}`;
}

function tileUrl(lat, lon) {
  const south = tileOrigin(lat);
  const west = tileOrigin(lon);
  const name = `ESA_WorldCover_10m_2021_v200_${signedTile(south, "N", "S", 2)}${signedTile(west, "E", "W", 3)}_Map.tif`;
  return `${TILE_BASE}/${name}`;
}

function ringAreaKm2(coords) {
  let sum = 0;
  for (let i = 0; i < coords.length - 1; i += 1) {
    const lon1 = coords[i][0] * (Math.PI / 180);
    const lat1 = coords[i][1] * (Math.PI / 180);
    const lon2 = coords[i + 1][0] * (Math.PI / 180);
    const lat2 = coords[i + 1][1] * (Math.PI / 180);
    sum += (lon2 - lon1) * (2 + Math.sin(lat1) + Math.sin(lat2));
  }
  return Math.abs((sum * EARTH_RADIUS_KM * EARTH_RADIUS_KM) / 2);
}

function geometryAreaKm2(geometry) {
  if (geometry.type === "Polygon") {
    return Math.abs(
      geometry.coordinates.reduce((sum, ring, index) => sum + (index === 0 ? ringAreaKm2(ring) : -ringAreaKm2(ring)), 0),
    );
  }
  if (geometry.type === "MultiPolygon") {
    return Math.abs(
      geometry.coordinates.reduce(
        (total, polygon) =>
          total + polygon.reduce((sum, ring, index) => sum + (index === 0 ? ringAreaKm2(ring) : -ringAreaKm2(ring)), 0),
        0,
      ),
    );
  }
  return 0;
}

function sampleGridSize(areaKm2) {
  if (areaKm2 >= 30000) return 9;
  if (areaKm2 >= 10000) return 7;
  return 5;
}

function samplePoints(box, gridSize) {
  const center = bboxCenter(box);
  const lonSpan = box.maxLon - box.minLon;
  const latSpan = box.maxLat - box.minLat;
  const maxOffset = 0.34;
  const steps = Array.from({ length: gridSize }, (_, index) => {
    if (gridSize === 1) return 0;
    return Number((((index / (gridSize - 1)) * 2 - 1) * maxOffset).toFixed(3));
  });
  const offsets = steps.flatMap((y, row) =>
    steps.map((x, col) => ({
      key: row === 2 && col === 2 ? "center" : `r${row + 1}c${col + 1}`,
      x,
      y,
    })),
  );
  return offsets.map(({ key, x, y }) => ({
    key,
    lon: Number((center.lon + lonSpan * x).toFixed(5)),
    lat: Number((center.lat + latSpan * y).toFixed(5)),
  }));
}

async function imageForPoint(point) {
  const url = tileUrl(point.lat, point.lon);
  if (!geotiffCache.has(url)) {
    geotiffCache.set(url, fromUrl(url).then((tiff) => tiff.getImage()));
  }
  return geotiffCache.get(url);
}

async function classForPoint(point) {
  const image = await imageForPoint(point);
  const [minLon, minLat, maxLon, maxLat] = image.getBoundingBox();
  const width = image.getWidth();
  const height = image.getHeight();
  const x = Math.min(width - 1, Math.max(0, Math.floor(((point.lon - minLon) / (maxLon - minLon)) * width)));
  const y = Math.min(height - 1, Math.max(0, Math.floor(((maxLat - point.lat) / (maxLat - minLat)) * height)));
  const raster = await image.readRasters({ window: [x, y, x + 1, y + 1] });
  return Number(raster[0][0]);
}

async function classForPointWithRetry(point) {
  let lastError;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      return await classForPoint(point);
    } catch (error) {
      lastError = error;
      geotiffCache.delete(tileUrl(point.lat, point.lon));
      await sleep(500 * attempt);
    }
  }
  throw lastError;
}

function summarize(samples) {
  const counts = {};
  for (const sample of samples) counts[sample.classValue] = (counts[sample.classValue] ?? 0) + 1;
  const total = samples.length || 1;
  const classShares = Object.fromEntries(
    Object.entries(counts)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([value, count]) => {
        const info = CLASSES[value] ?? { label: `Class ${value}`, safeguardWeight: 0.5 };
        return [
          value,
          {
            label: info.label,
            count,
            share: Number((count / total).toFixed(3)),
          },
        ];
      }),
  );
  const croplandShare = (counts[40] ?? 0) / total;
  const builtUpShare = (counts[50] ?? 0) / total;
  const treeCoverShare = (counts[10] ?? 0) / total;
  const waterWetlandShare = ((counts[80] ?? 0) + (counts[90] ?? 0) + (counts[95] ?? 0)) / total;
  const openVegetationShare = ((counts[20] ?? 0) + (counts[30] ?? 0) + (counts[60] ?? 0)) / total;
  const weightedSafeguard =
    samples.reduce((sum, sample) => {
      const info = CLASSES[sample.classValue] ?? { safeguardWeight: 0.5 };
      return sum + info.safeguardWeight;
    }, 0) / total;
  return {
    classShares,
    croplandShare: Number(croplandShare.toFixed(3)),
    builtUpShare: Number(builtUpShare.toFixed(3)),
    treeCoverShare: Number(treeCoverShare.toFixed(3)),
    waterWetlandShare: Number(waterWetlandShare.toFixed(3)),
    openVegetationShare: Number(openVegetationShare.toFixed(3)),
    landUseSafeguardScore: Math.round(weightedSafeguard * 100),
  };
}

async function main() {
  const geojson = JSON.parse(await readFile(ADM2_GEOJSON, "utf8"));
  const soil = JSON.parse(await readFile(SOILGRIDS_ADM2, "utf8"));
  const knownIds = new Set(soil.samples.map((sample) => sample.id));
  const rows = [];
  try {
    const existing = JSON.parse(await readFile(OUT, "utf8"));
    rows.push(...Object.values(existing.adm2 ?? {}));
  } catch {
    // No previous completed output to resume from.
  }
  const completed = new Map(rows.map((row) => [row.id, row]));

  for (const feature of geojson.features) {
    const props = feature.properties ?? {};
    const region = props.parent;
    const zone = props.shapeName;
    if (!FOCUS_REGIONS.has(region) || !zone) continue;
    const id = resolveAdm2Id(region, zone, knownIds);
    if (!knownIds.has(id)) continue;

    const areaKm2 = Math.round(geometryAreaKm2(feature.geometry));
    const gridSize = sampleGridSize(areaKm2);
    const existing = completed.get(id);
    if (existing?.sampleGridSize === gridSize && existing.samples?.length === gridSize * gridSize) {
      console.log(`Skipping ESA WorldCover ADM2 samples: ${id} (${gridSize}x${gridSize} complete)`);
      continue;
    }
    console.log(`Fetching ESA WorldCover ADM2 samples: ${id} (${areaKm2.toLocaleString()} km2, ${gridSize}x${gridSize})`);
    const points = samplePoints(bbox(feature), gridSize);
    const samples = [];
    for (const point of points) {
      const classValue = await classForPointWithRetry(point);
      samples.push({
        ...point,
        classValue,
        classLabel: CLASSES[classValue]?.label ?? `Class ${classValue}`,
      });
    }
    const row = {
      id,
      region,
      zone: id.split("__")[1] ?? zone,
      sourceBoundaryName: zone,
      areaKm2,
      sampleGridSize: gridSize,
      samples,
      ...summarize(samples),
    };
    completed.set(id, row);
    rows.splice(0, rows.length, ...completed.values());
    const partialRows = [...rows].sort((a, b) => a.region.localeCompare(b.region) || a.zone.localeCompare(b.zone));
    await writeFile(
      OUT,
      `${JSON.stringify(
        {
          source: "ESA WorldCover 2021 v200",
          sourceUrl: "https://esa-worldcover.org/en/data-access",
          tileBaseUrl: TILE_BASE,
          fetchedAt: new Date().toISOString(),
          description:
            "ADM2 area-scaled land-cover samples from ESA WorldCover 2021. Small zones use 5x5 samples, medium zones 7x7 samples and very large zones 9x9 samples. Used as a land-use safeguard layer, not as a weighted ERP/BRV/LI proxy.",
          caveats:
            "This is a lightweight sample-based safeguard. Replace with full raster zonal statistics before making hectare-level planting exclusions.",
          classes: CLASSES,
          count: partialRows.length,
          adm2: Object.fromEntries(partialRows.map((item) => [item.id, item])),
        },
        null,
        2,
      )}\n`,
    );
  }

  rows.sort((a, b) => a.region.localeCompare(b.region) || a.zone.localeCompare(b.zone));
  const adm2 = Object.fromEntries(rows.map((row) => [row.id, row]));
  const output = {
    source: "ESA WorldCover 2021 v200",
    sourceUrl: "https://esa-worldcover.org/en/data-access",
    tileBaseUrl: TILE_BASE,
    fetchedAt: new Date().toISOString(),
    description:
      "ADM2 area-scaled land-cover samples from ESA WorldCover 2021. Small zones use 5x5 samples, medium zones 7x7 samples and very large zones 9x9 samples. Used as a land-use safeguard layer, not as a weighted ERP/BRV/LI proxy.",
    caveats:
      "This is a lightweight sample-based safeguard. Replace with full raster zonal statistics before making hectare-level planting exclusions.",
    classes: CLASSES,
    count: rows.length,
    adm2,
  };

  await writeFile(OUT, `${JSON.stringify(output, null, 2)}\n`);
  await writeFile(
    TS_OUT,
    `export interface LandCoverAdm2Sample {
  id: string;
  region: string;
  zone: string;
  sourceBoundaryName: string;
  areaKm2: number;
  sampleGridSize: number;
  samples: {
    key: string;
    lon: number;
    lat: number;
    classValue: number;
    classLabel: string;
  }[];
  classShares: Record<string, {
    label: string;
    count: number;
    share: number;
  }>;
  croplandShare: number;
  builtUpShare: number;
  treeCoverShare: number;
  waterWetlandShare: number;
  openVegetationShare: number;
  landUseSafeguardScore: number;
}

export const LANDCOVER_ADM2: Record<string, LandCoverAdm2Sample> = ${JSON.stringify(adm2, null, 2)};

export function landCoverForAdm2(id?: string) {
  return id ? LANDCOVER_ADM2[id] : undefined;
}
`,
  );

  console.log(`Wrote ${rows.length} ADM2 ESA WorldCover samples`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
