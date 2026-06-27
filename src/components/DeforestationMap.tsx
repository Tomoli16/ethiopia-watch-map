import { useEffect, useMemo, useState } from "react";
import { CircleMarker, GeoJSON, MapContainer, Popup, TileLayer, Tooltip, useMap } from "react-leaflet";
import L, { type Layer, type PathOptions } from "leaflet";
import type { Feature } from "geojson";
import "leaflet/dist/leaflet.css";
import {
  FOCUS_REGIONS,
  REGION_DATA,
  colorForScore,
  gbifBiodiversityForRegion,
  livelihoodPopulationForRegion,
  priorityScore,
  soilSuitabilityScoreForRegion,
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
type OverlayMode = "priority" | "soil" | "gbif" | "livelihood";

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

function soilColor(score: number) {
  return colorForScore(score);
}

function gbifColor(score: number) {
  return colorForScore(score);
}

function livelihoodColor(score: number) {
  return colorForScore(score);
}

function ZoomToSelection({ data, selected }: { data: GeoJSON.FeatureCollection | null; selected: string | null }) {
  const map = useMap();
  useEffect(() => {
    if (!data || !selected) return;
    const feat = data.features.find(
      (f) => (f.properties as { shapeName?: string } | undefined)?.shapeName === selected,
    );
    if (!feat) return;
    const layer = L.geoJSON(feat as Feature);
    const bounds = layer.getBounds();
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [40, 40], maxZoom: 9 });
  }, [data, selected, map]);
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
        const regionName = adminLevel === "adm1" ? name : props?.parent ?? "";
        const risk = REGION_DATA[regionName];
        const inFocus = FOCUS_REGIONS.includes(regionName);
        const color = risk && inFocus ? colorForScore(priorityScore(risk, weights)) : "#2a2f2c";
        const isSelected = regionName === selected;
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
    const regionName = adminLevel === "adm1" ? name : props?.parent ?? "";
    const parentLabel =
      adminLevel === "adm3" && props?.zoneParent
        ? `${props.zoneParent}, ${regionName}`
        : regionName;
    const inFocus = FOCUS_REGIONS.includes(regionName);
    const risk = REGION_DATA[regionName];
    const score = risk ? priorityScore(risk, weights) : 0;
    layer.bindTooltip(
      `<div style="font-family:inherit"><strong>${name}</strong>${adminLevel !== "adm1" && regionName ? `<br/><em>${parentLabel}</em>` : ""}${inFocus ? `<br/>Priority: ${score}` : "<br/><em>out of scope</em>"}</div>`,
      { sticky: true, className: "deforest-tooltip" },
    );
    if (!inFocus) return;
    layer.on({
      click: () => onSelect(regionName),
      mouseover: (e) => {
        if (adminLevel !== "adm1") setHoverZone(name);
        const l = e.target as { setStyle: (s: PathOptions) => void };
        l.setStyle({ fillOpacity: 0.85, weight: 2 });
      },
      mouseout: (e) => {
        if (adminLevel !== "adm1") setHoverZone(null);
        const l = e.target as { setStyle: (s: PathOptions) => void };
        const isSelected = regionName === selected;
        l.setStyle({
          fillOpacity: isSelected ? 0.74 : adminLevel === "adm3" ? 0.44 : 0.52,
          weight: isSelected ? (adminLevel === "adm1" ? 3 : 1.6) : 1,
        });
      },
    });
  };

  const zoneData = useMemo<GeoJSON.FeatureCollection | null>(() => {
    if (adminLevel !== "adm1" || !zones || !selected) return null;
    return {
      type: "FeatureCollection",
      features: zones.features.filter(
        (f) => (f.properties as ZoneProps | undefined)?.parent === selected,
      ),
    };
  }, [adminLevel, zones, selected]);

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
    const score = soilSuitabilityScoreForRegion(name);
    const active = name === selected;
    return {
      fillColor: score === null ? "#737373" : soilColor(score),
      fillOpacity: active ? 0.58 : 0.42,
      color: active ? "#fafafa" : "#f59e0b",
      weight: active ? 3 : 1.4,
    };
  };

  const onEachSoilRegion = (feature: Feature, layer: Layer) => {
    const name = (feature.properties as ZoneProps | undefined)?.shapeName ?? "";
    const sample = SOILGRIDS_REGION_SAMPLES[name];
    const score = soilSuitabilityScoreForRegion(name);
    if (!sample || score === null) return;

    layer.bindTooltip(
      `<div style="font-family:inherit"><strong>${name}</strong><br/>Soil suitability: ${score}/100<br/>pH ${sample.phH2O.toFixed(1)} · SOC ${sample.soilOrganicCarbonGkg.toFixed(1)} g/kg</div>`,
      { sticky: true, className: "deforest-tooltip" },
    );
    layer.bindPopup(
      `<div style="min-width:180px;font-family:system-ui,sans-serif"><strong>${name}</strong><div style="margin-top:4px;color:#4b5563">SoilGrids-derived region soil suitability from one centroid sample.</div><dl style="display:grid;grid-template-columns:1fr auto;gap:3px 12px;margin:8px 0 0"><dt>Suitability</dt><dd style="margin:0;font-weight:700">${score}/100</dd><dt>pH H2O</dt><dd style="margin:0;font-weight:700">${sample.phH2O.toFixed(1)}</dd><dt>Soil C</dt><dd style="margin:0;font-weight:700">${sample.soilOrganicCarbonGkg.toFixed(1)} g/kg</dd><dt>Clay</dt><dd style="margin:0;font-weight:700">${sample.clayPct.toFixed(1)}%</dd><dt>Sand</dt><dd style="margin:0;font-weight:700">${sample.sandPct.toFixed(1)}%</dd></dl></div>`,
    );
    layer.on({
      click: () => onSelect(name),
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
    const name = (feature?.properties as ZoneProps | undefined)?.shapeName ?? "";
    const gbif = gbifBiodiversityForRegion(name);
    const active = name === selected;
    return {
      fillColor: gbif ? gbifColor(gbif.occurrenceEvidenceScore) : "#737373",
      fillOpacity: active ? 0.6 : 0.44,
      color: active ? "#fafafa" : "#c4b5fd",
      weight: active ? 3 : 1.4,
    };
  };

  const onEachGbifRegion = (feature: Feature, layer: Layer) => {
    const name = (feature.properties as ZoneProps | undefined)?.shapeName ?? "";
    const gbif = gbifBiodiversityForRegion(name);
    if (!gbif) return;

    const topPlants = gbif.topPlantSpecies
      .slice(0, 3)
      .map((sp) => `${sp.canonicalName ?? sp.scientificName} (${sp.count.toLocaleString()})`)
      .join("<br/>");
    const topBirds = gbif.topBirdSpecies
      .slice(0, 3)
      .map((sp) => `${sp.canonicalName ?? sp.scientificName} (${sp.count.toLocaleString()})`)
      .join("<br/>");

    layer.bindTooltip(
      `<div style="font-family:inherit"><strong>${name}</strong><br/>GBIF evidence: ${gbif.occurrenceEvidenceScore}/100<br/>Plants: ${gbif.plantOccurrences.toLocaleString()} · Birds: ${gbif.birdOccurrences.toLocaleString()}</div>`,
      { sticky: true, className: "deforest-tooltip" },
    );
    layer.bindPopup(
      `<div style="min-width:230px;font-family:system-ui,sans-serif"><strong>${name}</strong><div style="margin-top:4px;color:#4b5563">Real GBIF coordinated occurrences, queried by ADM1 bounding box.</div><dl style="display:grid;grid-template-columns:1fr auto;gap:3px 12px;margin:8px 0 0"><dt>Evidence</dt><dd style="margin:0;font-weight:700">${gbif.occurrenceEvidenceScore}/100</dd><dt>All records</dt><dd style="margin:0;font-weight:700">${gbif.allOccurrences.toLocaleString()}</dd><dt>Plants</dt><dd style="margin:0;font-weight:700">${gbif.plantOccurrences.toLocaleString()}</dd><dt>Birds</dt><dd style="margin:0;font-weight:700">${gbif.birdOccurrences.toLocaleString()}</dd></dl><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px;font-size:11px"><div><strong>Top plants</strong><br/>${topPlants}</div><div><strong>Top birds</strong><br/>${topBirds}</div></div><div style="margin-top:8px;color:#6b7280;font-size:10px">Not yet corrected for observer/sampling bias.</div></div>`,
    );
    layer.on({
      click: () => onSelect(name),
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
    const name = (feature?.properties as ZoneProps | undefined)?.shapeName ?? "";
    const livelihood = livelihoodPopulationForRegion(name);
    const active = name === selected;
    return {
      fillColor: livelihood ? livelihoodColor(livelihood.livelihoodEvidenceScore) : "#737373",
      fillOpacity: active ? 0.62 : 0.46,
      color: active ? "#fafafa" : "#fed7aa",
      weight: active ? 3 : 1.4,
    };
  };

  const onEachLivelihoodRegion = (feature: Feature, layer: Layer) => {
    const name = (feature.properties as ZoneProps | undefined)?.shapeName ?? "";
    const livelihood = livelihoodPopulationForRegion(name);
    if (!livelihood) return;

    layer.bindTooltip(
      `<div style="font-family:inherit"><strong>${name}</strong><br/>Livelihood evidence: ${livelihood.livelihoodEvidenceScore}/100<br/>Population: ${livelihood.populationTotal.toLocaleString()}<br/>Density: ${livelihood.densityPerKm2.toFixed(1)}/km²</div>`,
      { sticky: true, className: "deforest-tooltip" },
    );
    layer.bindPopup(
      `<div style="min-width:220px;font-family:system-ui,sans-serif"><strong>${name}</strong><div style="margin-top:4px;color:#4b5563">Real HDX/OCHA ADM3 projected population statistics, aggregated to focus region.</div><dl style="display:grid;grid-template-columns:1fr auto;gap:3px 12px;margin:8px 0 0"><dt>Evidence</dt><dd style="margin:0;font-weight:700">${livelihood.livelihoodEvidenceScore}/100</dd><dt>ADM3 units</dt><dd style="margin:0;font-weight:700">${livelihood.admin3Count.toLocaleString()}</dd><dt>Population</dt><dd style="margin:0;font-weight:700">${livelihood.populationTotal.toLocaleString()}</dd><dt>Density</dt><dd style="margin:0;font-weight:700">${livelihood.densityPerKm2.toFixed(1)}/km²</dd><dt>Children &lt;15</dt><dd style="margin:0;font-weight:700">${Math.round(livelihood.childShare * 100)}%</dd><dt>Women</dt><dd style="margin:0;font-weight:700">${Math.round(livelihood.femaleShare * 100)}%</dd><dt>Dependency</dt><dd style="margin:0;font-weight:700">${livelihood.dependencyRatio.toFixed(2)}</dd></dl></div>`,
    );
    layer.on({
      click: () => onSelect(name),
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
      {adminLevel !== "adm1" && regions && selected && (
        <GeoJSON
          key={`selected-region-${selected}`}
          data={{
            type: "FeatureCollection",
            features: regions.features.filter(
              (f) => (f.properties as ZoneProps | undefined)?.shapeName === selected,
            ),
          }}
          style={() => ({
            fillOpacity: 0,
            color: "#fafafa",
            weight: 3,
          })}
        />
      )}
      {overlayMode === "soil" && soilRegionData && (
        <GeoJSON
          key={`soil-regions-${selected ?? "none"}`}
          data={soilRegionData}
          style={soilStyle}
          onEachFeature={onEachSoilRegion}
        />
      )}
      {overlayMode === "gbif" && gbifRegionData && (
        <GeoJSON
          key={`gbif-regions-${selected ?? "none"}`}
          data={gbifRegionData}
          style={gbifStyle}
          onEachFeature={onEachGbifRegion}
        />
      )}
      {overlayMode === "livelihood" && livelihoodRegionData && (
        <GeoJSON
          key={`livelihood-regions-${selected ?? "none"}`}
          data={livelihoodRegionData}
          style={livelihoodStyle}
          onEachFeature={onEachLivelihoodRegion}
        />
      )}
      {overlayMode === "soil" &&
        SOILGRIDS_SAMPLES.map((sample) => {
          const active = sample.region === selected;
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
      <ZoomToSelection data={regions} selected={selected} />
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
        </div>
      </div>
    </MapContainer>
  );
}
