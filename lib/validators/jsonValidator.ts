/**
 * JSON Validators
 * Zod-based validation for UI templates and API requests
 */

import { z } from 'zod';
import { UITemplate, TemplateEngineRequest } from '@/lib/types/ui';

/**
 * Validates UI Component structure
 */
const UIComponentSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string().min(1, 'Component ID is required'),
    type: z.string().min(1, 'Component type is required'),
    props: z.record(z.unknown()).default({}),
    children: z.array(UIComponentSchema).optional(),
  })
);

/**
 * Validates Bottom Sheet Size configuration
 */
const BottomSheetSizeSchema = z.object({
  height: z.string().regex(/^\d+%$|^wrap_content$|^full$/, {
    message: 'height must be a percentage (e.g. "65%") or "wrap_content" / "full"',
  }),
  expandable: z.boolean(),
  initial_state: z.enum(['collapsed', 'expanded']),
});

/**
 * Validates Bottom Sheet configuration
 */
const BottomSheetConfigSchema = z.object({
  open: z.boolean(),
  size: BottomSheetSizeSchema,
});

/**
 * Validates UI Actions
 */
const UIActionSchema = z.object({
  id: z.string().min(1, 'Action ID is required'),
  label: z.string().min(1, 'Action label is required'),
  action_type: z.enum(['api_call', 'navigation', 'dismiss']),
  payload: z.record(z.unknown()),
});

/**
 * Validates HTML content variant
 */
const HTMLContentSchema = z.object({
  type: z.literal('html'),
  html: z.string().min(1, 'HTML content is required'),
});

/**
 * Validates JSON content variant
 */
const JSONContentSchema = z.object({
  type: z.literal('json'),
  components: z.array(UIComponentSchema).min(1, 'At least one component is required'),
});

/**
 * Validates Content (HTML or JSON)
 */
const ContentVariantSchema = z.union([HTMLContentSchema, JSONContentSchema]);

/**
 * Validates complete UI Template
 */
const UITemplateSchema: z.ZodType<UITemplate> = z.object({
  bottom_sheet: BottomSheetConfigSchema,
  content: ContentVariantSchema,
  actions: z.array(UIActionSchema),
});

/**
 * Validates Template Engine Request
 */
const TemplateEngineRequestSchema: z.ZodType<TemplateEngineRequest> = z.object({
  intent: z.string().min(1, 'Intent is required'),
  context: z.record(z.unknown()).optional(),
});

/**
 * Validate UI Template
 */
export function validateUITemplate(data: unknown): {
  success: boolean;
  data?: UITemplate;
  error?: string;
} {
  try {
    const validated = UITemplateSchema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: `Validation error: ${error.errors.map((e) => e.message).join(', ')}`,
      };
    }
    return { success: false, error: 'Unknown validation error' };
  }
}

/**
 * Validate Template Engine Request
 */
export function validateTemplateEngineRequest(data: unknown): {
  success: boolean;
  data?: TemplateEngineRequest;
  error?: string;
} {
  try {
    const validated = TemplateEngineRequestSchema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: `Request validation error: ${error.errors.map((e) => e.message).join(', ')}`,
      };
    }
    return { success: false, error: 'Unknown validation error' };
  }
}
