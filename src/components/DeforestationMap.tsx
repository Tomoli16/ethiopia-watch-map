import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L, { type Layer, type PathOptions } from "leaflet";
import type { Feature } from "geojson";
import "leaflet/dist/leaflet.css";
import {
  FOCUS_REGIONS,
  REGION_DATA,
  RISK_COLORS,
  priorityLevel,
  priorityScore,
  type Weights,
} from "@/lib/deforestation-data";

interface Props {
  selected: string | null;
  onSelect: (name: string) => void;
  adminLevel: AdminLevel;
  onAdminLevelChange: (level: AdminLevel) => void;
  weights: Weights;
}

export type AdminLevel = "adm1" | "adm2" | "adm3";

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
        const color =
          risk && inFocus
            ? RISK_COLORS[priorityLevel(priorityScore(risk, weights))]
            : "#2a2f2c";
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

  // Re-key GeoJSON layer when weights change so colors refresh
  const weightKey = `${weights.suitability}-${weights.carbon}-${weights.biodiversity}-${weights.waterSoil}-${weights.livelihood}`;

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
        </div>
      </div>
    </MapContainer>
  );
}
