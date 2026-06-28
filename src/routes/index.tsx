import { createFileRoute } from "@tanstack/react-router";
import { Bird, CloudSun, Layers, Mountain, Sprout, Trees, UsersRound, type LucideIcon } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import {
  DEFAULT_WEIGHTS,
  FOCUS_REGIONS,
  PRIORITY_COLOR_STOPS,
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
  const [selected, setSelected] = useState<string | null>("Oromia");
  const [mounted, setMounted] = useState(false);
  const [adminLevel, setAdminLevel] = useState<AdminLevel>("adm1");
  const [weights, setWeights] = useState<Weights>(DEFAULT_WEIGHTS);
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

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border px-6 py-4">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Southwest Ethiopia · Real Data Priority Map
            </h1>
            <p className="text-xs text-muted-foreground">
              Three-pillar score from fetched{" "}
              <a
                className="underline decoration-dotted hover:text-foreground"
                href="https://soilgrids.org/"
                target="_blank"
                rel="noreferrer"
              >
                SoilGrids
              </a>
              ,{" "}
              <a
                className="underline decoration-dotted hover:text-foreground"
                href="https://www.gbif.org/"
                target="_blank"
                rel="noreferrer"
              >
                GBIF
              </a>
              , GFW/UMD tree-cover loss, NASA POWER climate, Open-Meteo terrain and HDX/OCHA ADM3 population data. Boundaries from HDX{" "}
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
              {analysisLevel === "adm2" ? "ADM2 zones" : "Focus regions"} · ranked by priority
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
            <div className="border-t border-border">
              <WeightsPanel weights={weights} onChange={setWeights} />
            </div>
            <div className="px-4 pb-4 pt-2 text-[11px] leading-relaxed text-muted-foreground">
              Map boundaries use HDX COD-AB-ETH{" "}
              <span className="font-medium text-foreground/80">{adminLevel.toUpperCase()}</span>{" "}
              {adminLevel === "adm1" ? "regions" : adminLevel === "adm2" ? "zones" : "woredas"}.
              {" "}{adminLevel === "adm1" ? "ADM1 scores aggregate the mapped ADM2 zones." : adminLevel === "adm2" ? "ADM2 colors use ADM2-native real inputs where available." : "ADM3 colors display the matched ADM2 zone score."}
            </div>
            <div className="px-4 pb-4 text-[11px] leading-relaxed text-muted-foreground">
              Current focus regions: Oromia, SNNPR, Gambela and Benishangul-Gumuz.
            </div>
          </div>
        </aside>

        <main className="relative min-h-0">
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
              />
            </Suspense>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Loading map...
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
          const Icon = PROXY_ICONS[p.key];
          return (
            <div key={p.key}>
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span
                    className="flex size-5 items-center justify-center rounded-sm"
                    style={{ backgroundColor: `${p.color}26`, color: p.color }}
                  >
                    <Icon className="size-3.5" aria-hidden />
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

function Legend() {
  const gradient = `linear-gradient(90deg, ${PRIORITY_COLOR_STOPS
    .map((stop) => `${stop.color} ${stop.value}%`)
    .join(", ")})`;
  return (
    <div className="w-48 text-xs text-muted-foreground">
      <div className="mb-1 flex justify-between">
        <span>Low</span>
        <span>Priority</span>
        <span>High</span>
      </div>
      <div className="h-2 rounded-sm" style={{ background: gradient }} />
      <div className="mt-1 flex justify-between font-mono text-[10px]">
        {PRIORITY_COLOR_STOPS.map((stop) => (
          <span key={stop.value}>{stop.label}</span>
        ))}
      </div>
    </div>
  );
}
