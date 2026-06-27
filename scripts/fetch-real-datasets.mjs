import { mkdir, writeFile } from "node:fs/promises";

const OUTPUT_DIR = new URL("../public/data/real/", import.meta.url);
const RAW_DIR = new URL("../data/raw/", import.meta.url);

const REGION_CENTERS = [
  { key: "Oromia", lon: 39.4, lat: 7.8 },
  { key: "SNNPR", lon: 37.6, lat: 6.4 },
  { key: "Beneshangul Gumu", lon: 35.6, lat: 10.8 },
  { key: "Gambela", lon: 34.6, lat: 7.9 },
];

const WORLDPOP_URLS = {
  population2020Unadjusted:
    "https://data.worldpop.org/GIS/Population/Global_2000_2020/2020/ETH/eth_ppp_2020_UNadj.tif",
  population2020:
    "https://data.worldpop.org/GIS/Population/Global_2000_2020/2020/ETH/eth_ppp_2020.tif",
};

async function getJson(url) {
  const response = await fetch(url, {
    headers: { accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`);
  }
  return response.json();
}

async function headMetadata(url) {
  const response = await fetch(url, { method: "HEAD" });
  return {
    url,
    ok: response.ok,
    status: response.status,
    contentType: response.headers.get("content-type"),
    contentLength: Number(response.headers.get("content-length") ?? 0),
    lastModified: response.headers.get("last-modified"),
    etag: response.headers.get("etag"),
  };
}

async function fetchHdxCodAbEth() {
  const url = "https://data.humdata.org/api/3/action/package_show?id=cod-ab-eth";
  const packageData = await getJson(url);
  const result = packageData.result;

  return {
    fetchedAt: new Date().toISOString(),
    sourceUrl: url,
    title: result.title,
    name: result.name,
    datasetDate: result.dataset_date,
    lastModified: result.last_modified,
    notes: result.notes,
    caveats: result.caveats,
    resources: result.resources.map((resource) => ({
      name: resource.name,
      format: resource.format,
      url: resource.url,
      size: resource.size,
      lastModified: resource.last_modified,
      description: resource.description,
    })),
  };
}

async function fetchSoilGridsSamples() {
  const samples = [];
  for (const region of REGION_CENTERS) {
    const params = new URLSearchParams({
      lon: String(region.lon),
      lat: String(region.lat),
    });
    for (const property of ["phh2o", "soc", "clay", "sand", "silt"]) {
      params.append("property", property);
    }
    for (const depth of ["0-5cm", "5-15cm", "15-30cm"]) {
      params.append("depth", depth);
    }
    params.append("value", "mean");

    const url = `https://rest.isric.org/soilgrids/v2.0/properties/query?${params.toString()}`;
    const data = await getJson(url);
    samples.push({
      ...region,
      sourceUrl: url,
      layers: data.properties.layers,
    });
  }
  return {
    fetchedAt: new Date().toISOString(),
    source: "ISRIC SoilGrids v2.0 REST API",
    note: "Point samples at region centroids; replace with zonal aggregation for production scoring.",
    samples,
  };
}

async function fetchGbifSummary() {
  const base = "https://api.gbif.org/v1/occurrence/search";
  const queries = [
    {
      key: "ethiopiaAllOccurrences",
      params: { country: "ET", hasCoordinate: "true", limit: "0" },
    },
    {
      key: "ethiopiaPlantOccurrences",
      params: { country: "ET", kingdomKey: "6", hasCoordinate: "true", limit: "0" },
    },
    {
      key: "ethiopiaBirdOccurrences",
      params: { country: "ET", classKey: "212", hasCoordinate: "true", limit: "0" },
    },
  ];

  const summaries = [];
  for (const query of queries) {
    const params = new URLSearchParams(query.params);
    const url = `${base}?${params.toString()}`;
    const data = await getJson(url);
    summaries.push({
      key: query.key,
      sourceUrl: url,
      count: data.count,
    });
  }

  return {
    fetchedAt: new Date().toISOString(),
    source: "GBIF Occurrence API",
    note: "Counts only; occurrence records need spatial bias correction before direct scoring.",
    summaries,
  };
}

async function fetchWorldPopMetadata() {
  const datasets = {};
  for (const [key, url] of Object.entries(WORLDPOP_URLS)) {
    datasets[key] = await headMetadata(url);
  }
  return {
    fetchedAt: new Date().toISOString(),
    source: "WorldPop open population rasters",
    note: "GeoTIFFs are large and should be downloaded to data/raw for local zonal processing, not committed to public assets.",
    datasets,
  };
}

async function writeJson(fileName, data) {
  await writeFile(new URL(fileName, OUTPUT_DIR), `${JSON.stringify(data, null, 2)}\n`);
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  await mkdir(RAW_DIR, { recursive: true });

  const [hdx, soilgrids, gbif, worldpop] = await Promise.all([
    fetchHdxCodAbEth(),
    fetchSoilGridsSamples(),
    fetchGbifSummary(),
    fetchWorldPopMetadata(),
  ]);

  await writeJson("hdx-cod-ab-eth.metadata.json", hdx);
  await writeJson("soilgrids-region-samples.json", soilgrids);
  await writeJson("gbif-ethiopia-summary.json", gbif);
  await writeJson("worldpop-ethiopia.metadata.json", worldpop);

  await writeJson("dataset-fetch-summary.json", {
    fetchedAt: new Date().toISOString(),
    generatedFiles: [
      "hdx-cod-ab-eth.metadata.json",
      "soilgrids-region-samples.json",
      "gbif-ethiopia-summary.json",
      "worldpop-ethiopia.metadata.json",
    ],
    deferred: [
      {
        dataset: "Global Forest Watch / UMD",
        reason: "Needs geostore/vector workflow or bulk tile processing before useful ADM3 aggregation.",
      },
      {
        dataset: "SRTM DEM",
        reason: "Needs DEM tile selection and slope derivation; raw DEM should stay in data/raw.",
      },
      {
        dataset: "WDPA",
        reason: "Protected Planet downloads generally require account/token acceptance.",
      },
      {
        dataset: "CIFOR-ICRAF Species Atlas",
        reason: "No stable open machine API was added yet; needs source-specific download or curated species table.",
      },
      {
        dataset: "eBird",
        reason: "API/data products require an eBird key and sampling-bias handling.",
      },
      {
        dataset: "PSNP Public Works Data",
        reason: "Needs a specific public dataset endpoint before automated fetch can be added.",
      },
    ],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
