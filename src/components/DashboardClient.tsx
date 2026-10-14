'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  type Biomarker,
  CATEGORIES,
  type CategoryId,
  type DataAuditEntry,
} from '@/data/blood-tests';
import {
  buildCsvContent,
  evaluateChange,
  formatDisplayValue,
  formatNumber,
  formatSignedPercent,
  getBaselineReading,
  getLatestReading,
  getPreviousReading,
  getRangePosition,
  getStatus,
  isAbnormalStatus,
  isBorderlineNormal,
  slugify,
} from '@/lib/biomarker-utils';
import SparklineSvg from '@/components/SparklineSvg';
import SystemsChartsGrid from '@/components/SystemsChartsGrid';
import BiomarkerModal from '@/components/BiomarkerModal';
import AddPanelModal from '@/components/AddPanelModal';
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Download,
  Eye,
  Filter,
  Lock,
  Moon,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

const STORAGE_KEY = 'bloods_telemetry_custom_panels_v1';

interface CustomPanelEntry {
  date: string;
  valuesByBiomarker: Record<string, number | null>;
}

export interface DashboardClientProps {
  initialBiomarkers: Biomarker[];
  initialDates: string[];
  dataAuditLog: DataAuditEntry[];
}

const KPI_HEADLINE_NAMES = [
  'eGFR (ml/min)',
  'Creatinine (mg/dL)',
  'LDL (mg/dL)',
  'Total Testosterone (ng/mL)',
  'Triglycerides (mg/dL)',
  'HbA1c (%)',
];

export default function DashboardClient({
  initialBiomarkers,
  initialDates,
  dataAuditLog,
}: DashboardClientProps) {
  const router = useRouter();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isLocking, setIsLocking] = useState(false);
  const [customPanels, setCustomPanels] = useState<CustomPanelEntry[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'abnormal' | 'normal' | 'improving' | 'worsening'
  >('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [displayMode, setDisplayMode] = useState<'absolute' | 'percent'>('absolute');
  const [onlyAudited, setOnlyAudited] = useState(false);
  const [showAuditDrawer, setShowAuditDrawer] = useState(false);
  const [activeModalMarkerName, setActiveModalMarkerName] = useState<string | null>(
    null
  );
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);

  // Load saved custom panels and theme preference on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setCustomPanels(parsed);
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const handleLockSession = async () => {
    if (isLocking) return;
    setIsLocking(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // proceed to login even if network call fails
    }
    router.replace('/login');
    router.refresh();
  };

  // Merge base dataset with any user-added panels
  const { dates, biomarkers } = useMemo(() => {
    const mergedDates = [...initialDates, ...customPanels.map((p) => p.date)];
    const mergedMarkers: Biomarker[] = initialBiomarkers.map((m) => ({
      ...m,
      values: [
        ...m.values,
        ...customPanels.map((p) =>
          p.valuesByBiomarker[m.name] !== undefined
            ? p.valuesByBiomarker[m.name]
            : null
        ),
      ],
    }));
    return { dates: mergedDates, biomarkers: mergedMarkers };
  }, [initialDates, initialBiomarkers, customPanels]);

  const markerByName = useMemo(() => {
    const map = new Map<string, Biomarker>();
    biomarkers.forEach((b) => map.set(b.name, b));
    return map;
  }, [biomarkers]);

  const categoryLabels = useMemo(() => {
    const rec = {} as Record<CategoryId, string>;
    CATEGORIES.forEach((c) => {
      rec[c.id] = c.shortLabel;
    });
    return rec;
  }, []);

  const handleSaveCustomPanel = (
    dateLabel: string,
    valuesByBiomarker: Record<string, number | null>
  ) => {
    const updated = [...customPanels, { date: dateLabel, valuesByBiomarker }];
    setCustomPanels(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore quota errors
    }
  };

  const handleResetCustomPanels = () => {
    setCustomPanels([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Jump to a biomarker row in the table, clearing any active hiding filters first!
  const jumpToBiomarker = (biomarkerName: string, openModal = false) => {
    if (openModal) {
      setActiveModalMarkerName(biomarkerName);
      return;
    }
    setSelectedCategory('all');
    setStatusFilter('all');
    setSearchTerm('');
    setOnlyAudited(false);

    const slug = slugify(biomarkerName);
    setHighlightedSlug(slug);

    setTimeout(() => {
      const rowEl = document.getElementById(`row-${slug}`);
      if (rowEl) {
        rowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 60);

    setTimeout(() => {
      setHighlightedSlug((prev) => (prev === slug ? null : prev));
    }, 2700);
  };

  // Compute dynamic clinical insights across all biomarkers
  const clinicalBrief = useMemo(() => {
    const actionable: {
      marker: Biomarker;
      latestVal: number;
      latestDate: string;
      status: 'high' | 'low';
      note: string;
    }[] = [];

    const watchlist: {
      marker: Biomarker;
      latestVal: number;
      latestDate: string;
      note: string;
    }[] = [];

    const improvements: {
      marker: Biomarker;
      latestVal: number;
      priorVal: number;
      pctText: string;
      note: string;
    }[] = [];

    biomarkers.forEach((m) => {
      const latest = getLatestReading(m.values, dates);
      const prev = getPreviousReading(m.values, dates);
      const base = getBaselineReading(m.values, dates);
      if (latest.value === null || !latest.date) return;

      const status = getStatus(latest.value, m);
      if (status === 'high' || status === 'low') {
        const deltaEval = evaluateChange(latest.value, prev.value, m);
        const deltaNote =
          prev.value !== null
            ? `was ${formatNumber(prev.value)} in ${prev.date} (${formatSignedPercent(
                deltaEval.percentChange
              )})`
            : `ref ${m.refLabel} ${m.unit}`;
        actionable.push({
          marker: m,
          latestVal: latest.value,
          latestDate: latest.date,
          status,
          note: `${formatNumber(latest.value)} ${m.unit} vs ${m.refLabel} — ${deltaNote}`,
        });
      } else {
        const borderline = isBorderlineNormal(latest.value, m);
        // Also check if there was a prior out-of-range value that warrants monitoring
        const hadPriorAbnormal = m.values.some(
          (v, idx) =>
            idx < latest.index && isAbnormalStatus(getStatus(v, m))
        );
        if (borderline.isBorderline) {
          watchlist.push({
            marker: m,
            latestVal: latest.value,
            latestDate: latest.date,
            note: borderline.note,
          });
        } else if (
          hadPriorAbnormal &&
          (m.name === 'Free Androgen Index' ||
            m.name === 'Platelets (10³/uL)' ||
            m.name === 'Bilirubin Total (mg/dL)' ||
            m.name === 'ALT (U/L)')
        ) {
          watchlist.push({
            marker: m,
            latestVal: latest.value,
            latestDate: latest.date,
            note: `Now in range (${formatNumber(latest.value)} ${m.unit}), previously out of range`,
          });
        }
      }

      // Check notable clinical improvements (either vs prior or vs baseline)
      const vsPrior = evaluateChange(latest.value, prev.value, m);
      const vsBase = evaluateChange(latest.value, base.value, m);

      if (
        status === 'normal' &&
        vsBase.direction === 'improving' &&
        vsBase.percentChange !== null &&
        Math.abs(vsBase.percentChange) >= 6
      ) {
        improvements.push({
          marker: m,
          latestVal: latest.value,
          priorVal: base.value!,
          pctText: formatSignedPercent(vsBase.percentChange),
          note: `${formatNumber(base.value)} → ${formatNumber(latest.value)} ${
            m.unit
          } (${base.date} to ${latest.date})`,
        });
      } else if (
        status === 'normal' &&
        vsPrior.direction === 'improving' &&
        vsPrior.percentChange !== null &&
        Math.abs(vsPrior.percentChange) >= 12
      ) {
        improvements.push({
          marker: m,
          latestVal: latest.value,
          priorVal: prev.value!,
          pctText: formatSignedPercent(vsPrior.percentChange),
          note: `${formatNumber(prev.value)} → ${formatNumber(latest.value)} ${
            m.unit
          } (${prev.date} to ${latest.date})`,
        });
      }
    });

    return {
      actionable,
      watchlist: watchlist.slice(0, 6),
      improvements: improvements.slice(0, 6),
    };
  }, [biomarkers, dates]);

  // Filtered rows for the table
  const filteredBiomarkers = useMemo(() => {
    return biomarkers.filter((marker) => {
      if (selectedCategory !== 'all' && marker.category !== selectedCategory) {
        return false;
      }
      if (
        searchTerm.trim() !== '' &&
        !marker.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      ) {
        return false;
      }
      if (onlyAudited) {
        const hasAudit =
          marker.auditNotes && Object.keys(marker.auditNotes).length > 0;
        if (!hasAudit) return false;
      }

      const latest = getLatestReading(marker.values, dates);
      const prev = getPreviousReading(marker.values, dates);
      const status = getStatus(latest.value, marker);
      const changeEval = evaluateChange(latest.value, prev.value, marker);

      if (statusFilter === 'abnormal') {
        // Crucial bug fix: only 'high' or 'low' are abnormal; 'unknown' (Free PSA) is NOT abnormal
        return isAbnormalStatus(status);
      }
      if (statusFilter === 'normal') {
        return status === 'normal';
      }
      if (statusFilter === 'improving') {
        return changeEval.direction === 'improving';
      }
      if (statusFilter === 'worsening') {
        return changeEval.direction === 'worsening';
      }
      return true;
    });
  }, [
    biomarkers,
    dates,
    selectedCategory,
    searchTerm,
    onlyAudited,
    statusFilter,
  ]);

  // Summary counts for filter badges
  const statusCounts = useMemo(() => {
    let normal = 0;
    let abnormal = 0;
    let improving = 0;
    let worsening = 0;

    biomarkers.forEach((m) => {
      const latest = getLatestReading(m.values, dates);
      const prev = getPreviousReading(m.values, dates);
      const st = getStatus(latest.value, m);
      const ev = evaluateChange(latest.value, prev.value, m);
      if (st === 'normal') normal += 1;
      if (isAbnormalStatus(st)) abnormal += 1;
      if (ev.direction === 'improving') improving += 1;
      if (ev.direction === 'worsening') worsening += 1;
    });

    return {
      total: biomarkers.length,
      normal,
      abnormal,
      improving,
      worsening,
    };
  }, [biomarkers, dates]);

  // Export CSV with UTF-8 BOM and URL revocation
  const handleExportCsv = () => {
    const rowsToExport =
      filteredBiomarkers.length > 0 ? filteredBiomarkers : biomarkers;
    const csv = buildCsvContent(rowsToExport, dates, categoryLabels);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const suffix =
      rowsToExport.length === biomarkers.length
        ? 'full-46-biomarkers'
        : `filtered-${rowsToExport.length}-biomarkers`;
    link.download = `blood-telemetry-${suffix}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const activeModalMarker = activeModalMarkerName
    ? markerByName.get(activeModalMarkerName) ?? null
    : null;

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] pb-20">
      {/* Top Sticky Telemetry Header */}
      <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0 shadow-inner">
              <Activity className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)]">
                  Biomarker &amp; Longevity Telemetry
                </h1>
                <span className="text-[11px] font-mono-tabular uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Male · Mid-30s
                </span>
                <span className="text-[11px] font-mono-tabular px-2.5 py-0.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                  {dates.length} Panels ({dates[0]} – {dates[dates.length - 1]})
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {biomarkers.length} clinical biomarkers across 7 physiological systems · Polarity-aware delta engine
              </p>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAuditDrawer((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                showAuditDrawer
                  ? 'border-sky-400 bg-sky-500/15 text-sky-300'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Data Audit Log</span>
              <span className="font-mono-tabular px-1.5 py-0.2 rounded-full bg-sky-500/20 text-sky-300 text-[10px]">
                {dataAuditLog.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsAddPanelOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-sky-500 px-3.5 py-2 text-xs font-semibold text-slate-950 hover:bg-sky-400 transition-colors shadow-sm shadow-sky-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add Lab Panel</span>
            </button>

            {customPanels.length > 0 && (
              <button
                type="button"
                onClick={handleResetCustomPanels}
                title="Remove custom local panels and restore 5 baseline panels"
                className="inline-flex items-center gap-1 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-500/20"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Custom ({customPanels.length})</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2 text-xs font-semibold text-[var(--text-primary)] hover:border-sky-400 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            <button
              type="button"
              onClick={handleLockSession}
              disabled={isLocking}
              title="Lock telemetry session and require password"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:border-rose-400/50 hover:text-rose-300 transition-colors disabled:opacity-50"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isLocking ? 'Locking...' : 'Lock'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        {/* Collapsible Verified Data Audit Log Drawer */}
        {showAuditDrawer && (
          <section className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-5 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <div className="flex items-center gap-2 text-sky-400 text-xs font-mono-tabular uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  Historical Data Integrity &amp; Unit Audit
                </div>
                <h2 className="text-base font-semibold text-[var(--text-primary)] mt-0.5">
                  {dataAuditLog.length} Verified Corrections Applied to Legacy Dataset
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOnlyAudited((prev) => !prev);
                  const tableEl = document.getElementById('biomarker-table-section');
                  tableEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`self-start sm:self-auto px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  onlyAudited
                    ? 'bg-sky-500 text-slate-950 border-sky-400'
                    : 'bg-[var(--bg-elevated)] text-sky-400 border-sky-500/30 hover:bg-sky-500/15'
                }`}
              >
                {onlyAudited ? 'Showing Only Audited Rows ✓' : 'Filter Table to Audited Rows'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {dataAuditLog.map((entry) => (
                <div
                  key={`${entry.biomarker}-${entry.date}`}
                  onClick={() => jumpToBiomarker(entry.biomarker)}
                  className="cursor-pointer rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3.5 hover:border-sky-400/50 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-semibold text-xs text-[var(--text-primary)]">
                      {entry.biomarker}
                    </span>
                    <span className="font-mono-tabular text-[10px] px-2 py-0.5 rounded bg-sky-500/15 text-sky-300">
                      {entry.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono-tabular my-1">
                    <span className="line-through text-rose-400/80">
                      {entry.legacyValue}
                    </span>
                    <span className="text-[var(--text-muted)]">→</span>
                    <span className="font-semibold text-emerald-400">
                      {entry.correctedValue}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                    {entry.reason}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Dynamic Clinical Brief (3 Cards) */}
        <section
          aria-label="Clinical Telemetry Brief"
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          {/* Card 1: Out of Range / Action Required */}
          <div className="rounded-2xl border border-rose-500/30 bg-[var(--bg-surface)] p-5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-rose-400">
                    Out of Range · Latest Panel ({dates[dates.length - 1]})
                  </h2>
                </div>
                <span className="font-mono-tabular text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30">
                  {clinicalBrief.actionable.length} Markers
                </span>
              </div>

              <ul className="space-y-2">
                {clinicalBrief.actionable.map((item) => (
                  <li
                    key={item.marker.name}
                    className="group flex items-start justify-between gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/60 p-2.5 hover:border-rose-500/40 transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => jumpToBiomarker(item.marker.name, false)}
                      className="text-left flex-1"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[var(--text-primary)] group-hover:text-rose-300 transition-colors">
                          {item.marker.name}
                        </span>
                        <span
                          className={`text-[10px] font-mono-tabular uppercase px-1.5 py-0.2 rounded font-semibold ${
                            item.status === 'high'
                              ? 'bg-rose-500/20 text-rose-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono-tabular text-[var(--text-secondary)] mt-0.5">
                        {item.note}
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => jumpToBiomarker(item.marker.name, true)}
                      className="p-1.5 text-[var(--text-muted)] hover:text-sky-400 rounded-lg"
                      title={`Open trajectory chart for ${item.marker.name}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: Borderline & Watchlist */}
          <div className="rounded-2xl border border-amber-500/30 bg-[var(--bg-surface)] p-5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400 shrink-0" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                    Borderline &amp; Historical Watchlist
                  </h2>
                </div>
                <span className="font-mono-tabular text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  {clinicalBrief.watchlist.length} Markers
                </span>
              </div>

              <ul className="space-y-2">
                {clinicalBrief.watchlist.map((item) => (
                  <li
                    key={item.marker.name}
                    className="group flex items-start justify-between gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/60 p-2.5 hover:border-amber-500/40 transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => jumpToBiomarker(item.marker.name, false)}
                      className="text-left flex-1"
                    >
                      <div className="font-semibold text-xs text-[var(--text-primary)] group-hover:text-amber-300 transition-colors">
                        {item.marker.name}
                      </div>
                      <p className="text-[11px] font-mono-tabular text-[var(--text-secondary)] mt-0.5">
                        {item.note}
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => jumpToBiomarker(item.marker.name, true)}
                      className="p-1.5 text-[var(--text-muted)] hover:text-sky-400 rounded-lg"
                      title={`Open trajectory chart for ${item.marker.name}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 3: Positive Physiological Trajectories */}
          <div className="rounded-2xl border border-emerald-500/30 bg-[var(--bg-surface)] p-5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                    Favorable Trajectories &amp; Rebounds
                  </h2>
                </div>
                <span className="font-mono-tabular text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {statusCounts.normal}/{statusCounts.total} In Range
                </span>
              </div>

              <ul className="space-y-2">
                {clinicalBrief.improvements.map((item) => (
                  <li
                    key={item.marker.name}
                    className="group flex items-start justify-between gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/60 p-2.5 hover:border-emerald-500/40 transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => jumpToBiomarker(item.marker.name, false)}
                      className="text-left flex-1"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[var(--text-primary)] group-hover:text-emerald-300 transition-colors">
                          {item.marker.name}
                        </span>
                        <span className="text-[10px] font-mono-tabular px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 font-semibold">
                          {item.pctText}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono-tabular text-[var(--text-secondary)] mt-0.5">
                        {item.note}
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => jumpToBiomarker(item.marker.name, true)}
                      className="p-1.5 text-[var(--text-muted)] hover:text-sky-400 rounded-lg"
                      title={`Open trajectory chart for ${item.marker.name}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 6 Headline KPI Telemetry Cards */}
        <section aria-label="Headline Biomarker KPIs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
            {KPI_HEADLINE_NAMES.map((name) => {
              const marker = markerByName.get(name);
              if (!marker) return null;
              const latest = getLatestReading(marker.values, dates);
              const previous = getPreviousReading(marker.values, dates);
              const status = getStatus(latest.value, marker);
              const changeEval = evaluateChange(
                latest.value,
                previous.value,
                marker
              );
              const formattedVal = formatDisplayValue(
                latest.value,
                marker,
                displayMode
              );

              return (
                <div
                  key={marker.name}
                  onClick={() => setActiveModalMarkerName(marker.name)}
                  className="cursor-pointer group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 hover:border-sky-400/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] truncate">
                        {marker.name.replace(/\s*\([^)]*\)/, '')}
                      </span>
                      <span
                        className={`text-[10px] font-mono-tabular uppercase px-2 py-0.5 rounded-full font-semibold ${
                          status === 'normal'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : status === 'high'
                            ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {status}
                      </span>
                    </div>

                    {/* Value display: fixes % of Range unit collision! */}
                    <div className="mt-2.5 flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold font-mono-tabular text-[var(--text-primary)]">
                        {formattedVal}
                      </span>
                      <span className="text-xs font-mono-tabular text-[var(--text-muted)]">
                        {displayMode === 'percent' ? 'of ref' : marker.unit}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                    {/* Delta vs prior: fixes double sign bug! */}
                    <span
                      className={`inline-flex items-center gap-1 font-mono-tabular font-semibold ${
                        changeEval.direction === 'improving'
                          ? 'text-emerald-400'
                          : changeEval.direction === 'worsening'
                          ? 'text-rose-400'
                          : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      {changeEval.percentChange !== null &&
                        (changeEval.percentChange > 0 ? (
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        ) : changeEval.percentChange < 0 ? (
                          <ArrowDownRight className="w-3.5 h-3.5" />
                        ) : null)}
                      {formatSignedPercent(changeEval.percentChange)} vs prior
                    </span>

                    <span className="text-[11px] font-mono-tabular text-[var(--text-muted)]">
                      Ref: {marker.refLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 7 Multi-Biomarker Physiological System Charts */}
        <SystemsChartsGrid
          biomarkers={biomarkers}
          dates={dates}
          onSelectBiomarker={(m) => setActiveModalMarkerName(m.name)}
        />

        {/* Complete Longitudinal Biomarker Table Section */}
        <section id="biomarker-table-section" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <span className="text-[11px] font-mono-tabular uppercase tracking-widest text-sky-400">
                Complete Assay Matrix
              </span>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] tracking-tight">
                Longitudinal Biomarker Ledger ({filteredBiomarkers.length} of{' '}
                {biomarkers.length})
              </h2>
            </div>

            {/* Value Display Mode Toggle & Audited Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setOnlyAudited((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  onlyAudited
                    ? 'border-sky-400 bg-sky-500/20 text-sky-300'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Audited Fixes Only (7)</span>
              </button>

              <div
                className="inline-flex rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-1"
                role="group"
                aria-label="Value display mode"
              >
                <button
                  type="button"
                  onClick={() => setDisplayMode('absolute')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    displayMode === 'absolute'
                      ? 'bg-sky-500 text-slate-950 shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Absolute Units
                </button>
                <button
                  type="button"
                  onClick={() => setDisplayMode('percent')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    displayMode === 'percent'
                      ? 'bg-sky-500 text-slate-950 shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  % of Ref Range
                </button>
              </div>
            </div>
          </div>

          {/* Filter Bar: Categories + Status + Search */}
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 space-y-3.5">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedCategory === 'all'
                    ? 'bg-sky-500 text-slate-950 shadow-sm'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                }`}
              >
                <span>All Systems</span>
                <span
                  className={`font-mono-tabular text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === 'all'
                      ? 'bg-slate-950/20 text-slate-950'
                      : 'bg-[var(--bg-subtle)] text-[var(--text-muted)]'
                  }`}
                >
                  {biomarkers.length}
                </span>
              </button>

              {CATEGORIES.map((cat) => {
                const count = biomarkers.filter(
                  (b) => b.category === cat.id
                ).length;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-sky-500 text-slate-950 shadow-sm'
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
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Second Row: Clinical Status Filter Pills + Search Box */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2 border-t border-[var(--border-subtle)]">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] mr-1">
                  <Filter className="w-3.5 h-3.5" /> Status:
                </span>
                {(
                  [
                    {
                      id: 'all',
                      label: 'All Results',
                      count: statusCounts.total,
                    },
                    {
                      id: 'abnormal',
                      label: 'Out of Range',
                      count: statusCounts.abnormal,
                    },
                    {
                      id: 'normal',
                      label: 'In Range',
                      count: statusCounts.normal,
                    },
                    {
                      id: 'improving',
                      label: 'Improving (vs Prior)',
                      count: statusCounts.improving,
                    },
                    {
                      id: 'worsening',
                      label: 'Worsening (vs Prior)',
                      count: statusCounts.worsening,
                    },
                  ] as const
                ).map((tab) => {
                  const isActive = statusFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setStatusFilter(tab.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all inline-flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)] font-semibold'
                          : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className="font-mono-tabular text-[10px] opacity-75">
                        ({tab.count})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Input */}
              <div className="relative w-full lg:w-72">
                <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search biomarker (e.g. eGFR, Apo, B12)..."
                  aria-label="Search biomarker by name"
                  className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] pl-9 pr-8 py-1.5 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-sky-400 focus:outline-none"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[11px] font-mono-tabular uppercase tracking-wider text-[var(--text-secondary)]">
                    <th className="py-3.5 px-4 sticky left-0 z-20 bg-[var(--bg-elevated)] min-w-[220px]">
                      Biomarker
                    </th>
                    {dates.map((d) => (
                      <th key={d} className="py-3.5 px-3 text-center min-w-[92px]">
                        {d}
                      </th>
                    ))}
                    <th className="py-3.5 px-3 text-center min-w-[125px]">
                      Latest Status
                    </th>
                    <th className="py-3.5 px-3 text-center min-w-[144px]">
                      Sparkline
                    </th>
                    <th className="py-3.5 px-3 text-right min-w-[115px]">
                      Latest Δ (Prior)
                    </th>
                    <th className="py-3.5 px-3 text-right min-w-[115px]">
                      Total Δ (Base)
                    </th>
                    <th className="py-3.5 px-4 text-right min-w-[120px]">
                      Ref Interval
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] text-xs">
                  {filteredBiomarkers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={dates.length + 6}
                        className="py-12 text-center text-sm text-[var(--text-muted)]"
                      >
                        No biomarkers match your current filters.{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCategory('all');
                            setStatusFilter('all');
                            setSearchTerm('');
                            setOnlyAudited(false);
                          }}
                          className="text-sky-400 underline ml-1"
                        >
                          Reset all filters
                        </button>
                      </td>
                    </tr>
                  ) : (
                    filteredBiomarkers.map((marker) => {
                      const slug = slugify(marker.name);
                      const isRowHighlighted = highlightedSlug === slug;
                      const latest = getLatestReading(marker.values, dates);
                      const previous = getPreviousReading(marker.values, dates);
                      const baseline = getBaselineReading(marker.values, dates);

                      const latestStatus = getStatus(latest.value, marker);
                      const priorEval = evaluateChange(
                        latest.value,
                        previous.value,
                        marker
                      );
                      const baselineEval = evaluateChange(
                        latest.value,
                        baseline.value,
                        marker
                      );
                      const rangePos = getRangePosition(latest.value, marker);
                      const hasAuditNotes =
                        marker.auditNotes &&
                        Object.keys(marker.auditNotes).length > 0;

                      return (
                        <tr
                          key={marker.name}
                          id={`row-${slug}`}
                          onClick={() => setActiveModalMarkerName(marker.name)}
                          className={`group cursor-pointer transition-colors hover:bg-[var(--bg-elevated)]/75 scroll-mt-36 ${
                            isRowHighlighted ? 'row-pulse-highlight' : ''
                          }`}
                        >
                          {/* Biomarker Name & Category Badge */}
                          <td className="py-3 px-4 sticky left-0 z-10 bg-[var(--bg-surface)] group-hover:bg-[var(--bg-elevated)] transition-colors border-r border-[var(--border-subtle)]">
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <div className="font-semibold text-[var(--text-primary)] group-hover:text-sky-400 transition-colors flex items-center gap-1.5">
                                  <span>{marker.name}</span>
                                  {hasAuditNotes && (
                                    <span
                                      className="inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-mono-tabular uppercase bg-sky-500/15 text-sky-400 border border-sky-500/30"
                                      title={Object.entries(marker.auditNotes!)
                                        .map(([d, n]) => `${d}: ${n}`)
                                        .join(' | ')}
                                    >
                                      Audited
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-[var(--text-muted)] font-mono-tabular mt-0.5">
                                  {categoryLabels[marker.category]}
                                  {marker.isDerived ? ' · Derived' : ''}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Historical Date Value Cells */}
                          {dates.map((d, idx) => {
                            const val = marker.values[idx];
                            const cellStatus = getStatus(val, marker);
                            const cellAudit = marker.auditNotes?.[d];

                            return (
                              <td
                                key={d}
                                className="py-3 px-3 text-center font-mono-tabular"
                                title={
                                  cellAudit
                                    ? `Audit Fix (${d}): ${cellAudit}`
                                    : undefined
                                }
                              >
                                {val === null || val === undefined ? (
                                  <span className="text-[var(--text-muted)] opacity-45">
                                    —
                                  </span>
                                ) : (
                                  <span
                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-medium ${
                                      cellStatus === 'high'
                                        ? 'bg-[var(--status-high-bg)] text-[var(--status-high-text)] border border-[var(--status-high-border)] font-semibold'
                                        : cellStatus === 'low'
                                        ? 'bg-[var(--status-low-bg)] text-[var(--status-low-text)] border border-[var(--status-low-border)] font-semibold'
                                        : 'text-[var(--text-primary)]'
                                    } ${
                                      cellAudit
                                        ? 'ring-1 ring-sky-400/50'
                                        : ''
                                    }`}
                                  >
                                    {formatDisplayValue(
                                      val,
                                      marker,
                                      displayMode
                                    )}
                                    {cellAudit && (
                                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                                    )}
                                  </span>
                                )}
                              </td>
                            );
                          })}

                          {/* Latest Status Pill + Visual Range Bar */}
                          <td className="py-3 px-3 text-center">
                            <div className="flex flex-col items-center gap-1.5">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono-tabular font-semibold uppercase tracking-wider ${
                                  latestStatus === 'normal'
                                    ? 'bg-[var(--status-normal-bg)] text-[var(--status-normal-text)] border border-[var(--status-normal-border)]'
                                    : latestStatus === 'high'
                                    ? 'bg-[var(--status-high-bg)] text-[var(--status-high-text)] border border-[var(--status-high-border)]'
                                    : latestStatus === 'low'
                                    ? 'bg-[var(--status-low-bg)] text-[var(--status-low-text)] border border-[var(--status-low-border)]'
                                    : 'bg-[var(--bg-subtle)] text-[var(--text-muted)]'
                                }`}
                              >
                                {latestStatus === 'unknown'
                                  ? 'No Ref'
                                  : latestStatus}
                              </span>

                              {/* Mini visual range bar */}
                              {rangePos !== null && (
                                <div
                                  className="w-20 h-1.5 rounded-full bg-[var(--bg-subtle)] overflow-hidden relative"
                                  title={`${Math.round(rangePos)}% of reference range`}
                                >
                                  <div
                                    className={`h-full rounded-full ${
                                      latestStatus === 'high'
                                        ? 'bg-rose-400'
                                        : latestStatus === 'low'
                                        ? 'bg-amber-400'
                                        : 'bg-emerald-400'
                                    }`}
                                    style={{
                                      width: `${Math.max(
                                        6,
                                        Math.min(100, rangePos)
                                      )}%`,
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Crisp SVG Sparkline */}
                          <td className="py-2 px-3">
                            <div className="flex items-center justify-center">
                              <SparklineSvg marker={marker} />
                            </div>
                          </td>

                          {/* Latest Change vs Immediately Prior Reading */}
                          <td className="py-3 px-3 text-right font-mono-tabular">
                            {priorEval.percentChange === null ? (
                              <span className="text-[var(--text-muted)]">—</span>
                            ) : (
                              <div className="inline-flex flex-col items-end">
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold ${
                                    priorEval.direction === 'improving'
                                      ? 'bg-emerald-500/12 text-emerald-400'
                                      : priorEval.direction === 'worsening'
                                      ? 'bg-rose-500/12 text-rose-400'
                                      : 'text-[var(--text-secondary)]'
                                  }`}
                                >
                                  {priorEval.direction === 'improving' && (
                                    <TrendingUp className="w-3 h-3" />
                                  )}
                                  {priorEval.direction === 'worsening' && (
                                    <TrendingDown className="w-3 h-3" />
                                  )}
                                  {formatSignedPercent(priorEval.percentChange)}
                                </span>
                                <span className="text-[9.5px] text-[var(--text-muted)] mt-0.5 capitalize">
                                  {priorEval.direction}
                                </span>
                              </div>
                            )}
                          </td>

                          {/* Total Change vs Baseline Reading */}
                          <td className="py-3 px-3 text-right font-mono-tabular">
                            {baselineEval.percentChange === null ? (
                              <span className="text-[var(--text-muted)]">—</span>
                            ) : (
                              <div className="inline-flex flex-col items-end">
                                <span
                                  className={`font-semibold ${
                                    baselineEval.direction === 'improving'
                                      ? 'text-emerald-400'
                                      : baselineEval.direction === 'worsening'
                                      ? 'text-rose-400'
                                      : 'text-[var(--text-secondary)]'
                                  }`}
                                >
                                  {formatSignedPercent(
                                    baselineEval.percentChange
                                  )}
                                </span>
                                <span className="text-[9.5px] text-[var(--text-muted)] mt-0.5">
                                  since {baseline.date}
                                </span>
                              </div>
                            )}
                          </td>

                          {/* Reference Range */}
                          <td className="py-3 px-4 text-right font-mono-tabular text-[var(--text-secondary)]">
                            <div>{marker.refLabel}</div>
                            {marker.refLabel !== 'N/A' && (
                              <div className="text-[10px] text-[var(--text-muted)]">
                                {marker.unit}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* Biomarker Detail Modal */}
      <BiomarkerModal
        marker={activeModalMarker}
        dates={dates}
        onClose={() => setActiveModalMarkerName(null)}
      />

      {/* Add Lab Panel Modal */}
      <AddPanelModal
        isOpen={isAddPanelOpen}
        onClose={() => setIsAddPanelOpen(false)}
        biomarkers={biomarkers}
        dates={dates}
        onSavePanel={handleSaveCustomPanel}
      />
    </div>
  );
}
