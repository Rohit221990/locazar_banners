/**
 * User (Buyer) UI API Route
 *
 * POST /api/ui/user
 * GET  /api/ui/user?action=intents
 * GET  /api/ui/user?action=metadata
 *
 * Intents:
 *   product_view    — Product detail view for buyer
 *   order_success   — Order placed confirmation sheet
 *   order_tracking  — 4-step order delivery timeline
 *   seller_profile  — Seller shop info card
 */

import { NextRequest, NextResponse } from 'next/server';
import { userEngine } from '@/lib/orchestrator/templateEngine';
import { validateTemplateEngineRequest } from '@/lib/validators/jsonValidator';
import { logRequest, logError } from '@/lib/logger/requestLogger';

export async function GET(request: NextRequest) {
  try {
    const action = request.nextUrl.searchParams.get('action');

    if (action === 'intents') {
      return NextResponse.json({ success: true, data: userEngine.getAvailableIntents() });
    }

    if (action === 'metadata') {
      return NextResponse.json({ success: true, data: userEngine.getTemplateMetadata() });
    }

    return NextResponse.json({
      success: true,
      data: {
        service: 'Locazar SDUI — User Templates',
        intents: userEngine.getAvailableIntents(),
        usage: 'POST /api/ui/user with { "intent": "<intent>", "context": {} }',
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

    // Log incoming payload
    logRequest('/api/ui/user', 'POST', body);

    const validation = validateTemplateEngineRequest(body);
    if (!validation.success) {
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 });
    }

    const result = await userEngine.resolveTemplate(validation.data!);
    return NextResponse.json(result, { status: result.success ? 200 : 404 });
  } catch {
    logError('/api/ui/user POST', 'Unhandled exception');
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ success: true, message: 'User SDUI API supports GET and POST' });
}
