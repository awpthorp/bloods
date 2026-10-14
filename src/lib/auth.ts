export const SESSION_COOKIE_NAME = 'bloods_session';
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function getConfiguredPassword(): string | null {
  const raw = process.env.DASHBOARD_PASSWORD;
  if (!raw || raw.trim().length === 0) {
    return null;
  }
  return raw;
}

function getSigningSecret(): string | null {
  const secret = process.env.AUTH_SECRET || process.env.DASHBOARD_PASSWORD;
  if (!secret || secret.trim().length === 0) {
    return null;
  }
  return secret;
}

export function isAuthConfigured(): boolean {
  return getConfiguredPassword() !== null;
}

export function timingSafeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}

async function sha256Bytes(value: string): Promise<Uint8Array> {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(value));
  return new Uint8Array(digest);
}

async function hmacSha256Bytes(
  secret: string,
  message: string
): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return new Uint8Array(sig);
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function fromBase64Url(base64Url: string): Uint8Array | null {
  try {
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padLen = (4 - (base64.length % 4)) % 4;
    const padded = base64 + '='.repeat(padLen);
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  } catch {
    return null;
  }
}

export async function verifyDashboardPassword(
  candidate: string
): Promise<boolean> {
  const configured = getConfiguredPassword();
  const candidateDigest = await sha256Bytes(candidate);
  const targetDigest = await sha256Bytes(configured ?? '');

  const isMatch = timingSafeEqualBytes(candidateDigest, targetDigest);
  if (!configured) {
    return false;
  }
  return isMatch;
}

interface SessionPayload {
  exp: number;
  v: number;
}

export async function createSessionToken(nowMs = Date.now()): Promise<string> {
  const secret = getSigningSecret();
  if (!secret) {
    throw new Error('DASHBOARD_PASSWORD or AUTH_SECRET is not configured.');
  }

  const payload: SessionPayload = {
    exp: Math.floor(nowMs / 1000) + SESSION_TTL_SECONDS,
    v: 1,
  };

  const payloadB64 = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const signatureBytes = await hmacSha256Bytes(secret, payloadB64);
  const signatureB64 = toBase64Url(signatureBytes);

  return `${payloadB64}.${signatureB64}`;
}

export async function verifySessionToken(
  token: string | undefined | null,
  nowMs = Date.now()
): Promise<boolean> {
  if (!token || typeof token !== 'string') {
    return false;
  }

  const secret = getSigningSecret();
  if (!secret) {
    return false;
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return false;
  }

  const [payloadB64, signatureB64] = parts;
  if (!payloadB64 || !signatureB64) {
    return false;
  }

  const providedSig = fromBase64Url(signatureB64);
  if (!providedSig || providedSig.length !== 32) {
    return false;
  }

  const expectedSig = await hmacSha256Bytes(secret, payloadB64);
  if (!timingSafeEqualBytes(providedSig, expectedSig)) {
    return false;
  }

  const payloadBytes = fromBase64Url(payloadB64);
  if (!payloadBytes) {
    return false;
  }

  try {
    const parsed = JSON.parse(decoder.decode(payloadBytes)) as Partial<SessionPayload>;
    if (typeof parsed.exp !== 'number' || !Number.isFinite(parsed.exp)) {
      return false;
    }
    const nowSec = Math.floor(nowMs / 1000);
    return parsed.exp > nowSec;
  } catch {
    return false;
  }
}
