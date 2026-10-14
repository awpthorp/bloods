import { Biomarker, CategoryId } from '@/data/blood-tests';

export type BiomarkerStatus = 'normal' | 'high' | 'low' | 'unknown';
export type ClinicalDirection = 'improving' | 'worsening' | 'stable' | 'neutral';

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Evaluates a numeric value against structured min/max bounds.
 * Fixes the legacy regex bug where "< 15.0-31.5" parsed as "< 15.0" and "N/A" parsed as "normal".
 */
export function getStatus(
  value: number | null | undefined,
  marker: Pick<Biomarker, 'min' | 'max' | 'refLabel'>
): BiomarkerStatus {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 'unknown';
  }
  if (
    marker.refLabel === 'N/A' ||
    (marker.min === undefined && marker.max === undefined)
  ) {
    return 'unknown';
  }
  if (marker.min !== undefined && marker.max !== undefined) {
    if (value < marker.min) return 'low';
    if (value > marker.max) return 'high';
    return 'normal';
  }
  if (marker.max !== undefined) {
    return value > marker.max ? 'high' : 'normal';
  }
  if (marker.min !== undefined) {
    return value < marker.min ? 'low' : 'normal';
  }
  return 'unknown';
}

export function isAbnormalStatus(status: BiomarkerStatus): boolean {
  return status === 'high' || status === 'low';
}

/**
 * Returns the most recent non-null value and its date index/label.
 */
export function getLatestReading(
  values: (number | null)[],
  dates: string[]
): { value: number | null; index: number; date: string | null } {
  for (let i = values.length - 1; i >= 0; i -= 1) {
    const val = values[i];
    if (val !== null && val !== undefined && !Number.isNaN(val)) {
      return { value: val, index: i, date: dates[i] ?? null };
    }
  }
  return { value: null, index: -1, date: null };
}

/**
 * Returns the second most recent non-null value and its date index/label.
 */
export function getPreviousReading(
  values: (number | null)[],
  dates: string[]
): { value: number | null; index: number; date: string | null } {
  let foundLatest = false;
  for (let i = values.length - 1; i >= 0; i -= 1) {
    const val = values[i];
    if (val === null || val === undefined || Number.isNaN(val)) {
      continue;
    }
    if (!foundLatest) {
      foundLatest = true;
      continue;
    }
    return { value: val, index: i, date: dates[i] ?? null };
  }
  return { value: null, index: -1, date: null };
}

/**
 * Returns the earliest non-null value and its date index/label.
 */
export function getBaselineReading(
  values: (number | null)[],
  dates: string[]
): { value: number | null; index: number; date: string | null } {
  for (let i = 0; i < values.length; i += 1) {
    const val = values[i];
    if (val !== null && val !== undefined && !Number.isNaN(val)) {
      return { value: val, index: i, date: dates[i] ?? null };
    }
  }
  return { value: null, index: -1, date: null };
}

export function getPercentChange(
  current: number | null | undefined,
  previous: number | null | undefined
): number | null {
  if (
    current === null ||
    current === undefined ||
    Number.isNaN(current) ||
    previous === null ||
    previous === undefined ||
    Number.isNaN(previous) ||
    previous === 0
  ) {
    return null;
  }
  return ((current - previous) / Math.abs(previous)) * 100;
}

/**
 * Distance outside the reference range [min, max].
 * Returns 0 if within range.
 */
function distanceToRange(value: number, marker: Pick<Biomarker, 'min' | 'max'>): number {
  if (marker.min !== undefined && value < marker.min) {
    return marker.min - value;
  }
  if (marker.max !== undefined && value > marker.max) {
    return value - marker.max;
  }
  return 0;
}

/**
 * Evaluates whether a change from `previous` to `current` is clinically
 * improving, worsening, or stable, respecting biomarker polarity and reference bounds.
 */
export function evaluateChange(
  current: number | null | undefined,
  previous: number | null | undefined,
  marker: Biomarker
): {
  direction: ClinicalDirection;
  percentChange: number | null;
  arrow: '↑' | '↓' | '→' | '—';
} {
  const pct = getPercentChange(current, previous);
  if (
    current === null ||
    current === undefined ||
    previous === null ||
    previous === undefined ||
    pct === null
  ) {
    return { direction: 'neutral', percentChange: null, arrow: '—' };
  }

  const arrow: '↑' | '↓' | '→' =
    Math.abs(pct) < 1.5 ? '→' : pct > 0 ? '↑' : '↓';

  // Small fluctuations (< 2%) when status hasn't crossed a boundary are considered stable
  const currStatus = getStatus(current, marker);
  const prevStatus = getStatus(previous, marker);

  if (Math.abs(pct) < 2 && currStatus === prevStatus) {
    return { direction: 'stable', percentChange: pct, arrow: '→' };
  }

  // First check if one reading is out of range and the other moved closer/further from range
  const prevOutDist = distanceToRange(previous, marker);
  const currOutDist = distanceToRange(current, marker);

  if (prevOutDist > 0 || currOutDist > 0) {
    if (currOutDist < prevOutDist) {
      return { direction: 'improving', percentChange: pct, arrow };
    }
    if (currOutDist > prevOutDist) {
      return { direction: 'worsening', percentChange: pct, arrow };
    }
  }

  // Both values are inside reference range (or have one-sided/no bounds)
  if (marker.polarity === 'higher-is-better') {
    if (Math.abs(pct) < 3) {
      return { direction: 'stable', percentChange: pct, arrow: '→' };
    }
    return {
      direction: pct > 0 ? 'improving' : 'worsening',
      percentChange: pct,
      arrow,
    };
  }

  if (marker.polarity === 'lower-is-better') {
    if (Math.abs(pct) < 3) {
      return { direction: 'stable', percentChange: pct, arrow: '→' };
    }
    return {
      direction: pct < 0 ? 'improving' : 'worsening',
      percentChange: pct,
      arrow,
    };
  }

  // For 'in-range' polarity when both readings are inside [min, max]:
  if (marker.min !== undefined && marker.max !== undefined) {
    const span = marker.max - marker.min;
    const mid = (marker.min + marker.max) / 2;
    const prevMidDist = Math.abs(previous - mid) / (span / 2);
    const currMidDist = Math.abs(current - mid) / (span / 2);

    // If both are comfortably within the middle 75% of the normal range, small/moderate shifts are 'stable'
    if (prevMidDist <= 0.75 && currMidDist <= 0.75 && Math.abs(pct) < 12) {
      return { direction: 'stable', percentChange: pct, arrow };
    }

    // If moving significantly closer to the center from near the edge
    if (currMidDist < prevMidDist - 0.1) {
      return { direction: 'improving', percentChange: pct, arrow };
    }
    if (currMidDist > prevMidDist + 0.15 && currMidDist > 0.75) {
      return { direction: 'worsening', percentChange: pct, arrow };
    }
  }

  return { direction: 'stable', percentChange: pct, arrow };
}

/**
 * Computes the percentage position relative to the reference range:
 * - For `min–max`: 0% is `min`, 100% is `max`.
 * - For `< max`: 0% is `0`, 100% is `max`.
 * - For `> min`: 100% is `min` (e.g. eGFR 90 = 100%).
 */
export function getRangePosition(
  value: number | null | undefined,
  marker: Pick<Biomarker, 'min' | 'max' | 'refLabel'>
): number | null {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return null;
  }
  if (marker.min !== undefined && marker.max !== undefined) {
    const span = marker.max - marker.min;
    if (span <= 0) return null;
    return ((value - marker.min) / span) * 100;
  }
  if (marker.max !== undefined && marker.max > 0) {
    return (value / marker.max) * 100;
  }
  if (marker.min !== undefined && marker.min > 0) {
    return (value / marker.min) * 100;
  }
  return null;
}

export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return '—';
  }
  const absValue = Math.abs(value);
  if (Number.isInteger(value)) {
    return value.toString();
  }
  if (absValue >= 100) {
    return Number(value.toFixed(1)).toString();
  }
  if (absValue >= 10) {
    return Number(value.toFixed(2)).toString();
  }
  return Number(value.toFixed(3)).toString();
}

export function formatDisplayValue(
  value: number | null | undefined,
  marker: Pick<Biomarker, 'min' | 'max' | 'refLabel'>,
  mode: 'absolute' | 'percent'
): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return '—';
  }
  if (mode === 'percent') {
    const pos = getRangePosition(value, marker);
    if (pos === null) {
      return formatNumber(value);
    }
    return `${Math.round(pos)}%`;
  }
  return formatNumber(value);
}

/**
 * Formats signed percent change cleanly (e.g. "+14.2%", "-8.4%").
 * Never produces double signs when combined with arrows.
 */
export function formatSignedPercent(percent: number | null | undefined): string {
  if (percent === null || percent === undefined || Number.isNaN(percent)) {
    return '—';
  }
  const digits = Math.abs(percent) < 1 && percent !== 0 ? 2 : 1;
  const fixed = Math.abs(percent).toFixed(digits);
  if (percent > 0) return `+${fixed}%`;
  if (percent < 0) return `-${fixed}%`;
  return `0.0%`;
}

/**
 * Checks if a biomarker is within normal range but close to a clinical boundary (within 10% of span/threshold).
 */
export function isBorderlineNormal(
  value: number | null | undefined,
  marker: Biomarker
): { isBorderline: boolean; note: string } {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return { isBorderline: false, note: '' };
  }
  const status = getStatus(value, marker);
  if (status !== 'normal') {
    return { isBorderline: false, note: '' };
  }

  if (marker.min !== undefined && marker.max !== undefined) {
    const span = marker.max - marker.min;
    const pos = (value - marker.min) / span;
    if (pos <= 0.1 && marker.polarity !== 'lower-is-better') {
      return {
        isBorderline: true,
        note: `Near lower limit (${formatNumber(value)} vs ${marker.refLabel} ${marker.unit})`,
      };
    }
    if (pos >= 0.9 && marker.polarity !== 'higher-is-better') {
      return {
        isBorderline: true,
        note: `Near upper limit (${formatNumber(value)} vs ${marker.refLabel} ${marker.unit})`,
      };
    }
  } else if (marker.max !== undefined) {
    const ratio = value / marker.max;
    if (ratio >= 0.92) {
      return {
        isBorderline: true,
        note: `Approaching upper limit (${formatNumber(value)} vs ${marker.refLabel} ${marker.unit})`,
      };
    }
  } else if (marker.min !== undefined) {
    const ratio = value / marker.min;
    if (ratio <= 1.12) {
      return {
        isBorderline: true,
        note: `Near minimum threshold (${formatNumber(value)} vs ${marker.refLabel} ${marker.unit})`,
      };
    }
  }

  return { isBorderline: false, note: '' };
}

/**
 * Given a map of raw biomarker inputs for a new lab panel, automatically computes
 * all 11 derived biomarkers if they aren't manually overridden.
 */
export function computeDerivedBiomarkers(
  rawInputs: Record<string, number | null | undefined>
): Record<string, { value: number; formula: string }> {
  const derived: Record<string, { value: number; formula: string }> = {};

  const num = (key: string): number | null => {
    const v = rawInputs[key];
    return typeof v === 'number' && Number.isFinite(v) ? v : null;
  };

  // 1. BUN (mg/dL) = Urea (mg/dL) / 2.14
  const urea = num('Urea (mg/dL)');
  if (urea !== null && urea > 0) {
    derived['BUN (mg/dL)'] = {
      value: Number((urea / 2.14).toFixed(2)),
      formula: `${urea} ÷ 2.14`,
    };
  }

  // 2. Globulin (g/L) = Total Protein (g/L) - Albumin (g/L)
  const totalProtein = num('Total Protein (g/L)');
  const albumin = num('Albumin (g/L)');
  if (totalProtein !== null && albumin !== null && totalProtein > albumin) {
    const glob = Number((totalProtein - albumin).toFixed(2));
    derived['Globulin (g/L)'] = {
      value: glob,
      formula: `${totalProtein} − ${albumin}`,
    };
  }

  // 3. A/G Ratio = Albumin / Globulin
  const effectiveGlobulin =
    num('Globulin (g/L)') ?? derived['Globulin (g/L)']?.value ?? null;
  if (albumin !== null && effectiveGlobulin !== null && effectiveGlobulin > 0) {
    derived['A/G Ratio'] = {
      value: Number((albumin / effectiveGlobulin).toFixed(2)),
      formula: `${albumin} ÷ ${effectiveGlobulin}`,
    };
  }

  // 4. VLDL (mg/dL) = Triglycerides / 5
  const trigs = num('Triglycerides (mg/dL)');
  if (trigs !== null && trigs >= 0) {
    derived['VLDL (mg/dL)'] = {
      value: Number((trigs / 5).toFixed(2)),
      formula: `${trigs} ÷ 5`,
    };
  }

  // 5. Non-HDL (mg/dL) = Total Cholesterol - HDL
  const tc = num('Total Cholesterol (mg/dL)');
  const hdl = num('HDL (mg/dL)');
  if (tc !== null && hdl !== null && tc > hdl) {
    derived['Non-HDL (mg/dL)'] = {
      value: Number((tc - hdl).toFixed(2)),
      formula: `${tc} − ${hdl}`,
    };
  }

  // 6. Total/HDL Ratio = Total Cholesterol / HDL
  if (tc !== null && hdl !== null && hdl > 0) {
    derived['Total/HDL Ratio'] = {
      value: Number((tc / hdl).toFixed(2)),
      formula: `${tc} ÷ ${hdl}`,
    };
  }

  // 7. LDL/HDL Ratio = LDL / HDL
  const ldl = num('LDL (mg/dL)');
  if (ldl !== null && hdl !== null && hdl > 0) {
    derived['LDL/HDL Ratio'] = {
      value: Number((ldl / hdl).toFixed(2)),
      formula: `${ldl} ÷ ${hdl}`,
    };
  }

  // 8. Trig/HDL Ratio = Triglycerides / HDL
  if (trigs !== null && hdl !== null && hdl > 0) {
    derived['Trig/HDL Ratio'] = {
      value: Number((trigs / hdl).toFixed(2)),
      formula: `${trigs} ÷ ${hdl}`,
    };
  }

  // 9. UIBC (μg/dL) = TIBC - Iron
  const tibc = num('TIBC (μg/dL)');
  const iron = num('Iron (μg/dL)');
  if (tibc !== null && iron !== null && tibc > iron) {
    derived['UIBC (μg/dL)'] = {
      value: Number((tibc - iron).toFixed(2)),
      formula: `${tibc} − ${iron}`,
    };
  }

  // 10. Transferrin Sat (%) = (Iron / TIBC) * 100
  if (iron !== null && tibc !== null && tibc > 0) {
    derived['Transferrin Sat (%)'] = {
      value: Number(((iron / tibc) * 100).toFixed(2)),
      formula: `(${iron} ÷ ${tibc}) × 100`,
    };
  }

  // 11. Free Androgen Index = (Total Testosterone [ng/mL] * 3.467 / SHBG [nmol/L]) * 100
  const testo = num('Total Testosterone (ng/mL)');
  const shbg = num('SHBG (nmol/L)');
  if (testo !== null && shbg !== null && shbg > 0) {
    const testoNmol = testo * 3.467;
    derived['Free Androgen Index'] = {
      value: Number(((testoNmol / shbg) * 100).toFixed(2)),
      formula: `((${testo} × 3.467) ÷ ${shbg}) × 100`,
    };
  }

  return derived;
}

/**
 * Generates RFC-4180 compliant CSV string with UTF-8 BOM (\uFEFF) so μ/⁹/¹²/³ characters render properly in Excel.
 */
export function buildCsvContent(
  biomarkers: Biomarker[],
  dates: string[],
  categoryLabels: Record<CategoryId, string>
): string {
  const escapeCsv = (val: string | number | null | undefined): string => {
    if (val === null || val === undefined) return '';
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const headers = [
    'Category',
    'Biomarker',
    'Unit',
    ...dates,
    'Latest Value',
    'Latest Date',
    'Status',
    'Clinical Direction (vs Prior)',
    'Latest Change %',
    'Total Change % (vs Baseline)',
    'Reference Range',
  ];

  const rows = biomarkers.map((marker) => {
    const latest = getLatestReading(marker.values, dates);
    const previous = getPreviousReading(marker.values, dates);
    const baseline = getBaselineReading(marker.values, dates);

    const status = getStatus(latest.value, marker);
    const latestEval = evaluateChange(latest.value, previous.value, marker);
    const totalPct = getPercentChange(latest.value, baseline.value);

    return [
      escapeCsv(categoryLabels[marker.category] ?? marker.category),
      escapeCsv(marker.name),
      escapeCsv(marker.unit),
      ...marker.values.map((v) => (v === null || v === undefined ? '' : v)),
      latest.value ?? '',
      escapeCsv(latest.date ?? ''),
      escapeCsv(status.toUpperCase()),
      escapeCsv(latestEval.direction),
      escapeCsv(formatSignedPercent(latestEval.percentChange)),
      escapeCsv(formatSignedPercent(totalPct)),
      escapeCsv(marker.refLabel),
    ].join(',');
  });

  return `\uFEFF${headers.map(escapeCsv).join(',')}\n${rows.join('\n')}\n`;
}
