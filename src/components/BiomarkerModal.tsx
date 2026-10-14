'use client';

import React, { useEffect, useState } from 'react';
import { Biomarker, CATEGORIES } from '@/data/blood-tests';
import {
  evaluateChange,
  formatNumber,
  formatSignedPercent,
  getBaselineReading,
  getLatestReading,
  getPercentChange,
  getPreviousReading,
  getRangePosition,
  getStatus,
} from '@/lib/biomarker-utils';
import {
  X,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Minus,
  Calculator,
  Info,
} from 'lucide-react';

interface BiomarkerModalProps {
  marker: Biomarker | null;
  dates: string[];
  onClose: () => void;
}

export default function BiomarkerModal({
  marker,
  dates,
  onClose,
}: BiomarkerModalProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!marker) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [marker, onClose]);

  if (!marker) return null;

  const categoryMeta = CATEGORIES.find((c) => c.id === marker.category);
  const latest = getLatestReading(marker.values, dates);
  const previous = getPreviousReading(marker.values, dates);
  const baseline = getBaselineReading(marker.values, dates);

  const latestStatus = getStatus(latest.value, marker);
  const priorEval = evaluateChange(latest.value, previous.value, marker);
  const baselineEval = evaluateChange(latest.value, baseline.value, marker);
  const rangePos = getRangePosition(latest.value, marker);

  // Build SVG Chart geometry
  const width = 680;
  const height = 250;
  const padLeft = 48;
  const padRight = 24;
  const padTop = 22;
  const padBottom = 36;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const validPts = marker.values
    .map((v, idx) =>
      v !== null && v !== undefined && !Number.isNaN(v) ? { v, idx } : null
    )
    .filter((item): item is { v: number; idx: number } => item !== null);

  const nums = validPts.map((p) => p.v);
  if (marker.min !== undefined) nums.push(marker.min);
  if (marker.max !== undefined) nums.push(marker.max);

  let dMin = nums.length > 0 ? Math.min(...nums) : 0;
  let dMax = nums.length > 0 ? Math.max(...nums) : 100;
  if (dMax === dMin) {
    dMin -= 1;
    dMax += 1;
  } else {
    const pad = (dMax - dMin) * 0.16;
    dMin = Math.max(0, dMin - pad);
    dMax = dMax + pad;
  }

  const totalSlots = Math.max(dates.length - 1, 1);
  const toX = (idx: number) => padLeft + (idx / totalSlots) * plotW;
  const toY = (val: number) =>
    padTop + plotH - ((val - dMin) / (dMax - dMin)) * plotH;

  const coords = validPts.map((p) => ({
    x: toX(p.idx),
    y: toY(p.v),
    v: p.v,
    idx: p.idx,
    date: dates[p.idx],
    status: getStatus(p.v, marker),
  }));

  const pathD =
    coords.length > 1
      ? coords.reduce((acc, pt, i) => {
          if (i === 0) return `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
          const prev = coords[i - 1];
          const cpx1 = prev.x + (pt.x - prev.x) * 0.45;
          const cpx2 = prev.x + (pt.x - prev.x) * 0.55;
          return `${acc} C ${cpx1.toFixed(1)} ${prev.y.toFixed(1)}, ${cpx2.toFixed(1)} ${pt.y.toFixed(1)}, ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
        }, '')
      : '';

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => dMin + (dMax - dMin) * t);

  const bandTop = marker.max !== undefined ? Math.min(marker.max, dMax) : dMax;
  const bandBottom = marker.min !== undefined ? Math.max(marker.min, dMin) : dMin;
  const bandY1 = toY(bandTop);
  const bandY2 = toY(bandBottom);

  const polarityLabel =
    marker.polarity === 'lower-is-better'
      ? 'Lower values are clinically favorable'
      : marker.polarity === 'higher-is-better'
      ? 'Higher values are clinically favorable'
      : 'Optimal within reference interval';

  const defaultIdx =
    validPts.length > 0
      ? validPts[validPts.length - 1].idx
      : Math.max(dates.length - 1, 0);
  const activeIdx = hoverIdx !== null ? hoverIdx : defaultIdx;
  const isInspecting = hoverIdx !== null;
  const activeVal = marker.values[activeIdx] ?? null;
  const activeStatus = getStatus(activeVal, marker);
  const activePos = getRangePosition(activeVal, marker);

  const resolveHoverIndex = (clientX: number, svgEl: SVGSVGElement) => {
    if (dates.length === 0) return;
    const rect = svgEl.getBoundingClientRect();
    if (rect.width <= 0) return;
    const svgX = ((clientX - rect.left) / rect.width) * width;
    const clampedX = Math.max(padLeft, Math.min(width - padRight, svgX));
    const ratio = plotW > 0 ? (clampedX - padLeft) / plotW : 0;
    const idx = Math.round(ratio * totalSlots);
    const boundedIdx = Math.max(0, Math.min(dates.length - 1, idx));
    setHoverIdx((prev) => (prev === boundedIdx ? prev : boundedIdx));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="biomarker-modal-title"
    >
      <div className="w-full max-w-3xl rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-2xl overflow-hidden my-8">
        {/* Top bar */}
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-6 py-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-mono-tabular uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30">
                {categoryMeta?.shortLabel ?? marker.category}
              </span>
              {marker.isDerived && (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono-tabular px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/30">
                  <Calculator className="w-3 h-3" />
                  Derived: {marker.formulaDescription}
                </span>
              )}
              <span className="text-xs text-[var(--text-muted)]">
                {polarityLabel}
              </span>
            </div>
            <h2
              id="biomarker-modal-title"
              className="text-xl font-bold text-[var(--text-primary)] tracking-tight"
            >
              {marker.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[82vh] overflow-y-auto">
          {/* Summary KPI Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Latest Reading (properly resolves non-null reading + date!) */}
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-3.5">
              <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                Latest Reading {latest.date ? `(${latest.date})` : ''}
              </div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl font-bold font-mono-tabular text-[var(--text-primary)]">
                  {formatNumber(latest.value)}
                </span>
                <span className="text-xs text-[var(--text-muted)] font-mono-tabular">
                  {marker.unit}
                </span>
              </div>
              <div className="mt-1.5">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                    latestStatus === 'normal'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : latestStatus === 'high'
                      ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      : latestStatus === 'low'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-500/15 text-slate-400 border border-slate-500/30'
                  }`}
                >
                  {latestStatus === 'unknown' ? 'No Ref' : latestStatus}
                </span>
              </div>
            </div>

            {/* Reference Interval */}
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-3.5">
              <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                Reference Interval
              </div>
              <div className="mt-1 text-lg font-bold font-mono-tabular text-[var(--text-primary)]">
                {marker.refLabel}{' '}
                <span className="text-xs font-normal text-[var(--text-muted)]">
                  {marker.refLabel !== 'N/A' ? marker.unit : ''}
                </span>
              </div>
              <div className="mt-2 text-xs text-[var(--text-secondary)] font-mono-tabular">
                {rangePos !== null
                  ? `${Math.round(rangePos)}% of reference span`
                  : 'Unbounded / N/A'}
              </div>
            </div>

            {/* Latest Change vs Prior */}
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-3.5">
              <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                vs Prior {previous.date ? `(${previous.date})` : ''}
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <span
                  className={`text-lg font-bold font-mono-tabular ${
                    priorEval.direction === 'improving'
                      ? 'text-emerald-400'
                      : priorEval.direction === 'worsening'
                      ? 'text-rose-400'
                      : 'text-[var(--text-primary)]'
                  }`}
                >
                  {formatSignedPercent(priorEval.percentChange)}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-1 text-xs">
                {priorEval.direction === 'improving' && (
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                    <TrendingUp className="w-3.5 h-3.5" /> Improving
                  </span>
                )}
                {priorEval.direction === 'worsening' && (
                  <span className="inline-flex items-center gap-1 text-rose-400 font-medium">
                    <TrendingDown className="w-3.5 h-3.5" /> Worsening
                  </span>
                )}
                {(priorEval.direction === 'stable' ||
                  priorEval.direction === 'neutral') && (
                  <span className="inline-flex items-center gap-1 text-[var(--text-secondary)]">
                    <Minus className="w-3.5 h-3.5" />{' '}
                    {priorEval.direction === 'stable' ? 'Stable' : 'Single reading'}
                  </span>
                )}
              </div>
            </div>

            {/* Total Change vs Baseline */}
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-3.5">
              <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                vs Baseline {baseline.date ? `(${baseline.date})` : ''}
              </div>
              <div className="mt-1 text-lg font-bold font-mono-tabular text-[var(--text-primary)]">
                {formatSignedPercent(baselineEval.percentChange)}
              </div>
              <div className="mt-1.5 text-xs text-[var(--text-secondary)] font-mono-tabular">
                Baseline: {formatNumber(baseline.value)} {marker.unit}
              </div>
            </div>
          </div>

          {/* Trajectory SVG Chart */}
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4">
            <div className="flex items-center justify-between mb-2 overflow-hidden">
              <span className="text-xs font-medium text-[var(--text-secondary)] truncate">
                Longitudinal Trajectory (Gap-Spanned)
              </span>
              {(marker.min !== undefined || marker.max !== undefined) && (
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono-tabular shrink-0">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/20 border border-emerald-500/40" />
                  Ref Zone: {marker.refLabel} {marker.unit}
                </span>
              )}
            </div>

            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-auto overflow-visible select-none cursor-crosshair touch-pan-y"
              onMouseMove={(e) => resolveHoverIndex(e.clientX, e.currentTarget)}
              onTouchStart={(e) => {
                if (e.touches[0]) resolveHoverIndex(e.touches[0].clientX, e.currentTarget);
              }}
              onTouchMove={(e) => {
                if (e.touches[0]) resolveHoverIndex(e.touches[0].clientX, e.currentTarget);
              }}
              onMouseLeave={() => setHoverIdx(null)}
            >
              <g className="pointer-events-none">
                {/* Grid lines */}
                {yTicks.map((tv, i) => {
                  const y = toY(tv);
                  return (
                    <g key={i}>
                      <line
                        x1={padLeft}
                        y1={y}
                        x2={width - padRight}
                        y2={y}
                        stroke="var(--chart-grid)"
                        strokeWidth={1}
                      />
                      <text
                        x={padLeft - 8}
                        y={y + 3}
                        textAnchor="end"
                        className="fill-[var(--text-muted)] font-mono-tabular text-[10px]"
                      >
                        {tv >= 10 ? Math.round(tv) : tv.toFixed(2)}
                      </text>
                    </g>
                  );
                })}

                {/* Shaded Reference Zone */}
                {(marker.min !== undefined || marker.max !== undefined) &&
                  bandY2 > bandY1 && (
                    <rect
                      x={padLeft}
                      y={Math.max(padTop, bandY1)}
                      width={plotW}
                      height={Math.max(
                        2,
                        Math.min(padTop + plotH, bandY2) - Math.max(padTop, bandY1)
                      )}
                      fill="rgba(16, 185, 129, 0.08)"
                      stroke="rgba(16, 185, 129, 0.25)"
                      strokeDasharray="4 4"
                      strokeWidth={1}
                    />
                  )}

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

                {/* Trajectory Curve */}
                {coords.length > 1 && (
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth={2.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Data Points */}
                {coords.map((pt) => {
                  const dotColor =
                    pt.status === 'high'
                      ? '#fb7185'
                      : pt.status === 'low'
                      ? '#fbbf24'
                      : '#34d399';
                  const isHovered = activeIdx === pt.idx;

                  return (
                    <g key={pt.idx}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? 8 : 5}
                        fill={dotColor}
                        opacity={0.22}
                      />
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? 5 : 3.8}
                        fill={dotColor}
                        stroke="var(--bg-surface)"
                        strokeWidth={1.5}
                      />
                      <text
                        x={pt.x}
                        y={pt.y - 10}
                        textAnchor="middle"
                        className="fill-[var(--text-primary)] font-mono-tabular text-[10px] font-semibold"
                      >
                        {formatNumber(pt.v)}
                      </text>
                    </g>
                  );
                })}

                {/* X-axis dates */}
                {dates.map((d, idx) => {
                  const isHovered = hoverIdx === idx;
                  return (
                    <text
                      key={d}
                      x={toX(idx)}
                      y={height - 10}
                      textAnchor="middle"
                      className={`font-mono-tabular text-[10.5px] transition-colors ${
                        isHovered
                          ? 'fill-sky-400 font-semibold'
                          : 'fill-[var(--text-secondary)]'
                      }`}
                    >
                      {d}
                    </text>
                  );
                })}
              </g>
            </svg>

            {/* Permanent Fixed-Height Telemetry Readout Strip */}
            <div
              className={`mt-2 h-11 rounded-xl border px-3 flex items-center justify-between gap-3 overflow-hidden transition-colors ${
                isInspecting
                  ? 'border-sky-500/40 bg-[var(--bg-elevated)]'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-elevated)]/60'
              }`}
            >
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    isInspecting ? 'bg-sky-400' : 'bg-emerald-400/75'
                  }`}
                />
                <span
                  className={`font-mono-tabular text-[10px] font-semibold uppercase tracking-wider ${
                    isInspecting ? 'text-sky-400' : 'text-[var(--text-muted)]'
                  }`}
                >
                  {isInspecting ? 'INSPECTING' : 'LATEST'} · {dates[activeIdx] ?? '—'}
                </span>
              </div>

              <div className="flex items-center gap-4 min-w-0 overflow-hidden font-mono-tabular text-xs whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <span className="text-[var(--text-secondary)]">Reading:</span>
                  <span className="font-semibold text-[var(--text-primary)]">
                    {activeVal !== null && activeVal !== undefined
                      ? `${formatNumber(activeVal)} ${marker.unit}`
                      : 'Not tested'}
                  </span>
                  {activeVal !== null &&
                    activeVal !== undefined &&
                    activeStatus !== 'unknown' && (
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          activeStatus === 'high'
                            ? 'bg-rose-400'
                            : activeStatus === 'low'
                            ? 'bg-amber-400'
                            : 'bg-emerald-400'
                        }`}
                        title={`Status: ${activeStatus}`}
                      />
                    )}
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[var(--text-secondary)]">
                  <span>Range Pos:</span>
                  <span className="text-[var(--text-primary)]">
                    {activePos !== null ? `${Math.round(activePos)}%` : '—'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Data Audit Log Notes (if any historical values were corrected) */}
          {marker.auditNotes && Object.keys(marker.auditNotes).length > 0 && (
            <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2">
                <ShieldCheck className="w-4 h-4" />
                Verified Historical Data Audit Applied
              </div>
              <ul className="space-y-1.5 text-xs text-[var(--text-primary)]">
                {Object.entries(marker.auditNotes).map(([date, note]) => (
                  <li key={date} className="flex items-start gap-2">
                    <span className="font-mono-tabular font-semibold text-sky-300 shrink-0">
                      [{date}]:
                    </span>
                    <span className="text-[var(--text-secondary)]">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Panel-by-Panel Breakdown Table */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
              <Info className="w-3.5 h-3.5" />
              Panel-by-Panel Readings
            </div>
            <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-muted)] font-mono-tabular">
                    <th className="py-2.5 px-3">Panel Date</th>
                    <th className="py-2.5 px-3">Value</th>
                    <th className="py-2.5 px-3">% of Range</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Delta vs Prior</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] font-mono-tabular">
                  {dates.map((date, idx) => {
                    const val = marker.values[idx];
                    const status = getStatus(val, marker);
                    const pos = getRangePosition(val, marker);
                    // Find previous non-null reading before idx
                    let prevVal: number | null = null;
                    for (let j = idx - 1; j >= 0; j -= 1) {
                      if (
                        marker.values[j] !== null &&
                        marker.values[j] !== undefined
                      ) {
                        prevVal = marker.values[j];
                        break;
                      }
                    }
                    const deltaPct = getPercentChange(val, prevVal);
                    const auditNote = marker.auditNotes?.[date];

                    return (
                      <tr key={date} className="hover:bg-[var(--bg-elevated)]/60">
                        <td className="py-2.5 px-3 font-medium text-[var(--text-primary)]">
                          {date}
                          {auditNote && (
                            <span
                              className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-sky-500/15 text-sky-400 border border-sky-500/30"
                              title={auditNote}
                            >
                              Audited
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-[var(--text-primary)]">
                          {val !== null && val !== undefined
                            ? `${formatNumber(val)} ${marker.unit}`
                            : 'Not tested'}
                        </td>
                        <td className="py-2.5 px-3 text-[var(--text-secondary)]">
                          {pos !== null ? `${Math.round(pos)}%` : '—'}
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                              status === 'normal'
                                ? 'bg-emerald-500/15 text-emerald-400'
                                : status === 'high'
                                ? 'bg-rose-500/15 text-rose-400'
                                : status === 'low'
                                ? 'bg-amber-500/15 text-amber-400'
                                : 'text-[var(--text-muted)]'
                            }`}
                          >
                            {status === 'unknown' ? '—' : status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-[var(--text-secondary)]">
                          {formatSignedPercent(deltaPct)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
