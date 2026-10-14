'use client';

import React from 'react';
import { Biomarker } from '@/data/blood-tests';
import { getStatus } from '@/lib/biomarker-utils';

interface SparklineSvgProps {
  marker: Biomarker;
  width?: number;
  height?: number;
}

export default function SparklineSvg({
  marker,
  width = 132,
  height = 38,
}: SparklineSvgProps) {
  const { values, min, max } = marker;
  const validPoints = values
    .map((v, idx) => (v !== null && v !== undefined && !Number.isNaN(v) ? { v, idx } : null))
    .filter((item): item is { v: number; idx: number } => item !== null);

  if (validPoints.length === 0) {
    return (
      <div
        className="flex items-center justify-center text-xs text-[var(--text-muted)] font-mono-tabular"
        style={{ width, height }}
      >
        No data
      </div>
    );
  }

  const padX = 8;
  const padY = 6;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  const rawValues = validPoints.map((p) => p.v);
  let domainMin = Math.min(...rawValues);
  let domainMax = Math.max(...rawValues);

  if (min !== undefined) domainMin = Math.min(domainMin, min);
  if (max !== undefined) domainMax = Math.max(domainMax, max);

  if (domainMax === domainMin) {
    domainMin -= 1;
    domainMax += 1;
  } else {
    const pad = (domainMax - domainMin) * 0.12;
    domainMin -= pad;
    domainMax += pad;
  }

  const totalSlots = Math.max(values.length - 1, 1);
  const toX = (idx: number) => padX + (idx / totalSlots) * innerW;
  const toY = (val: number) =>
    padY + innerH - ((val - domainMin) / (domainMax - domainMin)) * innerH;

  // Reference band coordinates
  const bandTopVal = max !== undefined ? Math.min(max, domainMax) : domainMax;
  const bandBottomVal = min !== undefined ? Math.max(min, domainMin) : domainMin;
  const bandY1 = toY(bandTopVal);
  const bandY2 = toY(bandBottomVal);
  const hasRefBand = min !== undefined || max !== undefined;

  // Build SVG path spanning null gaps cleanly
  const coords = validPoints.map((p) => ({
    x: toX(p.idx),
    y: toY(p.v),
    v: p.v,
    idx: p.idx,
    status: getStatus(p.v, marker),
  }));

  const pathData =
    coords.length > 1
      ? coords.reduce((acc, pt, i) => {
          if (i === 0) return `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
          const prev = coords[i - 1];
          const cpx1 = prev.x + (pt.x - prev.x) * 0.45;
          const cpx2 = prev.x + (pt.x - prev.x) * 0.55;
          return `${acc} C ${cpx1.toFixed(1)} ${prev.y.toFixed(1)}, ${cpx2.toFixed(1)} ${pt.y.toFixed(1)}, ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
        }, '')
      : '';

  const latestPt = coords[coords.length - 1];
  const strokeColor =
    latestPt.status === 'high'
      ? '#fb7185'
      : latestPt.status === 'low'
      ? '#fbbf24'
      : '#38bdf8';

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible select-none"
      aria-label={`Trend sparkline for ${marker.name}`}
    >
      {hasRefBand && bandY2 > bandY1 && (
        <rect
          x={padX - 2}
          y={Math.max(2, bandY1)}
          width={innerW + 4}
          height={Math.max(2, Math.min(height - 4, bandY2 - bandY1))}
          rx={3}
          fill="rgba(16, 185, 129, 0.09)"
          stroke="rgba(16, 185, 129, 0.18)"
          strokeWidth={0.5}
          strokeDasharray="2 2"
        />
      )}

      {coords.length > 1 && (
        <path
          d={pathData}
          fill="none"
          stroke={strokeColor}
          strokeWidth={1.85}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {coords.map((pt, i) => {
        const isLast = i === coords.length - 1;
        const dotColor =
          pt.status === 'high'
            ? '#fb7185'
            : pt.status === 'low'
            ? '#fbbf24'
            : isLast
            ? '#34d399'
            : '#38bdf8';

        return (
          <g key={pt.idx}>
            {isLast && (
              <circle
                cx={pt.x}
                cy={pt.y}
                r={5}
                fill={dotColor}
                opacity={0.22}
              />
            )}
            <circle
              cx={pt.x}
              cy={pt.y}
              r={isLast ? 3 : 2.1}
              fill={dotColor}
              stroke="var(--bg-surface)"
              strokeWidth={1}
            />
          </g>
        );
      })}
    </svg>
  );
}
