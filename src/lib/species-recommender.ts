import type { RegionRisk } from "./deforestation-data";

export type Niche = "shade-coffee" | "agroforestry" | "restoration" | "watershed" | "lowland-woodland" | "bamboo";

export interface Species {
  scientificName: string;
  commonName: string;
  amharic?: string;
  native: boolean;
  // Suitable elevation band (m)
  elevMin: number;
  elevMax: number;
  // Suitable annual rainfall band (mm/yr)
  rainMin: number;
  rainMax: number;
  niches: Niche[];
  uses: string[];
  note: string;
}

// Curated from World Agroforestry (ICRAF) Agroforestree DB and Ethiopia's
// National Forest Sector Development Programme species recommendations.
export const SPECIES: Species[] = [
  {
    scientificName: "Cordia africana",
    commonName: "Sudan teak / Wanza",
    amharic: "Wanza",
    native: true,
    elevMin: 550, elevMax: 2500, rainMin: 700, rainMax: 2000,
    niches: ["shade-coffee", "agroforestry", "restoration"],
    uses: ["Coffee shade", "Timber", "Bee forage"],
    note: "Iconic farmland tree retained across Ethiopian highlands; deep-rooted, light crown.",
  },
  {
    scientificName: "Olea europaea subsp. cuspidata",
    commonName: "African wild olive / Weira",
    amharic: "Weira",
    native: true,
    elevMin: 1250, elevMax: 3000, rainMin: 500, rainMax: 1400,
    niches: ["restoration", "watershed"],
    uses: ["Dry highland restoration", "Hard timber", "Drought tolerant"],
    note: "Slow-growing climax species for degraded highland slopes.",
  },
  {
    scientificName: "Podocarpus falcatus",
    commonName: "East African yellowwood / Zigba",
    amharic: "Zigba",
    native: true,
    elevMin: 1500, elevMax: 2400, rainMin: 1000, rainMax: 1800,
    niches: ["restoration", "watershed"],
    uses: ["Afromontane forest restoration", "Premium timber"],
    note: "Defining canopy conifer of southwestern moist Afromontane forest.",
  },
  {
    scientificName: "Coffea arabica",
    commonName: "Arabica coffee",
    amharic: "Bunna",
    native: true,
    elevMin: 1300, elevMax: 2200, rainMin: 1200, rainMax: 2000,
    niches: ["shade-coffee", "agroforestry"],
    uses: ["Cash crop under native shade"],
    note: "Wild origin in Kaffa/Sheka — restore as shaded forest-coffee, not sun monoculture.",
  },
  {
    scientificName: "Acacia abyssinica",
    commonName: "Abyssinian acacia",
    amharic: "Girar",
    native: true,
    elevMin: 1500, elevMax: 2500, rainMin: 700, rainMax: 1400,
    niches: ["agroforestry", "restoration"],
    uses: ["N-fixing", "Fodder", "Soil improvement"],
    note: "Flat-crowned highland acacia; pairs well with cereal cropping.",
  },
  {
    scientificName: "Croton macrostachyus",
    commonName: "Broad-leaved croton / Bisana",
    amharic: "Bisana",
    native: true,
    elevMin: 1100, elevMax: 2500, rainMin: 700, rainMax: 1800,
    niches: ["agroforestry", "restoration", "shade-coffee"],
    uses: ["Fast-growing pioneer", "Coffee shade", "Mulch"],
    note: "Reliable nurse tree on cleared land; tolerates poor soils.",
  },
  {
    scientificName: "Millettia ferruginea",
    commonName: "Birbira",
    amharic: "Birbira",
    native: true,
    elevMin: 1000, elevMax: 2500, rainMin: 1000, rainMax: 1800,
    niches: ["shade-coffee", "agroforestry"],
    uses: ["Coffee shade", "N-fixing", "Bee forage"],
    note: "Endemic legume — preferred shade tree in southwestern coffee gardens.",
  },
  {
    scientificName: "Albizia gummifera",
    commonName: "Peacock flower / Sesa",
    amharic: "Sesa",
    native: true,
    elevMin: 1200, elevMax: 2400, rainMin: 1000, rainMax: 1800,
    niches: ["shade-coffee", "restoration"],
    uses: ["High coffee shade", "N-fixing", "Timber"],
    note: "Tall emergent for forest-coffee systems and gap restoration.",
  },
  {
    scientificName: "Yushania alpina",
    commonName: "Highland bamboo / Kerkeha",
    amharic: "Kerkeha",
    native: true,
    elevMin: 2200, elevMax: 3300, rainMin: 1000, rainMax: 1800,
    niches: ["bamboo", "watershed"],
    uses: ["Slope stabilisation", "Construction", "Fast biomass"],
    note: "Native highland bamboo for cool, wet upper slopes.",
  },
  {
    scientificName: "Oxytenanthera abyssinica",
    commonName: "Lowland bamboo",
    native: true,
    elevMin: 600, elevMax: 1800, rainMin: 700, rainMax: 1400,
    niches: ["bamboo", "lowland-woodland", "restoration"],
    uses: ["Charcoal alternative", "Cash crop", "Erosion control"],
    note: "Dominant lowland bamboo of Benishangul-Gumuz; income alternative to charcoal.",
  },
  {
    scientificName: "Boswellia papyrifera",
    commonName: "Frankincense tree",
    amharic: "Itan zaf",
    native: true,
    elevMin: 500, elevMax: 1800, rainMin: 500, rainMax: 1100,
    niches: ["lowland-woodland", "restoration"],
    uses: ["Frankincense resin", "Drylands restoration"],
    note: "Anchor species of Combretum-Terminalia woodland under heavy pressure from sesame expansion.",
  },
  {
    scientificName: "Faidherbia albida",
    commonName: "Apple-ring acacia",
    native: true,
    elevMin: 400, elevMax: 1800, rainMin: 500, rainMax: 1200,
    niches: ["agroforestry", "lowland-woodland"],
    uses: ["Reverse phenology", "N-fixing under crops", "Fodder pods"],
    note: "Sheds leaves in the rainy season — flagship for crop-friendly parkland agroforestry.",
  },
  {
    scientificName: "Tamarindus indica",
    commonName: "Tamarind",
    native: true,
    elevMin: 400, elevMax: 1500, rainMin: 500, rainMax: 1200,
    niches: ["lowland-woodland", "agroforestry"],
    uses: ["Fruit", "Shade", "Drought tolerant"],
    note: "Hardy multi-purpose tree for Gambela/Benishangul lowlands.",
  },
];

export interface SpeciesPick extends Species {
  fit: number; // 0-100
  reasons: string[];
  breakdown: {
    elevation: number; // 0-100
    rainfall: number;  // 0-100
    niche: number;     // 0-100
    siteElevation: number;
    siteRainfall: number;
    matchedNiche?: Niche;
  };
}

function bandScore(value: number, min: number, max: number): { score: number; ok: boolean } {
  // Trapezoidal fit:
  //   - score = 1.0 only in the inner 40% of the band (the species' sweet spot)
  //   - tapers linearly to 0.7 at the band edges
  //   - tapers further to 0 over a half-span buffer outside the band
  const span = max - min;
  const center = (min + max) / 2;
  const coreHalf = span * 0.2; // inner 40% plateau
  if (value >= center - coreHalf && value <= center + coreHalf) {
    return { score: 1, ok: true };
  }
  if (value >= min && value <= max) {
    const edgeDist = Math.min(value - min, max - value);
    const taper = span / 2 - coreHalf;
    const t = taper > 0 ? edgeDist / taper : 1;
    return { score: 0.7 + 0.3 * t, ok: true };
  }
  const outside = value < min ? min - value : value - max;
  const buffer = Math.max(span * 0.5, 200);
  return { score: Math.max(0, 0.7 * (1 - outside / buffer)), ok: false };
}

export function recommendSpecies(r: RegionRisk, max = 5): SpeciesPick[] {
  const elev = r.meanElevationM;
  const rain = r.annualRainfallMm;
  const forestShare = r.landCover.forest;
  const cropShare = r.landCover.cropland;
  const grassShare = r.landCover.grassland;

  // Region niche weights derived from land cover + elevation
  const nicheWeight: Record<Niche, number> = {
    "shade-coffee": elev > 1300 && rain > 1100 ? 1 : 0.2,
    agroforestry: cropShare > 0.2 ? 1 : 0.4,
    restoration: 0.9,
    watershed: elev > 1800 ? 0.9 : 0.4,
    "lowland-woodland": elev < 1500 ? 1 : 0.1,
    bamboo: grassShare > 0.3 || forestShare > 0.3 ? 0.7 : 0.3,
  };

  const picks: SpeciesPick[] = SPECIES.map((sp) => {
    const e = bandScore(elev, sp.elevMin, sp.elevMax);
    const w = bandScore(rain, sp.rainMin, sp.rainMax);
    const nicheFit = Math.max(...sp.niches.map((n) => nicheWeight[n]));
    // Multiplicative gate: a hard miss on either climate axis must drag fit
    // down, not be masked by the other axis. Niche is a smaller modulator.
    const climate = Math.sqrt(e.score * w.score); // geometric mean, penalises imbalance
    const fit01 = climate * (0.7 + 0.3 * nicheFit);

    const reasons: string[] = [];
    reasons.push(
      e.ok
        ? `Elevation in band (${sp.elevMin}–${sp.elevMax} m)`
        : `Elevation off-band (${sp.elevMin}–${sp.elevMax} m vs ${elev} m)`,
    );
    reasons.push(
      w.ok
        ? `Rainfall in band (${sp.rainMin}–${sp.rainMax} mm)`
        : `Rainfall off-band (${sp.rainMin}–${sp.rainMax} mm vs ${rain} mm)`,
    );
    const matchedNiche = sp.niches
      .slice()
      .sort((a, b) => nicheWeight[b] - nicheWeight[a])[0];
    if (matchedNiche) reasons.push(nicheLabel(matchedNiche));

    return {
      ...sp,
      fit: Math.round(fit01 * 100),
      reasons,
      breakdown: {
        elevation: Math.round(e.score * 100),
        rainfall: Math.round(w.score * 100),
        niche: Math.round(nicheFit * 100),
        siteElevation: elev,
        siteRainfall: rain,
        matchedNiche,
      },
    };
  })
    .filter((p) => p.fit >= 50)
    .sort((a, b) => b.fit - a.fit);

  return picks.slice(0, max);
}

function nicheLabel(n: Niche): string {
  switch (n) {
    case "shade-coffee": return "Suits shaded coffee systems";
    case "agroforestry": return "Good in cropland parkland";
    case "restoration": return "Strong restoration value";
    case "watershed": return "Watershed/upland slopes";
    case "lowland-woodland": return "Lowland woodland anchor";
    case "bamboo": return "Fast biomass / bamboo niche";
  }
}