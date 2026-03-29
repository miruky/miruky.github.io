/**
 * Authentication utilities for admin panel.
 *
 * Security design:
 * - Password is NEVER stored in plain text
 * - PBKDF2 with 100,000 iterations + SHA-256 for password verification
 * - GitHub PAT is AES-GCM encrypted with a password-derived key
 * - Session stored in sessionStorage (cleared on browser close)
 * - Login attempts rate-limited client-side (5 attempts / 15 min)
 */

const ADMIN_USERNAME = 'miruky';

// PBKDF2(password, salt, 100000, sha256) — computed offline, never reversible
const PASSWORD_HASH =
  '782b00b0ba2b4e5c6ba3a938c8b1673acb8d3fef2c0e4f0fadaaff48814b2a08';

const SALT = 'miruky-portfolio-salt-v1';
const PAT_SALT = 'miruky-pat-encryption-v1';
const ITERATIONS = 100000;

const SESSION_KEY = 'miruky_admin_session';
const PAT_KEY = 'miruky_encrypted_pat';
const ATTEMPTS_KEY = 'miruky_login_attempts';
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 min

// ─── Helpers ──────────────────────────────────────────────────

function hexEncode(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function deriveKey(
  password: string,
  salt: string,
  usage: KeyUsage[]
): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: enc.encode(salt), iterations: ITERATIONS, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    usage
  );
}

async function pbkdf2Hash(password: string): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: enc.encode(SALT), iterations: ITERATIONS, hash: 'SHA-256' },
    keyMaterial,
    256
  );
  return hexEncode(bits);
}

// ─── Rate Limiting ────────────────────────────────────────────

interface AttemptsData {
  count: number;
  firstAttempt: number;
}

function getAttempts(): AttemptsData {
  try {
    const raw = localStorage.getItem(ATTEMPTS_KEY);
    if (!raw) return { count: 0, firstAttempt: 0 };
    return JSON.parse(raw);
  } catch {
    return { count: 0, firstAttempt: 0 };
  }
}

function recordAttempt(): void {
  const data = getAttempts();
  const now = Date.now();
  if (now - data.firstAttempt > LOCKOUT_MS) {
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify({ count: 1, firstAttempt: now }));
  } else {
    localStorage.setItem(
      ATTEMPTS_KEY,
      JSON.stringify({ count: data.count + 1, firstAttempt: data.firstAttempt })
    );
  }
}

function clearAttempts(): void {
  localStorage.removeItem(ATTEMPTS_KEY);
}

export function isLockedOut(): boolean {
  const data = getAttempts();
  if (data.count >= MAX_ATTEMPTS && Date.now() - data.firstAttempt < LOCKOUT_MS) {
    return true;
  }
  return false;
}

export function getRemainingLockoutSeconds(): number {
  const data = getAttempts();
  const elapsed = Date.now() - data.firstAttempt;
  return Math.max(0, Math.ceil((LOCKOUT_MS - elapsed) / 1000));
}

// ─── Authentication ───────────────────────────────────────────

export async function verifyCredentials(
  username: string,
  password: string
): Promise<boolean> {
  if (isLockedOut()) return false;
  if (username !== ADMIN_USERNAME) {
    recordAttempt();
    return false;
  }
  const hash = await pbkdf2Hash(password);
  if (hash !== PASSWORD_HASH) {
    recordAttempt();
    return false;
  }
  clearAttempts();
  return true;
}

// ─── Session Management ───────────────────────────────────────

interface Session {
  authenticated: boolean;
  timestamp: number;
  nonce: string;
}

const SESSION_DURATION = 4 * 60 * 1000; // 4 hours

async function hmacSign(data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(PASSWORD_HASH + SALT),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return hexEncode(sig);
}

function generateNonce(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function createSession(): Promise<void> {
  const nonce = generateNonce();
  const session: Session = { authenticated: true, timestamp: Date.now(), nonce };
  const payload = JSON.stringify(session);
  const sig = await hmacSign(payload);
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...session, sig }));
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    const { sig, ...session } = parsed;
    if (!session.authenticated) return false;
    if (Date.now() - session.timestamp > SESSION_DURATION) {
      clearSession();
      return false;
    }
    // Verify HMAC signature to prevent session forgery
    const expected = await hmacSign(JSON.stringify(session));
    if (sig !== expected) {
      clearSession();
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

// ─── GitHub PAT Encryption ────────────────────────────────────

export async function encryptPAT(pat: string, password: string): Promise<void> {
  const key = await deriveKey(password, PAT_SALT, ['encrypt']);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder();
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(pat)
  );
  const stored = {
    iv: Array.from(iv),
    ct: Array.from(new Uint8Array(ciphertext)),
  };
  localStorage.setItem(PAT_KEY, JSON.stringify(stored));
}

export async function decryptPAT(password: string): Promise<string | null> {
  try {
    const raw = localStorage.getItem(PAT_KEY);
    if (!raw) return null;
    const { iv, ct } = JSON.parse(raw);
    const key = await deriveKey(password, PAT_SALT, ['decrypt']);
    const plaintext = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(iv) },
      key,
      new Uint8Array(ct)
    );
    return new TextDecoder().decode(plaintext);
  } catch {
    return null;
  }
}

export function hasPAT(): boolean {
  return !!localStorage.getItem(PAT_KEY);
}
