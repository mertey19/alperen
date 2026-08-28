type Bucket = { count: number; resetAt: number };

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const buckets = new Map<string, Bucket>();

export function loginLimited(ip: string): boolean {
  const now = Date.now();
  const current = buckets.get(ip);
  if (!current || current.resetAt < now) {
    buckets.set(ip, { count: 0, resetAt: now + WINDOW_MS });
    return false;
  }
  return current.count >= MAX_ATTEMPTS;
}

export function recordLoginFailure(ip: string): void {
  const now = Date.now();
  const current = buckets.get(ip);
  if (!current || current.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  current.count += 1;
}
