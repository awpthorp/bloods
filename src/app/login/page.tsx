'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  ShieldCheck,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setErrorMessage(
          data.error || 'Authentication failed. Verify your access key.'
        );
        setIsSubmitting(false);
        return;
      }

      router.replace('/');
      router.refresh();
    } catch {
      setErrorMessage('Network error while verifying credentials. Please retry.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col justify-between relative overflow-hidden px-4 py-8">
      {/* Subtle clinical grid & radial glow backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-35"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 18%, rgba(56, 189, 248, 0.14), transparent 55%), linear-gradient(to right, rgba(148, 163, 184, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.05) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
        }}
      />

      {/* Top minimal telemetry status bar */}
      <header className="relative z-10 max-w-md w-full mx-auto flex items-center justify-between text-xs font-mono-tabular text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>TELEMETRY GATEWAY · ENCRYPTED</span>
        </div>
        <span className="px-2 py-0.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
          HMAC-SHA256
        </span>
      </header>

      {/* Main Unlock Card */}
      <main className="relative z-10 w-full max-w-md mx-auto my-auto py-8">
        <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)]/95 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shadow-inner">
              <Activity className="w-5 h-5 text-sky-400" />
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono-tabular uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/12 text-amber-300 border border-amber-500/30">
              <Lock className="w-3 h-3" />
              Protected Health Record
            </span>
          </div>

          <div className="space-y-1.5 mb-6">
            <p className="text-[11px] font-mono-tabular uppercase tracking-widest text-sky-400">
              Clinical Lab Intelligence
            </p>
            <h1 className="text-2xl sm:text-3xl font-serif-editorial tracking-tight text-[var(--text-primary)]">
              Biomarker &amp; Longevity Telemetry
            </h1>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed pt-1">
              Enter your authorization passphrase to unlock longitudinal blood panel records and physiological trajectory charts.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="telemetry-password"
                className="block text-[11px] font-mono-tabular uppercase tracking-wider text-[var(--text-secondary)] mb-2"
              >
                Access Passphrase
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="telemetry-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  autoFocus
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="Enter passphrase..."
                  className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] pl-10 pr-10 py-2.5 text-sm font-mono-tabular text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-sky-400 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3.5 py-2.5 text-xs text-rose-300"
              >
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !password.trim()}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 hover:bg-sky-400 disabled:opacity-45 disabled:pointer-events-none transition-all shadow-lg shadow-sky-500/20 cursor-pointer"
            >
              <span>
                {isSubmitting ? 'Verifying Credentials...' : 'Unlock Telemetry'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2 text-[11px] text-[var(--text-muted)] font-mono-tabular">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              HttpOnly Signed Session
            </span>
            <span>30-Day Expiry</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-md w-full mx-auto text-center text-[11px] font-mono-tabular text-[var(--text-muted)]">
        Zero client-side biomarker payload prior to server authentication
      </footer>
    </div>
  );
}
