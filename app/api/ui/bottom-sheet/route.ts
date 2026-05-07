/**
 * Server-Driven UI API Route
 * Handles bottom sheet template requests
 * 
 * POST /api/ui/bottom-sheet
 * 
 * Request body:
 * {
 *   "intent": string,
 *   "context": object (optional)
 * }
 * 
 * Response:
 * {
 *   "success": boolean,
 *   "data": UITemplate (if success),
 *   "error": string (if failed)
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import { resolveTemplate, getAvailableIntents, getTemplateMetadata } from '@/lib/orchestrator/templateEngine';
import { validateTemplateEngineRequest } from '@/lib/validators/jsonValidator';
import { logRequest, logError } from '@/lib/logger/requestLogger';

/**
 * GET handler - Returns available templates metadata
 * Useful for debugging and discovering available intents
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');

    // Return available intents
    if (action === 'intents') {
      const intents = getAvailableIntents();
      return NextResponse.json(
        {
          success: true,
          data: intents,
        },
        { status: 200 }
      );
    }

    // Return template metadata
    if (action === 'metadata') {
      const metadata = getTemplateMetadata();
      return NextResponse.json(
        {
          success: true,
          data: metadata,
        },
        { status: 200 }
      );
    }

    // Default: return available actions
    return NextResponse.json(
      {
        success: true,
        data: {
          message: 'SDUI Server is running',
          actions: {
            'GET?action=intents': 'List all available template intents',
            'GET?action=metadata': 'Get metadata about all templates',
            'POST': 'Request a template by intent',
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET /api/ui/bottom-sheet error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST handler - Main template resolution endpoint
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let requestBody: unknown;
    try {
      requestBody = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Log incoming payload
    logRequest('/api/ui/bottom-sheet', 'POST', requestBody);

    // Validate request structure
    const requestValidation = validateTemplateEngineRequest(requestBody);
    if (!requestValidation.success) {
      return NextResponse.json(
        {
          success: false,
          error: requestValidation.error,
        },
        { status: 400 }
      );
    }

    // Resolve template
    const resolvedTemplate = await resolveTemplate(requestValidation.data!);

    // Return response with appropriate status code
    const statusCode = resolvedTemplate.success ? 200 : 404;
    return NextResponse.json(resolvedTemplate, { status: statusCode });
  } catch (error) {
    logError('/api/ui/bottom-sheet POST', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Handle unsupported methods
 */
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {
      success: true,
      message: 'SDUI API supports GET and POST methods',
    },
    { status: 200 }
  );
}
