'use client';

import React, { useState } from 'react';
import { Biomarker } from '@/data/blood-tests';
import { formatNumber, getStatus } from '@/lib/biomarker-utils';
import { Activity, Maximize2 } from 'lucide-react';

interface SeriesConfig {
  biomarkerName: string;
  label: string;
  color: string;
  axis: 'left' | 'right';
}

interface ThresholdAnnotation {
  value: number;
  axis: 'left' | 'right';
  label: string;
  color: string;
}

interface SystemChartDefinition {
  id: string;
  title: string;
  subtitle: string;
  leftAxisLabel: string;
  rightAxisLabel?: string;
  series: SeriesConfig[];
  thresholds?: ThresholdAnnotation[];
  shadedBand?: {
    axis: 'left' | 'right';
    min: number;
    max: number;
    label: string;
  };
}

const SYSTEM_CHARTS: SystemChartDefinition[] = [
  {
    id: 'renal',
    title: 'Renal Filtration & Creatinine',
    subtitle: 'Dual-axis native units (eGFR ml/min vs Creatinine mg/dL)',
    leftAxisLabel: 'eGFR (ml/min)',
    rightAxisLabel: 'Creatinine (mg/dL)',
    series: [
      {
        biomarkerName: 'eGFR (ml/min)',
        label: 'eGFR (ml/min)',
        color: '#38bdf8',
        axis: 'left',
      },
      {
        biomarkerName: 'Creatinine (mg/dL)',
        label: 'Creatinine (mg/dL)',
        color: '#fb7185',
        axis: 'right',
      },
      {
        biomarkerName: 'BUN (mg/dL)',
        label: 'BUN (mg/dL)',
        color: '#a78bfa',
        axis: 'left',
      },
    ],
    shadedBand: {
      axis: 'left',
      min: 90,
      max: 125,
      label: 'eGFR > 90 Normal Band',
    },
    thresholds: [
      {
        value: 1.1,
        axis: 'right',
        label: 'Creatinine Max (1.1 mg/dL)',
        color: '#fb7185',
      },
    ],
  },
  {
    id: 'lipids',
    title: 'Lipid & Atherogenic Trajectory',
    subtitle: 'Total, LDL, Non-HDL, HDL, and Triglycerides (mg/dL)',
    leftAxisLabel: 'mg/dL',
    series: [
      {
        biomarkerName: 'Total Cholesterol (mg/dL)',
        label: 'Total Chol',
        color: '#38bdf8',
        axis: 'left',
      },
      {
        biomarkerName: 'Non-HDL (mg/dL)',
        label: 'Non-HDL',
        color: '#f59e0b',
        axis: 'left',
      },
      {
        biomarkerName: 'LDL (mg/dL)',
        label: 'LDL-C',
        color: '#fb7185',
        axis: 'left',
      },
      {
        biomarkerName: 'HDL (mg/dL)',
        label: 'HDL-C',
        color: '#34d399',
        axis: 'left',
      },
      {
        biomarkerName: 'Triglycerides (mg/dL)',
        label: 'Triglycerides',
        color: '#a78bfa',
        axis: 'left',
      },
    ],
    thresholds: [
      {
        value: 200,
        axis: 'left',
        label: 'TC < 200',
        color: '#38bdf8',
      },
      {
        value: 100,
        axis: 'left',
        label: 'LDL < 100',
        color: '#fb7185',
      },
    ],
  },
  {
    id: 'hormones',
    title: 'Endocrine & Androgen Axis',
    subtitle: 'Total Testosterone (ng/mL) vs SHBG (nmol/L) & Free Androgen Index',
    leftAxisLabel: 'Testosterone (ng/mL)',
    rightAxisLabel: 'SHBG / FAI',
    series: [
      {
        biomarkerName: 'Total Testosterone (ng/mL)',
        label: 'Total Testosterone',
        color: '#34d399',
        axis: 'left',
      },
      {
        biomarkerName: 'SHBG (nmol/L)',
        label: 'SHBG (nmol/L)',
        color: '#38bdf8',
        axis: 'right',
      },
      {
        biomarkerName: 'Free Androgen Index',
        label: 'Free Androgen Index',
        color: '#f59e0b',
        axis: 'right',
      },
    ],
    thresholds: [
      {
        value: 35.0,
        axis: 'right',
        label: 'FAI Lower Ref (35)',
        color: '#f59e0b',
      },
    ],
  },
  {
    id: 'iron',
    title: 'Iron Kinetics & Storage',
    subtitle: 'Serum Iron, UIBC & Ferritin vs Transferrin Saturation (%)',
    leftAxisLabel: 'μg/dL · ng/mL',
    rightAxisLabel: 'TSAT (%)',
    series: [
      {
        biomarkerName: 'Iron (μg/dL)',
        label: 'Serum Iron',
        color: '#fb7185',
        axis: 'left',
      },
      {
        biomarkerName: 'UIBC (μg/dL)',
        label: 'UIBC (Audited)',
        color: '#38bdf8',
        axis: 'left',
      },
      {
        biomarkerName: 'Ferritin (ng/mL)',
        label: 'Ferritin',
        color: '#a78bfa',
        axis: 'left',
      },
      {
        biomarkerName: 'Transferrin Sat (%)',
        label: 'Transferrin Sat %',
        color: '#34d399',
        axis: 'right',
      },
    ],
    thresholds: [
      {
        value: 50,
        axis: 'right',
        label: 'TSAT Upper Ref (50%)',
        color: '#34d399',
      },
    ],
  },
  {
    id: 'hematology',
    title: 'Hematology & Thrombocytes',
    subtitle: 'Hemoglobin & Hematocrit vs Platelet Count (10³/uL)',
    leftAxisLabel: 'g/dL · %',
    rightAxisLabel: 'Platelets (10³/uL)',
    series: [
      {
        biomarkerName: 'Hemoglobin (g/dL)',
        label: 'Hemoglobin',
        color: '#fb7185',
        axis: 'left',
      },
      {
        biomarkerName: 'Hematocrit (%)',
        label: 'Hematocrit %',
        color: '#38bdf8',
        axis: 'left',
      },
      {
        biomarkerName: 'Platelets (10³/uL)',
        label: 'Platelets',
        color: '#f59e0b',
        axis: 'right',
      },
    ],
    thresholds: [
      {
        value: 150,
        axis: 'right',
        label: 'Platelet Lower Ref (150)',
        color: '#f59e0b',
      },
    ],
  },
  {
    id: 'inflammation',
    title: 'Inflammation & Leukocytes',
    subtitle: 'WBC & MPV vs High-Sensitivity CRP (gap-spanned)',
    leftAxisLabel: 'WBC (10⁹/L) · MPV (fL)',
    rightAxisLabel: 'CRP (mg/L)',
    series: [
      {
        biomarkerName: 'WBC (10⁹/L)',
        label: 'WBC Count',
        color: '#38bdf8',
        axis: 'left',
      },
      {
        biomarkerName: 'MPV (fL)',
        label: 'MPV (fL)',
        color: '#a78bfa',
        axis: 'left',
      },
      {
        biomarkerName: 'CRP (mg/L)',
        label: 'CRP (mg/L)',
        color: '#fb7185',
        axis: 'right',
      },
    ],
    thresholds: [
      {
        value: 8.0,
        axis: 'right',
        label: 'CRP Upper Ref (8.0)',
        color: '#fb7185',
      },
    ],
  },
  {
    id: 'nutrients',
    title: 'Micronutrients & Electrolytes',
    subtitle: 'Vitamin D & Corrected Calcium/Magnesium vs Vitamin B12',
    leftAxisLabel: 'Vit D (ng/mL) · Ca (mg/dL)',
    rightAxisLabel: 'Vitamin B12 (pg/mL)',
    series: [
      {
        biomarkerName: 'Vitamin D (ng/mL)',
        label: 'Vitamin D',
        color: '#34d399',
        axis: 'left',
      },
      {
        biomarkerName: 'Calcium (mg/dL)',
        label: 'Calcium (Audited)',
        color: '#38bdf8',
        axis: 'left',
      },
      {
        biomarkerName: 'Vitamin B12 (pg/mL)',
        label: 'Vitamin B12',
        color: '#f59e0b',
        axis: 'right',
      },
    ],
    thresholds: [
      {
        value: 30,
        axis: 'left',
        label: 'Vit D Target (30)',
        color: '#34d399',
      },
      {
        value: 211,
        axis: 'right',
        label: 'B12 Lower Ref (211)',
        color: '#f59e0b',
      },
    ],
  },
];

interface SystemsChartsGridProps {
  biomarkers: Biomarker[];
  dates: string[];
  onSelectBiomarker: (marker: Biomarker) => void;
}

function SystemCardChart({
  chart,
  biomarkers,
  dates,
  onSelectBiomarker,
}: {
  chart: SystemChartDefinition;
  biomarkers: Biomarker[];
  dates: string[];
  onSelectBiomarker: (marker: Biomarker) => void;
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [hiddenSeries, setHiddenSeries] = useState<Record<string, boolean>>({});

  const markerMap = new Map<string, Biomarker>();
  biomarkers.forEach((b) => markerMap.set(b.name, b));

  const activeSeries = chart.series.filter((s) => !hiddenSeries[s.biomarkerName]);

  const width = 540;
  const height = 240;
  const padLeft = 44;
  const padRight = chart.rightAxisLabel ? 44 : 20;
  const padTop = 20;
  const padBottom = 34;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  // Compute left & right axis domains
  const computeDomain = (axis: 'left' | 'right') => {
    const vals: number[] = [];
    activeSeries
      .filter((s) => s.axis === axis)
      .forEach((s) => {
        const m = markerMap.get(s.biomarkerName);
        if (!m) return;
        m.values.forEach((v) => {
          if (v !== null && v !== undefined && !Number.isNaN(v)) vals.push(v);
        });
      });

    chart.thresholds
      ?.filter((t) => t.axis === axis)
      .forEach((t) => vals.push(t.value));

    if (chart.shadedBand && chart.shadedBand.axis === axis) {
      vals.push(chart.shadedBand.min, chart.shadedBand.max);
    }

    if (vals.length === 0) return { min: 0, max: 100 };
    let dMin = Math.min(...vals);
    let dMax = Math.max(...vals);
    if (dMax === dMin) {
      dMin -= 1;
      dMax += 1;
    } else {
      const span = dMax - dMin;
      dMin = Math.max(0, dMin - span * 0.14);
      dMax = dMax + span * 0.14;
    }
    return { min: dMin, max: dMax };
  };

  const leftDomain = computeDomain('left');
  const rightDomain = computeDomain('right');

  const totalSlots = Math.max(dates.length - 1, 1);
  const toX = (idx: number) => padLeft + (idx / totalSlots) * plotW;
  const toY = (val: number, axis: 'left' | 'right') => {
    const dom = axis === 'left' ? leftDomain : rightDomain;
    return padTop + plotH - ((val - dom.min) / (dom.max - dom.min)) * plotH;
  };

  const leftTicks = [0, 0.25, 0.5, 0.75, 1].map(
    (t) => leftDomain.min + (leftDomain.max - leftDomain.min) * t
  );
  const rightTicks = chart.rightAxisLabel
    ? [0, 0.25, 0.5, 0.75, 1].map(
        (t) => rightDomain.min + (rightDomain.max - rightDomain.min) * t
      )
    : [];

  const toggleSeries = (name: string) => {
    setHiddenSeries((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 flex flex-col justify-between transition-all hover:border-[var(--border-strong)] relative">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-sky-400 shrink-0" />
            <h3 className="font-semibold text-sm text-[var(--text-primary)] tracking-tight">
              {chart.title}
            </h3>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{chart.subtitle}</p>
        </div>

        {/* Quick inspect first biomarker */}
        {chart.series[0] && markerMap.get(chart.series[0].biomarkerName) && (
          <button
            type="button"
            onClick={() => {
              const m = markerMap.get(chart.series[0].biomarkerName);
              if (m) onSelectBiomarker(m);
            }}
            className="text-xs text-[var(--text-secondary)] hover:text-sky-400 p-1.5 rounded-lg border border-transparent hover:border-[var(--border-subtle)] transition-colors"
            title={`Inspect ${chart.series[0].biomarkerName}`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Interactive Legend Pills */}
      <div className="flex flex-wrap items-center gap-1.5 mb-2">
        {chart.series.map((s) => {
          const isHidden = !!hiddenSeries[s.biomarkerName];
          const m = markerMap.get(s.biomarkerName);
          return (
            <div
              key={s.biomarkerName}
              className="inline-flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[11px] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleSeries(s.biomarkerName)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 transition-opacity ${
                  isHidden ? 'opacity-40 line-through' : 'opacity-100'
                }`}
                title="Click to toggle series visibility"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: s.color }}
                />
                <span className="font-medium text-[var(--text-primary)]">{s.label}</span>
                {s.axis === 'right' && (
                  <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
                    (R)
                  </span>
                )}
              </button>
              {m && (
                <button
                  type="button"
                  onClick={() => onSelectBiomarker(m)}
                  className="px-1.5 py-1 text-[var(--text-muted)] hover:text-sky-400 border-l border-[var(--border-subtle)] transition-colors"
                  title={`Open detailed telemetry modal for ${s.biomarkerName}`}
                >
                  ↗
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
          onMouseLeave={() => setHoverIdx(null)}
        >
          {/* Horizontal grid lines */}
          {leftTicks.map((tickVal, idx) => {
            const y = toY(tickVal, 'left');
            return (
              <g key={idx}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="var(--chart-grid)"
                  strokeWidth={1}
                />
                <text
                  x={padLeft - 6}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-[var(--text-muted)] font-mono-tabular text-[9.5px]"
                >
                  {tickVal >= 10 ? Math.round(tickVal) : tickVal.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Right Axis Labels */}
          {rightTicks.map((tickVal, idx) => {
            const y = toY(tickVal, 'right');
            return (
              <text
                key={idx}
                x={width - padRight + 6}
                y={y + 3}
                textAnchor="start"
                className="fill-[var(--text-muted)] font-mono-tabular text-[9.5px]"
              >
                {tickVal >= 10 ? Math.round(tickVal) : tickVal.toFixed(2)}
              </text>
            );
          })}

          {/* Shaded Reference Band */}
          {chart.shadedBand && (() => {
            const b = chart.shadedBand;
            const y1 = Math.max(padTop, toY(b.max, b.axis));
            const y2 = Math.min(padTop + plotH, toY(b.min, b.axis));
            if (y2 <= y1) return null;
            return (
              <rect
                x={padLeft}
                y={y1}
                width={plotW}
                height={y2 - y1}
                fill="rgba(16, 185, 129, 0.07)"
                stroke="rgba(16, 185, 129, 0.18)"
                strokeDasharray="3 3"
                strokeWidth={0.75}
              />
            );
          })()}

          {/* Threshold dashed lines */}
          {chart.thresholds?.map((th, idx) => {
            const y = toY(th.value, th.axis);
            if (y < padTop - 4 || y > padTop + plotH + 4) return null;
            return (
              <g key={idx}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke={th.color}
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  opacity={0.65}
                />
                <text
                  x={padLeft + 4}
                  y={y - 4}
                  className="text-[9px] font-mono-tabular"
                  fill={th.color}
                  opacity={0.9}
                >
                  {th.label}
                </text>
              </g>
            );
          })}

          {/* Series Lines & Points (with gap spanning!) */}
          {activeSeries.map((s) => {
            const m = markerMap.get(s.biomarkerName);
            if (!m) return null;

            const pts = m.values
              .map((v, idx) =>
                v !== null && v !== undefined && !Number.isNaN(v)
                  ? {
                      x: toX(idx),
                      y: toY(v, s.axis),
                      v,
                      idx,
                      status: getStatus(v, m),
                    }
                  : null
              )
              .filter(
                (
                  item
                ): item is {
                  x: number;
                  y: number;
                  v: number;
                  idx: number;
                  status: ReturnType<typeof getStatus>;
                } => item !== null
              );

            if (pts.length === 0) return null;

            const pathD =
              pts.length > 1
                ? pts.reduce((acc, pt, i) => {
                    if (i === 0) return `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
                    const prev = pts[i - 1];
                    const cpx1 = prev.x + (pt.x - prev.x) * 0.42;
                    const cpx2 = prev.x + (pt.x - prev.x) * 0.58;
                    return `${acc} C ${cpx1.toFixed(1)} ${prev.y.toFixed(1)}, ${cpx2.toFixed(1)} ${pt.y.toFixed(1)}, ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
                  }, '')
                : '';

            return (
              <g key={s.biomarkerName}>
                {pts.length > 1 && (
                  <path
                    d={pathD}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
                {pts.map((pt) => {
                  const isHovered = hoverIdx === pt.idx;
                  return (
                    <g key={pt.idx}>
                      {isHovered && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={6.5}
                          fill={s.color}
                          opacity={0.25}
                        />
                      )}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? 4.2 : 3}
                        fill={s.color}
                        stroke="var(--bg-surface)"
                        strokeWidth={1.3}
                      />
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Hover vertical guide line */}
          {hoverIdx !== null && (
            <line
              x1={toX(hoverIdx)}
              y1={padTop}
              x2={toX(hoverIdx)}
              y2={padTop + plotH}
              stroke="var(--text-secondary)"
              strokeWidth={1}
              strokeDasharray="2 2"
              opacity={0.5}
            />
          )}

          {/* X-axis Date Labels */}
          {dates.map((d, idx) => {
            const x = toX(idx);
            const isHovered = hoverIdx === idx;
            return (
              <text
                key={d}
                x={x}
                y={height - 10}
                textAnchor="middle"
                className={`text-[10px] font-mono-tabular transition-colors ${
                  isHovered
                    ? 'fill-sky-400 font-semibold'
                    : 'fill-[var(--text-secondary)]'
                }`}
              >
                {d}
              </text>
            );
          })}

          {/* Invisible hover columns for smooth scrubbing */}
          {dates.map((d, idx) => {
            const colW = plotW / Math.max(dates.length, 1);
            const x = toX(idx) - colW / 2;
            return (
              <rect
                key={d}
                x={Math.max(padLeft - 10, x)}
                y={padTop}
                width={colW}
                height={plotH + padBottom}
                fill="transparent"
                className="cursor-crosshair"
                onMouseEnter={() => setHoverIdx(idx)}
              />
            );
          })}
        </svg>

        {/* Floating Tooltip on Hover */}
        {hoverIdx !== null && (
          <div className="mt-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-3 py-2 text-xs shadow-lg flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono-tabular font-semibold text-sky-400">
              {dates[hoverIdx]}
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {activeSeries.map((s) => {
                const m = markerMap.get(s.biomarkerName);
                const val = m?.values[hoverIdx] ?? null;
                const status = m ? getStatus(val, m) : 'unknown';
                return (
                  <div key={s.biomarkerName} className="inline-flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="text-[var(--text-secondary)]">{s.label}:</span>
                    <span className="font-mono-tabular font-semibold text-[var(--text-primary)]">
                      {formatNumber(val)}
                    </span>
                    {status !== 'normal' && status !== 'unknown' && (
                      <span
                        className={`text-[10px] uppercase px-1 rounded ${
                          status === 'high'
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {status}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SystemsChartsGrid({
  biomarkers,
  dates,
  onSelectBiomarker,
}: SystemsChartsGridProps) {
  return (
    <section aria-label="Physiological System Trajectories" className="my-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
        <div>
          <span className="text-[11px] font-mono-tabular uppercase tracking-widest text-sky-400">
            Multi-System Telemetry
          </span>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] tracking-tight">
            Physiological System Trajectories (2021–2025)
          </h2>
        </div>
        <p className="text-xs text-[var(--text-secondary)]">
          Hover any panel date to compare biomarkers · Click series tags to toggle or ↗ to inspect
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {SYSTEM_CHARTS.map((chart) => (
          <SystemCardChart
            key={chart.id}
            chart={chart}
            biomarkers={biomarkers}
            dates={dates}
            onSelectBiomarker={onSelectBiomarker}
          />
        ))}
      </div>
    </section>
  );
}
