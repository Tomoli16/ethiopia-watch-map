import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L, { type Layer, type PathOptions } from "leaflet";
import type { Feature } from "geojson";
import "leaflet/dist/leaflet.css";
import {
  FOCUS_REGIONS,
  REGION_DATA,
  RISK_COLORS,
  riskLevel,
  riskScore,
} from "@/lib/deforestation-data";

interface Props {
  selected: string | null;
  onSelect: (name: string) => void;
}

interface ZoneProps {
  shapeName?: string;
  parent?: string;
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

export function DeforestationMap({ selected, onSelect }: Props) {
  const [data, setData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [zones, setZones] = useState<GeoJSON.FeatureCollection | null>(null);
  const [satellite, setSatellite] = useState(false);
  const [hoverZone, setHoverZone] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/eth-adm1.geojson")
      .then((r) => r.json())
      .then(setData)
      .catch((e) => console.error("Failed to load boundaries", e));
    fetch("/data/eth-adm2.geojson")
      .then((r) => r.json())
      .then(setZones)
      .catch((e) => console.error("Failed to load zone boundaries", e));
  }, []);

  const style = useMemo(
    () =>
      (feature?: Feature): PathOptions => {
        const name = (feature?.properties as { shapeName?: string } | undefined)?.shapeName ?? "";
        const risk = REGION_DATA[name];
        const inFocus = FOCUS_REGIONS.includes(name);
        const color = risk && inFocus ? RISK_COLORS[riskLevel(riskScore(risk))] : "#2a2f2c";
        const isSelected = name === selected;
        return {
          fillColor: color,
          fillOpacity: inFocus ? (isSelected ? 0.85 : 0.6) : 0.18,
          color: isSelected ? "#fafafa" : "#0c1410",
          weight: isSelected ? 3 : inFocus ? 1 : 0.5,
        };
      },
    [selected],
  );

  const onEach = (feature: Feature, layer: Layer) => {
    const name = (feature.properties as { shapeName?: string } | undefined)?.shapeName ?? "";
    const inFocus = FOCUS_REGIONS.includes(name);
    const risk = REGION_DATA[name];
    const score = risk ? riskScore(risk) : 0;
    layer.bindTooltip(
      `<div style="font-family:inherit"><strong>${name}</strong>${inFocus ? `<br/>Risk score: ${score}` : "<br/><em>out of scope</em>"}</div>`,
      { sticky: true, className: "deforest-tooltip" },
    );
    if (!inFocus) return;
    layer.on({
      click: () => onSelect(name),
      mouseover: (e) => {
        const l = e.target as { setStyle: (s: PathOptions) => void };
        l.setStyle({ fillOpacity: 0.85, weight: 2 });
      },
      mouseout: (e) => {
        const l = e.target as { setStyle: (s: PathOptions) => void };
        const isSelected = name === selected;
        l.setStyle({
          fillOpacity: isSelected ? 0.85 : 0.6,
          weight: isSelected ? 3 : 1,
        });
      },
    });
  };

  const zoneData = useMemo<GeoJSON.FeatureCollection | null>(() => {
    if (!zones || !selected) return null;
    return {
      type: "FeatureCollection",
      features: zones.features.filter(
        (f) => (f.properties as ZoneProps | undefined)?.parent === selected,
      ),
    };
  }, [zones, selected]);

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
      {data && (
        <GeoJSON
          key={selected ?? "none"}
          data={data}
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
      <ZoomToSelection data={data} selected={selected} />
      <div className="leaflet-top leaflet-right" style={{ pointerEvents: "none" }}>
        <div
          className="leaflet-control leaflet-bar"
          style={{ pointerEvents: "auto", margin: "10px", overflow: "hidden" }}
        >
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