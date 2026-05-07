/**
 * Template Engine Orchestrator
 * Generic factory — works with ANY template store.
 * NO AI, NO dynamic generation. Pure template lookup + context merging.
 */

import { UITemplate, TemplateEngineRequest, TemplateEngineResponse } from '@/lib/types/ui';
import { bottomSheetTemplates } from '@/lib/templates/bottomSheetTemplates';
import { sellerTemplates } from '@/lib/templates/sellerTemplates';
import { userTemplates } from '@/lib/templates/userTemplates';
import { validateUITemplate } from '@/lib/validators/jsonValidator';

// ─── Template metadata shape ────────────────────────────────────────────────
export interface TemplateMetadata {
  intent: string;
  height: string;
  expandable: boolean;
  contentType: 'html' | 'json';
  actionCount: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Replaces ${variable} placeholders in the template with context values.
 * The template itself is never modified — a deep copy is returned.
 */
function mergeContextIntoTemplate(
  template: UITemplate,
  context?: Record<string, unknown>
): UITemplate {
  if (!context) return template;

  let templateString = JSON.stringify(template);

  Object.entries(context).forEach(([key, value]) => {
    const pattern = new RegExp(`\\$\\{${key}\\}`, 'g');

    let replacement: string;
    if (typeof value === 'string') {
      replacement = value;
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      replacement = String(value);
    } else {
      replacement = JSON.stringify(value);
    }

    // Escape backslashes and double-quotes so JSON stays valid after replacement
    replacement = replacement.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    templateString = templateString.replace(pattern, replacement);
  });

  try {
    return JSON.parse(templateString);
  } catch {
    console.error('[SDUI] Failed to parse merged template, returning original');
    return template;
  }
}

// ─── Generic factory ──────────────────────────────────────────────────────────

/**
 * Creates a fully self-contained template resolver bound to the given store.
 *
 * Usage:
 *   const engine = createTemplateEngine(sellerTemplates);
 *   const result = await engine.resolveTemplate({ intent: 'shop_image' });
 */
export function createTemplateEngine(
  store: Record<string, UITemplate>,
  aliases: Record<string, string> = {}   // e.g. { 'shop_image_upload': 'shop_image' }
) {
  async function resolveTemplate(
    request: TemplateEngineRequest
  ): Promise<TemplateEngineResponse> {
    if (!request.intent || request.intent.trim().length === 0) {
      return { success: false, error: 'Intent is required' };
    }

    const normalizedIntent = request.intent.toLowerCase().trim();

    // Resolve alias → canonical intent name
    const resolvedIntent = aliases[normalizedIntent] ?? normalizedIntent;
    const baseTemplate = store[resolvedIntent];

    if (!baseTemplate) {
      const allIntents = [
        ...Object.keys(store),
        ...Object.keys(aliases),
      ].join(', ');
      return {
        success: false,
        error: `Template not found for intent: "${request.intent}". Available: ${allIntents}`,
      };
    }

    const merged = mergeContextIntoTemplate(baseTemplate, request.context);
    const validation = validateUITemplate(merged);

    if (!validation.success) {
      return { success: false, error: `Validation failed: ${validation.error}` };
    }

    return { success: true, data: validation.data };
  }

  function getAvailableIntents(): string[] {
    return [...Object.keys(store), ...Object.keys(aliases)];
  }

  function getTemplateMetadata(): TemplateMetadata[] {
    return Object.entries(store).map(([intent, t]) => ({
      intent,
      height: t.bottom_sheet.size.height,
      expandable: t.bottom_sheet.size.expandable,
      contentType: t.content.type,
      actionCount: t.actions.length,
    }));
  }

  return { resolveTemplate, getAvailableIntents, getTemplateMetadata };
}

// ─── Pre-built engines (one per domain) ──────────────────────────────────────

/** Engine for legacy bottom-sheet product intents */
export const bottomSheetEngine = createTemplateEngine(bottomSheetTemplates);

/** Engine for seller onboarding / shop management intents */
export const sellerEngine = createTemplateEngine(sellerTemplates, {
  // Aliases — Go server may use any of these names
  'shop_image_upload':  'shop_image',
  'upload_shop_image':  'shop_image',
  'verify_shop':        'shop_verification',
  'shop_verify':        'shop_verification',
  'new_product':        'add_product',
  'create_product':     'add_product',
  'upload_product_image': 'product_image',
  'set_shop_address':   'shop_address',
  'email_verification': 'seller_email_verification',
  'verify_email':       'seller_email_verification',
  'address_verification':      'seller_address_verification',
  'verify_address':            'seller_address_verification',
  'shop_address_verification': 'seller_address_verification',
});

/** Engine for buyer / end-user intents */
export const userEngine = createTemplateEngine(userTemplates);

// ─── Backward-compatible exports (used by existing /api/ui/bottom-sheet) ─────
export const { resolveTemplate, getAvailableIntents, getTemplateMetadata } = bottomSheetEngine;
