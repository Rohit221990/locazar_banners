/**
 * COMPLETE FILE LISTING
 * Production-Ready Next.js Server-Driven UI Engine
 * 
 * Generated: May 6, 2026
 * Version: 1.0.0
 */

/**
 * PROJECT STRUCTURE
 * 
 * /lib/
 *   ├── types/
 *   │   └── ui.ts                    (TypeScript type definitions)
 *   ├── templates/
 *   │   └── bottomSheetTemplates.ts  (Pre-defined UI templates)
 *   ├── orchestrator/
 *   │   └── templateEngine.ts        (Template lookup & merging)
 *   ├── validators/
 *   │   └── jsonValidator.ts         (Zod-based validation)
 *   └── hooks/
 *       └── useBottomSheet.ts        (Client-side React hooks)
 * 
 * /app/
 *   └── api/
 *       └── ui/
 *           └── bottom-sheet/
 *               └── route.ts         (API endpoint)
 * 
 * /__tests__/
 *   └── templateEngine.test.ts       (Unit tests)
 * 
 * ROOT:
 *   ├── SDUI_README.md               (Full documentation)
 *   └── SDUI_CONFIG.ts               (Configuration & best practices)
 */

/**
 * FILE DESCRIPTIONS
 */

export const FILE_DESCRIPTIONS = {
  'lib/types/ui.ts': {
    purpose: 'Core TypeScript type definitions',
    exports: [
      'BottomSheetHeight',
      'InitialState',
      'ContentType',
      'ActionType',
      'BottomSheetSize',
      'BottomSheetConfig',
      'UIAction',
      'HTMLContent',
      'JSONContent',
      'ContentVariant',
      'UITemplate',
      'TemplateEngineRequest',
      'TemplateEngineResponse',
      'UIComponent',
    ],
    responsibility:
      'Defines all type interfaces for templates, components, and API communication',
    maintainedBy: 'Backend team',
    changeFrequency: 'Rare (only for new features)',
  },

  'lib/templates/bottomSheetTemplates.ts': {
    purpose: 'Predefined UI templates for different screens',
    templates: ['cart', 'product_details', 'checkout'],
    responsibility: 'Contains manually authored templates; no dynamic generation',
    maintainedBy: 'UX/Design team',
    changeFrequency: 'Regular (updates to UI)',
    notes: [
      'Add new templates here',
      'Modify existing templates for UX changes',
      'Each template must include: bottom_sheet, content, actions',
      'Use ${variable} for dynamic content',
    ],
  },

  'lib/validators/jsonValidator.ts': {
    purpose: 'Request and template validation using Zod',
    exports: [
      'validateUITemplate()',
      'validateTemplateEngineRequest()',
      'UITemplateSchema',
      'TemplateEngineRequestSchema',
    ],
    responsibility: 'Validates all incoming requests and templates against schema',
    maintainedBy: 'Backend team',
    changeFrequency: 'Rare (only for schema changes)',
    notes: [
      'All validation is Zod-based',
      'Provides detailed error messages',
      'Used by both API and template engine',
    ],
  },

  'lib/orchestrator/templateEngine.ts': {
    purpose: 'Core template resolution and merging engine',
    exports: [
      'resolveTemplate()',
      'getAvailableIntents()',
      'getTemplateMetadata()',
      'mergeContextIntoTemplate()',
      'fetchTemplate()',
    ],
    responsibility: 'Orchestrates template lookup, context merging, and validation',
    maintainedBy: 'Backend team',
    changeFrequency: 'Rare (core logic)',
    notes: [
      'NO dynamic UI generation',
      'NO AI/LLM usage',
      'Simple template lookup + string replacement',
      'All output is deterministic',
    ],
  },

  'app/api/ui/bottom-sheet/route.ts': {
    purpose: 'Main API endpoint for requesting templates',
    methods: ['GET', 'POST', 'OPTIONS'],
    endpoints: [
      'GET / - Server status',
      'GET ?action=intents - Available intents',
      'GET ?action=metadata - Template metadata',
      'POST / - Request template',
    ],
    responsibility: 'Handles HTTP requests, validation, and responses',
    maintainedBy: 'Backend team',
    changeFrequency: 'Rare (stable interface)',
    notes: [
      'Stateless and serverless-ready',
      'Error handling with proper HTTP codes',
      'Logging for debugging',
    ],
  },

  'lib/hooks/useBottomSheet.ts': {
    purpose: 'Client-side React hooks for template fetching and rendering',
    exports: [
      'useBottomSheetTemplate()',
      'BottomSheetComponent',
      'JSONComponentRenderer',
      'ComponentRenderer',
      'handleAction()',
      'fetchAvailableTemplates()',
      'fetchTemplateMetadata()',
    ],
    responsibility: 'Provides client-side integration example',
    maintainedBy: 'Frontend team',
    changeFrequency: 'Regular (UI improvements)',
    notes: [
      'This is a REFERENCE implementation',
      'Adapt to your UI framework (React, Vue, etc.)',
      'Demonstrates template fetching and rendering',
      'Handles all action types',
    ],
  },

  '__tests__/templateEngine.test.ts': {
    purpose: 'Unit tests for template engine',
    tests: [
      'Template resolution',
      'Template not found errors',
      'Context merging',
      'Available intents',
      'Template metadata',
    ],
    responsibility: 'Validates template engine functionality',
    maintainedBy: 'Backend team',
    changeFrequency: 'Regular (as tests are added)',
    notes: [
      'Run with: npm test',
      'Add tests for new templates',
      'Add tests for edge cases',
    ],
  },

  'SDUI_README.md': {
    purpose: 'Comprehensive documentation',
    sections: [
      'Overview',
      'Architecture',
      'API Endpoints',
      'Template Structure',
      'Available Templates',
      'Adding New Templates',
      'Context Merging',
      'Supported Components',
      'Action Types',
      'Validation',
      'Error Handling',
      'Performance',
      'Security',
      'Development',
      'Deployment',
      'Monitoring',
      'Example Integration',
      'Troubleshooting',
    ],
    responsibility: 'Complete reference documentation',
    maintainedBy: 'Documentation team',
    changeFrequency: 'Regular (as features change)',
  },

  'SDUI_CONFIG.ts': {
    purpose: 'Configuration reference and best practices',
    sections: [
      'Dependencies',
      'Environment Setup',
      'Scaling Recommendations',
      'Security Practices',
      'Template Organization',
      'Testing Guide',
      'Monitoring Setup',
      'Deployment Checklist',
      'Roadmap',
      'Troubleshooting',
    ],
    responsibility: 'Configuration examples and best practices',
    maintainedBy: 'Ops and Architecture team',
    changeFrequency: 'Regular (as best practices evolve)',
  },
};

/**
 * QUICK START GUIDE
 */
export const QUICK_START = `
1. INSTALL DEPENDENCIES
   npm install zod

2. VERIFY FOLDER STRUCTURE
   ✓ lib/types/ui.ts
   ✓ lib/templates/bottomSheetTemplates.ts
   ✓ lib/validators/jsonValidator.ts
   ✓ lib/orchestrator/templateEngine.ts
   ✓ app/api/ui/bottom-sheet/route.ts

3. START DEVELOPMENT SERVER
   npm run dev

4. TEST THE API
   curl -X POST http://localhost:3000/api/ui/bottom-sheet \\
     -H "Content-Type: application/json" \\
     -d '{"intent": "cart"}'

5. VIEW AVAILABLE TEMPLATES
   curl http://localhost:3000/api/ui/bottom-sheet?action=intents

6. INTEGRATE IN YOUR APP
   Import useBottomSheetTemplate from lib/hooks/useBottomSheet.ts
   Or build your own client integration
`;

/**
 * KEY PRINCIPLES
 */
export const KEY_PRINCIPLES = {
  '1_Template_Lookup': 'All UI is served from predefined templates, not generated',
  '2_No_AI': 'Zero AI/LLM dependencies or usage',
  '3_Deterministic': 'Same input always produces same output',
  '4_Composable': 'Templates built from generic components',
  '5_Typed': 'Full TypeScript support with Zod validation',
  '6_Stateless': 'No session or state required',
  '7_Fast': 'Typical response time < 10ms',
  '8_Scalable': 'Serverless-ready, horizontal scaling supported',
};

/**
 * DEPENDENCY GRAPH
 */
export const DEPENDENCY_GRAPH = {
  'API Route (route.ts)': ['Template Engine', 'Validator'],
  'Template Engine': ['Templates', 'Validator', 'Types'],
  'Templates': ['Types'],
  'Validator': ['Types', 'Zod'],
  'Client Hook': ['Types', 'API Route'],
  'Types': ['No dependencies'],
};

/**
 * TESTING MATRIX
 */
export const TESTING_COVERAGE = {
  'lib/types/': 'Type checking (no runtime tests)',
  'lib/templates/': 'Structure validation',
  'lib/validators/': 'Schema validation, error cases',
  'lib/orchestrator/': 'Template resolution, context merging',
  'app/api/': 'HTTP endpoints, error responses',
  'lib/hooks/': 'Component rendering, action handling',
};

/**
 * DEPLOYMENT OPTIONS
 */
export const DEPLOYMENT_OPTIONS = [
  {
    platform: 'Vercel',
    type: 'Serverless',
    cost: 'Pay per request',
    setup: 'npm run build && vercel deploy',
    benefits: ['Auto-scaling', 'Global CDN', 'Built for Next.js'],
  },
  {
    platform: 'AWS Lambda + API Gateway',
    type: 'Serverless',
    cost: 'Pay per request',
    setup: 'Use next-serverless adapter',
    benefits: ['Full AWS integration', 'Cost-effective', 'Scalable'],
  },
  {
    platform: 'Docker Container',
    type: 'Containerized',
    cost: 'Infrastructure cost',
    setup: 'Build Docker image, push to registry',
    benefits: ['Full control', 'Multi-cloud', 'Standard deployment'],
  },
  {
    platform: 'Self-hosted Node.js',
    type: 'Traditional',
    cost: 'Server cost',
    setup: 'npm run build && npm start',
    benefits: ['On-premises', 'Maximum control', 'No vendor lock-in'],
  },
];

/**
 * MONITORING & ALERTS
 */
export const RECOMMENDED_ALERTS = [
  'Error rate > 1%',
  'Response time > 50ms',
  'Template not found errors increase',
  'Validation errors increase',
  'Request volume spike',
];

/**
 * CHANGE CHECKLIST
 */
export const WHEN_TO_MODIFY = {
  'Add new template': [
    '1. Add to lib/templates/bottomSheetTemplates.ts',
    '2. Test with API',
    '3. Update SDUI_README.md',
    '4. Add unit test',
    '5. Deploy to production',
  ],
  'Add new component type': [
    '1. Update lib/types/ui.ts',
    '2. Update validator schema',
    '3. Update client renderer (if needed)',
    '4. Update tests',
    '5. Update documentation',
  ],
  'Add new action type': [
    '1. Update ActionType in lib/types/ui.ts',
    '2. Update Zod schema in validator',
    '3. Update client action handler',
    '4. Add tests',
    '5. Update documentation',
  ],
};

/**
 * SUPPORT & RESOURCES
 */
export const RESOURCES = {
  'Next.js Docs': 'https://nextjs.org/docs',
  'TypeScript Docs': 'https://www.typescriptlang.org/docs/',
  'Zod Documentation': 'https://zod.dev',
  'React Hooks': 'https://react.dev/reference/react/hooks',
  'HTTP Status Codes': 'https://httpwg.org/specs/rfc7231.html#status.codes',
};

export default {
  FILE_DESCRIPTIONS,
  QUICK_START,
  KEY_PRINCIPLES,
  DEPENDENCY_GRAPH,
  TESTING_COVERAGE,
  DEPLOYMENT_OPTIONS,
  RECOMMENDED_ALERTS,
  WHEN_TO_MODIFY,
  RESOURCES,
};
