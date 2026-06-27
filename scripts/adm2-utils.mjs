export const FOCUS_REGIONS = new Set(["Oromia", "SNNPR", "Beneshangul Gumu", "Gambela"]);

const ADM2_NAME_ALIASES = {
  "Beneshangul Gumu__Asosa": "Beneshangul Gumu__Assosa",
  "Beneshangul Gumu__Kemashi": "Beneshangul Gumu__Kamashi",
  "Gambela__Agnuak": "Gambela__Agnewak",
  "Gambela__Nuer": "Gambela__Nuwer",
  "Oromia__East Harerge": "Oromia__East Hararge",
  "Oromia__West Harerge": "Oromia__West Hararge",
  "Oromia__Horo Guduru": "Oromia__Horo Gudru Wellega",
  "Oromia__Ilubabor": "Oromia__Ilu Aba Bora",
  "Oromia__North Shewa(R4)": "Oromia__North Shewa (OR)",
  "SNNPR__Alaba": "SNNPR__Halaba",
  "SNNPR__Bench Maji": "SNNPR__Bench Sheko",
  "SNNPR__Dawro": "SNNPR__Dawuro",
  "SNNPR__Gamo Gofa": "SNNPR__Gamo",
  "SNNPR__Gedio": "SNNPR__Gedeo",
  "SNNPR__Gurage": "SNNPR__Guraghe",
  "SNNPR__Keffa": "SNNPR__Kefa",
  "SNNPR__Konta": "SNNPR__Konta Special",
  "SNNPR__KT": "SNNPR__Kembata Tembaro",
  "SNNPR__Selti": "SNNPR__Siltie",
  "SNNPR__Yem": "SNNPR__Yem Special",
};

function normalizeAdm2Name(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\(r4\)/g, "or")
    .replace(/\(or\)/g, "or")
    .replace(/special woreda/g, "special")
    .replace(/special$/g, "")
    .replace(/zone$/g, "")
    .replace(/[^a-z0-9]+/g, "");
}

export function resolveAdm2Id(region, zone, knownIds = new Set()) {
  const exact = `${region}__${zone}`;
  if (knownIds.has(exact)) return exact;
  const alias = ADM2_NAME_ALIASES[exact];
  if (alias && (!knownIds.size || knownIds.has(alias))) return alias;
  const normalizedZone = normalizeAdm2Name(zone);
  return [...knownIds].find((id) => {
    const [knownRegion, knownZone] = id.split("__");
    return knownRegion === region && normalizeAdm2Name(knownZone) === normalizedZone;
  }) ?? exact;
}

export function bbox(feature) {
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

export function bboxCenter(box) {
  return {
    lon: Number(((box.minLon + box.maxLon) / 2).toFixed(5)),
    lat: Number(((box.minLat + box.maxLat) / 2).toFixed(5)),
  };
}

export function bboxPolygon(box) {
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
