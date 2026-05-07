# Server-Driven UI Engine - Next.js Implementation

## Overview

A production-ready **Server-Driven UI (SDUI) engine** for ecommerce applications built with Next.js App Router. This system delivers pre-defined UI templates as JSON to mobile apps and WebViews without any dynamic generation or AI logic.

## Architecture

### Folder Structure

```
lib/
├── types/
│   └── ui.ts                    # Type definitions
├── templates/
│   └── bottomSheetTemplates.ts  # Pre-defined templates
├── orchestrator/
│   └── templateEngine.ts        # Template lookup & merging
└── validators/
    └── jsonValidator.ts         # Zod-based validation

app/
└── api/
    └── ui/
        └── bottom-sheet/
            └── route.ts         # API endpoint
```

## Features

- ✅ **NO AI/LLM Dependencies** - Pure template system
- ✅ **Type-Safe** - Full TypeScript support with Zod validation
- ✅ **Deterministic Output** - Always returns same template for same intent
- ✅ **Context Merging** - Simple variable replacement with `${variable}` syntax
- ✅ **Production Ready** - Error handling, logging, proper HTTP status codes
- ✅ **Extensible** - Easy to add new templates
- ✅ **HTML Passthrough** - Supports both HTML and JSON-based components

## API Endpoints

### GET /api/ui/bottom-sheet

Returns server status and available actions.

```bash
curl http://localhost:3000/api/ui/bottom-sheet
```

Response:
```json
{
  "success": true,
  "data": {
    "message": "SDUI Server is running",
    "actions": {
      "GET?action=intents": "List all available template intents",
      "GET?action=metadata": "Get metadata about all templates",
      "POST": "Request a template by intent"
    }
  }
}
```

### GET /api/ui/bottom-sheet?action=intents

Lists all available template intents.

```bash
curl http://localhost:3000/api/ui/bottom-sheet?action=intents
```

Response:
```json
{
  "success": true,
  "data": ["cart", "product_details", "checkout"]
}
```

### GET /api/ui/bottom-sheet?action=metadata

Returns metadata about all templates.

```bash
curl http://localhost:3000/api/ui/bottom-sheet?action=metadata
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "intent": "cart",
      "height": "75%",
      "expandable": true,
      "contentType": "json",
      "actionCount": 2
    },
    {
      "intent": "product_details",
      "height": "75%",
      "expandable": true,
      "contentType": "json",
      "actionCount": 2
    },
    {
      "intent": "checkout",
      "height": "full",
      "expandable": false,
      "contentType": "json",
      "actionCount": 2
    }
  ]
}
```

### POST /api/ui/bottom-sheet

Requests a template by intent.

#### Request Body

```json
{
  "intent": "cart",
  "context": {
    "user_id": "user_123",
    "cart_id": "cart_456"
  }
}
```

#### Response (Success)

```json
{
  "success": true,
  "data": {
    "bottom_sheet": {
      "open": false,
      "size": {
        "height": "75%",
        "expandable": true,
        "initial_state": "collapsed"
      }
    },
    "content": {
      "type": "json",
      "components": [...]
    },
    "actions": [...]
  }
}
```

#### Response (Error)

```json
{
  "success": false,
  "error": "Template not found for intent: \"unknown\". Available templates: cart, product_details, checkout"
}
```

## Template Structure

Each template follows this schema:

```typescript
interface UITemplate {
  bottom_sheet: {
    open: boolean;
    size: {
      height: "wrap_content" | "50%" | "75%" | "full";
      expandable: boolean;
      initial_state: "collapsed" | "expanded";
    };
  };
  content: 
    | {
        type: "html";
        html: string;
      }
    | {
        type: "json";
        components: UIComponent[];
      };
  actions: Array<{
    id: string;
    label: string;
    action_type: "api_call" | "navigation" | "dismiss";
    payload: Record<string, unknown>;
  }>;
}
```

## Available Templates

### 1. cart

Shopping cart bottom sheet showing items, pricing breakdown, and checkout options.

**Intent:** `cart`
**Height:** `75%`
**Expandable:** Yes
**Content Type:** JSON

**Actions:**
- `checkout_action` - Navigate to checkout
- `continue_shopping_action` - Dismiss sheet

### 2. product_details

Product details bottom sheet with image, pricing, description, and purchase options.

**Intent:** `product_details`
**Height:** `75%`
**Expandable:** Yes
**Content Type:** JSON

**Actions:**
- `add_to_cart_action` - API call to add product
- `buy_now_action` - Navigate to checkout

### 3. checkout

Full-screen checkout form with shipping and payment fields.

**Intent:** `checkout`
**Height:** `full`
**Expandable:** No
**Content Type:** JSON

**Actions:**
- `place_order_action` - API call to create order
- `cancel_checkout_action` - Dismiss sheet

## Adding New Templates

### Step 1: Define Template in `/lib/templates/bottomSheetTemplates.ts`

```typescript
export const bottomSheetTemplates: Record<string, UITemplate> = {
  // ... existing templates ...

  my_new_template: {
    bottom_sheet: {
      open: false,
      size: {
        height: "50%",
        expandable: true,
        initial_state: "collapsed",
      },
    },
    content: {
      type: "json",
      components: [
        {
          id: "my_component",
          type: "text",
          props: {
            content: "Hello from new template",
            fontSize: "16px",
            color: "#000000",
          },
        },
      ],
    },
    actions: [
      {
        id: "my_action",
        label: "Click Me",
        action_type: "dismiss",
        payload: {},
      },
    ],
  },
};
```

### Step 2: Request Template

```bash
curl -X POST http://localhost:3000/api/ui/bottom-sheet \
  -H "Content-Type: application/json" \
  -d '{
    "intent": "my_new_template"
  }'
```

## Context Merging

Use `${variable}` syntax to insert context values into templates.

### Example

**Template Definition:**
```typescript
{
  id: "item_name",
  type: "text",
  props: {
    content: "${product_name}",
    fontSize: "14px",
  },
}
```

**Request:**
```json
{
  "intent": "cart",
  "context": {
    "product_name": "Premium Wireless Headphones"
  }
}
```

**Result:**
```json
{
  "id": "item_name",
  "type": "text",
  "props": {
    "content": "Premium Wireless Headphones",
    "fontSize": "14px"
  }
}
```

## Supported Component Types

- `text` - Text content
- `image` - Image display
- `button` - Interactive button
- `input` - Text input field
- `list` - List container
- `row` - Horizontal layout
- `column` - Vertical layout
- `card` - Grouped content block

## Action Types

### api_call

Makes an API call when action is triggered.

```json
{
  "id": "add_to_cart",
  "label": "Add to Cart",
  "action_type": "api_call",
  "payload": {
    "endpoint": "/api/cart/add",
    "method": "POST",
    "body": {
      "product_id": "prod_12345",
      "quantity": 1
    }
  }
}
```

### navigation

Navigates to a different route.

```json
{
  "id": "go_to_checkout",
  "label": "Checkout",
  "action_type": "navigation",
  "payload": {
    "route": "/checkout",
    "params": {
      "cart_id": "cart_123"
    }
  }
}
```

### dismiss

Closes/dismisses the bottom sheet.

```json
{
  "id": "close_sheet",
  "label": "Close",
  "action_type": "dismiss",
  "payload": {}
}
```

## Validation

All requests and templates are validated using Zod schemas:

- Request validation: Intent is required and must be non-empty string
- Template validation: Bottom sheet config, content structure, and actions are validated
- Context validation: Context object must be valid JSON

Invalid requests return HTTP 400 with error details.

## Error Handling

### Template Not Found

```json
{
  "success": false,
  "error": "Template not found for intent: \"unknown\". Available templates: cart, product_details, checkout"
}
```

### Invalid Request

```json
{
  "success": false,
  "error": "Request validation error: Intent is required"
}
```

### Internal Server Error

```json
{
  "success": false,
  "error": "Internal server error"
}
```

## HTTP Status Codes

- `200` - Template found and returned successfully
- `400` - Invalid request (missing/invalid intent, malformed JSON)
- `404` - Template not found
- `500` - Internal server error

## Performance Considerations

- ✅ Templates are loaded synchronously from memory (instant)
- ✅ No database queries
- ✅ No external API calls
- ✅ Simple string replacement for context merging
- ✅ All templates are pre-validated at development time

## Security Considerations

- ✅ No arbitrary code execution
- ✅ No SQL injection (no databases)
- ✅ No XSS (templates don't execute JavaScript)
- ✅ Input validation on all requests
- ✅ No file system access from templates

## Development

### Install Dependencies

```bash
npm install zod next react
```

### Start Development Server

```bash
npm run dev
```

### Test the API

```bash
# Get available templates
curl http://localhost:3000/api/ui/bottom-sheet?action=intents

# Request cart template
curl -X POST http://localhost:3000/api/ui/bottom-sheet \
  -H "Content-Type: application/json" \
  -d '{"intent": "cart"}'

# Request with context
curl -X POST http://localhost:3000/api/ui/bottom-sheet \
  -H "Content-Type: application/json" \
  -d '{
    "intent": "cart",
    "context": {
      "cart_id": "custom_cart_123"
    }
  }'
```

## Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

No environment variables required for the basic implementation. All configuration is code-based.

### Scaling Considerations

Since this is a pure template lookup system:
- Can be deployed as a serverless function
- No database connections to maintain
- Stateless design allows unlimited horizontal scaling
- Perfect for CDN caching at edge locations

## Monitoring

The API includes logging for:
- Request validation errors
- Template resolution failures
- Internal server errors

Monitor these logs to identify:
- Malformed client requests
- Missing template intents (opportunities for new templates)
- System errors

## Example Integration

### Next.js Client Code

```typescript
async function getBottomSheet(intent: string, context?: object) {
  const response = await fetch('/api/ui/bottom-sheet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intent,
      context,
    }),
  });

  const result = await response.json();

  if (result.success) {
    // Render bottom sheet with result.data
    renderBottomSheet(result.data);
  } else {
    console.error('Failed to fetch template:', result.error);
  }
}

// Usage
getBottomSheet('cart', { cart_id: 'user_cart_123' });
```

## Troubleshooting

### Template returns with wrong data

Check that `context` values match `${variable}` names in template exactly.

### Invalid JSON error

Ensure request body is valid JSON and includes required `intent` field.

### 404 error

Check available templates using `GET?action=intents` and use exact intent name.

## License

MIT

## Support

For issues or questions about this implementation, refer to the template structure and validation files.
