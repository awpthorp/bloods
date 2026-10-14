import { NextRequest, NextResponse } from 'next/server';
import {
  createSessionToken,
  isAuthConfigured,
  SESSION_COOKIE_NAME,
  SESSION_TTL_SECONDS,
  verifyDashboardPassword,
} from '@/lib/auth';

interface AttemptRecord {
  count: number;
  resetAt: number;
}

const MAX_ATTEMPTS_PER_WINDOW = 8;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const attemptsByIp = new Map<string, AttemptRecord>();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') ?? 'local';
}

export async function POST(request: NextRequest) {
  if (!isAuthConfigured()) {
    return NextResponse.json(
      {
        error:
          'Server authentication is not configured. Set DASHBOARD_PASSWORD in the environment.',
      },
      { status: 503 }
    );
  }

  const now = Date.now();
  const ip = getClientIp(request);
  const existing = attemptsByIp.get(ip);

  if (existing && existing.resetAt > now && existing.count >= MAX_ATTEMPTS_PER_WINDOW) {
    const retryAfterSec = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    return NextResponse.json(
      {
        error: `Too many failed attempts. Please wait ${retryAfterSec}s before trying again.`,
      },
      {
        status: 429,
        headers: { 'Retry-After': String(retryAfterSec) },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request payload.' },
      { status: 400 }
    );
  }

  const password =
    typeof body === 'object' &&
    body !== null &&
    'password' in body &&
    typeof (body as { password: unknown }).password === 'string'
      ? (body as { password: string }).password
      : '';

  if (!password) {
    return NextResponse.json(
      { error: 'Please enter the access password.' },
      { status: 400 }
    );
  }

  const isValid = await verifyDashboardPassword(password);
  if (!isValid) {
    const updated: AttemptRecord =
      existing && existing.resetAt > now
        ? { count: existing.count + 1, resetAt: existing.resetAt }
        : { count: 1, resetAt: now + WINDOW_MS };
    attemptsByIp.set(ip, updated);

    // Small uniform delay on failed login to deter brute-force probing
    await new Promise((resolve) => setTimeout(resolve, 250));

    return NextResponse.json(
      { error: 'Invalid access password. Access denied.' },
      { status: 401 }
    );
  }

  attemptsByIp.delete(ip);

  const token = await createSessionToken(now);
  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });

  return response;
}
