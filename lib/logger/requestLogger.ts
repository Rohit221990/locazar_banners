/**
 * SDUI Request Logger
 * Logs incoming request payloads for all /api/ui/* routes.
 * Controlled by ENABLE_REQUEST_LOGGING env var (default: true in dev).
 */

const isDev = process.env.NODE_ENV !== 'production';
const loggingEnabled = process.env.ENABLE_REQUEST_LOGGING !== 'false';

export function logRequest(route: string, method: string, payload: unknown): void {
  if (!loggingEnabled) return;

  const timestamp = new Date().toISOString();

  if (isDev) {
    // Rich coloured output in development
    console.log(`\n[SDUI] ─────────────────────────────────────`);
    console.log(`  🕐 ${timestamp}`);
    console.log(`  📡 ${method} ${route}`);
    console.log(`  📦 Payload:`, JSON.stringify(payload, null, 2));
    console.log(`[SDUI] ─────────────────────────────────────\n`);
  } else {
    // Single-line structured JSON log for production log aggregators
    console.log(JSON.stringify({
      level: 'info',
      service: 'sdui',
      timestamp,
      method,
      route,
      payload,
    }));
  }
}

export function logError(route: string, error: unknown): void {
  const timestamp = new Date().toISOString();

  if (isDev) {
    console.error(`\n[SDUI ERROR] ────────────────────────────`);
    console.error(`  🕐 ${timestamp}`);
    console.error(`  ❌ ${route}`);
    console.error(`  💥`, error);
    console.error(`[SDUI ERROR] ────────────────────────────\n`);
  } else {
    console.error(JSON.stringify({
      level: 'error',
      service: 'sdui',
      timestamp,
      route,
      error: String(error),
    }));
  }
}
