/**
 * UI Type Definitions
 * Core types for Server-Driven UI system
 */

export type BottomSheetHeight = `${number}%` | 'wrap_content' | 'full';
export type InitialState = 'collapsed' | 'expanded';
export type ContentType = 'html' | 'json';
export type ActionType = 'api_call' | 'navigation' | 'dismiss';

export interface BottomSheetSize {
  height: BottomSheetHeight;
  expandable: boolean;
  initial_state: InitialState;
}

export interface BottomSheetConfig {
  open: boolean;
  size: BottomSheetSize;
}

export interface UIAction {
  id: string;
  label: string;
  action_type: ActionType;
  payload: Record<string, unknown>;
}

export interface HTMLContent {
  type: 'html';
  html: string;
}

export interface JSONContent {
  type: 'json';
  components: UIComponent[];
}

export type ContentVariant = HTMLContent | JSONContent;

export interface UITemplate {
  bottom_sheet: BottomSheetConfig;
  content: ContentVariant;
  actions: UIAction[];
}

export interface TemplateEngineRequest {
  intent: string;
  context?: Record<string, unknown>;
}

export interface TemplateEngineResponse {
  success: boolean;
  data?: UITemplate;
  error?: string;
}

export interface UIComponent {
  id: string;
  type: string;
  props: Record<string, unknown>;
  children?: UIComponent[];
}
