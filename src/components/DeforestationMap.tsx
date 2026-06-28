import { useEffect, useMemo, useState } from "react";
import { CircleMarker, GeoJSON, MapContainer, Pane, Popup, TileLayer, Tooltip, useMap } from "react-leaflet";
import L, { type Layer, type PathOptions } from "leaflet";
import type { Feature } from "geojson";
import "leaflet/dist/leaflet.css";
import {
  FOCUS_REGIONS,
  LANDCOVER_ADM2,
  adm2UnitId,
  analysisUnitById,
  biodiversityRecoveryEvidenceScoreForAdm2,
  climateSampleForAdm2,
  colorForScore,
  gbifAreaNormalizedEvidenceScoreForAdm2,
  gbifBiodiversityForAdm2,
  gbifBiodiversityForRegion,
  gfwTreeCoverLossForAdm2,
  landCoverForAdm2,
  livelihoodPopulationForAdm2,
  livelihoodPopulationForRegion,
  priorityScoreForUnit,
  soilGridsSampleForAdm2,
  soilSuitabilityScoreForAdm2,
  soilSuitabilityScoreForRegion,
  terrainSampleForAdm2,
  type Weights,
} from "@/lib/deforestation-data";
import { SOILGRIDS_REGION_SAMPLES } from "@/lib/soilgrids-data";

interface Props {
  selected: string | null;
  onSelect: (name: string) => void;
  adminLevel: AdminLevel;
  onAdminLevelChange: (level: AdminLevel) => void;
  weights: Weights;
}

export type AdminLevel = "adm1" | "adm2" | "adm3";
type OverlayMode = "priority" | "soil" | "gbif" | "livelihood" | "climate" | "terrain" | "landcover" | "gfw";

interface ZoneProps {
  shapeName?: string;
  parent?: string;
  zoneParent?: string;
}

const ADMIN_LEVELS: { value: AdminLevel; label: string; description: string }[] = [
  { value: "adm1", label: "ADM1", description: "Regions" },
  { value: "adm2", label: "ADM2", description: "Zones" },
  { value: "adm3", label: "ADM3", description: "Woredas" },
];

const SOILGRIDS_SAMPLES = Object.values(SOILGRIDS_REGION_SAMPLES);

function regionNameForFeature(feature?: Feature) {
  const props = feature?.properties as ZoneProps | undefined;
  return props?.parent ?? props?.shapeName ?? "";
}

function adm2IdForFeature(feature?: Feature, adminLevel?: AdminLevel) {
  const props = feature?.properties as ZoneProps | undefined;
  const regionName = regionNameForFeature(feature);
  if (!regionName || adminLevel === "adm1") return regionName;
  return adm2UnitId(regionName, adminLevel === "adm2" ? props?.shapeName : props?.zoneParent);
}

function soilColor(score: number) {
  return colorForScore(score);
}

function gbifColor(score: number) {
  return colorForScore(score);
}

function livelihoodColor(score: number) {
  return colorForScore(score);
}

function climateColor(score: number) {
  return colorForScore(score);
}

function terrainColor(score: number) {
  return colorForScore(score);
}

function gfwColor(score: number) {
  return colorForScore(score);
}

function landCoverColor(score: number) {
  return colorForScore(score);
}

function landCoverClassColor(classValue: number) {
  if (classValue === 80 || classValue === 90 || classValue === 95) return "#0ea5e9";
  if (classValue === 50) return "#dc2626";
  if (classValue === 40) return "#facc15";
  if (classValue === 10) return "#16a34a";
  if (classValue === 20 || classValue === 30 || classValue === 60) return "#84cc16";
  return "#94a3b8";
}

function landCoverClassRadius(classValue: number, active: boolean) {
  if (classValue === 80 || classValue === 90 || classValue === 95) return active ? 9 : 7;
  if (classValue === 50 || classValue === 40) return active ? 8 : 6;
  return active ? 6 : 4.5;
}

function ZoomToSelection({
  data,
  selected,
  adminLevel,
}: {
  data: GeoJSON.FeatureCollection | null;
  selected: string | null;
  adminLevel: AdminLevel;
}) {
  const map = useMap();
  useEffect(() => {
    if (!data || !selected) return;
    const selectedUnit = analysisUnitById(selected);
    const feat = data.features.find((f) => {
      const feature = f as Feature;
      const props = feature.properties as ZoneProps | undefined;
      if (adminLevel === "adm1") return props?.shapeName === selected;
      if (adminLevel === "adm2") return adm2IdForFeature(feature, adminLevel) === selected;
      return adm2IdForFeature(feature, adminLevel) === selected || props?.parent === selectedUnit?.region;
    });
    if (!feat) return;
    const layer = L.geoJSON(feat as Feature);
    const bounds = layer.getBounds();
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [40, 40], maxZoom: 9 });
  }, [adminLevel, data, selected, map]);
  return null;
}

export function DeforestationMap({
  selected,
  onSelect,
  adminLevel,
  onAdminLevelChange,
  weights,
}: Props) {
  const [regions, setRegions] = useState<GeoJSON.FeatureCollection | null>(null);
  const [zones, setZones] = useState<GeoJSON.FeatureCollection | null>(null);
  const [woredas, setWoredas] = useState<GeoJSON.FeatureCollection | null>(null);
  const [satellite, setSatellite] = useState(false);
  const [overlayMode, setOverlayMode] = useState<OverlayMode>("priority");
  const [hoverZone, setHoverZone] = useState<string | null>(null);
  const selectedUnit = analysisUnitById(selected ?? undefined);
  const selectedRegion = selectedUnit?.region ?? selected;

  useEffect(() => {
    fetch("/data/eth-adm1.geojson")
      .then((r) => r.json())
      .then(setRegions)
      .catch((e) => console.error("Failed to load boundaries", e));
    fetch("/data/eth-adm2.geojson")
      .then((r) => r.json())
      .then(setZones)
      .catch((e) => console.error("Failed to load zone boundaries", e));
    fetch("/data/eth-adm3.geojson")
      .then((r) => r.json())
      .then(setWoredas)
      .catch((e) => console.error("Failed to load woreda boundaries", e));
  }, []);

  const boundaryData = adminLevel === "adm1" ? regions : adminLevel === "adm2" ? zones : woredas;

  const style = useMemo(
    () =>
      (feature?: Feature): PathOptions => {
        const props = feature?.properties as ZoneProps | undefined;
        const name = props?.shapeName ?? "";
        const regionName = props?.parent ?? name;
        const unitId = adminLevel === "adm1" ? regionName : adm2UnitId(regionName, adminLevel === "adm2" ? name : props?.zoneParent);
        const unit = analysisUnitById(unitId);
        const inFocus = FOCUS_REGIONS.includes(regionName);
        const color = unit && inFocus ? colorForScore(priorityScoreForUnit(unit, weights)) : "#2a2f2c";
        const isSelected = unitId === selected || regionName === selected;
        const isZoneHover = adminLevel === "adm2" && name === hoverZone;
        return {
          fillColor: color,
          fillOpacity: inFocus ? (isSelected ? 0.74 : adminLevel === "adm3" ? 0.44 : 0.52) : 0.14,
          color: isSelected ? "#fafafa" : "#0c1410",
          weight: isSelected ? (adminLevel === "adm1" ? 3 : 1.6) : inFocus ? 1 : 0.5,
          dashArray: adminLevel !== "adm1" && !isZoneHover ? "2 3" : undefined,
        };
      },
    [adminLevel, hoverZone, selected, weights],
  );

  const onEach = (feature: Feature, layer: Layer) => {
    const props = feature.properties as ZoneProps | undefined;
    const name = props?.shapeName ?? "";
    const regionName = props?.parent ?? name;
    const unitId = adminLevel === "adm1" ? regionName : adm2UnitId(regionName, adminLevel === "adm2" ? name : props?.zoneParent);
    const unit = analysisUnitById(unitId);
    const parentLabel =
      adminLevel === "adm3" && props?.zoneParent
        ? `${props.zoneParent}, ${regionName}`
        : regionName;
    const inFocus = FOCUS_REGIONS.includes(regionName);
    const score = unit ? priorityScoreForUnit(unit, weights) : 0;
    layer.bindTooltip(
      `<div style="font-family:inherit"><strong>${name}</strong>${adminLevel !== "adm1" && regionName ? `<br/><em>${parentLabel}</em>` : ""}${inFocus ? `<br/>Priority: ${score}${adminLevel !== "adm1" ? `<br/><span>${adminLevel === "adm3" ? "ADM2 zone score" : "ADM2 score"}</span>` : ""}` : "<br/><em>out of scope</em>"}</div>`,
      { sticky: true, className: "deforest-tooltip" },
    );
    if (!inFocus) return;
    layer.on({
      click: () => onSelect(unitId ?? regionName),
      mouseover: (e) => {
        if (adminLevel !== "adm1") setHoverZone(name);
        const l = e.target as { setStyle: (s: PathOptions) => void };
        l.setStyle({ fillOpacity: 0.85, weight: 2 });
      },
      mouseout: (e) => {
        if (adminLevel !== "adm1") setHoverZone(null);
        const l = e.target as { setStyle: (s: PathOptions) => void };
        const isSelected = unitId === selected || regionName === selected;
        l.setStyle({
          fillOpacity: isSelected ? 0.74 : adminLevel === "adm3" ? 0.44 : 0.52,
          weight: isSelected ? (adminLevel === "adm1" ? 3 : 1.6) : 1,
        });
      },
    });
  };

  const zoneData = useMemo<GeoJSON.FeatureCollection | null>(() => {
    if (adminLevel !== "adm1" || !zones || !selectedRegion) return null;
    return {
      type: "FeatureCollection",
      features: zones.features.filter(
        (f) => (f.properties as ZoneProps | undefined)?.parent === selectedRegion,
      ),
    };
  }, [adminLevel, zones, selectedRegion]);

  const soilRegionData = useMemo<GeoJSON.FeatureCollection | null>(() => {
    if (!regions) return null;
    return {
      type: "FeatureCollection",
      features: regions.features.filter((f) => {
        const name = (f.properties as ZoneProps | undefined)?.shapeName ?? "";
        return Boolean(SOILGRIDS_REGION_SAMPLES[name]);
      }),
    };
  }, [regions]);

  const gbifRegionData = useMemo<GeoJSON.FeatureCollection | null>(() => {
    if (!regions) return null;
    return {
      type: "FeatureCollection",
      features: regions.features.filter((f) => {
        const name = (f.properties as ZoneProps | undefined)?.shapeName ?? "";
        return Boolean(gbifBiodiversityForRegion(name));
      }),
    };
  }, [regions]);

  const livelihoodRegionData = useMemo<GeoJSON.FeatureCollection | null>(() => {
    if (!regions) return null;
    return {
      type: "FeatureCollection",
      features: regions.features.filter((f) => {
        const name = (f.properties as ZoneProps | undefined)?.shapeName ?? "";
        return Boolean(livelihoodPopulationForRegion(name));
      }),
    };
  }, [regions]);

  const focusBoundaryData = useMemo<GeoJSON.FeatureCollection | null>(() => {
    if (!boundaryData) return null;
    return {
      type: "FeatureCollection",
      features: boundaryData.features.filter((feature) => {
        const regionName = regionNameForFeature(feature as Feature);
        return FOCUS_REGIONS.includes(regionName);
      }),
    };
  }, [boundaryData]);

  const soilOverlayData = adminLevel === "adm1" ? soilRegionData : focusBoundaryData;
  const gbifOverlayData = adminLevel === "adm1" ? gbifRegionData : focusBoundaryData;
  const livelihoodOverlayData = adminLevel === "adm1" ? livelihoodRegionData : focusBoundaryData;
  const climateOverlayData = adminLevel === "adm1" ? null : focusBoundaryData;
  const terrainOverlayData = adminLevel === "adm1" ? null : focusBoundaryData;
  const gfwOverlayData = adminLevel === "adm1" ? null : focusBoundaryData;
  const landCoverOverlayData = adminLevel === "adm1" ? null : focusBoundaryData;
  const landCoverSamples = useMemo(
    () =>
      Object.values(LANDCOVER_ADM2).flatMap((zone) =>
        zone.samples.map((sample) => ({
          ...sample,
          id: zone.id,
          region: zone.region,
          zone: zone.zone,
          safeguard: zone.landUseSafeguardScore,
        })),
      ),
    [],
  );

  const zoneStyle = (feature?: Feature): PathOptions => {
    const name = (feature?.properties as ZoneProps | undefined)?.shapeName ?? "";
    const isHover = name === hoverZone;
    return {
      fillColor: "#fafafa",
      fillOpacity: isHover ? 0.18 : 0.04,
      color: "#fafafa",
      weight: isHover ? 1.5 : 0.8,
      dashArray: isHover ? undefined : "2 3",
    };
  };

  const onEachZone = (feature: Feature, layer: Layer) => {
    const name = (feature.properties as ZoneProps | undefined)?.shapeName ?? "";
    layer.bindTooltip(
      `<div style="font-family:inherit"><strong>${name}</strong><br/><em>zone</em></div>`,
      { sticky: true, className: "deforest-tooltip" },
    );
    layer.on({
      mouseover: () => setHoverZone(name),
      mouseout: () => setHoverZone(null),
    });
  };

  const soilStyle = (feature?: Feature): PathOptions => {
    const name = (feature?.properties as ZoneProps | undefined)?.shapeName ?? "";
    const unitId = adm2IdForFeature(feature, adminLevel);
    const regionName = regionNameForFeature(feature);
    const score =
      adminLevel === "adm1"
        ? soilSuitabilityScoreForRegion(regionName)
        : soilSuitabilityScoreForAdm2(unitId) ?? soilSuitabilityScoreForRegion(regionName);
    const active = unitId === selected || regionName === selectedRegion;
    return {
      fillColor: score === null ? "#737373" : soilColor(score),
      fillOpacity: active ? 0.58 : 0.42,
      color: active ? "#fafafa" : "#f59e0b",
      weight: active ? 3 : 1.4,
    };
  };

  const onEachSoilRegion = (feature: Feature, layer: Layer) => {
    const props = feature.properties as ZoneProps | undefined;
    const name = props?.shapeName ?? "";
    const regionName = regionNameForFeature(feature);
    const unitId = adm2IdForFeature(feature, adminLevel);
    const adm2Sample = adminLevel === "adm1" ? undefined : soilGridsSampleForAdm2(unitId);
    const sample = adm2Sample ?? SOILGRIDS_REGION_SAMPLES[regionName];
    const score =
      adminLevel === "adm1"
        ? soilSuitabilityScoreForRegion(regionName)
        : soilSuitabilityScoreForAdm2(unitId) ?? soilSuitabilityScoreForRegion(regionName);
    if (!sample || score === null) return;
    const sourceLabel = adm2Sample ? "ADM2 SoilGrids centroid sample" : "ADM1 SoilGrids centroid sample";

    layer.bindTooltip(
      `<div style="font-family:inherit"><strong>${name}</strong><br/>${sourceLabel}<br/>Soil suitability: ${score}/100<br/>pH ${sample.phH2O.toFixed(1)} · SOC ${sample.soilOrganicCarbonGkg.toFixed(1)} g/kg</div>`,
      { sticky: true, className: "deforest-tooltip" },
    );
    layer.bindPopup(
      `<div style="min-width:180px;font-family:system-ui,sans-serif"><strong>${name}</strong><div style="margin-top:4px;color:#4b5563">${sourceLabel}, 0-30 cm depth-weighted.</div><dl style="display:grid;grid-template-columns:1fr auto;gap:3px 12px;margin:8px 0 0"><dt>Suitability</dt><dd style="margin:0;font-weight:700">${score}/100</dd><dt>pH H2O</dt><dd style="margin:0;font-weight:700">${sample.phH2O.toFixed(1)}</dd><dt>Soil C</dt><dd style="margin:0;font-weight:700">${sample.soilOrganicCarbonGkg.toFixed(1)} g/kg</dd><dt>Clay</dt><dd style="margin:0;font-weight:700">${sample.clayPct.toFixed(1)}%</dd><dt>Sand</dt><dd style="margin:0;font-weight:700">${sample.sandPct.toFixed(1)}%</dd></dl></div>`,
    );
    layer.on({
      click: () => onSelect(unitId ?? regionName),
      mouseover: (e) => {
        const l = e.target as { setStyle: (s: PathOptions) => void };
        l.setStyle({ fillOpacity: 0.68, weight: 3 });
      },
      mouseout: (e) => {
        const l = e.target as { setStyle: (s: PathOptions) => void };
        l.setStyle(soilStyle(feature));
      },
    });
  };

  const gbifStyle = (feature?: Feature): PathOptions => {
    const unitId = adm2IdForFeature(feature, adminLevel);
    const regionName = regionNameForFeature(feature);
    const gbif = adminLevel === "adm1" ? gbifBiodiversityForRegion(regionName) : gbifBiodiversityForAdm2(unitId) ?? gbifBiodiversityForRegion(regionName);
    const evidenceScore =
      adminLevel === "adm1" ? gbif?.occurrenceEvidenceScore : biodiversityRecoveryEvidenceScoreForAdm2(unitId) ?? gbif?.occurrenceEvidenceScore;
    const active = unitId === selected || regionName === selectedRegion;
    return {
      fillColor: evidenceScore !== undefined ? gbifColor(evidenceScore) : "#737373",
      fillOpacity: active ? 0.6 : 0.44,
      color: active ? "#fafafa" : "#c4b5fd",
      weight: active ? 3 : 1.4,
    };
  };

  const onEachGbifRegion = (feature: Feature, layer: Layer) => {
    const props = feature.properties as ZoneProps | undefined;
    const name = props?.shapeName ?? "";
    const unitId = adm2IdForFeature(feature, adminLevel);
    const regionName = regionNameForFeature(feature);
    const adm2Gbif = adminLevel === "adm1" ? undefined : gbifBiodiversityForAdm2(unitId);
    const gbif = adm2Gbif ?? gbifBiodiversityForRegion(regionName);
    if (!gbif) return;
    const evidenceScore = adm2Gbif
      ? biodiversityRecoveryEvidenceScoreForAdm2(unitId) ?? gbif.occurrenceEvidenceScore
      : gbif.occurrenceEvidenceScore;
    const gbifDensityScore = adm2Gbif ? gbifAreaNormalizedEvidenceScoreForAdm2(unitId) : null;
    const areaKm2 = unitId ? landCoverForAdm2(unitId)?.areaKm2 : undefined;
    const occurrenceDensity = areaKm2 && "allOccurrences" in gbif ? gbif.allOccurrences / areaKm2 : null;

    const sourceLabel = adm2Gbif ? "ADM2 GBIF bounding-box counts per km2" : "ADM1 GBIF bounding-box counts";
    const topPlants =
      "topPlantSpecies" in gbif
        ? gbif.topPlantSpecies
            .slice(0, 3)
            .map((sp) => `${sp.canonicalName ?? sp.scientificName} (${sp.count.toLocaleString()})`)
            .join("<br/>")
        : "";
    const topBirds =
      "topBirdSpecies" in gbif
        ? gbif.topBirdSpecies
            .slice(0, 3)
            .map((sp) => `${sp.canonicalName ?? sp.scientificName} (${sp.count.toLocaleString()})`)
            .join("<br/>")
        : "";

    layer.bindTooltip(
      `<div style="font-family:inherit"><strong>${name}</strong><br/>${sourceLabel}<br/>GBIF evidence: ${evidenceScore}/100${occurrenceDensity === null ? "" : `<br/>Records/km²: ${occurrenceDensity.toFixed(2)}`}<br/>Plants: ${gbif.plantOccurrences.toLocaleString()} · Birds: ${gbif.birdOccurrences.toLocaleString()}</div>`,
      { sticky: true, className: "deforest-tooltip" },
    );
    layer.bindPopup(
      `<div style="min-width:230px;font-family:system-ui,sans-serif"><strong>${name}</strong><div style="margin-top:4px;color:#4b5563">${sourceLabel}. Counts are real GBIF records${adm2Gbif ? " normalized by ADM2 area and blended with ESA habitat context" : ""}.</div><dl style="display:grid;grid-template-columns:1fr auto;gap:3px 12px;margin:8px 0 0"><dt>BRV evidence</dt><dd style="margin:0;font-weight:700">${evidenceScore}/100</dd>${gbifDensityScore === null ? "" : `<dt>GBIF density score</dt><dd style="margin:0;font-weight:700">${gbifDensityScore}/100</dd>`}${occurrenceDensity === null ? "" : `<dt>Records/km²</dt><dd style="margin:0;font-weight:700">${occurrenceDensity.toFixed(2)}</dd>`}<dt>All records</dt><dd style="margin:0;font-weight:700">${gbif.allOccurrences.toLocaleString()}</dd><dt>Plants</dt><dd style="margin:0;font-weight:700">${gbif.plantOccurrences.toLocaleString()}</dd><dt>Birds</dt><dd style="margin:0;font-weight:700">${gbif.birdOccurrences.toLocaleString()}</dd></dl>${topPlants || topBirds ? `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px;font-size:11px"><div><strong>Top plants</strong><br/>${topPlants}</div><div><strong>Top birds</strong><br/>${topBirds}</div></div>` : ""}<div style="margin-top:8px;color:#6b7280;font-size:10px">Normalized for area, but not yet corrected for observer/sampling bias.</div></div>`,
    );
    layer.on({
      click: () => onSelect(unitId ?? regionName),
      mouseover: (e) => {
        const l = e.target as { setStyle: (s: PathOptions) => void };
        l.setStyle({ fillOpacity: 0.7, weight: 3 });
      },
      mouseout: (e) => {
        const l = e.target as { setStyle: (s: PathOptions) => void };
        l.setStyle(gbifStyle(feature));
      },
    });
  };

  const livelihoodStyle = (feature?: Feature): PathOptions => {
    const unitId = adm2IdForFeature(feature, adminLevel);
    const regionName = regionNameForFeature(feature);
    const livelihood = adminLevel === "adm1" ? livelihoodPopulationForRegion(regionName) : livelihoodPopulationForAdm2(unitId) ?? livelihoodPopulationForRegion(regionName);
    const active = unitId === selected || regionName === selectedRegion;
    return {
      fillColor: livelihood ? livelihoodColor(livelihood.livelihoodEvidenceScore) : "#737373",
      fillOpacity: active ? 0.62 : 0.46,
      color: active ? "#fafafa" : "#fed7aa",
      weight: active ? 3 : 1.4,
    };
  };

  const onEachLivelihoodRegion = (feature: Feature, layer: Layer) => {
    const props = feature.properties as ZoneProps | undefined;
    const name = props?.shapeName ?? "";
    const unitId = adm2IdForFeature(feature, adminLevel);
    const regionName = regionNameForFeature(feature);
    const adm2Livelihood = adminLevel === "adm1" ? undefined : livelihoodPopulationForAdm2(unitId);
    const livelihood = adm2Livelihood ?? livelihoodPopulationForRegion(regionName);
    if (!livelihood) return;
    const sourceLabel = adm2Livelihood ? "ADM2 HDX/OCHA population aggregation" : "ADM1 HDX/OCHA population aggregation";

    layer.bindTooltip(
      `<div style="font-family:inherit"><strong>${name}</strong><br/>${sourceLabel}<br/>Livelihood evidence: ${livelihood.livelihoodEvidenceScore}/100<br/>Population: ${livelihood.populationTotal.toLocaleString()}<br/>Density: ${livelihood.densityPerKm2.toFixed(1)}/km²</div>`,
      { sticky: true, className: "deforest-tooltip" },
    );
    layer.bindPopup(
      `<div style="min-width:220px;font-family:system-ui,sans-serif"><strong>${name}</strong><div style="margin-top:4px;color:#4b5563">${sourceLabel}.</div><dl style="display:grid;grid-template-columns:1fr auto;gap:3px 12px;margin:8px 0 0"><dt>Evidence</dt><dd style="margin:0;font-weight:700">${livelihood.livelihoodEvidenceScore}/100</dd><dt>ADM3 units</dt><dd style="margin:0;font-weight:700">${livelihood.admin3Count.toLocaleString()}</dd><dt>Population</dt><dd style="margin:0;font-weight:700">${livelihood.populationTotal.toLocaleString()}</dd><dt>Density</dt><dd style="margin:0;font-weight:700">${livelihood.densityPerKm2.toFixed(1)}/km²</dd><dt>Children &lt;15</dt><dd style="margin:0;font-weight:700">${Math.round(livelihood.childShare * 100)}%</dd><dt>Women</dt><dd style="margin:0;font-weight:700">${Math.round(livelihood.femaleShare * 100)}%</dd><dt>Dependency</dt><dd style="margin:0;font-weight:700">${livelihood.dependencyRatio.toFixed(2)}</dd></dl></div>`,
    );
    layer.on({
      click: () => onSelect(unitId ?? regionName),
      mouseover: (e) => {
        const l = e.target as { setStyle: (s: PathOptions) => void };
        l.setStyle({ fillOpacity: 0.72, weight: 3 });
      },
      mouseout: (e) => {
        const l = e.target as { setStyle: (s: PathOptions) => void };
        l.setStyle(livelihoodStyle(feature));
      },
    });
  };

  const climateStyle = (feature?: Feature): PathOptions => {
    const unitId = adm2IdForFeature(feature, adminLevel);
    const regionName = regionNameForFeature(feature);
    const climate = climateSampleForAdm2(unitId);
    const active = unitId === selected || regionName === selectedRegion;
    return {
      fillColor: climate ? climateColor(climate.climateSuitabilityScore) : "#737373",
      fillOpacity: active ? 0.62 : 0.46,
      color: active ? "#fafafa" : "#bae6fd",
      weight: active ? 3 : 1.4,
    };
  };

  const onEachClimateRegion = (feature: Feature, layer: Layer) => {
    const props = feature.properties as ZoneProps | undefined;
    const name = props?.shapeName ?? "";
    const unitId = adm2IdForFeature(feature, adminLevel);
    const regionName = regionNameForFeature(feature);
    const climate = climateSampleForAdm2(unitId);
    if (!climate) return;

    layer.bindTooltip(
      `<div style="font-family:inherit"><strong>${name}</strong><br/>NASA POWER climate: ${climate.climateSuitabilityScore}/100<br/>Rainfall: ${climate.annualRainfallMm.toLocaleString()} mm/yr<br/>Temp: ${climate.annualTemperatureC.toFixed(1)} °C</div>`,
      { sticky: true, className: "deforest-tooltip" },
    );
    layer.bindPopup(
      `<div style="min-width:220px;font-family:system-ui,sans-serif"><strong>${name}</strong><div style="margin-top:4px;color:#4b5563">Real NASA POWER MERRA2 20-year climatology at the ADM2 centroid.</div><dl style="display:grid;grid-template-columns:1fr auto;gap:3px 12px;margin:8px 0 0"><dt>Suitability</dt><dd style="margin:0;font-weight:700">${climate.climateSuitabilityScore}/100</dd><dt>Rainfall</dt><dd style="margin:0;font-weight:700">${climate.annualRainfallMm.toLocaleString()} mm/yr</dd><dt>Temperature</dt><dd style="margin:0;font-weight:700">${climate.annualTemperatureC.toFixed(1)} °C</dd><dt>Elevation</dt><dd style="margin:0;font-weight:700">${climate.elevationM.toFixed(0)} m</dd></dl></div>`,
    );
    layer.on({
      click: () => onSelect(unitId ?? regionName),
      mouseover: (e) => {
        const l = e.target as { setStyle: (s: PathOptions) => void };
        l.setStyle({ fillOpacity: 0.72, weight: 3 });
      },
      mouseout: (e) => {
        const l = e.target as { setStyle: (s: PathOptions) => void };
        l.setStyle(climateStyle(feature));
      },
    });
  };

  const terrainStyle = (feature?: Feature): PathOptions => {
    const unitId = adm2IdForFeature(feature, adminLevel);
    const regionName = regionNameForFeature(feature);
    const terrain = terrainSampleForAdm2(unitId);
    const active = unitId === selected || regionName === selectedRegion;
    return {
      fillColor: terrain ? terrainColor(terrain.terrainReliefScore) : "#737373",
      fillOpacity: active ? 0.62 : 0.46,
      color: active ? "#fafafa" : "#d9f99d",
      weight: active ? 3 : 1.4,
    };
  };

  const onEachTerrainRegion = (feature: Feature, layer: Layer) => {
    const props = feature.properties as ZoneProps | undefined;
    const name = props?.shapeName ?? "";
    const unitId = adm2IdForFeature(feature, adminLevel);
    const regionName = regionNameForFeature(feature);
    const terrain = terrainSampleForAdm2(unitId);
    if (!terrain) return;

    layer.bindTooltip(
      `<div style="font-family:inherit"><strong>${name}</strong><br/>Open-Meteo terrain relief: ${terrain.terrainReliefScore}/100<br/>Elevation range: ${terrain.elevationRangeM.toLocaleString()} m<br/>Max sampled slope: ${terrain.maxSlopePercent.toFixed(1)}%</div>`,
      { sticky: true, className: "deforest-tooltip" },
    );
    layer.bindPopup(
      `<div style="min-width:230px;font-family:system-ui,sans-serif"><strong>${name}</strong><div style="margin-top:4px;color:#4b5563">Real Open-Meteo elevation samples at ADM2 centroid plus north/south/east/west points.</div><dl style="display:grid;grid-template-columns:1fr auto;gap:3px 12px;margin:8px 0 0"><dt>Relief score</dt><dd style="margin:0;font-weight:700">${terrain.terrainReliefScore}/100</dd><dt>Elevation range</dt><dd style="margin:0;font-weight:700">${terrain.elevationRangeM.toLocaleString()} m</dd><dt>Max sampled slope</dt><dd style="margin:0;font-weight:700">${terrain.maxSlopePercent.toFixed(1)}%</dd><dt>Mean sampled slope</dt><dd style="margin:0;font-weight:700">${terrain.meanSlopePercent.toFixed(1)}%</dd></dl><div style="margin-top:8px;color:#6b7280;font-size:10px">Proxy for erosion-sensitive terrain; not full DEM zonal statistics.</div></div>`,
    );
    layer.on({
      click: () => onSelect(unitId ?? regionName),
      mouseover: (e) => {
        const l = e.target as { setStyle: (s: PathOptions) => void };
        l.setStyle({ fillOpacity: 0.72, weight: 3 });
      },
      mouseout: (e) => {
        const l = e.target as { setStyle: (s: PathOptions) => void };
        l.setStyle(terrainStyle(feature));
      },
    });
  };

  const gfwStyle = (feature?: Feature): PathOptions => {
    const unitId = adm2IdForFeature(feature, adminLevel);
    const regionName = regionNameForFeature(feature);
    const gfw = gfwTreeCoverLossForAdm2(unitId);
    const active = unitId === selected || regionName === selectedRegion;
    return {
      fillColor: gfw ? gfwColor(gfw.degradationPressureScore) : "#737373",
      fillOpacity: active ? 0.62 : 0.46,
      color: active ? "#fafafa" : "#fb7185",
      weight: active ? 3 : 1.4,
    };
  };

  const onEachGfwRegion = (feature: Feature, layer: Layer) => {
    const props = feature.properties as ZoneProps | undefined;
    const name = props?.shapeName ?? "";
    const unitId = adm2IdForFeature(feature, adminLevel);
    const regionName = regionNameForFeature(feature);
    const gfw = gfwTreeCoverLossForAdm2(unitId);
    if (!gfw) return;
    const topDrivers = Object.entries(gfw.lossByDriverHa)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([driver, ha]) => `${driver}: ${ha.toLocaleString()} ha`)
      .join("<br/>");

    layer.bindTooltip(
      `<div style="font-family:inherit"><strong>${name}</strong><br/>GFW/UMD loss pressure: ${gfw.degradationPressureScore}/100<br/>Loss density: ${gfw.lossDensityHaPerKm2.toFixed(2)} ha/km²<br/>Recent loss: ${gfw.recentLossHa.toLocaleString()} ha</div>`,
      { sticky: true, className: "deforest-tooltip" },
    );
    layer.bindPopup(
      `<div style="min-width:240px;font-family:system-ui,sans-serif"><strong>${name}</strong><div style="margin-top:4px;color:#4b5563">Real Global Forest Watch / UMD tree-cover loss by driver for this ADM2 boundary.</div><dl style="display:grid;grid-template-columns:1fr auto;gap:3px 12px;margin:8px 0 0"><dt>ERP loss pressure</dt><dd style="margin:0;font-weight:700">${gfw.degradationPressureScore}/100</dd><dt>Total loss</dt><dd style="margin:0;font-weight:700">${gfw.totalLossHa.toLocaleString()} ha</dd><dt>Loss density</dt><dd style="margin:0;font-weight:700">${gfw.lossDensityHaPerKm2.toFixed(2)} ha/km²</dd><dt>Recent loss</dt><dd style="margin:0;font-weight:700">${gfw.recentLossHa.toLocaleString()} ha</dd><dt>Dominant driver</dt><dd style="margin:0;font-weight:700">${gfw.dominantDriver}</dd></dl>${topDrivers ? `<div style="margin-top:8px;font-size:11px">${topDrivers}</div>` : ""}<div style="margin-top:8px;color:#6b7280;font-size:10px">Higher values mean stronger historical tree-cover-loss pressure and therefore higher restoration opportunity inside ERP.</div></div>`,
    );
    layer.on({
      click: () => onSelect(unitId ?? regionName),
      mouseover: (e) => {
        const l = e.target as { setStyle: (s: PathOptions) => void };
        l.setStyle({ fillOpacity: 0.72, weight: 3 });
      },
      mouseout: (e) => {
        const l = e.target as { setStyle: (s: PathOptions) => void };
        l.setStyle(gfwStyle(feature));
      },
    });
  };

  const landCoverStyle = (feature?: Feature): PathOptions => {
    const unitId = adm2IdForFeature(feature, adminLevel);
    const regionName = regionNameForFeature(feature);
    const landCover = landCoverForAdm2(unitId);
    const active = unitId === selected || regionName === selectedRegion;
    return {
      fillColor: landCover ? landCoverColor(landCover.landUseSafeguardScore) : "#737373",
      fillOpacity: active ? 0.64 : 0.48,
      color: active ? "#fafafa" : "#a7f3d0",
      weight: active ? 3 : 1.4,
    };
  };

  const onEachLandCoverRegion = (feature: Feature, layer: Layer) => {
    const props = feature.properties as ZoneProps | undefined;
    const name = props?.shapeName ?? "";
    const unitId = adm2IdForFeature(feature, adminLevel);
    const regionName = regionNameForFeature(feature);
    const landCover = landCoverForAdm2(unitId);
    if (!landCover) return;
    const topClasses = Object.values(landCover.classShares)
      .sort((a, b) => b.share - a.share)
      .slice(0, 3)
      .map((item) => `${item.label}: ${Math.round(item.share * 100)}%`)
      .join("<br/>");

    layer.bindTooltip(
      `<div style="font-family:inherit"><strong>${name}</strong><br/>ESA WorldCover safeguard: ${landCover.landUseSafeguardScore}/100<br/>Cropland: ${Math.round(landCover.croplandShare * 100)}% · Built-up: ${Math.round(landCover.builtUpShare * 100)}%</div>`,
      { sticky: true, className: "deforest-tooltip" },
    );
    layer.bindPopup(
      `<div style="min-width:240px;font-family:system-ui,sans-serif"><strong>${name}</strong><div style="margin-top:4px;color:#4b5563">Real ESA WorldCover 2021 area-scaled ADM2 land-cover sample (${landCover.sampleGridSize}x${landCover.sampleGridSize}). Used as safeguard context, not as a weighted priority pillar.</div><dl style="display:grid;grid-template-columns:1fr auto;gap:3px 12px;margin:8px 0 0"><dt>Safeguard</dt><dd style="margin:0;font-weight:700">${landCover.landUseSafeguardScore}/100</dd><dt>Samples</dt><dd style="margin:0;font-weight:700">${landCover.samples.length}</dd><dt>Cropland</dt><dd style="margin:0;font-weight:700">${Math.round(landCover.croplandShare * 100)}%</dd><dt>Built-up</dt><dd style="margin:0;font-weight:700">${Math.round(landCover.builtUpShare * 100)}%</dd><dt>Tree cover</dt><dd style="margin:0;font-weight:700">${Math.round(landCover.treeCoverShare * 100)}%</dd><dt>Open vegetation</dt><dd style="margin:0;font-weight:700">${Math.round(landCover.openVegetationShare * 100)}%</dd></dl><div style="margin-top:8px;font-size:11px">${topClasses}</div><div style="margin-top:8px;color:#6b7280;font-size:10px">Sample proxy only; not hectare-level exclusion mapping.</div></div>`,
    );
    layer.on({
      click: () => onSelect(unitId ?? regionName),
      mouseover: (e) => {
        const l = e.target as { setStyle: (s: PathOptions) => void };
        l.setStyle({ fillOpacity: 0.74, weight: 3 });
      },
      mouseout: (e) => {
        const l = e.target as { setStyle: (s: PathOptions) => void };
        l.setStyle(landCoverStyle(feature));
      },
    });
  };

  // Re-key GeoJSON layer when weights change so colors refresh
  const weightKey = Object.values(weights).join("-");

  return (
    <MapContainer
      center={[7.5, 36.5]}
      zoom={6}
      minZoom={5}
      style={{ height: "100%", width: "100%", background: "oklch(0.16 0.02 150)" }}
      scrollWheelZoom
    >
      {satellite ? (
        <>
          <TileLayer
            key="sat"
            attribution='Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maxZoom={19}
          />
          <TileLayer
            key="sat-labels"
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png"
            attribution='&copy; CARTO'
            opacity={0.9}
          />
        </>
      ) : (
        <TileLayer
          key="dark"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &middot; CARTO &middot; Boundaries: HDX COD-AB-ETH'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
      )}
      {boundaryData && (
        <GeoJSON
          key={`${adminLevel}-${selected ?? "none"}-${hoverZone ?? ""}-${weightKey}`}
          data={boundaryData}
          style={style}
          onEachFeature={onEach}
        />
      )}
      {zoneData && zoneData.features.length > 0 && (
        <GeoJSON
          key={`zones-${selected}-${hoverZone ?? ""}`}
          data={zoneData}
          style={zoneStyle}
          onEachFeature={onEachZone}
        />
      )}
      {adminLevel === "adm3" && regions && selectedRegion && (
        <GeoJSON
          key={`selected-region-${selectedRegion}`}
          data={{
            type: "FeatureCollection",
            features: regions.features.filter(
              (f) => (f.properties as ZoneProps | undefined)?.shapeName === selectedRegion,
            ),
          }}
          style={() => ({
            fillOpacity: 0,
            color: "#fafafa",
            weight: 3,
          })}
        />
      )}
      {overlayMode === "soil" && soilOverlayData && (
        <GeoJSON
          key={`soil-regions-${selected ?? "none"}`}
          data={soilOverlayData}
          style={soilStyle}
          onEachFeature={onEachSoilRegion}
        />
      )}
      {overlayMode === "gbif" && gbifOverlayData && (
        <GeoJSON
          key={`gbif-regions-${selected ?? "none"}`}
          data={gbifOverlayData}
          style={gbifStyle}
          onEachFeature={onEachGbifRegion}
        />
      )}
      {overlayMode === "livelihood" && livelihoodOverlayData && (
        <GeoJSON
          key={`livelihood-regions-${selected ?? "none"}`}
          data={livelihoodOverlayData}
          style={livelihoodStyle}
          onEachFeature={onEachLivelihoodRegion}
        />
      )}
      {overlayMode === "climate" && climateOverlayData && (
        <GeoJSON
          key={`climate-regions-${selected ?? "none"}`}
          data={climateOverlayData}
          style={climateStyle}
          onEachFeature={onEachClimateRegion}
        />
      )}
      {overlayMode === "terrain" && terrainOverlayData && (
        <GeoJSON
          key={`terrain-regions-${selected ?? "none"}`}
          data={terrainOverlayData}
          style={terrainStyle}
          onEachFeature={onEachTerrainRegion}
        />
      )}
      {overlayMode === "gfw" && gfwOverlayData && (
        <GeoJSON
          key={`gfw-regions-${selected ?? "none"}`}
          data={gfwOverlayData}
          style={gfwStyle}
          onEachFeature={onEachGfwRegion}
        />
      )}
      {overlayMode === "landcover" && landCoverOverlayData && (
        <GeoJSON
          key={`landcover-regions-${selected ?? "none"}`}
          data={landCoverOverlayData}
          style={landCoverStyle}
          interactive={false}
        />
      )}
      {overlayMode === "landcover" &&
        <Pane name="landcover-samples-v2" style={{ zIndex: 450 }}>
          {landCoverSamples.map((sample) => {
            const active = sample.id === selected;
            const isWater = sample.classValue === 80 || sample.classValue === 90 || sample.classValue === 95;
            const isConflict = isWater || sample.classValue === 40 || sample.classValue === 50;
            return (
              <CircleMarker
                key={`${sample.id}-${sample.key}`}
                center={[sample.lat, sample.lon]}
                radius={landCoverClassRadius(sample.classValue, active)}
                bubblingMouseEvents={false}
                pathOptions={{
                  color: active ? "#fafafa" : isWater ? "#e0f2fe" : "#0c1410",
                  fillColor: landCoverClassColor(sample.classValue),
                  fillOpacity: isWater ? 0.96 : 0.84,
                  opacity: 1,
                  weight: active || isWater ? 2.5 : 1.5,
                }}
                eventHandlers={{
                  click: () => onSelect(sample.id),
                }}
              >
                <Tooltip pane="tooltipPane" direction="top" offset={[0, -8]} opacity={0.95}>
                  <div style={{ fontFamily: "inherit" }}>
                    <strong>{sample.zone}</strong>
                    <br />
                    {sample.region}
                    <br />
                    {sample.classLabel} · class {sample.classValue}
                    <br />
                    {isConflict ? "Safeguard warning" : "Safeguard context"}
                    <br />
                    Safeguard {sample.safeguard}/100
                  </div>
                </Tooltip>
                <Popup pane="popupPane">
                  <div style={{ minWidth: 210, fontFamily: "system-ui, sans-serif" }}>
                    <strong>{sample.zone}</strong>
                    <div style={{ marginTop: 4, color: "#4b5563" }}>
                      ESA WorldCover 2021 sample point.
                    </div>
                    <dl style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3px 12px", margin: "8px 0 0" }}>
                      <dt>Class</dt>
                      <dd style={{ margin: 0, fontWeight: 700 }}>{sample.classLabel}</dd>
                      <dt>Code</dt>
                      <dd style={{ margin: 0, fontWeight: 700 }}>{sample.classValue}</dd>
                      <dt>Sample</dt>
                      <dd style={{ margin: 0, fontWeight: 700 }}>{sample.key}</dd>
                      <dt>Safeguard</dt>
                      <dd style={{ margin: 0, fontWeight: 700 }}>{sample.safeguard}/100</dd>
                    </dl>
                    <div style={{ marginTop: 8, color: "#6b7280", fontSize: 10 }}>
                      {isConflict
                        ? "This point flags a land-use caution for restoration planning."
                        : "This point provides land-cover context for the ADM2 safeguard."}
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </Pane>}
      {overlayMode === "soil" &&
        SOILGRIDS_SAMPLES.map((sample) => {
          const active = sample.region === selectedRegion;
          return (
            <CircleMarker
              key={sample.region}
              center={[sample.lat, sample.lon]}
              radius={active ? 9 : 7}
              pathOptions={{
                color: active ? "#fafafa" : "#f59e0b",
                fillColor: soilColor(soilSuitabilityScoreForRegion(sample.region) ?? 0),
                fillOpacity: active ? 0.95 : 0.78,
                opacity: 1,
                weight: active ? 3 : 2,
              }}
              eventHandlers={{
                click: () => onSelect(sample.region),
              }}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={0.95}>
                <div style={{ fontFamily: "inherit" }}>
                  <strong>{sample.region}</strong>
                  <br />
                  SoilGrids sample
                  <br />
                  Soil suitability {soilSuitabilityScoreForRegion(sample.region)}/100
                  <br />
                  pH {sample.phH2O.toFixed(1)} · SOC {sample.soilOrganicCarbonGkg.toFixed(1)} g/kg
                </div>
              </Tooltip>
              <Popup>
                <div style={{ minWidth: 180, fontFamily: "system-ui, sans-serif" }}>
                  <strong>{sample.region}</strong>
                  <div style={{ marginTop: 4, color: "#4b5563" }}>
                    Real SoilGrids centroid sample, 0-30 cm depth-weighted.
                  </div>
                  <dl style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3px 12px", margin: "8px 0 0" }}>
                    <dt>Suitability</dt>
                    <dd style={{ margin: 0, fontWeight: 700 }}>{soilSuitabilityScoreForRegion(sample.region)}/100</dd>
                    <dt>pH H2O</dt>
                    <dd style={{ margin: 0, fontWeight: 700 }}>{sample.phH2O.toFixed(1)}</dd>
                    <dt>Soil C</dt>
                    <dd style={{ margin: 0, fontWeight: 700 }}>{sample.soilOrganicCarbonGkg.toFixed(1)} g/kg</dd>
                    <dt>Clay</dt>
                    <dd style={{ margin: 0, fontWeight: 700 }}>{sample.clayPct.toFixed(1)}%</dd>
                    <dt>Sand</dt>
                    <dd style={{ margin: 0, fontWeight: 700 }}>{sample.sandPct.toFixed(1)}%</dd>
                    <dt>Silt</dt>
                    <dd style={{ margin: 0, fontWeight: 700 }}>{sample.siltPct.toFixed(1)}%</dd>
                  </dl>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      <ZoomToSelection data={boundaryData} selected={selected} adminLevel={adminLevel} />
      <div className="leaflet-top leaflet-right" style={{ pointerEvents: "none" }}>
        <div
          className="leaflet-control leaflet-bar"
          style={{ pointerEvents: "auto", margin: "10px", overflow: "hidden" }}
        >
          <div
            role="group"
            aria-label="HDX admin boundary level"
            style={{ display: "flex", borderBottom: "1px solid #d6d6d6" }}
          >
            {ADMIN_LEVELS.map((level) => {
              const active = adminLevel === level.value;
              return (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => onAdminLevelChange(level.value)}
                  aria-pressed={active}
                  title={`Use HDX ${level.label} ${level.description.toLowerCase()}`}
                  style={{
                    minWidth: 56,
                    padding: "7px 9px",
                    background: active ? "#0c1410" : "#fff",
                    color: active ? "#fafafa" : "#0c1410",
                    border: "none",
                    borderRight: level.value !== "adm3" ? "1px solid #d6d6d6" : "none",
                    font: "700 11px/1 system-ui, sans-serif",
                    cursor: "pointer",
                  }}
                >
                  {level.label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setSatellite((s) => !s)}
            aria-pressed={satellite}
            title={satellite ? "Switch to map view" : "Switch to satellite imagery"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 10px",
              background: satellite ? "#0c1410" : "#fff",
              color: satellite ? "#fafafa" : "#0c1410",
              border: "none",
              font: "600 12px/1 system-ui, sans-serif",
              cursor: "pointer",
            }}
          >
            <span aria-hidden>🛰️</span>
            {satellite ? "Satellite on" : "Satellite"}
          </button>
          <button
            type="button"
            onClick={() => setOverlayMode((mode) => (mode === "soil" ? "priority" : "soil"))}
            aria-pressed={overlayMode === "soil"}
            title={overlayMode === "soil" ? "Show priority map" : "Show SoilGrids suitability layer"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              width: "100%",
              padding: "6px 10px",
              background: overlayMode === "soil" ? "#0c1410" : "#fff",
              color: overlayMode === "soil" ? "#fafafa" : "#0c1410",
              border: "none",
              borderTop: "1px solid #d6d6d6",
              font: "600 12px/1 system-ui, sans-serif",
              cursor: "pointer",
            }}
          >
            <span
              aria-hidden
              style={{
                display: "inline-block",
                width: 9,
                height: 9,
                borderRadius: 999,
                background: "#f59e0b",
                boxShadow: "0 0 0 2px currentColor",
              }}
            />
            SoilGrids
          </button>
          <button
            type="button"
            onClick={() => setOverlayMode((mode) => (mode === "gbif" ? "priority" : "gbif"))}
            aria-pressed={overlayMode === "gbif"}
            title={overlayMode === "gbif" ? "Show priority map" : "Show GBIF biodiversity layer"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              width: "100%",
              padding: "6px 10px",
              background: overlayMode === "gbif" ? "#0c1410" : "#fff",
              color: overlayMode === "gbif" ? "#fafafa" : "#0c1410",
              border: "none",
              borderTop: "1px solid #d6d6d6",
              font: "600 12px/1 system-ui, sans-serif",
              cursor: "pointer",
            }}
          >
            <span
              aria-hidden
              style={{
                display: "inline-block",
                width: 9,
                height: 9,
                borderRadius: 999,
                background: "#7c3aed",
                boxShadow: "0 0 0 2px currentColor",
              }}
            />
            GBIF
          </button>
          <button
            type="button"
            onClick={() => setOverlayMode((mode) => (mode === "livelihood" ? "priority" : "livelihood"))}
            aria-pressed={overlayMode === "livelihood"}
            title={overlayMode === "livelihood" ? "Show priority map" : "Show livelihood impact layer"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              width: "100%",
              padding: "6px 10px",
              background: overlayMode === "livelihood" ? "#0c1410" : "#fff",
              color: overlayMode === "livelihood" ? "#fafafa" : "#0c1410",
              border: "none",
              borderTop: "1px solid #d6d6d6",
              font: "600 12px/1 system-ui, sans-serif",
              cursor: "pointer",
            }}
          >
            <span
              aria-hidden
              style={{
                display: "inline-block",
                width: 9,
                height: 9,
                borderRadius: 999,
                background: "#f97316",
                boxShadow: "0 0 0 2px currentColor",
              }}
            />
            Livelihood
          </button>
          <button
            type="button"
            onClick={() => setOverlayMode((mode) => (mode === "climate" ? "priority" : "climate"))}
            aria-pressed={overlayMode === "climate"}
            title={overlayMode === "climate" ? "Show priority map" : "Show NASA POWER climate suitability layer"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              width: "100%",
              padding: "6px 10px",
              background: overlayMode === "climate" ? "#0c1410" : "#fff",
              color: overlayMode === "climate" ? "#fafafa" : "#0c1410",
              border: "none",
              borderTop: "1px solid #d6d6d6",
              font: "600 12px/1 system-ui, sans-serif",
              cursor: "pointer",
            }}
          >
            <span
              aria-hidden
              style={{
                display: "inline-block",
                width: 9,
                height: 9,
                borderRadius: 999,
                background: "#38bdf8",
                boxShadow: "0 0 0 2px currentColor",
              }}
            />
            Climate
          </button>
          <button
            type="button"
            onClick={() => setOverlayMode((mode) => (mode === "terrain" ? "priority" : "terrain"))}
            aria-pressed={overlayMode === "terrain"}
            title={overlayMode === "terrain" ? "Show priority map" : "Show Open-Meteo terrain relief layer"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              width: "100%",
              padding: "6px 10px",
              background: overlayMode === "terrain" ? "#0c1410" : "#fff",
              color: overlayMode === "terrain" ? "#fafafa" : "#0c1410",
              border: "none",
              borderTop: "1px solid #d6d6d6",
              font: "600 12px/1 system-ui, sans-serif",
              cursor: "pointer",
            }}
          >
            <span
              aria-hidden
              style={{
                display: "inline-block",
                width: 9,
                height: 9,
                borderRadius: 999,
                background: "#84cc16",
                boxShadow: "0 0 0 2px currentColor",
              }}
            />
            Terrain
          </button>
          <button
            type="button"
            onClick={() => setOverlayMode((mode) => (mode === "gfw" ? "priority" : "gfw"))}
            aria-pressed={overlayMode === "gfw"}
            title={overlayMode === "gfw" ? "Show priority map" : "Show GFW/UMD tree-cover-loss layer"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              width: "100%",
              padding: "6px 10px",
              background: overlayMode === "gfw" ? "#0c1410" : "#fff",
              color: overlayMode === "gfw" ? "#fafafa" : "#0c1410",
              border: "none",
              borderTop: "1px solid #d6d6d6",
              font: "600 12px/1 system-ui, sans-serif",
              cursor: "pointer",
            }}
          >
            <span
              aria-hidden
              style={{
                display: "inline-block",
                width: 9,
                height: 9,
                borderRadius: 999,
                background: "#fb7185",
                boxShadow: "0 0 0 2px currentColor",
              }}
            />
            GFW loss
          </button>
          <button
            type="button"
            onClick={() => setOverlayMode((mode) => (mode === "landcover" ? "priority" : "landcover"))}
            aria-pressed={overlayMode === "landcover"}
            title={overlayMode === "landcover" ? "Show priority map" : "Show ESA WorldCover land-use safeguard layer"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              width: "100%",
              padding: "6px 10px",
              background: overlayMode === "landcover" ? "#0c1410" : "#fff",
              color: overlayMode === "landcover" ? "#fafafa" : "#0c1410",
              border: "none",
              borderTop: "1px solid #d6d6d6",
              font: "600 12px/1 system-ui, sans-serif",
              cursor: "pointer",
            }}
          >
            <span
              aria-hidden
              style={{
                display: "inline-block",
                width: 9,
                height: 9,
                borderRadius: 999,
                background: "#10b981",
                boxShadow: "0 0 0 2px currentColor",
              }}
            />
            Landcover
          </button>
          {overlayMode === "soil" ? (
            <div
              style={{
                padding: "7px 10px 8px",
                background: "#fff",
                borderTop: "1px solid #d6d6d6",
                color: "#0c1410",
                font: "600 10px/1.2 system-ui, sans-serif",
              }}
            >
              <div style={{ marginBottom: 5 }}>Soil suitability</div>
              <div style={{ display: "grid", gap: 4 }}>
                {[
                  { label: "80-100", color: "#16a34a" },
                  { label: "65-79", color: "#84cc16" },
                  { label: "50-64", color: "#eab308" },
                  { label: "< 50", color: "#ea580c" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                      aria-hidden
                      style={{
                        display: "inline-block",
                        width: 18,
                        height: 8,
                        borderRadius: 2,
                        background: item.color,
                      }}
                    />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 8, marginBottom: 5 }}>Sample classes</div>
              <div style={{ display: "grid", gap: 4 }}>
                {[
                  { label: "Water / wetland", color: "#0ea5e9" },
                  { label: "Cropland", color: "#facc15" },
                  { label: "Built-up", color: "#dc2626" },
                  { label: "Tree cover", color: "#16a34a" },
                  { label: "Open vegetation", color: "#84cc16" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                      aria-hidden
                      style={{
                        display: "inline-block",
                        width: 9,
                        height: 9,
                        borderRadius: 999,
                        background: item.color,
                        boxShadow: "0 0 0 1px #0c1410",
                      }}
                    />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {overlayMode === "gbif" ? (
            <div
              style={{
                padding: "7px 10px 8px",
                background: "#fff",
                borderTop: "1px solid #d6d6d6",
                color: "#0c1410",
                font: "600 10px/1.2 system-ui, sans-serif",
              }}
            >
              <div style={{ marginBottom: 5 }}>GBIF evidence</div>
              <div style={{ display: "grid", gap: 4 }}>
                {[
                  { label: "90-100", color: "#7c3aed" },
                  { label: "75-89", color: "#2563eb" },
                  { label: "60-74", color: "#0891b2" },
                  { label: "< 60", color: "#64748b" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                      aria-hidden
                      style={{
                        display: "inline-block",
                        width: 18,
                        height: 8,
                        borderRadius: 2,
                        background: item.color,
                      }}
                    />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {overlayMode === "livelihood" ? (
            <div
              style={{
                padding: "7px 10px 8px",
                background: "#fff",
                borderTop: "1px solid #d6d6d6",
                color: "#0c1410",
                font: "600 10px/1.2 system-ui, sans-serif",
              }}
            >
              <div style={{ marginBottom: 5 }}>Livelihood evidence</div>
              <div style={{ display: "grid", gap: 4 }}>
                {[
                  { label: "90-100", color: "#be123c" },
                  { label: "75-89", color: "#f97316" },
                  { label: "60-74", color: "#facc15" },
                  { label: "< 60", color: "#65a30d" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                      aria-hidden
                      style={{
                        display: "inline-block",
                        width: 18,
                        height: 8,
                        borderRadius: 2,
                        background: item.color,
                      }}
                    />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {overlayMode === "terrain" ? (
            <div
              style={{
                padding: "7px 10px 8px",
                background: "#fff",
                borderTop: "1px solid #d6d6d6",
                color: "#0c1410",
                font: "600 10px/1.2 system-ui, sans-serif",
              }}
            >
              <div style={{ marginBottom: 5 }}>Terrain relief</div>
              <div style={{ display: "grid", gap: 4 }}>
                {[
                  { label: "70-100", color: "#dc2626" },
                  { label: "50-69", color: "#f97316" },
                  { label: "30-49", color: "#facc15" },
                  { label: "< 30", color: "#84cc16" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                      aria-hidden
                      style={{
                        display: "inline-block",
                        width: 18,
                        height: 8,
                        borderRadius: 2,
                        background: item.color,
                      }}
                    />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {overlayMode === "gfw" ? (
            <div
              style={{
                padding: "7px 10px 8px",
                background: "#fff",
                borderTop: "1px solid #d6d6d6",
                color: "#0c1410",
                font: "600 10px/1.2 system-ui, sans-serif",
              }}
            >
              <div style={{ marginBottom: 5 }}>GFW loss pressure</div>
              <div style={{ display: "grid", gap: 4 }}>
                {[
                  { label: "70-100", color: "#dc2626" },
                  { label: "50-69", color: "#f97316" },
                  { label: "30-49", color: "#facc15" },
                  { label: "< 30", color: "#84cc16" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                      aria-hidden
                      style={{
                        display: "inline-block",
                        width: 18,
                        height: 8,
                        borderRadius: 2,
                        background: item.color,
                      }}
                    />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {overlayMode === "landcover" ? (
            <div
              style={{
                padding: "7px 10px 8px",
                background: "#fff",
                borderTop: "1px solid #d6d6d6",
                color: "#0c1410",
                font: "600 10px/1.2 system-ui, sans-serif",
              }}
            >
              <div style={{ marginBottom: 5 }}>Land-use safeguard</div>
              <div style={{ display: "grid", gap: 4 }}>
                {[
                  { label: "80-100", color: "#16a34a" },
                  { label: "60-79", color: "#84cc16" },
                  { label: "40-59", color: "#facc15" },
                  { label: "< 40", color: "#f97316" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                      aria-hidden
                      style={{
                        display: "inline-block",
                        width: 18,
                        height: 8,
                        borderRadius: 2,
                        background: item.color,
                      }}
                    />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: 9,
                  paddingTop: 7,
                  borderTop: "1px solid #d6d6d6",
                }}
              >
                <div style={{ marginBottom: 5 }}>Sample point class</div>
                <div style={{ display: "grid", gap: 4 }}>
                  {[
                    { label: "Water / wetland", color: "#0ea5e9" },
                    { label: "Cropland", color: "#facc15" },
                    { label: "Built-up", color: "#dc2626" },
                    { label: "Tree cover", color: "#16a34a" },
                    { label: "Open vegetation", color: "#84cc16" },
                    { label: "Other / sparse", color: "#94a3b8" },
                  ].map((item) => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span
                        aria-hidden
                        style={{
                          display: "inline-block",
                          width: 9,
                          height: 9,
                          borderRadius: 999,
                          background: item.color,
                          boxShadow: "0 0 0 1px #0c1410",
                        }}
                      />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </MapContainer>
  );
}
