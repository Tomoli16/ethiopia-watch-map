import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import {
  FOCUS_REGIONS,
  REGION_DATA,
  RISK_COLORS,
  populationDensity,
  riskLevel,
  riskScore,
  rpsBreakdown,
} from "@/lib/deforestation-data";
import { recommendSpecies } from "@/lib/species-recommender";
import type { SpeciesPick } from "@/lib/species-recommender";

const DeforestationMap = lazy(() =>
  import("@/components/DeforestationMap").then((m) => ({ default: m.DeforestationMap })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Southwest Ethiopia · Forest Risk & Restoration Opportunity" },
      {
        name: "description",
        content:
          "Interactive map of southwest Ethiopia pairing Global Forest Watch deforestation risk with rainfall, land cover, protected areas and WRI restoration opportunity.",
      },
      { property: "og:title", content: "Southwest Ethiopia · Forest Risk & Restoration Opportunity" },
      {
        property: "og:description",
        content:
          "Prioritize southwest Ethiopian regions for monitoring and reforestation, combining GFW loss data with CHIRPS, ESA WorldCover, WDPA and WRI restoration layers.",
      },
    ],
  }),
  component: Index,
});

function fmtKha(ha: number): string {
  return (ha / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 });
}

function fmtMha(ha: number): string {
  return (ha / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function fmtDensity(d: number): string {
  return d.toLocaleString(undefined, { maximumFractionDigits: 1 });
}

function Index() {
  const [selected, setSelected] = useState<string | null>("Oromia");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const ranked = FOCUS_REGIONS.map((name) => {
    const r = REGION_DATA[name];
    return { name, ...r, score: riskScore(r) };
  }).sort((a, b) => b.score - a.score);

  const detail = selected ? REGION_DATA[selected] : null;
  const detailScore = detail ? riskScore(detail) : 0;
  const detailLevel = detail ? riskLevel(detailScore) : null;
  const detailRps = detail ? rpsBreakdown(detail) : null;

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border px-6 py-4">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Southwest Ethiopia · Forest Risk & Restoration Opportunity
            </h1>
            <p className="text-xs text-muted-foreground">
              Pairs deforestation risk from{" "}
              <a
                className="underline decoration-dotted hover:text-foreground"
                href="https://www.globalforestwatch.org/dashboards/country/ETH/"
                target="_blank"
                rel="noreferrer"
              >
                Global Forest Watch
              </a>
              {" "}with restoration context (CHIRPS rainfall, ESA WorldCover, WDPA, WRI Atlas). Boundaries from HDX{" "}
              <a
                className="underline decoration-dotted hover:text-foreground"
                href="https://data.humdata.org/dataset/cod-ab-eth"
                target="_blank"
                rel="noreferrer"
              >
                COD-AB-ETH
              </a>
              .
            </p>
          </div>
          <Legend />
        </div>
      </header>

      <div className="grid flex-1 min-h-0 grid-cols-[320px_1fr_360px]">
        <aside className="overflow-y-auto border-r border-border">
          <div className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Southwest regions · ranked by risk
          </div>
          <ul>
            {ranked.map((r) => {
              const level = riskLevel(r.score);
              const active = r.name === selected;
              return (
                <li key={r.name}>
                  <button
                    onClick={() => setSelected(r.name)}
                    className={`flex w-full items-center justify-between gap-3 border-l-2 px-4 py-3 text-left transition-colors hover:bg-secondary ${
                      active ? "border-primary bg-secondary" : "border-transparent"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{r.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {fmtKha(r.loss2023Ha)} kha lost in 2023
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block size-2 rounded-full"
                        style={{ backgroundColor: RISK_COLORS[level] }}
                      />
                      <span className="tabular-nums text-sm font-semibold">{r.score}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="px-4 pb-4 pt-2 text-[11px] leading-relaxed text-muted-foreground">
            Scope covers Oromia, SNNPR (which now includes the South West
            Ethiopia Peoples' Region — Kaffa, Sheka, Bench Sheko), Gambela and
            Benishangul-Gumuz. Together they hold nearly all of Ethiopia's
            remaining moist forest.
          </div>
        </aside>

        <main className="relative min-h-0">
          {mounted ? (
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  Loading map…
                </div>
              }
            >
              <DeforestationMap selected={selected} onSelect={setSelected} />
            </Suspense>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Loading map…
            </div>
          )}
        </main>

        <aside className="overflow-y-auto border-l border-border p-5">
          {detail && selected && detailLevel ? (
            <div className="space-y-5">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Selected region
                </div>
                <h2 className="mt-1 text-2xl font-semibold">{selected}</h2>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-medium uppercase tracking-wider"
                    style={{ backgroundColor: RISK_COLORS[detailLevel], color: "#0b0f0c" }}
                  >
                    {detailLevel} risk
                  </span>
                  <span className="text-sm text-muted-foreground">
                    score {detailScore} / 100
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Stat label="Tree cover 2000" value={`${fmtMha(detail.treeCover2000Ha)} Mha`} />
                <Stat label="Loss 2001–2023" value={`${fmtKha(detail.lossTotalHa)} kha`} />
                <Stat label="Loss 2023" value={`${fmtKha(detail.loss2023Ha)} kha`} />
                <Stat label="Primary loss" value={`${fmtKha(detail.primaryLossHa)} kha`} />
                <Stat
                  label="Population"
                  value={`${(detail.population / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 2 })} M`}
                />
                <Stat
                  label="Pop. density"
                  value={`${fmtDensity(populationDensity(detail))} /km²`}
                />
              </div>

              {detailRps ? <RpsPanel rps={detailRps} ndvi={detail.ndviMean} evi={detail.eviMean} trend={detail.ndviTrend} /> : null}

              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Restoration context
                </h3>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <Stat label="Annual rainfall" value={`${detail.annualRainfallMm.toLocaleString()} mm`} />
                  <Stat label="Mean elevation" value={`${detail.meanElevationM.toLocaleString()} m`} />
                  <Stat
                    label="Protected area"
                    value={`${Math.round(detail.protectedAreaPct * 100)}%`}
                  />
                  <Stat
                    label="Restoration opp."
                    value={`${fmtMha(detail.restorationPotentialHa)} Mha`}
                  />
                </div>
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span>Land cover</span>
                    <span>ESA WorldCover 2021</span>
                  </div>
                  <LandCoverBar lc={detail.landCover} />
                </div>
              </div>

              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Primary drivers
                </h3>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {detail.drivers.map((d) => (
                    <li key={d} className="rounded-md bg-secondary px-2 py-1 text-xs">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Recommended species
                  </h3>
                  <span className="text-[10px] text-muted-foreground">ranked by site fit</span>
                </div>
                <ul className="mt-2 space-y-2">
                  {recommendSpecies(detail).map((sp) => (
                    <li key={sp.scientificName} className="rounded-md border border-border bg-card/40 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-sm font-medium leading-tight">
                            {sp.commonName}
                            {sp.amharic ? <span className="ml-1 text-xs text-muted-foreground">({sp.amharic})</span> : null}
                          </div>
                          <div className="text-[11px] italic text-muted-foreground">{sp.scientificName}</div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-semibold tabular-nums">
                            {sp.fit}% fit
                          </span>
                          <span className={`mt-1 text-[10px] ${sp.native ? "text-emerald-400" : "text-amber-400"}`}>
                            {sp.native ? "Native" : "Exotic"}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-foreground/80">{sp.note}</p>
                      <FitBreakdown sp={sp} />
                      <div className="mt-1.5 text-[10px] text-muted-foreground">
                        Uses: {sp.uses.join(" · ")}
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                  Heuristic match of site rainfall, elevation and land cover to a curated species list
                  (ICRAF Agroforestree DB, Ethiopia NFSDP). Validate with local nurseries before planting.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Field notes
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                  {detail.notes}
                </p>
              </div>

              <div className="rounded-md border border-border bg-card/50 p-3 text-xs text-muted-foreground">
                Tree-cover-loss values from Global Forest Watch (Hansen et al.
                2013, v1.11) at 30% canopy threshold. Risk score weights 2023
                loss intensity (55%), primary-forest loss share (30%) and
                absolute 2023 loss (15%). Pair with live Sentinel imagery
                before fieldwork.
              </div>

              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Sources
                </h3>
                <ul className="mt-2 space-y-1 text-xs">
                  <li>
                    Forest stats ·{" "}
                    <a
                      className="underline decoration-dotted hover:text-foreground"
                      href={detail.sources.forest.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {detail.sources.forest.label}
                    </a>
                  </li>
                  <li>
                    NDVI / EVI ·{" "}
                    <a className="underline decoration-dotted hover:text-foreground" href={detail.sources.vegIndex.url} target="_blank" rel="noreferrer">
                      {detail.sources.vegIndex.label}
                    </a>
                  </li>
                  <li>
                    Population ·{" "}
                    <a
                      className="underline decoration-dotted hover:text-foreground"
                      href={detail.sources.population.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {detail.sources.population.label}
                    </a>
                  </li>
                  <li>
                    Area ·{" "}
                    <a
                      className="underline decoration-dotted hover:text-foreground"
                      href={detail.sources.area.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {detail.sources.area.label}
                    </a>
                  </li>
                  <li>
                    Rainfall ·{" "}
                    <a className="underline decoration-dotted hover:text-foreground" href={detail.sources.rainfall.url} target="_blank" rel="noreferrer">
                      {detail.sources.rainfall.label}
                    </a>
                  </li>
                  <li>
                    Elevation ·{" "}
                    <a className="underline decoration-dotted hover:text-foreground" href={detail.sources.elevation.url} target="_blank" rel="noreferrer">
                      {detail.sources.elevation.label}
                    </a>
                  </li>
                  <li>
                    Land cover ·{" "}
                    <a className="underline decoration-dotted hover:text-foreground" href={detail.sources.landcover.url} target="_blank" rel="noreferrer">
                      {detail.sources.landcover.label}
                    </a>
                  </li>
                  <li>
                    Protected areas ·{" "}
                    <a className="underline decoration-dotted hover:text-foreground" href={detail.sources.protected.url} target="_blank" rel="noreferrer">
                      {detail.sources.protected.label}
                    </a>
                  </li>
                  <li>
                    Restoration ·{" "}
                    <a className="underline decoration-dotted hover:text-foreground" href={detail.sources.restoration.url} target="_blank" rel="noreferrer">
                      {detail.sources.restoration.label}
                    </a>
                  </li>
                  <li>
                    Species ·{" "}
                    <a className="underline decoration-dotted hover:text-foreground" href="https://apps.worldagroforestry.org/products/switchboard/index.php/name_like/" target="_blank" rel="noreferrer">
                      ICRAF Agroforestree Database
                    </a>
                  </li>
                </ul>
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                  Indicative reference values — verify against the linked
                  sources before operational use. SNNPR figures reflect the
                  pre-2020 footprint (now split across SNNPR, Sidama, South
                  West Ethiopia Peoples', and Central Ethiopia regions).
                </p>
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Select a region on the map or in the list to inspect.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-secondary/60 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold tabular-nums">{value}</div>
    </div>
  );
}

function LandCoverBar({ lc }: { lc: { forest: number; cropland: number; grassland: number; other: number } }) {
  const segs: { key: string; label: string; pct: number; color: string }[] = [
    { key: "forest", label: "Forest", pct: lc.forest, color: "#16a34a" },
    { key: "cropland", label: "Cropland", pct: lc.cropland, color: "#eab308" },
    { key: "grassland", label: "Grass/shrub", pct: lc.grassland, color: "#a3a380" },
    { key: "other", label: "Other", pct: lc.other, color: "#6b7280" },
  ];
  return (
    <div>
      <div className="flex h-2.5 w-full overflow-hidden rounded-sm">
        {segs.map((s) => (
          <div
            key={s.key}
            title={`${s.label}: ${Math.round(s.pct * 100)}%`}
            style={{ width: `${s.pct * 100}%`, backgroundColor: s.color }}
          />
        ))}
      </div>
      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-muted-foreground">
        {segs.map((s) => (
          <div key={s.key} className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-sm" style={{ backgroundColor: s.color }} />
            {s.label} {Math.round(s.pct * 100)}%
          </div>
        ))}
      </div>
    </div>
  );
}

function RpsPanel({
  rps,
  ndvi,
  evi,
  trend,
}: {
  rps: { total: number; degradation: number; vigor: number; trend: number; opportunity: number };
  ndvi: number;
  evi: number;
  trend: number;
}) {
  const rows: { label: string; value: number; weight: string; detail: string }[] = [
    { label: "Degradation", value: rps.degradation, weight: "35%", detail: "GFW risk score" },
    { label: "NDVI vigor", value: rps.vigor, weight: "20%", detail: `mean NDVI ${ndvi.toFixed(2)} · EVI ${evi.toFixed(2)}` },
    { label: "Greening loss", value: rps.trend, weight: "25%", detail: `NDVI trend ${trend > 0 ? "+" : ""}${trend.toFixed(4)}/yr` },
    { label: "Opportunity", value: rps.opportunity, weight: "20%", detail: "WRI restoration ha ÷ region ha" },
  ];
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Restoration Protection Score
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-semibold tabular-nums">{rps.total}</span>
          <span className="text-[10px] text-muted-foreground">/ 100</span>
        </div>
      </div>
      <div className="mt-2 space-y-1.5">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[88px_1fr_36px] items-center gap-2">
            <span className="text-[11px] text-muted-foreground">
              {r.label} <span className="text-[9px] text-muted-foreground/60">({r.weight})</span>
            </span>
            <div className="h-1.5 overflow-hidden rounded-sm bg-secondary">
              <div
                className="h-full"
                style={{
                  width: `${r.value}%`,
                  backgroundColor: r.value >= 70 ? "#b91c1c" : r.value >= 45 ? "#ea580c" : r.value >= 25 ? "#eab308" : "#16a34a",
                }}
              />
            </div>
            <span className="text-right text-[10px] tabular-nums text-muted-foreground">{r.value}</span>
            <span className="col-span-3 -mt-0.5 pl-[96px] text-[10px] text-muted-foreground/80">
              {r.detail}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
        RPS = 0.35·degradation + 0.20·NDVI vigor + 0.25·greening loss + 0.20·opportunity. Higher = act sooner. NDVI/EVI from MODIS MOD13Q1 250 m.
      </p>
    </div>
  );
}

function FitBreakdown({ sp }: { sp: SpeciesPick }) {
  const b = sp.breakdown;
  const rows: { label: string; value: number; detail: string; weight: string }[] = [
    {
      label: "Elevation",
      value: b.elevation,
      detail: `site ${b.siteElevation} m · ideal ${sp.elevMin}–${sp.elevMax} m`,
      weight: "climate ½",
    },
    {
      label: "Rainfall",
      value: b.rainfall,
      detail: `site ${b.siteRainfall} mm · ideal ${sp.rainMin}–${sp.rainMax} mm`,
      weight: "climate ½",
    },
    {
      label: "Niche",
      value: b.niche,
      detail: b.matchedNiche ? `best match: ${b.matchedNiche.replace("-", " ")}` : "—",
      weight: "×0.7–1.0",
    },
  ];
  return (
    <div className="mt-2 space-y-1">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
        Fit breakdown
      </div>
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[64px_1fr_32px] items-center gap-2">
          <span className="text-[10px] text-muted-foreground">{r.label}</span>
          <div className="h-1.5 overflow-hidden rounded-sm bg-secondary">
            <div
              className="h-full"
              style={{
                width: `${r.value}%`,
                backgroundColor: r.value >= 80 ? "#16a34a" : r.value >= 60 ? "#eab308" : "#b91c1c",
              }}
            />
          </div>
          <span className="text-right text-[10px] tabular-nums text-muted-foreground">{r.value}</span>
          <span className="col-span-3 -mt-0.5 pl-[72px] text-[10px] text-muted-foreground/80">
            {r.detail}
          </span>
        </div>
      ))}
      <div className="pl-[72px] pt-0.5 text-[10px] text-muted-foreground/80">
        Fit = √(elev × rain) × (0.7 + 0.3 × niche)
      </div>
    </div>
  );
}

function Legend() {
  const items: { label: string; color: string }[] = [
    { label: "Low", color: RISK_COLORS.low },
    { label: "Moderate", color: RISK_COLORS.moderate },
    { label: "High", color: RISK_COLORS.high },
    { label: "Severe", color: RISK_COLORS.severe },
  ];
  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      {items.map((i) => (
        <div key={i.label} className="flex items-center gap-1.5">
          <span
            className="inline-block size-3 rounded-sm"
            style={{ backgroundColor: i.color }}
          />
          {i.label}
        </div>
      ))}
    </div>
  );
}