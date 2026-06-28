import { readFile, writeFile } from "node:fs/promises";
import { bbox, bboxCenter, FOCUS_REGIONS, resolveAdm2Id } from "./adm2-utils.mjs";

const ADM2_GEOJSON = new URL("../public/data/eth-adm2.geojson", import.meta.url);
const SOILGRIDS_ADM2 = new URL("../public/data/real/soilgrids-adm2-samples.json", import.meta.url);
const OUT = new URL("../public/data/real/open-meteo-terrain-adm2.json", import.meta.url);
const TS_OUT = new URL("../src/lib/terrain-adm2-data.ts", import.meta.url);

const KM_PER_LAT_DEGREE = 111.32;

function samplePoints(box) {
  const center = bboxCenter(box);
  const lonSpan = box.maxLon - box.minLon;
  const latSpan = box.maxLat - box.minLat;
  return [
    { key: "center", ...center },
    { key: "north", lon: center.lon, lat: Number((center.lat + latSpan * 0.22).toFixed(5)) },
    { key: "south", lon: center.lon, lat: Number((center.lat - latSpan * 0.22).toFixed(5)) },
    { key: "east", lon: Number((center.lon + lonSpan * 0.22).toFixed(5)), lat: center.lat },
    { key: "west", lon: Number((center.lon - lonSpan * 0.22).toFixed(5)), lat: center.lat },
  ];
}

function distanceKm(a, b) {
  const meanLatRad = ((a.lat + b.lat) / 2) * (Math.PI / 180);
  const dx = (a.lon - b.lon) * KM_PER_LAT_DEGREE * Math.cos(meanLatRad);
  const dy = (a.lat - b.lat) * KM_PER_LAT_DEGREE;
  return Math.sqrt(dx * dx + dy * dy);
}

function terrainScore(points) {
  const center = points.find((point) => point.key === "center");
  const elevations = points.map((point) => point.elevationM);
  const elevationRangeM = Math.max(...elevations) - Math.min(...elevations);
  const directionalSlopes = center
    ? points
        .filter((point) => point.key !== "center")
        .map((point) => {
          const km = distanceKm(center, point);
          return km > 0 ? (Math.abs(point.elevationM - center.elevationM) / (km * 1000)) * 100 : 0;
        })
    : [];
  const maxSlopePercent = directionalSlopes.length ? Math.max(...directionalSlopes) : 0;
  const meanSlopePercent = directionalSlopes.length
    ? directionalSlopes.reduce((sum, value) => sum + value, 0) / directionalSlopes.length
    : 0;
  const rangeScore = Math.min(1, elevationRangeM / 1800);
  const slopeScore = Math.min(1, maxSlopePercent / 9);
  const meanSlopeScore = Math.min(1, meanSlopePercent / 5);
  return {
    elevationRangeM: Math.round(elevationRangeM),
    maxSlopePercent: Number(maxSlopePercent.toFixed(2)),
    meanSlopePercent: Number(meanSlopePercent.toFixed(2)),
    terrainReliefScore: Math.round(((rangeScore * 0.4 + slopeScore * 0.4 + meanSlopeScore * 0.2) * 100)),
  };
}

async function fetchElevations(points) {
  const latitude = points.map((point) => point.lat).join(",");
  const longitude = points.map((point) => point.lon).join(",");
  const url = `https://api.open-meteo.com/v1/elevation?latitude=${latitude}&longitude=${longitude}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Open-Meteo elevation ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (!Array.isArray(json.elevation) || json.elevation.length !== points.length) {
    throw new Error(`Unexpected Open-Meteo response for ${url}`);
  }
  return points.map((point, index) => ({
    ...point,
    elevationM: Number(json.elevation[index]),
  }));
}

async function main() {
  const geojson = JSON.parse(await readFile(ADM2_GEOJSON, "utf8"));
  const soil = JSON.parse(await readFile(SOILGRIDS_ADM2, "utf8"));
  const knownIds = new Set(soil.samples.map((sample) => sample.id));
  const rows = [];

  for (const feature of geojson.features) {
    const props = feature.properties ?? {};
    const region = props.parent;
    const zone = props.shapeName;
    if (!FOCUS_REGIONS.has(region) || !zone) continue;
    const id = resolveAdm2Id(region, zone, knownIds);
    if (!knownIds.has(id)) continue;

    const box = bbox(feature);
    const points = samplePoints(box);
    console.log(`Fetching Open-Meteo terrain ADM2: ${id}`);
    const elevationPoints = await fetchElevations(points);
    rows.push({
      id,
      region,
      zone: id.split("__")[1] ?? zone,
      sourceBoundaryName: zone,
      bbox: box,
      samples: elevationPoints,
      ...terrainScore(elevationPoints),
    });
  }

  rows.sort((a, b) => a.region.localeCompare(b.region) || a.zone.localeCompare(b.zone));
  const samples = Object.fromEntries(rows.map((row) => [row.id, row]));
  const output = {
    source: "Open-Meteo Elevation API",
    sourceUrl: "https://open-meteo.com/en/docs/elevation-api",
    fetchedAt: new Date().toISOString(),
    description:
      "ADM2 five-point elevation samples for focus-region boundaries. Values are used as a real terrain relief / erosion-risk input inside ERP.",
    caveats:
      "This is a lightweight centroid-and-cardinal-points proxy, not full raster zonal statistics. It should be replaced by SRTM/DEM zonal slope once raster processing is added.",
    units: {
      elevationM: "metres above sea level",
      elevationRangeM: "metres between sampled low and high points",
      maxSlopePercent: "maximum center-to-cardinal sampled elevation gradient",
      meanSlopePercent: "mean center-to-cardinal sampled elevation gradient",
      terrainReliefScore: "0-100 relative score, higher means more relief/erosion-sensitive terrain",
    },
    count: rows.length,
    samples,
  };

  await writeFile(OUT, `${JSON.stringify(output, null, 2)}\n`);
  await writeFile(
    TS_OUT,
    `export interface TerrainAdm2Sample {
  id: string;
  region: string;
  zone: string;
  sourceBoundaryName: string;
  bbox: {
    minLon: number;
    minLat: number;
    maxLon: number;
    maxLat: number;
  };
  samples: {
    key: string;
    lon: number;
    lat: number;
    elevationM: number;
  }[];
  elevationRangeM: number;
  maxSlopePercent: number;
  meanSlopePercent: number;
  terrainReliefScore: number;
}

export const TERRAIN_ADM2_SAMPLES: Record<string, TerrainAdm2Sample> = ${JSON.stringify(samples, null, 2)};

export function terrainSampleForAdm2(id?: string) {
  return id ? TERRAIN_ADM2_SAMPLES[id] : undefined;
}
`,
  );

  console.log(`Wrote ${rows.length} ADM2 Open-Meteo terrain samples`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
