/**
 * Seller UI API Route
 *
 * POST /api/ui/seller
 * GET  /api/ui/seller?action=intents
 * GET  /api/ui/seller?action=metadata
 *
 * Intents:
 *   shop_image        — Upload shop logo + banner
 *   shop_verification — PAN / Aadhar / Udyam / BRN / GST verification
 *   add_product       — Add a new product listing
 *   product_image     — Upload beautiful product photos
 *   shop_address      — Set full shop address
 */

import { NextRequest, NextResponse } from 'next/server';
import { sellerEngine } from '@/lib/orchestrator/templateEngine';
import { validateTemplateEngineRequest } from '@/lib/validators/jsonValidator';
import { logRequest, logError } from '@/lib/logger/requestLogger';

export async function GET(request: NextRequest) {
  try {
    const action = request.nextUrl.searchParams.get('action');

    if (action === 'intents') {
      return NextResponse.json({ success: true, data: sellerEngine.getAvailableIntents() });
    }

    if (action === 'metadata') {
      return NextResponse.json({ success: true, data: sellerEngine.getTemplateMetadata() });
    }

    return NextResponse.json({
      success: true,
      data: {
        service: 'Locazar SDUI — Seller Templates',
        intents: sellerEngine.getAvailableIntents(),
        usage: 'POST /api/ui/seller with { "intent": "<intent>", "context": {} }',
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON in request body' }, { status: 400 });
    }

    // ── Log incoming payload ───────────────────────────────────────────────
    logRequest('/api/ui/seller', 'POST', body);

    // ── Validate request structure ─────────────────────────────────────────
    const validation = validateTemplateEngineRequest(body);
    if (!validation.success) {
      logError('/api/ui/seller POST — validation failed', validation.error);
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 });
    }

    const { intent } = validation.data!;

    // ── Resolve template ───────────────────────────────────────────────────
    const result = await sellerEngine.resolveTemplate(validation.data!);

    if (!result.success) {
      // Log the 404 with full context so you can see exactly what failed
      logError(
        `/api/ui/seller POST — 404 template not found`,
        `Intent received: "${intent}" | Available: [${sellerEngine.getAvailableIntents().join(', ')}] | Reason: ${result.error}`
      );
      return NextResponse.json(result, { status: 404 });
    }

    // ── Success ────────────────────────────────────────────────────────────
    logRequest('/api/ui/seller', `POST ✅ resolved "${intent}"`, { status: 200 });
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    logError('/api/ui/seller POST — unhandled exception', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}


export async function OPTIONS() {
  return NextResponse.json({ success: true, message: 'Seller SDUI API supports GET and POST' });
}
