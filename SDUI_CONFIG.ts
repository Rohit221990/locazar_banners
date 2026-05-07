/**
 * SDUI Configuration & Best Practices
 * 
 * This file documents recommended configurations and best practices
 * for using the Server-Driven UI engine
 */

/**
 * REQUIRED DEPENDENCIES
 * 
 * Add these to your package.json:
 */
export const REQUIRED_DEPENDENCIES = {
  'next': '^14.0.0 or higher',
  'react': '^18.0.0 or higher',
  'zod': '^3.22.0 or higher',
};

export const DEV_DEPENDENCIES = {
  'typescript': '^5.0.0 or higher',
  '@types/react': '^18.0.0 or higher',
  '@types/node': '^20.0.0 or higher',
};

/**
 * INSTALLATION COMMAND
 */
export const INSTALL_COMMAND = `
npm install next react zod
npm install -D typescript @types/react @types/node
`;

/**
 * TSCONFIG.json SETTINGS
 * 
 * Ensure your tsconfig.json includes:
 */
export const TSCONFIG_PATHS = {
  '@/*': ['./*'],
  '@/lib/*': ['./lib/*'],
  '@/app/*': ['./app/*'],
};

/**
 * ENVIRONMENT SETUP
 * 
 * No special environment variables are required
 * All configuration is code-based
 * 
 * For production deployment, you might want:
 */
export const OPTIONAL_ENV_VARS = {
  SDUI_LOG_LEVEL: 'info', // info, warn, error
  SDUI_CACHE_TEMPLATES: 'true', // Cache templates in memory
  SDUI_MAX_CONTEXT_SIZE: '10000', // Max size of context object
};

/**
 * SCALING RECOMMENDATIONS
 */
export const SCALING_RECOMMENDATIONS = `
✅ HORIZONTAL SCALING
  - Stateless design allows unlimited instances
  - Perfect for serverless deployment (Vercel, AWS Lambda, etc.)
  - Can be deployed globally with edge functions

✅ PERFORMANCE OPTIMIZATION
  - Templates are loaded synchronously (instant response)
  - Context merging uses simple string replacement (efficient)
  - No database queries or external API calls
  - Response times typically < 10ms

✅ CACHING STRATEGY
  - Cache entire API responses on client side
  - Use HTTP caching headers on API route
  - Example: Cache-Control: public, max-age=3600

✅ MONITORING
  - Track request volume by intent
  - Monitor error rates (template not found, validation errors)
  - Log unusual context sizes or patterns
`;

/**
 * SECURITY BEST PRACTICES
 */
export const SECURITY_PRACTICES = `
✅ INPUT VALIDATION
  - All requests validated with Zod
  - Intent must be non-empty string
  - Context size should be limited

✅ OUTPUT SAFETY
  - Templates never execute code
  - HTML templates are passed through as-is (client responsibility)
  - All component definitions are static

✅ RATE LIMITING
  - Consider adding rate limiting middleware
  - Recommended: 1000 requests/minute per IP
  
✅ AUTHENTICATION
  - API route should require authentication
  - Add middleware to verify request origin
  - Example: Validate bearer token or API key

✅ CORS
  - Configure CORS appropriately for your domain
  - Example: Only allow requests from trusted domains
`;

/**
 * ADDING AUTHENTICATION
 * 
 * Example middleware to add to your API route
 */
export const AUTH_MIDDLEWARE_EXAMPLE = `
import { NextRequest, NextResponse } from 'next/server';

export async function withAuth(request: NextRequest, handler: Function) {
  // Check API key
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey || apiKey !== process.env.SDUI_API_KEY) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return handler(request);
}

// Usage in route.ts:
// export async function POST(request: NextRequest) {
//   return withAuth(request, async () => {
//     // ... existing handler code ...
//   });
// }
`;

/**
 * ADDING RATE LIMITING
 * 
 * Example rate limiting middleware
 */
export const RATE_LIMIT_EXAMPLE = `
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '60 s'),
});

export async function withRateLimit(request: NextRequest, handler: Function) {
  const ip = request.ip ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { success: false, error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }

  return handler(request);
}

// To use:
// npm install @upstash/ratelimit @upstash/redis
`;

/**
 * TEMPLATE ORGANIZATION BEST PRACTICES
 */
export const TEMPLATE_ORGANIZATION = `
✅ NAMING CONVENTIONS
  - Use lowercase snake_case for intent names
  - Be descriptive: "cart_review" not "cr"
  - Group related intents: "product_*", "checkout_*"

✅ COMPONENT IDS
  - Use hierarchical IDs: "header_title", "cart_item_1"
  - Include component type: "btn_checkout" for buttons
  - Keep IDs unique within template

✅ PROPS CONSISTENCY
  - Use consistent prop names across components
  - Follow CSS naming: backgroundColor, fontSize, borderRadius
  - Document required vs optional props

✅ ACTIONS
  - Each template should have at least one primary action
  - Always include a dismiss/close action
  - Keep action payloads small (< 1KB)

✅ COMPONENTS PER TEMPLATE
  - Aim for 10-50 components per template
  - Use cards to group related components
  - Nest no more than 4 levels deep

✅ CONTEXT VARIABLES
  - Document all \${variable} placeholders
  - Use descriptive names: \${product_name} not \${pn}
  - Provide default values in template if possible
`;

/**
 * TESTING TEMPLATE CHANGES
 */
export const TESTING_GUIDE = `
✅ MANUAL TESTING
  1. Start dev server: npm run dev
  2. Fetch template: curl http://localhost:3000/api/ui/bottom-sheet -X POST \\
     -H "Content-Type: application/json" \\
     -d '{"intent": "cart"}'
  3. Validate response structure
  4. Check component hierarchy
  5. Verify action payloads

✅ AUTOMATED TESTING
  - Run: npm test
  - Tests validate template structure
  - Tests check context merging
  - Tests verify error handling

✅ VALIDATION CHECKLIST
  - [ ] Intent is unique
  - [ ] All component IDs are unique
  - [ ] Content type matches (html OR json)
  - [ ] Bottom sheet size is valid
  - [ ] All actions have valid type
  - [ ] Template validates with Zod schema
  - [ ] Context variables are documented
  - [ ] Component hierarchy is logical

✅ CLIENT TESTING
  - Test template rendering in real UI
  - Verify action execution
  - Check context merging in client
  - Test error scenarios
`;

/**
 * MONITORING & OBSERVABILITY
 */
export const MONITORING_SETUP = `
✅ METRICS TO TRACK
  - Request count by intent
  - Response time (should be < 10ms)
  - Error rate (template not found, validation errors)
  - Context size distribution
  - Most frequently requested templates

✅ ERROR TRACKING
  - Log all 400-level errors (validation, not found)
  - Log all 500-level errors (server errors)
  - Include request details in logs
  - Alert on increased error rates

✅ LOGGING EXAMPLE
  // Add to route.ts
  console.log('[SDUI] Request', {
    intent: request.intent,
    timestamp: new Date().toISOString(),
    contextSize: JSON.stringify(request.context).length,
  });

✅ ANALYTICS
  - Track template usage patterns
  - Identify unused templates
  - Monitor deprecated template usage
  - Analyze context data patterns
`;

/**
 * DEPLOYMENT CHECKLIST
 */
export const DEPLOYMENT_CHECKLIST = `
BEFORE PRODUCTION:
  [ ] All templates validated
  [ ] Error handling tested
  [ ] Rate limiting configured
  [ ] Authentication enabled
  [ ] CORS configured
  [ ] Logging enabled
  [ ] Monitoring set up
  [ ] Load testing completed
  [ ] Rollback plan documented
  [ ] Team trained on system

DURING DEPLOYMENT:
  [ ] Deploy to staging first
  [ ] Verify all endpoints working
  [ ] Run smoke tests
  [ ] Monitor error rates
  [ ] Monitor response times
  [ ] Verify client can reach API

AFTER DEPLOYMENT:
  [ ] Monitor for 24 hours
  [ ] Check error logs daily
  [ ] Gather usage metrics
  [ ] Plan next improvements
  [ ] Document any issues
`;

/**
 * ROADMAP & FUTURE ENHANCEMENTS
 * 
 * Potential improvements without compromising the design:
 */
export const ROADMAP = `
PHASE 1: CORE (CURRENT) ✅
  - Template lookup system
  - JSON schema validation
  - Context merging
  - Error handling

PHASE 2: ENHANCEMENTS
  - Template versioning
  - A/B testing support
  - Template analytics
  - Performance monitoring
  - Caching strategies

PHASE 3: TOOLING
  - Template editor UI
  - Visual template builder
  - Template preview tool
  - Template migration utilities
  - Diff viewer for changes

PHASE 4: ADVANCED
  - Conditional components (if statements)
  - Dynamic action branching
  - Template inheritance
  - Component library system
  - Template composition

NOTE: All enhancements maintain the principle of
NO AI/LLM generation and fully deterministic output.
`;

/**
 * TROUBLESHOOTING COMMON ISSUES
 */
export const TROUBLESHOOTING = `
ISSUE: Template returns undefined variables
SOLUTION: 
  - Check \${variable} name matches context key exactly
  - Context keys are case-sensitive
  - Verify context is passed in request

ISSUE: 404 Template not found
SOLUTION:
  - Verify intent name with GET?action=intents
  - Check spelling (case-sensitive)
  - Ensure template is in bottomSheetTemplates.ts
  - Restart dev server after adding template

ISSUE: Validation error on template
SOLUTION:
  - Verify all required fields present
  - Check component structure is valid
  - Ensure bottom_sheet has correct structure
  - Validate action_type is one of: api_call, navigation, dismiss

ISSUE: Slow response times
SOLUTION:
  - Context merging should be < 1ms
  - If slow, check for large context objects
  - Monitor server resources
  - Check for network issues (not API issue)

ISSUE: Context variables not replaced
SOLUTION:
  - Check \${variable} syntax exactly
  - Verify context is JSON serializable
  - No nested variable replacement supported
  - One level of replacement only
`;

export default {
  REQUIRED_DEPENDENCIES,
  DEV_DEPENDENCIES,
  INSTALL_COMMAND,
  TSCONFIG_PATHS,
  OPTIONAL_ENV_VARS,
  SCALING_RECOMMENDATIONS,
  SECURITY_PRACTICES,
  TEMPLATE_ORGANIZATION,
  TESTING_GUIDE,
  MONITORING_SETUP,
  DEPLOYMENT_CHECKLIST,
  ROADMAP,
  TROUBLESHOOTING,
};
