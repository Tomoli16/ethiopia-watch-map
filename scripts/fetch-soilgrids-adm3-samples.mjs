import { readFile, writeFile } from "node:fs/promises";

const FOCUS_REGIONS = ["Oromia", "SNNPR", "Beneshangul Gumu", "Gambela"];
const POINTS_PER_REGION = 10;
const OUT = new URL("../public/data/real/soilgrids-adm3-samples.json", import.meta.url);
const ADM3 = new URL("../public/data/eth-adm3.geojson", import.meta.url);

function ringAreaAndCentroid(ring) {
  let twiceArea = 0;
  let cx = 0;
  let cy = 0;

  for (let i = 0; i < ring.length - 1; i += 1) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[i + 1];
    const cross = x1 * y2 - x2 * y1;
    twiceArea += cross;
    cx += (x1 + x2) * cross;
    cy += (y1 + y2) * cross;
  }

  if (Math.abs(twiceArea) < 1e-12) {
    const points = ring.slice(0, -1);
    return {
      area: 0,
      lon: points.reduce((sum, p) => sum + p[0], 0) / points.length,
      lat: points.reduce((sum, p) => sum + p[1], 0) / points.length,
    };
  }

  return {
    area: Math.abs(twiceArea / 2),
    lon: cx / (3 * twiceArea),
    lat: cy / (3 * twiceArea),
  };
}

function featureCentroid(feature) {
  const geom = feature.geometry;
  const polygons = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
  let best = null;

  for (const polygon of polygons) {
    const candidate = ringAreaAndCentroid(polygon[0]);
    if (!best || candidate.area > best.area) best = candidate;
  }

  return { lon: best.lon, lat: best.lat };
}

function distance(a, b) {
  return Math.hypot(a.lon - b.lon, a.lat - b.lat);
}

function selectSpatialSample(features, count) {
  const candidates = features
    .map((feature) => ({
      feature,
      ...featureCentroid(feature),
    }))
    .filter((candidate) => Number.isFinite(candidate.lon) && Number.isFinite(candidate.lat));

  if (candidates.length <= count) return candidates;

  const selected = [candidates[Math.floor(candidates.length / 2)]];
  while (selected.length < count) {
    let best = null;
    for (const candidate of candidates) {
      if (selected.includes(candidate)) continue;
      const nearest = Math.min(...selected.map((chosen) => distance(candidate, chosen)));
      if (!best || nearest > best.nearest) best = { ...candidate, nearest };
    }
    selected.push(best);
  }

  return selected;
}

async function getJson(url) {
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  return response.json();
}

async function fetchSoilGridsPoint(point) {
  const params = new URLSearchParams({
    lon: point.lon.toFixed(5),
    lat: point.lat.toFixed(5),
  });
  for (const property of ["phh2o", "soc", "clay", "sand", "silt"]) {
    params.append("property", property);
  }
  for (const depth of ["0-5cm", "5-15cm", "15-30cm"]) {
    params.append("depth", depth);
  }
  params.append("value", "mean");

  const sourceUrl = `https://rest.isric.org/soilgrids/v2.0/properties/query?${params.toString()}`;
  const data = await getJson(sourceUrl);
  return { sourceUrl, layers: data.properties.layers };
}

function depthWeightedLayerValue(layer) {
  let weighted = 0;
  let totalDepth = 0;

  for (const depth of layer.depths) {
    const weight = depth.range.bottom_depth - depth.range.top_depth;
    weighted += depth.values.mean * weight;
    totalDepth += weight;
  }

  return weighted / totalDepth / layer.unit_measure.d_factor;
}

function summarizeLayers(layers) {
  const result = {};
  for (const layer of layers) {
    result[layer.name] = Number(depthWeightedLayerValue(layer).toFixed(2));
  }
  return {
    phH2O: result.phh2o,
    soilOrganicCarbonGkg: result.soc,
    clayPct: result.clay,
    sandPct: result.sand,
    siltPct: result.silt,
  };
}

async function readExistingOutput() {
  try {
    const data = JSON.parse(await readFile(OUT, "utf8"));
    return Array.isArray(data.samples) ? data.samples : [];
  } catch {
    return [];
  }
}

async function writeOutput(samples) {
  await writeFile(
    OUT,
    `${JSON.stringify(
      {
        fetchedAt: new Date().toISOString(),
        source: "ISRIC SoilGrids v2.0 REST API",
        description:
          "Spatially distributed SoilGrids point samples at selected ADM3/woreda centroids in the four focus regions. These points make the map more informative than one regional centroid, but they are still samples rather than full zonal raster aggregation.",
        sampleStrategy: `${POINTS_PER_REGION} spatially distributed ADM3 centroid samples per focus region, or all ADM3 features if fewer are available.`,
        samples,
      },
      null,
      2,
    )}\n`,
  );
}

async function main() {
  const adm3 = JSON.parse(await readFile(ADM3, "utf8"));
  const samples = await readExistingOutput();
  const seen = new Set(samples.map((sample) => sample.adm3Pcode));

  for (const region of FOCUS_REGIONS) {
    const regionFeatures = adm3.features.filter((feature) => feature.properties.parent === region);
    const selected = selectSpatialSample(regionFeatures, POINTS_PER_REGION);

    for (const point of selected) {
      const props = point.feature.properties;
      if (seen.has(props.shapeID)) {
        console.log(`Skipping cached SoilGrids: ${region} / ${props.shapeName}`);
        continue;
      }

      console.log(`Fetching SoilGrids: ${region} / ${props.shapeName}`);
      const soil = await fetchSoilGridsPoint(point);
      samples.push({
        region,
        adm3Name: props.shapeName,
        adm3Pcode: props.shapeID,
        adm2Name: props.zoneParent,
        lon: Number(point.lon.toFixed(5)),
        lat: Number(point.lat.toFixed(5)),
        sourceUrl: soil.sourceUrl,
        depthRangeCm: "0-30",
        summary: summarizeLayers(soil.layers),
        layers: soil.layers,
      });
      seen.add(props.shapeID);
      await writeOutput(samples);
    }
  }

  await writeOutput(samples);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
