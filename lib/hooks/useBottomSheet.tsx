/**
 * Example SDUI Client Integration
 * Shows how to fetch and use bottom sheet templates in a Next.js client component
 * 
 * This is a reference implementation - adapt to your UI framework
 */

'use client';

import { useEffect, useState } from 'react';
import { UITemplate, TemplateEngineResponse } from '@/lib/types/ui';

interface BottomSheetState {
  template?: UITemplate;
  loading: boolean;
  error?: string;
}

/**
 * Hook to fetch and manage bottom sheet templates
 */
export function useBottomSheetTemplate(intent: string, context?: Record<string, unknown>) {
  const [state, setState] = useState<BottomSheetState>({
    loading: true,
  });

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        setState({ loading: true });

        const response = await fetch('/api/ui/bottom-sheet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            intent,
            context,
          }),
        });

        const data: TemplateEngineResponse = await response.json();

        if (data.success && data.data) {
          setState({
            template: data.data,
            loading: false,
          });
        } else {
          setState({
            error: data.error || 'Failed to fetch template',
            loading: false,
          });
        }
      } catch (error) {
        setState({
          error: error instanceof Error ? error.message : 'Network error',
          loading: false,
        });
      }
    };

    fetchTemplate();
  }, [intent, context]);

  return state;
}

/**
 * Example component that renders a bottom sheet from template
 */
export function BottomSheetComponent({ intent, context }: { intent: string; context?: Record<string, unknown> }) {
  const { template, loading, error } = useBottomSheetTemplate(intent, context);

  if (loading) {
    return <div className="p-4">Loading template...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!template) {
    return <div className="p-4">No template found</div>;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg">
      {/* Render based on content type */}
      {template.content.type === 'html' ? (
        <div
          className="p-4"
          dangerouslySetInnerHTML={{
            __html: template.content.html,
          }}
        />
      ) : (
        <div className="p-4">
          <JSONComponentRenderer components={template.content.components} />
        </div>
      )}

      {/* Render actions */}
      <div className="flex gap-2 p-4 border-t">
        {template.actions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleAction(action)}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Renders JSON components recursively
 */
function JSONComponentRenderer({ components }: { components: any[] }) {
  return (
    <div>
      {components.map((component) => (
        <ComponentRenderer key={component.id} component={component} />
      ))}
    </div>
  );
}

/**
 * Renders a single component based on type
 */
function ComponentRenderer({ component }: { component: any }) {
  switch (component.type) {
    case 'text':
      return (
        <p
          key={component.id}
          style={{
            fontSize: component.props.font_size,
            fontWeight: component.props.font_weight,
            color: component.props.color,
          }}
        >
          {component.props.content}
        </p>
      );

    case 'image':
      return (
        <img
          key={component.id}
          src={component.props.src}
          alt="component-image"
          style={{
            width: component.props.width,
            height: component.props.height,
            borderRadius: component.props.border_radius,
          }}
        />
      );

    case 'button':
      return (
        <button
          key={component.id}
          style={{
            backgroundColor: component.props.background_color,
            color: component.props.text_color,
            padding: component.props.padding,
          }}
        >
          {component.props.label}
        </button>
      );

    case 'input':
      return (
        <input
          key={component.id}
          type="text"
          placeholder={component.props.placeholder}
          style={{
            width: component.props.width,
            padding: component.props.padding,
            border: component.props.border,
          }}
        />
      );

    case 'row':
      return (
        <div
          key={component.id}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: component.props.gap,
          }}
        >
          {component.children && <JSONComponentRenderer components={component.children} />}
        </div>
      );

    case 'column':
      return (
        <div
          key={component.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: component.props.gap,
          }}
        >
          {component.children && <JSONComponentRenderer components={component.children} />}
        </div>
      );

    case 'card':
      return (
        <div
          key={component.id}
          style={{
            padding: component.props.padding,
            backgroundColor: component.props.background_color,
            borderRadius: component.props.border_radius,
            border: component.props.border,
          }}
        >
          {component.children && <JSONComponentRenderer components={component.children} />}
        </div>
      );

    case 'list':
      return (
        <ul key={component.id} style={{ listStyle: 'none' }}>
          {component.children && <JSONComponentRenderer components={component.children} />}
        </ul>
      );

    default:
      return <div key={component.id}>Unknown component type: {component.type}</div>;
  }
}

/**
 * Handle action execution
 */
function handleAction(action: any) {
  switch (action.action_type) {
    case 'api_call':
      handleApiCall(action.payload);
      break;

    case 'navigation':
      handleNavigation(action.payload);
      break;

    case 'dismiss':
      handleDismiss();
      break;

    default:
      console.warn(`Unknown action type: ${action.action_type}`);
  }
}

/**
 * Handle API call action
 */
async function handleApiCall(payload: any) {
  try {
    const response = await fetch(payload.endpoint, {
      method: payload.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload.body ? JSON.stringify(payload.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('API call successful:', result);
  } catch (error) {
    console.error('API call failed:', error);
  }
}

/**
 * Handle navigation action
 */
function handleNavigation(payload: any) {
  const url = new URL(payload.route, window.location.origin);

  if (payload.params) {
    Object.entries(payload.params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  window.location.href = url.toString();
}

/**
 * Handle dismiss action
 */
function handleDismiss() {
  // Close bottom sheet
  console.log('Dismissing bottom sheet');
  // Your dismissal logic here
}

/**
 * Example usage in a page component
 */
export function CartPageExample() {
  return (
    <div>
      <h1>Product Catalog</h1>
      <p>Products would be displayed here...</p>

      {/* Show bottom sheet for cart */}
      <BottomSheetComponent
        intent="cart"
        context={{
          cart_id: 'user_123_cart',
          user_id: 'user_123',
        }}
      />
    </div>
  );
}

/**
 * Fetch available templates for debugging
 */
export async function fetchAvailableTemplates() {
  try {
    const response = await fetch('/api/ui/bottom-sheet?action=intents');
    const data = await response.json();

    if (data.success) {
      console.log('Available templates:', data.data);
      return data.data;
    } else {
      console.error('Failed to fetch templates:', data.error);
      return [];
    }
  } catch (error) {
    console.error('Network error:', error);
    return [];
  }
}

/**
 * Fetch template metadata for debugging
 */
export async function fetchTemplateMetadata() {
  try {
    const response = await fetch('/api/ui/bottom-sheet?action=metadata');
    const data = await response.json();

    if (data.success) {
      console.log('Template metadata:', data.data);
      return data.data;
    } else {
      console.error('Failed to fetch metadata:', data.error);
      return [];
    }
  } catch (error) {
    console.error('Network error:', error);
    return [];
  }
}
