import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

import { ADMIN_COOKIE } from "./cookie";

const MAX_AGE = 60 * 60 * 24 * 7;

function password(): string | null {
  const value = process.env.ADMIN_PASSWORD?.trim();
  return value ? value : null;
}

export function adminPasswordConfigured(): boolean {
  return password() !== null;
}

function secret(): Buffer {
  const material = process.env.ADMIN_SECRET?.trim() || `ag-admin/${password() ?? "missing"}`;
  return scryptSync(material, "alperen-govrek-yonetim", 32);
}

function sign(body: string): string {
  return createHmac("sha256", secret()).update(body).digest("base64url");
}

function encode(exp: number): string {
  const body = Buffer.from(JSON.stringify({ exp, n: randomBytes(8).toString("hex") })).toString(
    "base64url",
  );
  return `${body}.${sign(body)}`;
}

function decode(token: string): { exp: number } | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = sign(body);
  const left = Buffer.from(sig);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as { exp?: unknown };
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return null;
    return { exp: payload.exp };
  } catch {
    return null;
  }
}

export function verifyPassword(input: string): boolean {
  const expected = password();
  if (!expected) return false;
  const left = Buffer.from(input);
  const right = Buffer.from(expected);
  if (left.length !== right.length) {
    timingSafeEqual(left.subarray(0, 1), right.subarray(0, 1));
    return false;
  }
  return timingSafeEqual(left, right);
}

export async function createSession(): Promise<void> {
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, encode(Date.now() + MAX_AGE * 1000), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
}

export async function hasSession(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  return decode(token) !== null;
}
