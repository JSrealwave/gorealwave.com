/**
 * Temporary sign-in for the enablement hub. Clerk is not on the request path.
 * Add the allowed addresses to HUB_EMAILS. The shared password stays server-side.
 */

export const HUB_COOKIE = "rw_hub_session";
export const HUB_SESSION_SECONDS = 60 * 60 * 24 * 14;

export const HUB_PASSWORD = "!Realwave2026";

export const HUB_EMAILS: readonly string[] = [
  "jhinshaw@bailiwick.com",
  "msmith@bailiwick.com",
  "jsullivan@bailiwick.com",
];

const SIGNING_KEY = "rw-hub-session-v1";

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isAllowedEmail(email: string) {
  const normalized = normalizeEmail(email);
  return HUB_EMAILS.some((item) => normalizeEmail(item) === normalized);
}

export function passwordMatches(password: string) {
  return constantTimeEqual(password, HUB_PASSWORD);
}

export function safeNextPath(value: string | undefined) {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return "/";
  }
  return value;
}

export async function signHubSession(email: string) {
  const payload = {
    email: normalizeEmail(email),
    exp: Date.now() + HUB_SESSION_SECONDS * 1000,
  };
  const body = bytesToBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const signature = await hmac(body);
  return `${body}.${signature}`;
}

export async function readHubSession(token: string | undefined) {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = await hmac(body);
  if (!constantTimeEqual(signature, expected)) return null;

  try {
    const payload = JSON.parse(new TextDecoder().decode(base64UrlToBytes(body))) as {
      email?: unknown;
      exp?: unknown;
    };
    if (typeof payload.email !== "string" || typeof payload.exp !== "number") return null;
    if (payload.exp < Date.now()) return null;
    if (!isAllowedEmail(payload.email)) return null;
    return normalizeEmail(payload.email);
  } catch {
    return null;
  }
}

async function hmac(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SIGNING_KEY),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return bytesToBase64Url(new Uint8Array(signature));
}

function constantTimeEqual(left: string, right: string) {
  const a = new TextEncoder().encode(left);
  const b = new TextEncoder().encode(right);
  const length = Math.max(a.length, b.length);
  let mismatch = a.length ^ b.length;
  for (let i = 0; i < length; i++) mismatch |= (a[i] ?? 0) ^ (b[i] ?? 0);
  return mismatch === 0;
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string) {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
