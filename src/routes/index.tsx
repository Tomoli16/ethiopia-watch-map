import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import {
  DEFAULT_WEIGHTS,
  FOCUS_REGIONS,
  PROXIES,
  REGION_DATA,
  RISK_COLORS,
  populationDensity,
  priorityLevel,
  priorityScore,
  proxyScores,
  type ProxyKey,
  type ProxyScores,
  type Weights,
} from "@/lib/deforestation-data";
import { recommendSpecies } from "@/lib/species-recommender";
import type { SpeciesPick } from "@/lib/species-recommender";
import type { AdminLevel } from "@/components/DeforestationMap";

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
  const [adminLevel, setAdminLevel] = useState<AdminLevel>("adm1");
  const [weights, setWeights] = useState<Weights>(DEFAULT_WEIGHTS);
  useEffect(() => setMounted(true), []);

  const ranked = FOCUS_REGIONS.map((name) => {
    const r = REGION_DATA[name];
    return { name, ...r, score: priorityScore(r, weights) };
  }).sort((a, b) => b.score - a.score);

  const detail = selected ? REGION_DATA[selected] : null;
  const detailScore = detail ? priorityScore(detail, weights) : 0;
  const detailLevel = detail ? priorityLevel(detailScore) : null;
  const detailProxies = detail ? proxyScores(detail) : null;

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border px-6 py-4">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Southwest Ethiopia · Forest Risk & Restoration Opportunity
            </h1>
            <p className="text-xs text-muted-foreground">
              Five-proxy priority score (Restoration Suitability · Carbon · Biodiversity · Water/Soil · Livelihood). Layers from{" "}
              <a
                className="underline decoration-dotted hover:text-foreground"
                href="https://www.globalforestwatch.org/dashboards/country/ETH/"
                target="_blank"
                rel="noreferrer"
              >
                GFW
              </a>
              , ESA CCI Biomass, SoilGrids, WRI Aqueduct, KBA, World Bank. Boundaries from HDX{" "}
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
        <aside className="flex flex-col overflow-hidden border-r border-border">
          <div className="overflow-y-auto">
            <div className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Southwest regions · ranked by priority
            </div>
            <ul>
              {ranked.map((r) => {
                const level = priorityLevel(r.score);
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
            <div className="border-t border-border">
              <WeightsPanel weights={weights} onChange={setWeights} />
            </div>
            <div className="px-4 pb-4 pt-2 text-[11px] leading-relaxed text-muted-foreground">
              Map boundaries use HDX COD-AB-ETH{" "}
              <span className="font-medium text-foreground/80">{adminLevel.toUpperCase()}</span>{" "}
              {adminLevel === "adm1" ? "regions" : adminLevel === "adm2" ? "zones" : "woredas"}.
              {" "}ADM2/ADM3 colors inherit their parent region priority.
            </div>
            <div className="px-4 pb-4 text-[11px] leading-relaxed text-muted-foreground">
              Scope covers Oromia, SNNPR (incl. South West Ethiopia Peoples'),
              Gambela and Benishangul-Gumuz — nearly all of Ethiopia's
              remaining moist forest.
            </div>
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
              <DeforestationMap
                selected={selected}
                onSelect={setSelected}
                adminLevel={adminLevel}
                onAdminLevelChange={setAdminLevel}
                weights={weights}
              />
            </Suspense>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Loading map…
            </div>
          )}
        </main>

        <aside className="overflow-y-auto border-l border-border p-5">
          {detail && selected && detailLevel && detailProxies ? (
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
                    {detailLevel} priority
                  </span>
                  <span className="text-sm text-muted-foreground">
                    score {detailScore} / 100
                  </span>
                </div>
              </div>

              <ProxyPanel proxies={detailProxies} weights={weights} total={detailScore} />

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
                <Stat label="AGB carbon" value={`${detail.aboveGroundCarbonTha} tC/ha`} />
                <Stat label="Soil C (0–30cm)" value={`${detail.soilOrganicCarbonTha} tC/ha`} />
                <Stat label="Erosion" value={`${detail.erosionRiskTHaYr} t/ha·yr`} />
                <Stat label="Water stress" value={`${detail.waterStressIndex.toFixed(1)} / 5`} />
                <Stat label="KBA coverage" value={`${Math.round(detail.kbaCoveragePct * 100)}%`} />
                <Stat label="Forest-dependent" value={`${Math.round(detail.forestDependentPct * 100)}%`} />
              </div>

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
                Priority = weighted mean of 5 proxies (sliders, left). Each
                proxy is a 0–100 composite of public datasets — adjust weights
                to reflect the decision you're making (e.g. carbon-finance vs
                biodiversity-led prioritization).
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

function WeightsPanel({
  weights,
  onChange,
}: {
  weights: Weights;
  onChange: (w: Weights) => void;
}) {
  const total =
    weights.suitability +
    weights.carbon +
    weights.biodiversity +
    weights.waterSoil +
    weights.livelihood;
  const reset = () => onChange(DEFAULT_WEIGHTS);
  return (
    <div className="px-4 py-3">
      <div className="mb-2 flex items-baseline justify-between">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Proxy weights
        </div>
        <button
          type="button"
          onClick={reset}
          className="text-[10px] text-muted-foreground underline decoration-dotted hover:text-foreground"
        >
          Reset
        </button>
      </div>
      <div className="space-y-2.5">
        {PROXIES.map((p) => {
          const w = weights[p.key];
          const share = total > 0 ? Math.round((w / total) * 100) : 0;
          return (
            <div key={p.key}>
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span
                    className="inline-block size-2 rounded-sm"
                    style={{ backgroundColor: p.color }}
                  />
                  <span className="font-medium">{p.label}</span>
                </span>
                <span className="tabular-nums text-muted-foreground">{share}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={w}
                onChange={(e) =>
                  onChange({ ...weights, [p.key]: Number(e.target.value) })
                }
                className="mt-1 w-full accent-primary"
                aria-label={`${p.label} weight`}
              />
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
        Weights are normalized to 100%. Move a slider to see the priority
        score, region ranking and map colors update live.
      </p>
    </div>
  );
}

function ProxyPanel({
  proxies,
  weights,
  total,
}: {
  proxies: ProxyScores;
  weights: Weights;
  total: number;
}) {
  const sumW =
    weights.suitability +
    weights.carbon +
    weights.biodiversity +
    weights.waterSoil +
    weights.livelihood;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Priority breakdown
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-semibold tabular-nums">{total}</span>
          <span className="text-[10px] text-muted-foreground">/ 100</span>
        </div>
      </div>
      <div className="mt-2 space-y-1.5">
        {PROXIES.map((p) => {
          const v = proxies[p.key as ProxyKey];
          const share = sumW > 0 ? Math.round((weights[p.key] / sumW) * 100) : 0;
          return (
            <div key={p.key} className="grid grid-cols-[96px_1fr_36px] items-center gap-2">
              <span className="text-[11px]">
                <span className="font-medium">{p.short}</span>{" "}
                <span className="text-[9px] text-muted-foreground/70">({share}%)</span>
              </span>
              <div className="h-1.5 overflow-hidden rounded-sm bg-secondary">
                <div
                  className="h-full"
                  style={{ width: `${v}%`, backgroundColor: p.color }}
                />
              </div>
              <span className="text-right text-[10px] tabular-nums text-muted-foreground">
                {v}
              </span>
              <span className="col-span-3 -mt-0.5 pl-[104px] text-[10px] text-muted-foreground/80">
                {p.description}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FitBreakdown({ sp }: { sp: SpeciesPick }) {
  const b = sp.breakdown;
  const rows: { label: string; value: number; detail: string }[] = [
    {
      label: "Elevation",
      value: b.elevation,
      detail: `site ${b.siteElevation} m · ideal ${sp.elevMin}–${sp.elevMax} m`,
    },
    {
      label: "Rainfall",
      value: b.rainfall,
      detail: `site ${b.siteRainfall} mm · ideal ${sp.rainMin}–${sp.rainMax} mm`,
    },
    {
      label: "Niche",
      value: b.niche,
      detail: b.matchedNiche ? `best match: ${b.matchedNiche.replace("-", " ")}` : "—",
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
