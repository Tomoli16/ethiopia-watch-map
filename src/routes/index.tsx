import { createFileRoute } from "@tanstack/react-router";
import {
  Bird,
  CloudSun,
  Download,
  FileText,
  Layers,
  Mountain,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Sparkles,
  Sprout,
  Trees,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import {
  DEFAULT_WEIGHTS,
  PROXIES,
  analysisUnitById,
  analysisUnitsForLevel,
  biodiversityRecoveryEvidenceScoreForAdm2,
  climateSampleForAdm2,
  colorForScore,
  gbifAreaNormalizedEvidenceScoreForAdm2,
  gbifBiodiversityForAdm2,
  gbifBiodiversityForRegion,
  gfwTreeCoverLossForAdm2,
  landCoverHabitatContextScoreForAdm2,
  landCoverForAdm2,
  livelihoodPopulationForAdm2,
  livelihoodPopulationForRegion,
  priorityLevel,
  priorityScoreForUnit,
  proxySourceLevelForUnit,
  proxyScoresForUnit,
  soilGridsSampleForAdm2,
  soilGridsSampleForRegion,
  terrainSampleForAdm2,
  type AnalysisLevel,
  type AnalysisUnit,
  type ProxyKey,
  type ProxyScores,
  type Weights,
} from "@/lib/deforestation-data";
import type { AdminLevel } from "@/components/DeforestationMap";

const PROXY_ICONS: Record<ProxyKey, LucideIcon> = {
  ecologicalRestorationPotential: Sprout,
  biodiversityRecoveryValue: Bird,
  livelihoodImpact: UsersRound,
};

function sourceLevelLabel(level: ReturnType<typeof proxySourceLevelForUnit>) {
  if (level === "adm2-aggregate") return "ADM2 AVG";
  return level.toUpperCase();
}

function sourceIsInherited(level: ReturnType<typeof proxySourceLevelForUnit>, unitLevel: AnalysisLevel) {
  return level !== unitLevel && level !== "adm2-aggregate";
}

const DeforestationMap = lazy(() =>
  import("@/components/DeforestationMap").then((m) => ({ default: m.DeforestationMap })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Southwest Ethiopia · Real Data Priority Map" },
      {
        name: "description",
        content:
          "Interactive Ethiopia restoration priority map using fetched GFW/UMD, SoilGrids, GBIF, ESA WorldCover and HDX/OCHA ADM3 population data.",
      },
      { property: "og:title", content: "Southwest Ethiopia · Real Data Priority Map" },
      {
        property: "og:description",
        content:
          "Prioritize focus regions with real GFW/UMD loss, SoilGrids, GBIF occurrence, ESA WorldCover safeguards and HDX/OCHA ADM3 population inputs.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [selected, setSelected] = useState<string | null>(analysisUnitsForLevel("adm2")[0]?.id ?? "Oromia");
  const [mounted, setMounted] = useState(false);
  const [adminLevel, setAdminLevel] = useState<AdminLevel>("adm2");
  const [weights, setWeights] = useState<Weights>(DEFAULT_WEIGHTS);
  const [rankingOpen, setRankingOpen] = useState(true);
  const [detailOpen, setDetailOpen] = useState(true);
  const [briefingOpen, setBriefingOpen] = useState(false);
  useEffect(() => setMounted(true), []);

  const analysisLevel: AnalysisLevel = adminLevel === "adm1" ? "adm1" : "adm2";
  const selectedUnit = analysisUnitById(selected ?? undefined);
  const ranked = analysisUnitsForLevel(analysisLevel)
    .map((unit) => ({
      ...unit,
      score: priorityScoreForUnit(unit, weights),
      proxies: proxyScoresForUnit(unit),
    }))
    .sort((a, b) => b.score - a.score);

  useEffect(() => {
    const current = analysisUnitById(selected ?? undefined);
    if (analysisLevel === "adm1" && current?.level === "adm2") {
      setSelected(current.region);
      return;
    }
    if (analysisLevel === "adm2" && current?.level !== "adm2") {
      const region = current?.region ?? selected ?? "Oromia";
      const firstAdm2 = analysisUnitsForLevel("adm2").find((unit) => unit.region === region);
      setSelected(firstAdm2?.id ?? null);
    }
  }, [analysisLevel, selected]);

  const detail = selectedUnit;
  const detailScore = detail ? priorityScoreForUnit(detail, weights) : 0;
  const detailLevel = detail ? priorityLevel(detailScore) : null;
  const detailProxies = detail ? proxyScoresForUnit(detail) : null;
  const detailSoilGrids =
    detail?.level === "adm2"
      ? soilGridsSampleForAdm2(detail.id) ?? soilGridsSampleForRegion(detail.region)
      : soilGridsSampleForRegion(detail?.region);
  const detailGbif =
    detail?.level === "adm2"
      ? gbifBiodiversityForAdm2(detail.id) ?? gbifBiodiversityForRegion(detail.region)
      : gbifBiodiversityForRegion(detail?.region);
  const detailLivelihood =
    detail?.level === "adm2"
      ? livelihoodPopulationForAdm2(detail.id)
      : livelihoodPopulationForRegion(detail?.region);
  const detailClimate = detail?.level === "adm2" ? climateSampleForAdm2(detail.id) : undefined;
  const detailTerrain = detail?.level === "adm2" ? terrainSampleForAdm2(detail.id) : undefined;
  const detailGfw = detail?.level === "adm2" ? gfwTreeCoverLossForAdm2(detail.id) : undefined;
  const detailLandCover = detail?.level === "adm2" ? landCoverForAdm2(detail.id) : undefined;
  const detailGbifEvidenceScore =
    detail?.level === "adm2"
      ? biodiversityRecoveryEvidenceScoreForAdm2(detail.id) ?? detailGbif?.occurrenceEvidenceScore
      : detailGbif?.occurrenceEvidenceScore;
  const detailGbifDensityScore = detail?.level === "adm2" ? gbifAreaNormalizedEvidenceScoreForAdm2(detail.id) : null;
  const detailHabitatScore = detail?.level === "adm2" ? landCoverHabitatContextScoreForAdm2(detail.id) : null;
  const detailGbifDensity =
    detail?.level === "adm2" && detailGbif && detailLandCover?.areaKm2
      ? detailGbif.allOccurrences / detailLandCover.areaKm2
      : null;
  const detailSummary =
    detail?.level === "adm2" && detailProxies
      ? buildAdm2Summary({
          unit: detail,
          score: detailScore,
          proxies: detailProxies,
          gfw: detailGfw,
          landCover: detailLandCover,
          livelihood: detailLivelihood,
          climate: detailClimate,
          terrain: detailTerrain,
          gbifDensityScore: detailGbifDensityScore,
          habitatScore: detailHabitatScore,
        })
      : null;
  const handleAdminLevelChange = (level: AdminLevel) => {
    const current = analysisUnitById(selected ?? undefined);
    setAdminLevel(level);
    if (level === "adm1" && current?.level === "adm2") {
      setSelected(current.region);
    }
    if (level !== "adm1" && current?.level !== "adm2") {
      const firstAdm2 = analysisUnitsForLevel("adm2").find((unit) => unit.region === (current?.region ?? selected));
      if (firstAdm2) setSelected(firstAdm2.id);
    }
  };
  const briefing = buildProjectBriefing(weights);

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border bg-background/95 px-5 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex shrink-0 items-center rounded-md border border-emerald-500/25 bg-white px-3 py-1 shadow-sm">
              <img
                src="/brand/ecoimpacto-logo-transparent.png"
                alt="EcoImpacto"
                className="h-11 w-auto object-contain"
              />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold tracking-tight">
                Ethiopia Watch
              </h1>
              <p className="truncate text-xs text-muted-foreground">
                Restoration priority planner
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setBriefingOpen(true)}
              className="inline-flex h-8 items-center gap-2 rounded-md border border-border bg-card px-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
              title="Generate project briefing"
            >
              <FileText className="size-4" aria-hidden />
              Briefing
            </button>
            <div className="flex overflow-hidden rounded-md border border-border bg-card">
              <button
                type="button"
                onClick={() => setRankingOpen((open) => !open)}
                className="inline-flex size-8 items-center justify-center border-r border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-pressed={rankingOpen}
                title={rankingOpen ? "Hide ranking sidebar" : "Show ranking sidebar"}
              >
                {rankingOpen ? <PanelLeftClose className="size-4" /> : <PanelLeftOpen className="size-4" />}
              </button>
              <button
                type="button"
                onClick={() => setDetailOpen((open) => !open)}
                className="inline-flex size-8 items-center justify-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-pressed={detailOpen}
                title={detailOpen ? "Hide detail sidebar" : "Show detail sidebar"}
              >
                {detailOpen ? <PanelRightClose className="size-4" /> : <PanelRightOpen className="size-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className="grid flex-1 min-h-0"
        style={{
          gridTemplateColumns: `${rankingOpen ? "320px" : "0px"} minmax(0, 1fr) ${detailOpen ? "360px" : "0px"}`,
        }}
      >
        <aside
          className={`flex flex-col overflow-hidden border-r border-border transition-[opacity] duration-150 ${
            rankingOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!rankingOpen}
        >
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="flex items-baseline justify-between gap-3 px-4 py-3">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Priority ranking
              </div>
              <div className="text-[10px] text-muted-foreground">
                {analysisLevel === "adm2" ? `${ranked.length} ADM2` : `${ranked.length} ADM1`}
              </div>
            </div>
            <ul>
              {ranked.map((r) => {
                const active = r.id === selected;
                return (
                  <li key={r.id}>
                    <button
                      onClick={() => setSelected(r.id)}
                      className={`flex w-full items-center justify-between gap-3 border-l-2 px-4 py-3 text-left transition-colors hover:bg-secondary ${
                        active ? "border-primary bg-secondary" : "border-transparent"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">{r.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {r.level === "adm2" ? `${r.region} · ` : ""}
                          ERP {r.proxies.ecologicalRestorationPotential} · BRV {r.proxies.biodiversityRecoveryValue} · LI{" "}
                          {r.proxies.livelihoodImpact}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block size-2 rounded-full"
                          style={{ backgroundColor: colorForScore(r.score) }}
                        />
                        <span className="tabular-nums text-sm font-semibold">{r.score}</span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="shrink-0 border-t border-border bg-background/95 shadow-[0_-10px_24px_rgba(0,0,0,0.18)] backdrop-blur">
            <WeightsPanel weights={weights} onChange={setWeights} />
          </div>
        </aside>

        <main className="relative min-h-0">
          <div className="pointer-events-none absolute left-3 top-3 z-[500] flex gap-2">
            {!rankingOpen ? (
              <button
                type="button"
                onClick={() => setRankingOpen(true)}
                className="pointer-events-auto inline-flex h-9 items-center gap-2 rounded-md border border-border bg-card/95 px-3 text-xs font-medium shadow-sm backdrop-blur transition-colors hover:bg-secondary"
                title="Show ranking sidebar"
              >
                <PanelLeftOpen className="size-4" />
                Ranking
              </button>
            ) : null}
            {!detailOpen ? (
              <button
                type="button"
                onClick={() => setDetailOpen(true)}
                className="pointer-events-auto inline-flex h-9 items-center gap-2 rounded-md border border-border bg-card/95 px-3 text-xs font-medium shadow-sm backdrop-blur transition-colors hover:bg-secondary"
                title="Show detail sidebar"
              >
                <PanelRightOpen className="size-4" />
                Details
              </button>
            ) : null}
          </div>
          {mounted ? (
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  Loading map...
                </div>
              }
            >
              <DeforestationMap
                selected={selected}
                onSelect={setSelected}
                adminLevel={adminLevel}
                onAdminLevelChange={handleAdminLevelChange}
                weights={weights}
                layoutKey={`${rankingOpen}-${detailOpen}`}
              />
            </Suspense>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Loading map...
            </div>
          )}
        </main>

        <aside
          className={`overflow-y-auto border-l border-border p-5 transition-[opacity] duration-150 ${
            detailOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!detailOpen}
        >
          {detail && selected && detailLevel && detailProxies ? (
            <div className="space-y-5">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Selected region
                </div>
                <h2 className="mt-1 text-2xl font-semibold">{detail.name}</h2>
                {detail.level === "adm2" ? (
                  <div className="mt-1 text-xs text-muted-foreground">{detail.region} · ADM2 zone</div>
                ) : null}
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-medium uppercase tracking-wider"
                    style={{ backgroundColor: colorForScore(detailScore), color: "#0b0f0c" }}
                  >
                    {detailLevel} priority
                  </span>
                  <span className="text-sm text-muted-foreground">
                    score {detailScore} / 100
                  </span>
                </div>
              </div>

              {detailSummary ? <AiSummaryCard summary={detailSummary} /> : null}

              <ProxyPanel
                proxies={detailProxies}
                weights={weights}
                total={detailScore}
                unit={detail}
              />

              {detailLandCover ? (
                <div className="rounded-md border border-border bg-card/50 p-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      <Layers className="size-3.5" aria-hidden />
                      <span>ESA WorldCover safeguard</span>
                      <SourceBadge inherited={false} label="ADM2" />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      safeguard {detailLandCover.landUseSafeguardScore}/100
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <Stat label="Cropland" value={`${Math.round(detailLandCover.croplandShare * 100)}%`} />
                    <Stat label="Built-up" value={`${Math.round(detailLandCover.builtUpShare * 100)}%`} />
                    <Stat label="Tree cover" value={`${Math.round(detailLandCover.treeCoverShare * 100)}%`} />
                    <Stat label="Open veg." value={`${Math.round(detailLandCover.openVegetationShare * 100)}%`} />
                    <Stat label="Water/wet." value={`${Math.round(detailLandCover.waterWetlandShare * 100)}%`} />
                    <Stat
                      label="Samples"
                      value={`${detailLandCover.samples.length} (${detailLandCover.sampleGridSize}x${detailLandCover.sampleGridSize})`}
                    />
                  </div>
                  <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                    Real ESA WorldCover 2021 land-cover classes sampled with an
                    area-scaled ADM2 grid. This is a separate land-use safeguard, not a
                    fourth weighted priority pillar. Low values warn about
                    cropland, built-up or water/wetland conflicts.
                  </p>
                </div>
              ) : detail?.level === "adm2" ? (
                <MissingData label="ESA WorldCover safeguard" />
              ) : null}

              {detailSoilGrids ? (
                <div className="rounded-md border border-border bg-card/50 p-3">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <Sprout className="size-3.5" aria-hidden />
                    <span>SoilGrids ERP input</span>
                    <SourceBadge
                      inherited={sourceIsInherited(
                        proxySourceLevelForUnit(detail, "ecologicalRestorationPotential"),
                        detail.level,
                      )}
                      label={sourceLevelLabel(proxySourceLevelForUnit(detail, "ecologicalRestorationPotential"))}
                    />
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <Stat label="pH H2O" value={detailSoilGrids.phH2O.toFixed(1)} />
                    <Stat label="Soil C" value={`${detailSoilGrids.soilOrganicCarbonGkg.toFixed(1)} g/kg`} />
                    <Stat label="Clay" value={`${detailSoilGrids.clayPct.toFixed(1)}%`} />
                    <Stat label="Sand" value={`${detailSoilGrids.sandPct.toFixed(1)}%`} />
                    <Stat label="Silt" value={`${detailSoilGrids.siltPct.toFixed(1)}%`} />
                    <Stat label="Depth" value={detailSoilGrids.depthRangeCm} />
                  </div>
                  <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                    Real ISRIC SoilGrids v2.0 centroid sample, depth-weighted
                    across 0-30 cm. {proxySourceLevelForUnit(detail, "ecologicalRestorationPotential") === "adm2" ? "This ERP input is ADM2-specific." : detail.level === "adm2" ? "ADM2 currently inherits this ERP input from its parent ADM1 region." : "ADM1 ERP is aggregated from the mapped ADM2 zone scores."}
                  </p>
                </div>
              ) : (
                <MissingData label="SoilGrids ERP input" />
              )}

              {detailGbif ? (
                <div className="rounded-md border border-border bg-card/50 p-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      <Bird className="size-3.5" aria-hidden />
                      <span>GBIF BRV input</span>
                      <SourceBadge
                        inherited={sourceIsInherited(
                          proxySourceLevelForUnit(detail, "biodiversityRecoveryValue"),
                          detail.level,
                        )}
                        label={sourceLevelLabel(proxySourceLevelForUnit(detail, "biodiversityRecoveryValue"))}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      evidence {detailGbifEvidenceScore}/100
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {detailGbifDensity === null ? null : (
                      <Stat label="Records/km2" value={detailGbifDensity.toFixed(2)} />
                    )}
                    {detailGbifDensityScore === null ? null : (
                      <Stat label="GBIF dens." value={`${detailGbifDensityScore}/100`} />
                    )}
                    {detailHabitatScore === null ? null : (
                      <Stat label="ESA habitat" value={`${detailHabitatScore}/100`} />
                    )}
                    <Stat label="All records" value={detailGbif.allOccurrences.toLocaleString()} />
                    <Stat label="Plants" value={detailGbif.plantOccurrences.toLocaleString()} />
                    <Stat label="Birds" value={detailGbif.birdOccurrences.toLocaleString()} />
                  </div>
                  {"topPlantSpecies" in detailGbif && "topBirdSpecies" in detailGbif ? (
                    <div className="mt-3 grid grid-cols-2 gap-3 text-[11px]">
                      <SpeciesList title="Top plants" species={detailGbif.topPlantSpecies} />
                      <SpeciesList title="Top birds" species={detailGbif.topBirdSpecies} />
                    </div>
                  ) : null}
                  <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                    Real GBIF coordinated occurrences, queried by {proxySourceLevelForUnit(detail, "biodiversityRecoveryValue") === "adm2" ? "ADM2 bounding box and normalized by ADM2 area. ADM2 BRV blends this GBIF density evidence with ESA WorldCover habitat context." : "ADM1 bounding box."} {proxySourceLevelForUnit(detail, "biodiversityRecoveryValue") === "adm2" ? "This BRV input is ADM2-specific." : detail.level === "adm2" ? "ADM2 currently inherits this BRV input from its parent ADM1 region." : "ADM1 BRV is area-weighted from the mapped ADM2 zone scores and is"} not yet corrected for observer or road-access bias.
                  </p>
                </div>
              ) : (
                <MissingData label="GBIF BRV input" />
              )}

              {detailClimate ? (
                <div className="rounded-md border border-border bg-card/50 p-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      <CloudSun className="size-3.5" aria-hidden />
                      <span>NASA POWER climate input</span>
                      <SourceBadge inherited={false} label="ADM2" />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      suitability {detailClimate.climateSuitabilityScore}/100
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <Stat label="Rainfall" value={`${detailClimate.annualRainfallMm.toLocaleString()} mm/yr`} />
                    <Stat label="Temp." value={`${detailClimate.annualTemperatureC.toFixed(1)} C`} />
                    <Stat label="Elevation" value={`${detailClimate.elevationM.toFixed(0)} m`} />
                  </div>
                  <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                    Real NASA POWER MERRA2 20-year climatology at the ADM2 centroid.
                    Used with SoilGrids and terrain relief in ADM2 ERP.
                  </p>
                </div>
              ) : null}

              {detailTerrain ? (
                <div className="rounded-md border border-border bg-card/50 p-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      <Mountain className="size-3.5" aria-hidden />
                      <span>Open-Meteo terrain input</span>
                      <SourceBadge inherited={false} label="ADM2" />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      relief {detailTerrain.terrainReliefScore}/100
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <Stat label="Range" value={`${detailTerrain.elevationRangeM.toLocaleString()} m`} />
                    <Stat label="Max slope" value={`${detailTerrain.maxSlopePercent.toFixed(1)}%`} />
                    <Stat label="Mean slope" value={`${detailTerrain.meanSlopePercent.toFixed(1)}%`} />
                  </div>
                  <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                    Real Open-Meteo elevation samples at the ADM2 centroid plus
                    north/south/east/west points. Used in ADM2 ERP as a
                    lightweight terrain relief proxy, not full DEM zonal statistics.
                  </p>
                </div>
              ) : null}

              {detailGfw ? (
                <div className="rounded-md border border-border bg-card/50 p-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      <Trees className="size-3.5" aria-hidden />
                      <span>GFW/UMD loss input</span>
                      <SourceBadge inherited={false} label="ADM2" />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      pressure {detailGfw.degradationPressureScore}/100
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <Stat label="Total loss" value={`${detailGfw.totalLossHa.toLocaleString()} ha`} />
                    <Stat label="Loss dens." value={`${detailGfw.lossDensityHaPerKm2.toFixed(2)} ha/km2`} />
                    <Stat label="Recent loss" value={`${detailGfw.recentLossHa.toLocaleString()} ha`} />
                    <Stat label="Recent share" value={`${Math.round(detailGfw.recentLossShare * 100)}%`} />
                    <Stat label="Canopy" value={`${detailGfw.canopyCoverThreshold}%`} />
                    <Stat label="Driver" value={detailGfw.dominantDriver} />
                  </div>
                  <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                    Real Global Forest Watch / UMD tree-cover loss by driver.
                    Used in ADM2 ERP as degradation pressure: higher historical
                    loss density means higher restoration priority.
                  </p>
                </div>
              ) : detail?.level === "adm2" ? (
                <MissingData label="GFW/UMD loss input" />
              ) : null}

              {detailLivelihood ? (
                <div className="rounded-md border border-border bg-card/50 p-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      <UsersRound className="size-3.5" aria-hidden />
                      <span>HDX/OCHA LI input</span>
                      <SourceBadge inherited={false} label={detail.level.toUpperCase()} />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      evidence {detailLivelihood.livelihoodEvidenceScore}/100
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <Stat label="ADM3 units" value={detailLivelihood.admin3Count.toLocaleString()} />
                    <Stat label="Population" value={detailLivelihood.populationTotal.toLocaleString()} />
                    <Stat label="Density" value={`${detailLivelihood.densityPerKm2.toFixed(1)} /km2`} />
                    <Stat label="Children <15" value={`${Math.round(detailLivelihood.childShare * 100)}%`} />
                    <Stat label="Women" value={`${Math.round(detailLivelihood.femaleShare * 100)}%`} />
                    <Stat label="Dependency" value={detailLivelihood.dependencyRatio.toFixed(2)} />
                  </div>
                  <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                    Real HDX/OCHA ADM3 2022 projected population statistics,
                    aggregated to {detail.level === "adm2" ? "this ADM2 zone" : "the app's focus regions"}. The LI score uses only this fetched population aggregation.
                  </p>
                </div>
              ) : (
                <MissingData label="HDX/OCHA LI input" />
              )}

              <div className="rounded-md border border-border bg-card/50 p-3 text-xs text-muted-foreground">
                Priority = weighted mean of the available real-source proxy
                scores above. Missing datasets contribute 0 until fetched and
                wired in, so no placeholder values are silently used.
                {detail.level === "adm2"
                  ? " ADM2 proxy scores are scaled across the currently mapped ADM2 zones, so the ranking shows relative priority instead of compressed raw suitability values."
                  : ""}
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Select a region on the map or in the list to inspect.
            </div>
          )}
        </aside>
      </div>
      {briefingOpen ? (
        <BriefingModal
          briefing={briefing}
          onClose={() => setBriefingOpen(false)}
          onDownload={() => downloadBriefingPdf(briefing)}
        />
      ) : null}
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

interface BriefingZone {
  rank: number;
  id: string;
  name: string;
  region: string;
  score: number;
  proxies: ProxyScores;
  gfwLossHa: number | null;
  croplandShare: number | null;
  populationDensity: number | null;
}

interface ProjectBriefing {
  title: string;
  subtitle: string;
  generatedAt: string;
  weights: Weights;
  keyFindings: string[];
  callsToAction: { title: string; detail: string }[];
  topZones: BriefingZone[];
  caveats: string[];
}

function buildProjectBriefing(weights: Weights): ProjectBriefing {
  const zones = analysisUnitsForLevel("adm2")
    .map((unit) => {
      const proxies = proxyScoresForUnit(unit);
      const gfw = gfwTreeCoverLossForAdm2(unit.id);
      const landCover = landCoverForAdm2(unit.id);
      const livelihood = livelihoodPopulationForAdm2(unit.id);
      return {
        id: unit.id,
        name: unit.name,
        region: unit.region,
        score: priorityScoreForUnit(unit, weights),
        proxies,
        gfwLossHa: gfw?.totalLossHa ?? null,
        croplandShare: landCover?.croplandShare ?? null,
        populationDensity: livelihood?.densityPerKm2 ?? null,
      };
    })
    .sort((a, b) => b.score - a.score);
  const topZones = zones.slice(0, 8).map((zone, index) => ({ ...zone, rank: index + 1 }));
  const topFive = topZones.slice(0, 5);
  const gfwLeader = [...zones]
    .filter((zone) => zone.gfwLossHa !== null)
    .sort((a, b) => (b.gfwLossHa ?? 0) - (a.gfwLossHa ?? 0))[0];
  const safeguardHits = topFive.filter(
    (zone) => (zone.croplandShare ?? 0) >= 0.35 || (zone.populationDensity ?? 0) >= 120,
  );

  return {
    title: "Southwest Ethiopia Restoration Priority Briefing",
    subtitle: "Generated from current ADM2 scores, weights and fetched evidence layers.",
    generatedAt: new Date().toLocaleString(),
    weights,
    keyFindings: [
      `The current top ADM2 priorities are ${topFive.map((zone) => `${zone.name} (${zone.score})`).join(", ")}.`,
      gfwLeader
        ? `The strongest GFW/UMD historical tree-cover-loss signal is ${gfwLeader.name}, ${gfwLeader.region}, with ${Math.round(gfwLeader.gfwLossHa ?? 0).toLocaleString()} ha total loss.`
        : "GFW/UMD tree-cover-loss evidence is not available in the current briefing input.",
      safeguardHits.length > 0
        ? `${safeguardHits.length} of the top 5 zones need early safeguard screening for cropland or population pressure.`
        : "The top 5 zones do not show a major sampled cropland or population-density warning, but field validation is still required.",
      `Current score weights are ERP ${weights.ecologicalRestorationPotential}, BRV ${weights.biodiversityRecoveryValue}, LI ${weights.livelihoodImpact}.`,
    ],
    callsToAction: [
      {
        title: "1. Validate the top-ranked ADM2 zones in the field",
        detail:
          "Start with the top 5 zones and verify degradation, land tenure, access, and local restoration demand before selecting exact planting or assisted-regeneration sites.",
      },
      {
        title: "2. Run safeguard exclusions before any site commitment",
        detail:
          "Use ESA WorldCover, local land-use knowledge, and community checks to exclude cropland, settlements, wetlands, and livelihood-critical areas from intervention polygons.",
      },
      {
        title: "3. Prioritize watershed and erosion-sensitive opportunity areas",
        detail:
          "Within high-priority zones, focus the technical design on degraded slopes, riparian buffers, and areas where restoration can reduce erosion and downstream risk.",
      },
      {
        title: "4. Turn the ranking into an implementation shortlist",
        detail:
          "For each shortlisted zone, prepare a one-page field package: score rationale, key evidence layers, likely safeguards, target kebeles/woredas, and data gaps.",
      },
      {
        title: "5. Close evidence gaps before final budgeting",
        detail:
          "Replace sampled proxies with zonal raster summaries where possible, especially full DEM slope, WorldPop raster density, and protected-area or corridor adjacency.",
      },
    ],
    topZones,
    caveats: [
      "Scores are relative to the currently mapped focus ADM2 zones and current slider weights.",
      "ESA WorldCover and terrain are sampled proxies, not final hectare-level exclusion maps.",
      "GBIF observations are not corrected for observer or road-access sampling bias.",
      "The briefing supports planning and prioritization; it is not a final restoration prescription.",
    ],
  };
}

function BriefingModal({
  briefing,
  onClose,
  onDownload,
}: {
  briefing: ProjectBriefing;
  onClose: () => void;
  onDownload: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/70 p-6">
      <div className="flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
              <FileText className="size-4" aria-hidden />
              Project Briefing
            </div>
            <h2 className="mt-1 text-xl font-semibold">{briefing.title}</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {briefing.subtitle} Generated {briefing.generatedAt}.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex h-8 items-center gap-2 rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Download className="size-4" aria-hidden />
              Download PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Close briefing"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto px-5 py-4">
          <section>
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Key findings</h3>
            <ul className="mt-2 space-y-2 text-sm">
              {briefing.keyFindings.map((finding) => (
                <li key={finding} className="rounded-md bg-secondary/50 px-3 py-2">
                  {finding}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-5">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Calls to action</h3>
            <div className="mt-2 grid gap-2">
              {briefing.callsToAction.map((cta) => (
                <div key={cta.title} className="rounded-md border border-border bg-background/50 p-3">
                  <div className="text-sm font-semibold">{cta.title}</div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{cta.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-5">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Top ADM2 shortlist</h3>
            <div className="mt-2 overflow-hidden rounded-md border border-border">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary/70 text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 font-medium">Rank</th>
                    <th className="px-3 py-2 font-medium">Zone</th>
                    <th className="px-3 py-2 font-medium">RPS</th>
                    <th className="px-3 py-2 font-medium">ERP/BRV/LI</th>
                    <th className="px-3 py-2 font-medium">GFW loss</th>
                    <th className="px-3 py-2 font-medium">Safeguard</th>
                  </tr>
                </thead>
                <tbody>
                  {briefing.topZones.map((zone) => (
                    <tr key={zone.id} className="border-t border-border">
                      <td className="px-3 py-2 tabular-nums">{zone.rank}</td>
                      <td className="px-3 py-2">
                        <div className="font-medium">{zone.name}</div>
                        <div className="text-[10px] text-muted-foreground">{zone.region}</div>
                      </td>
                      <td className="px-3 py-2 font-semibold tabular-nums">{zone.score}</td>
                      <td className="px-3 py-2 tabular-nums">
                        {zone.proxies.ecologicalRestorationPotential}/{zone.proxies.biodiversityRecoveryValue}/
                        {zone.proxies.livelihoodImpact}
                      </td>
                      <td className="px-3 py-2 tabular-nums">
                        {zone.gfwLossHa === null ? "n/a" : `${Math.round(zone.gfwLossHa).toLocaleString()} ha`}
                      </td>
                      <td className="px-3 py-2">
                        {zone.croplandShare === null && zone.populationDensity === null
                          ? "n/a"
                          : `${zone.croplandShare === null ? "?" : `${Math.round(zone.croplandShare * 100)}% crop`} · ${
                              zone.populationDensity === null ? "?" : `${zone.populationDensity.toFixed(0)}/km2`
                            }`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-5">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Caveats</h3>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-xs leading-relaxed text-muted-foreground">
              {briefing.caveats.map((caveat) => (
                <li key={caveat}>{caveat}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

function briefingPdfLines(briefing: ProjectBriefing): string[] {
  return [
    briefing.title,
    briefing.subtitle,
    `Generated: ${briefing.generatedAt}`,
    "",
    "Key findings",
    ...briefing.keyFindings.map((finding) => `- ${finding}`),
    "",
    "Calls to action",
    ...briefing.callsToAction.flatMap((cta) => [cta.title, cta.detail]),
    "",
    "Top ADM2 shortlist",
    ...briefing.topZones.map(
      (zone) =>
        `${zone.rank}. ${zone.name}, ${zone.region} | RPS ${zone.score} | ERP/BRV/LI ${zone.proxies.ecologicalRestorationPotential}/${zone.proxies.biodiversityRecoveryValue}/${zone.proxies.livelihoodImpact} | GFW ${zone.gfwLossHa === null ? "n/a" : `${Math.round(zone.gfwLossHa)} ha`}`,
    ),
    "",
    "Caveats",
    ...briefing.caveats.map((caveat) => `- ${caveat}`),
  ];
}

function wrapPdfLine(line: string, width = 92): string[] {
  const clean = line.replace(/[^\x20-\x7E]/g, " ");
  if (clean.length <= width) return [clean];
  const words = clean.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (`${current} ${word}`.trim().length > width) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = `${current} ${word}`.trim();
    }
  }
  if (current) lines.push(current);
  return lines;
}

function escapePdfText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function createTextPdf(lines: string[]): Blob {
  const pageTop = 760;
  const lineHeight = 14;
  const linesPerPage = 48;
  const wrapped = lines.flatMap((line) => (line ? wrapPdfLine(line) : [""]));
  const pages: string[][] = [];
  for (let i = 0; i < wrapped.length; i += linesPerPage) pages.push(wrapped.slice(i, i + linesPerPage));

  const objects: string[] = [];
  const addObject = (body: string) => {
    objects.push(body);
    return objects.length;
  };

  const catalogId = addObject("<< /Type /Catalog /Pages 2 0 R >>");
  const pagesId = addObject("");
  const fontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const pageIds: number[] = [];

  pages.forEach((pageLines) => {
    const text = [
      "BT",
      "/F1 11 Tf",
      `50 ${pageTop} Td`,
      `${lineHeight} TL`,
      ...pageLines.map((line) => `(${escapePdfText(line)}) Tj T*`),
      "ET",
    ].join("\n");
    const contentId = addObject(`<< /Length ${text.length} >>\nstream\n${text}\nendstream`);
    const pageId = addObject(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`,
    );
    pageIds.push(pageId);
  });

  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${
    pageIds.length
  } >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((body, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Blob([pdf], { type: "application/pdf" });
}

function downloadBriefingPdf(briefing: ProjectBriefing) {
  const blob = createTextPdf(briefingPdfLines(briefing));
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ethiopia-restoration-priority-briefing.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

interface Adm2Summary {
  headline: string;
  body: string;
  focus: string;
  caution: string;
  badges: string[];
}

function strongestProxy(proxies: ProxyScores) {
  return PROXIES.map((proxy) => ({
    label: proxy.short,
    value: proxies[proxy.key],
  })).sort((a, b) => b.value - a.value)[0];
}

function buildAdm2Summary({
  unit,
  score,
  proxies,
  gfw,
  landCover,
  livelihood,
  climate,
  terrain,
  gbifDensityScore,
  habitatScore,
}: {
  unit: AnalysisUnit;
  score: number;
  proxies: ProxyScores;
  gfw?: ReturnType<typeof gfwTreeCoverLossForAdm2>;
  landCover?: ReturnType<typeof landCoverForAdm2>;
  livelihood?: ReturnType<typeof livelihoodPopulationForAdm2>;
  climate?: ReturnType<typeof climateSampleForAdm2>;
  terrain?: ReturnType<typeof terrainSampleForAdm2>;
  gbifDensityScore: number | null;
  habitatScore: number | null;
}): Adm2Summary {
  const strongest = strongestProxy(proxies);
  const priority =
    score >= 70 ? "very high" : score >= 55 ? "high" : score >= 40 ? "medium" : "lower";
  const gfwPart = gfw
    ? `GFW reports ${Math.round(gfw.totalLossHa).toLocaleString()} ha tree-cover loss, mostly ${gfw.dominantDriver.toLowerCase()}, with ${Math.round(gfw.recentLossHa).toLocaleString()} ha since 2015.`
    : "GFW tree-cover-loss evidence is not available for this zone yet.";
  const ecologySignal = [
    climate ? `climate suitability ${climate.climateSuitabilityScore}/100` : null,
    terrain ? `terrain relief ${terrain.terrainReliefScore}/100` : null,
    habitatScore !== null ? `ESA habitat context ${habitatScore}/100` : null,
  ]
    .filter(Boolean)
    .join(", ");
  const safeguardFlags = [
    landCover && landCover.croplandShare >= 0.35 ? `${Math.round(landCover.croplandShare * 100)}% cropland` : null,
    landCover && landCover.builtUpShare >= 0.03 ? `${Math.round(landCover.builtUpShare * 100)}% built-up` : null,
    livelihood && livelihood.densityPerKm2 >= 120 ? `${livelihood.densityPerKm2.toFixed(0)} people/km2` : null,
  ].filter(Boolean);
  const caution =
    safeguardFlags.length > 0
      ? `Treat as targeted restoration, not broad planting: ${safeguardFlags.join(", ")} require local exclusion checks.`
      : "No major land-use safeguard warning stands out from the current sampled inputs, but field validation is still needed.";
  const biodiversity =
    gbifDensityScore !== null
      ? `Biodiversity evidence is ${gbifDensityScore}/100 from GBIF density${habitatScore !== null ? ` and ${habitatScore}/100 from ESA habitat context` : ""}.`
      : "Biodiversity evidence is inherited or missing at this level.";

  return {
    headline: `${unit.name} has ${priority} restoration priority, driven most by ${strongest.label} (${strongest.value}/100).`,
    body: `${gfwPart} ${ecologySignal ? `The biophysical context adds ${ecologySignal}.` : ""} ${biodiversity}`,
    focus:
      strongest.label === "LI"
        ? "Best next use: screen community and livelihood constraints first, then pick smaller restoration sites."
        : strongest.label === "BRV"
          ? "Best next use: prioritize corridor or habitat-recovery opportunities, then verify land-use conflicts."
          : "Best next use: shortlist degraded and erosion-sensitive sites, then remove cropland, settlement and wetland conflicts.",
    caution,
    badges: [
      `RPS ${score}/100`,
      `ERP ${proxies.ecologicalRestorationPotential}`,
      `BRV ${proxies.biodiversityRecoveryValue}`,
      `LI ${proxies.livelihoodImpact}`,
    ],
  };
}

function AiSummaryCard({ summary }: { summary: Adm2Summary }) {
  return (
    <div className="rounded-md border border-primary/25 bg-primary/5 p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
          <Sparkles className="size-3.5" aria-hidden />
          <span>AI Summary</span>
        </div>
        <div className="flex flex-wrap justify-end gap-1">
          {summary.badges.map((badge) => (
            <span key={badge} className="rounded-sm bg-background/80 px-1.5 py-0.5 text-[9px] font-semibold text-muted-foreground">
              {badge}
            </span>
          ))}
        </div>
      </div>
      <p className="text-sm font-medium leading-snug">{summary.headline}</p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{summary.body}</p>
      <div className="mt-3 grid gap-2 text-[11px] leading-relaxed">
        <div className="rounded-sm bg-secondary/50 px-2 py-1.5 text-foreground/85">{summary.focus}</div>
        <div className="rounded-sm bg-amber-500/10 px-2 py-1.5 text-amber-200">{summary.caution}</div>
      </div>
    </div>
  );
}

function MissingData({ label }: { label: string }) {
  return (
    <div className="rounded-md border border-border bg-card/50 p-3">
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        No fetched real dataset is available for this region yet.
      </p>
    </div>
  );
}

function SourceBadge({
  inherited,
  label,
}: {
  inherited: boolean;
  label?: string;
}) {
  return (
    <span
      className={`rounded-sm px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
        inherited ? "bg-amber-500/15 text-amber-300" : "bg-emerald-500/15 text-emerald-300"
      }`}
    >
      {inherited ? `Inherited ${label ?? "ADM1"}` : label ?? "Native"}
    </span>
  );
}

function SpeciesList({
  title,
  species,
}: {
  title: string;
  species: { canonicalName: string | null; scientificName: string; count: number }[];
}) {
  return (
    <div>
      <div className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      <ul className="space-y-1">
        {species.slice(0, 3).map((sp) => (
          <li key={`${title}-${sp.scientificName}`} className="flex justify-between gap-2">
            <span className="truncate italic text-foreground/85">
              {sp.canonicalName ?? sp.scientificName}
            </span>
            <span className="tabular-nums text-muted-foreground">
              {sp.count.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
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
  const total = PROXIES.reduce((sum, proxy) => sum + weights[proxy.key], 0);
  const reset = () => onChange(DEFAULT_WEIGHTS);
  return (
    <div className="px-4 py-3">
      <div className="mb-2 flex items-baseline justify-between">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Weights
        </div>
        <button
          type="button"
          onClick={reset}
          className="text-[10px] text-muted-foreground underline decoration-dotted hover:text-foreground"
        >
          Reset
        </button>
      </div>
      <div className="space-y-2">
        {PROXIES.map((p) => {
          const w = weights[p.key];
          const share = total > 0 ? Math.round((w / total) * 100) : 0;
          const Icon = PROXY_ICONS[p.key];
          return (
            <div key={p.key}>
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span
                    className="flex size-4 items-center justify-center rounded-sm"
                    style={{ backgroundColor: `${p.color}26`, color: p.color }}
                  >
                    <Icon className="size-3" aria-hidden />
                  </span>
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
                className="mt-0.5 h-4 w-full accent-primary"
                aria-label={`${p.label} weight`}
              />
            </div>
          );
        })}
      </div>
      <p className="mt-1.5 text-[10px] leading-relaxed text-muted-foreground">
        Normalized to 100%. Updates ranking and map colors live.
      </p>
    </div>
  );
}

function ProxyPanel({
  proxies,
  weights,
  total,
  unit,
}: {
  proxies: ProxyScores;
  weights: Weights;
  total: number;
  unit: AnalysisUnit;
}) {
  const sumW = PROXIES.reduce((sum, proxy) => sum + weights[proxy.key], 0);
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
          const Icon = PROXY_ICONS[p.key];
          const sourceLevel = proxySourceLevelForUnit(unit, p.key);
          const inherited = sourceIsInherited(sourceLevel, unit.level);
          return (
            <div key={p.key} className="grid grid-cols-[112px_1fr_36px] items-center gap-2">
              <span className="flex items-center gap-1.5 text-[11px]">
                <span
                  className="flex size-5 shrink-0 items-center justify-center rounded-sm"
                  style={{ backgroundColor: `${p.color}26`, color: p.color }}
                  title={p.label}
                >
                  <Icon className="size-3.5" aria-hidden />
                </span>
                <span>
                  <span className="font-medium">{p.short}</span>{" "}
                  <span className="text-[9px] text-muted-foreground/70">({share}%)</span>
                </span>
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
              <span className="col-span-3 -mt-0.5 pl-[120px] text-[10px] text-muted-foreground/80">
                  <SourceBadge
                  inherited={inherited}
                  label={sourceLevelLabel(sourceLevel)}
                />{" "}
                {p.description}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
