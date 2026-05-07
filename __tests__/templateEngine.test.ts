/**
 * Template Engine Tests
 * Unit tests for the SDUI engine using product_item_id-based templates
 *
 * To run: npm test
 */

import { resolveTemplate, getAvailableIntents, getTemplateMetadata } from '@/lib/orchestrator/templateEngine';
import { TemplateEngineRequest } from '@/lib/types/ui';

describe('Template Engine', () => {
  describe('resolveTemplate', () => {
    it('should resolve order_summary template successfully', async () => {
      const request: TemplateEngineRequest = {
        intent: 'order_summary',
      };

      const result = await resolveTemplate(request);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.bottom_sheet.open).toBe(false);
      expect(result.data?.bottom_sheet.size.height).toBe('75%');
      expect(result.data?.content.type).toBe('json');
    });

    it('should resolve product_details template successfully', async () => {
      const request: TemplateEngineRequest = {
        intent: 'product_details',
      };

      const result = await resolveTemplate(request);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.actions.length).toBeGreaterThan(0);
    });

    it('should resolve checkout template successfully', async () => {
      const request: TemplateEngineRequest = {
        intent: 'checkout',
      };

      const result = await resolveTemplate(request);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.bottom_sheet.size.height).toBe('full');
    });

    it('should return error for unknown intent', async () => {
      const request: TemplateEngineRequest = {
        intent: 'unknown_template',
      };

      const result = await resolveTemplate(request);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('Template not found');
    });

    it('should return error for empty intent', async () => {
      const request: TemplateEngineRequest = {
        intent: '',
      };

      const result = await resolveTemplate(request);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should merge product_item_id into order_summary template', async () => {
      const request: TemplateEngineRequest = {
        intent: 'order_summary',
        context: {
          product_item_id: 'item_abc_999',
          item_name: 'Blue Running Shoes',
          item_price: '$89.99',
          shipping_price: '$5.00',
          tax_amount: '$7.20',
          total_price: '$102.19',
        },
      };

      const result = await resolveTemplate(request);

      expect(result.success).toBe(true);
      const templateString = JSON.stringify(result.data);
      expect(templateString).toContain('item_abc_999');
      expect(templateString).toContain('Blue Running Shoes');
      expect(templateString).toContain('$89.99');
    });

    it('should merge product_item_id into product_details template', async () => {
      const request: TemplateEngineRequest = {
        intent: 'product_details',
        context: {
          product_item_id: 'item_xyz_42',
          item_name: 'Red Sneakers',
          item_price: '$120.00',
          original_price: '$200.00',
          discount_percent: '40',
          description: 'Comfortable red sneakers for everyday use.',
          rating: '4.7',
          review_count: '312',
          item_image_url: 'https://example.com/red-sneakers.jpg',
        },
      };

      const result = await resolveTemplate(request);

      expect(result.success).toBe(true);
      const templateString = JSON.stringify(result.data);
      expect(templateString).toContain('item_xyz_42');
      expect(templateString).toContain('Red Sneakers');
    });

    it('should merge product_item_id into checkout template', async () => {
      const request: TemplateEngineRequest = {
        intent: 'checkout',
        context: {
          product_item_id: 'item_def_77',
          user_id: 'user_123',
        },
      };

      const result = await resolveTemplate(request);

      expect(result.success).toBe(true);
      const templateString = JSON.stringify(result.data);
      expect(templateString).toContain('item_def_77');
      expect(templateString).toContain('user_123');
    });

    it('should handle missing optional context', async () => {
      const request: TemplateEngineRequest = {
        intent: 'product_details',
        // No context — template variables remain as-is (${...})
      };

      const result = await resolveTemplate(request);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should handle context with special characters', async () => {
      const request: TemplateEngineRequest = {
        intent: 'product_details',
        context: {
          item_name: 'Item with "quotes" & special chars',
          product_item_id: 'item_001',
        },
      };

      const result = await resolveTemplate(request);

      expect(result.success).toBe(true);
    });
  });

  describe('getAvailableIntents', () => {
    it('should return the correct intent names', () => {
      const intents = getAvailableIntents();

      expect(Array.isArray(intents)).toBe(true);
      expect(intents).toContain('order_summary');
      expect(intents).toContain('product_details');
      expect(intents).toContain('checkout');
      // old "cart" intent must NOT exist anymore
      expect(intents).not.toContain('cart');
    });
  });

  describe('getTemplateMetadata', () => {
    it('should return metadata for all templates', () => {
      const metadata = getTemplateMetadata();

      expect(Array.isArray(metadata)).toBe(true);
      expect(metadata.length).toBe(3);

      metadata.forEach((item) => {
        expect(item).toHaveProperty('intent');
        expect(item).toHaveProperty('height');
        expect(item).toHaveProperty('expandable');
        expect(item).toHaveProperty('contentType');
        expect(item).toHaveProperty('actionCount');
        expect(typeof item.actionCount).toBe('number');
      });
    });

    it('should include order_summary metadata with correct config', () => {
      const metadata = getTemplateMetadata();
      const summary = metadata.find((m) => m.intent === 'order_summary');

      expect(summary).toBeDefined();
      expect(summary?.height).toBe('75%');
      expect(summary?.expandable).toBe(true);
      expect(summary?.contentType).toBe('json');
      expect(summary?.actionCount).toBe(2);
    });

    it('should include checkout metadata with full height', () => {
      const metadata = getTemplateMetadata();
      const checkout = metadata.find((m) => m.intent === 'checkout');

      expect(checkout).toBeDefined();
      expect(checkout?.height).toBe('full');
      expect(checkout?.expandable).toBe(false);
    });
  });
});
