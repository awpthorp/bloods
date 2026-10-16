'use client';

import React, { useMemo, useState } from 'react';
import { Biomarker, CATEGORIES, CategoryId } from '@/data/blood-tests';
import {
  computeDerivedBiomarkers,
  formatNumber,
  getLatestReading,
  getStatus,
} from '@/lib/biomarker-utils';
import {
  X,
  PlusCircle,
  Calculator,
  Sparkles,
  Copy,
  Check,
  ArrowRightLeft,
} from 'lucide-react';

interface AddPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  biomarkers: Biomarker[];
  dates: string[];
  onSavePanel: (dateLabel: string, valuesByBiomarker: Record<string, number | null>) => void;
}

const SI_CONVERTERS: Record<
  string,
  { siUnit: string; factor: number; label: string }
> = {
  'Calcium (mg/dL)': {
    siUnit: 'mmol/L',
    factor: 4.008,
    label: 'Convert mmol/L × 4.008 → mg/dL',
  },
  'Magnesium (mg/dL)': {
    siUnit: 'mmol/L',
    factor: 2.4305,
    label: 'Convert mmol/L × 2.4305 → mg/dL',
  },
  'Total Cholesterol (mg/dL)': {
    siUnit: 'mmol/L',
    factor: 38.67,
    label: 'Convert mmol/L × 38.67 → mg/dL',
  },
  'HDL (mg/dL)': {
    siUnit: 'mmol/L',
    factor: 38.67,
    label: 'Convert mmol/L × 38.67 → mg/dL',
  },
  'LDL (mg/dL)': {
    siUnit: 'mmol/L',
    factor: 38.67,
    label: 'Convert mmol/L × 38.67 → mg/dL',
  },
  'Triglycerides (mg/dL)': {
    siUnit: 'mmol/L',
    factor: 88.57,
    label: 'Convert mmol/L × 88.57 → mg/dL',
  },
  'Creatinine (mg/dL)': {
    siUnit: 'μmol/L',
    factor: 1 / 88.4,
    label: 'Convert μmol/L ÷ 88.4 → mg/dL',
  },
};

export default function AddPanelModal({
  isOpen,
  onClose,
  biomarkers,
  dates,
  onSavePanel,
}: AddPanelModalProps) {
  const [dateLabel, setDateLabel] = useState('Apr 2027');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('biochemistry');
  const [rawInputs, setRawInputs] = useState<Record<string, string>>({});
  const [copiedJson, setCopiedJson] = useState(false);

  const numericInputs = useMemo(() => {
    const out: Record<string, number | null> = {};
    Object.entries(rawInputs).forEach(([k, v]) => {
      const trimmed = v.trim();
      if (!trimmed) {
        out[k] = null;
      } else {
        const parsed = Number(trimmed);
        out[k] = Number.isFinite(parsed) ? parsed : null;
      }
    });
    return out;
  }, [rawInputs]);

  const autoDerived = useMemo(
    () => computeDerivedBiomarkers(numericInputs),
    [numericInputs]
  );

  if (!isOpen) return null;

  const getEffectiveValue = (name: string): number | null => {
    if (numericInputs[name] !== undefined && numericInputs[name] !== null) {
      return numericInputs[name];
    }
    if (autoDerived[name] !== undefined) {
      return autoDerived[name].value;
    }
    return null;
  };

  const filledCount = biomarkers.filter(
    (b) => getEffectiveValue(b.name) !== null
  ).length;

  const handleApplySiConversion = (markerName: string) => {
    const conv = SI_CONVERTERS[markerName];
    const currentVal = numericInputs[markerName];
    if (!conv || currentVal === null || currentVal === undefined) return;
    const converted = Number((currentVal * conv.factor).toFixed(2));
    setRawInputs((prev) => ({ ...prev, [markerName]: String(converted) }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateLabel.trim()) return;
    const finalMap: Record<string, number | null> = {};
    biomarkers.forEach((b) => {
      finalMap[b.name] = getEffectiveValue(b.name);
    });
    onSavePanel(dateLabel.trim(), finalMap);
    onClose();
  };

  const handleCopyJson = () => {
    const payload: Record<string, number | null> = {};
    biomarkers.forEach((b) => {
      payload[b.name] = getEffectiveValue(b.name);
    });
    navigator.clipboard.writeText(
      JSON.stringify({ date: dateLabel.trim(), results: payload }, null, 2)
    );
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const markersInCategory = biomarkers.filter(
    (b) => b.category === activeCategory
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-2.5 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-panel-title"
    >
      <div className="w-full max-w-4xl rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-2xl overflow-hidden my-4 sm:my-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 sm:gap-4 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 sm:px-6 py-3.5 sm:py-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono-tabular uppercase tracking-wider text-sky-400">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Live Lab Panel Importer &amp; Derived Ratio Engine</span>
            </div>
            <h2
              id="add-panel-title"
              className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mt-0.5"
            >
              Add New Blood Test Panel
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[84vh] overflow-y-auto">
          {/* Date & Auto-Calculated Summary Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-3.5 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 w-full sm:w-auto">
              <label
                htmlFor="panel-date-input"
                className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
              >
                Panel Date Label:
              </label>
              <input
                id="panel-date-input"
                type="text"
                value={dateLabel}
                onChange={(e) => setDateLabel(e.target.value)}
                placeholder="e.g. Apr 2027"
                required
                className="w-full sm:w-auto rounded-lg border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3 py-1.5 text-base sm:text-sm font-mono-tabular text-[var(--text-primary)] focus:border-sky-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono-tabular">
              <span className="px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30">
                {filledCount} / {biomarkers.length} Biomarkers Ready
              </span>
              <span className="px-2.5 py-1 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/30">
                {Object.keys(autoDerived).length} Auto-Derived
              </span>
            </div>
          </div>

          {/* Category Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-nowrap -mx-1 px-1 pb-0.5 sm:flex-wrap sm:overflow-visible sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => {
              const catMarkers = biomarkers.filter((b) => b.category === cat.id);
              const catFilled = catMarkers.filter(
                (b) => getEffectiveValue(b.name) !== null
              ).length;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-sky-500 text-slate-950 font-semibold shadow-sm'
                      : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                  }`}
                >
                  <span>{cat.shortLabel}</span>
                  <span
                    className={`font-mono-tabular text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-slate-950/20 text-slate-950'
                        : 'bg-[var(--bg-subtle)] text-[var(--text-muted)]'
                    }`}
                  >
                    {catFilled}/{catMarkers.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Biomarker Input Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {markersInCategory.map((marker) => {
              const latest = getLatestReading(marker.values, dates);
              const derivedObj = autoDerived[marker.name];
              const manualRaw = rawInputs[marker.name] ?? '';
              const isUsingAuto =
                manualRaw.trim() === '' && derivedObj !== undefined;
              const effectiveVal = getEffectiveValue(marker.name);
              const status = getStatus(effectiveVal, marker);
              const siConverter = SI_CONVERTERS[marker.name];

              return (
                <div
                  key={marker.name}
                  className={`rounded-xl border p-3.5 transition-colors min-w-0 ${
                    isUsingAuto
                      ? 'border-violet-500/40 bg-violet-500/5'
                      : effectiveVal !== null
                      ? 'border-sky-500/40 bg-[var(--bg-elevated)]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-elevated)]/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="min-w-0">
                      <label className="text-xs font-semibold text-[var(--text-primary)] flex flex-wrap items-center gap-1.5">
                        <span>{marker.name}</span>
                        {marker.isDerived && (
                          <span
                            className="inline-flex items-center gap-0.5 text-[10px] font-mono-tabular px-1.5 py-0.5 rounded bg-violet-500/15 text-violet-300"
                            title={`Auto-computes via: ${marker.formulaDescription}`}
                          >
                            <Calculator className="w-2.5 h-2.5" />
                            Auto
                          </span>
                        )}
                      </label>
                      <div className="text-[11px] text-[var(--text-muted)] font-mono-tabular">
                        Ref: {marker.refLabel} {marker.unit} · Last:{' '}
                        {formatNumber(latest.value)} ({latest.date ?? '—'})
                      </div>
                    </div>

                    {effectiveVal !== null && status !== 'unknown' && (
                      <span
                        className={`text-[10px] font-mono-tabular uppercase px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                          status === 'normal'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : status === 'high'
                            ? 'bg-rose-500/15 text-rose-400'
                            : 'bg-amber-500/15 text-amber-400'
                        }`}
                      >
                        {status}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mt-2">
                    <input
                      type="number"
                      step="any"
                      value={
                        isUsingAuto ? String(derivedObj.value) : manualRaw
                      }
                      onChange={(e) =>
                        setRawInputs((prev) => ({
                          ...prev,
                          [marker.name]: e.target.value,
                        }))
                      }
                      placeholder={
                        marker.isDerived
                          ? `Auto (${marker.formulaDescription})`
                          : `Enter ${marker.unit}...`
                      }
                      className={`w-full rounded-lg border px-3 py-1.5 text-base sm:text-sm font-mono-tabular focus:outline-none ${
                        isUsingAuto
                          ? 'border-violet-500/40 bg-violet-500/10 text-violet-200'
                          : 'border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-primary)] focus:border-sky-400'
                      }`}
                    />
                    {siConverter && effectiveVal !== null && (
                      <button
                        type="button"
                        onClick={() => handleApplySiConversion(marker.name)}
                        title={siConverter.label}
                        className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1.5 text-[11px] font-mono-tabular text-amber-300 hover:bg-amber-500/20"
                      >
                        <ArrowRightLeft className="w-3 h-3" />
                        {siConverter.siUnit}→mg/dL
                      </button>
                    )}
                  </div>

                  {isUsingAuto && (
                    <div className="mt-1.5 text-[10px] font-mono-tabular text-violet-300">
                      Auto-calculated: {derivedObj.formula} = {derivedObj.value}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 pt-4 border-t border-[var(--border-subtle)]">
            <button
              type="button"
              onClick={handleCopyJson}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] hover:border-sky-400 transition-colors"
            >
              {copiedJson ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  Copied Panel JSON
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-sky-400" />
                  Copy Panel JSON
                </>
              )}
            </button>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-[var(--border-subtle)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={filledCount === 0}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-sky-500 px-5 py-2 text-xs font-semibold text-slate-950 hover:bg-sky-400 disabled:opacity-40 transition-colors shadow-lg shadow-sky-500/20"
              >
                <PlusCircle className="w-4 h-4" />
                Save Panel to Telemetry ({filledCount} markers)
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
