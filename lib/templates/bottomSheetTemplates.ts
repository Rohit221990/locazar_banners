/**
 * Bottom Sheet UI Templates
 * Manually authored templates for SDUI engine
 * These are predefined by developers, not generated dynamically
 *
 * Intents:
 *   - "order_summary"    → Order summary sheet (uses product_item_id)
 *   - "product_details"  → Product detail + price sheet (uses product_item_id)
 *   - "checkout"         → Full checkout form sheet (uses product_item_id)
 */

import { UITemplate } from '@/lib/types/ui';

export const bottomSheetTemplates: Record<string, UITemplate> = {

  // ─────────────────────────────────────────────────────────────────────────
  // INTENT: "order_summary"
  // Shows a summary of the selected product item before placing an order.
  // Context variables: ${product_item_id}, ${item_name}, ${item_price}
  // ─────────────────────────────────────────────────────────────────────────
  order_summary: {
    bottom_sheet: {
      open: false,
      size: {
        height: '75%',
        expandable: true,
        initial_state: 'collapsed',
      },
    },
    content: {
      type: 'json',
      components: [
        {
          id: 'header',
          type: 'card',
          props: {
            padding: '16px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E0E0E0',
          },
          children: [
            {
              id: 'header_row',
              type: 'row',
              props: {
                justifyContent: 'space_between',
                alignItems: 'center',
              },
              children: [
                {
                  id: 'title',
                  type: 'text',
                  props: {
                    content: 'Order Summary',
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#000000',
                  },
                },
                {
                  id: 'close_btn',
                  type: 'button',
                  props: {
                    label: '✕',
                    backgroundColor: 'transparent',
                    textColor: '#666666',
                    padding: '8px',
                  },
                },
              ],
            },
          ],
        },
        {
          id: 'item_section',
          type: 'card',
          props: {
            padding: '12px',
            backgroundColor: '#F9F9F9',
            borderRadius: '8px',
            margin: '16px',
          },
          children: [
            {
              id: 'item_list',
              type: 'list',
              props: {
                itemGap: '12px',
              },
              children: [
                {
                  id: 'item_row',
                  type: 'row',
                  props: {
                    justifyContent: 'space_between',
                    alignItems: 'center',
                    padding: '8px',
                  },
                  children: [
                    {
                      id: 'item_image',
                      type: 'image',
                      props: {
                        src: 'https://via.placeholder.com/60',
                        width: '60px',
                        height: '60px',
                        borderRadius: '4px',
                      },
                    },
                    {
                      id: 'item_details',
                      type: 'column',
                      props: {
                        flex: 1,
                        padding: '0 12px',
                        gap: '4px',
                      },
                      children: [
                        {
                          id: 'item_name',
                          type: 'text',
                          props: {
                            content: '${item_name}',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#000000',
                          },
                        },
                        {
                          id: 'item_id_label',
                          type: 'text',
                          props: {
                            content: 'Item ID: ${product_item_id}',
                            fontSize: '12px',
                            color: '#999999',
                          },
                        },
                      ],
                    },
                    {
                      id: 'item_price',
                      type: 'text',
                      props: {
                        content: '${item_price}',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#000000',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'pricing_section',
          type: 'card',
          props: {
            padding: '16px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E0E0E0',
            borderRadius: '8px',
            margin: '0 16px',
          },
          children: [
            {
              id: 'pricing_column',
              type: 'column',
              props: {
                gap: '8px',
              },
              children: [
                {
                  id: 'subtotal_row',
                  type: 'row',
                  props: { justifyContent: 'space_between' },
                  children: [
                    {
                      id: 'subtotal_label',
                      type: 'text',
                      props: { content: 'Subtotal', fontSize: '14px', color: '#666666' },
                    },
                    {
                      id: 'subtotal_value',
                      type: 'text',
                      props: { content: '${item_price}', fontSize: '14px', fontWeight: '500', color: '#000000' },
                    },
                  ],
                },
                {
                  id: 'shipping_row',
                  type: 'row',
                  props: { justifyContent: 'space_between' },
                  children: [
                    {
                      id: 'shipping_label',
                      type: 'text',
                      props: { content: 'Shipping', fontSize: '14px', color: '#666666' },
                    },
                    {
                      id: 'shipping_value',
                      type: 'text',
                      props: { content: '${shipping_price}', fontSize: '14px', fontWeight: '500', color: '#000000' },
                    },
                  ],
                },
                {
                  id: 'tax_row',
                  type: 'row',
                  props: { justifyContent: 'space_between' },
                  children: [
                    {
                      id: 'tax_label',
                      type: 'text',
                      props: { content: 'Tax', fontSize: '14px', color: '#666666' },
                    },
                    {
                      id: 'tax_value',
                      type: 'text',
                      props: { content: '${tax_amount}', fontSize: '14px', fontWeight: '500', color: '#000000' },
                    },
                  ],
                },
                {
                  id: 'divider',
                  type: 'row',
                  props: {
                    height: '1px',
                    backgroundColor: '#E0E0E0',
                    margin: '8px 0',
                  },
                },
                {
                  id: 'total_row',
                  type: 'row',
                  props: { justifyContent: 'space_between' },
                  children: [
                    {
                      id: 'total_label',
                      type: 'text',
                      props: { content: 'Total', fontSize: '16px', fontWeight: '700', color: '#000000' },
                    },
                    {
                      id: 'total_value',
                      type: 'text',
                      props: { content: '${total_price}', fontSize: '16px', fontWeight: '700', color: '#007AFF' },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    actions: [
      {
        id: 'proceed_checkout_action',
        label: 'Proceed to Checkout',
        action_type: 'navigation',
        payload: {
          route: '/checkout',
          params: {
            product_item_id: '${product_item_id}',
          },
        },
      },
      {
        id: 'continue_browsing_action',
        label: 'Continue Browsing',
        action_type: 'dismiss',
        payload: {},
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // INTENT: "product_details"
  // Shows full product item details with price and add-to-order action.
  // Context variables: ${product_item_id}, ${item_name}, ${item_price},
  //                    ${original_price}, ${discount_percent}, ${description}
  // ─────────────────────────────────────────────────────────────────────────
  product_details: {
    bottom_sheet: {
      open: false,
      size: {
        height: '75%',
        expandable: true,
        initial_state: 'collapsed',
      },
    },
    content: {
      type: 'json',
      components: [
        {
          id: 'product_header',
          type: 'column',
          props: {
            padding: '16px',
            backgroundColor: '#FFFFFF',
          },
          children: [
            {
              id: 'product_image',
              type: 'image',
              props: {
                src: '${item_image_url}',
                width: '100%',
                height: '300px',
                borderRadius: '8px',
              },
            },
            {
              id: 'product_title',
              type: 'text',
              props: {
                content: '${item_name}',
                fontSize: '20px',
                fontWeight: '700',
                color: '#000000',
                margin: '16px 0 4px 0',
              },
            },
            {
              id: 'product_item_id_label',
              type: 'text',
              props: {
                content: 'Item ID: ${product_item_id}',
                fontSize: '12px',
                color: '#AAAAAA',
              },
            },
            {
              id: 'product_rating',
              type: 'text',
              props: {
                content: '⭐ ${rating} (${review_count} reviews)',
                fontSize: '14px',
                color: '#666666',
                marginTop: '4px',
              },
            },
          ],
        },
        {
          id: 'price_section',
          type: 'card',
          props: {
            padding: '16px',
            backgroundColor: '#F9F9F9',
            borderTop: '1px solid #E0E0E0',
            borderBottom: '1px solid #E0E0E0',
          },
          children: [
            {
              id: 'price_row',
              type: 'row',
              props: {
                justifyContent: 'space_between',
                alignItems: 'center',
              },
              children: [
                {
                  id: 'price_column',
                  type: 'column',
                  props: { gap: '4px' },
                  children: [
                    {
                      id: 'original_price',
                      type: 'text',
                      props: {
                        content: '${original_price}',
                        fontSize: '12px',
                        color: '#999999',
                        textDecoration: 'line-through',
                      },
                    },
                    {
                      id: 'current_price',
                      type: 'text',
                      props: {
                        content: '${item_price}',
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#007AFF',
                      },
                    },
                    {
                      id: 'discount_badge',
                      type: 'text',
                      props: {
                        content: '${discount_percent}% OFF',
                        fontSize: '12px',
                        color: '#FF3B30',
                        fontWeight: '600',
                      },
                    },
                  ],
                },
                {
                  id: 'stock_status',
                  type: 'text',
                  props: {
                    content: '✓ In Stock',
                    fontSize: '14px',
                    color: '#34C759',
                    fontWeight: '600',
                  },
                },
              ],
            },
          ],
        },
        {
          id: 'description_section',
          type: 'card',
          props: {
            padding: '16px',
            backgroundColor: '#FFFFFF',
          },
          children: [
            {
              id: 'description_label',
              type: 'text',
              props: {
                content: 'Description',
                fontSize: '16px',
                fontWeight: '600',
                color: '#000000',
                marginBottom: '8px',
              },
            },
            {
              id: 'description_text',
              type: 'text',
              props: {
                content: '${description}',
                fontSize: '14px',
                color: '#666666',
                lineHeight: '1.5',
              },
            },
          ],
        },
      ],
    },
    actions: [
      {
        id: 'add_to_order_action',
        label: 'Add to Order',
        action_type: 'api_call',
        payload: {
          endpoint: '/api/orders/add-item',
          method: 'POST',
          body: {
            product_item_id: '${product_item_id}',
            quantity: 1,
          },
        },
      },
      {
        id: 'buy_now_action',
        label: 'Buy Now',
        action_type: 'navigation',
        payload: {
          route: '/checkout',
          params: {
            product_item_id: '${product_item_id}',
            quantity: 1,
          },
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // INTENT: "checkout"
  // Full-screen checkout form for a product item.
  // Context variables: ${product_item_id}, ${user_id}
  // ─────────────────────────────────────────────────────────────────────────
  checkout: {
    bottom_sheet: {
      open: false,
      size: {
        height: 'full',
        expandable: false,
        initial_state: 'expanded',
      },
    },
    content: {
      type: 'json',
      components: [
        {
          id: 'checkout_header',
          type: 'card',
          props: {
            padding: '16px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E0E0E0',
          },
          children: [
            {
              id: 'checkout_title',
              type: 'text',
              props: {
                content: 'Checkout',
                fontSize: '20px',
                fontWeight: '700',
                color: '#000000',
              },
            },
            {
              id: 'checkout_item_id',
              type: 'text',
              props: {
                content: 'Item ID: ${product_item_id}',
                fontSize: '12px',
                color: '#AAAAAA',
                marginTop: '4px',
              },
            },
          ],
        },
        {
          id: 'shipping_section',
          type: 'card',
          props: {
            padding: '16px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E0E0E0',
          },
          children: [
            {
              id: 'shipping_label',
              type: 'text',
              props: {
                content: 'Shipping Address',
                fontSize: '16px',
                fontWeight: '600',
                color: '#000000',
                marginBottom: '12px',
              },
            },
            {
              id: 'shipping_form',
              type: 'column',
              props: { gap: '8px' },
              children: [
                {
                  id: 'email_input',
                  type: 'input',
                  props: {
                    placeholder: 'Email address',
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #DDDDDD',
                    borderRadius: '4px',
                    fontSize: '14px',
                  },
                },
                {
                  id: 'address_input',
                  type: 'input',
                  props: {
                    placeholder: 'Street address',
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #DDDDDD',
                    borderRadius: '4px',
                    fontSize: '14px',
                  },
                },
                {
                  id: 'city_row',
                  type: 'row',
                  props: { gap: '8px' },
                  children: [
                    {
                      id: 'city_input',
                      type: 'input',
                      props: {
                        placeholder: 'City',
                        flex: 1,
                        padding: '10px',
                        border: '1px solid #DDDDDD',
                        borderRadius: '4px',
                        fontSize: '14px',
                      },
                    },
                    {
                      id: 'state_input',
                      type: 'input',
                      props: {
                        placeholder: 'State',
                        flex: 0.5,
                        padding: '10px',
                        border: '1px solid #DDDDDD',
                        borderRadius: '4px',
                        fontSize: '14px',
                      },
                    },
                    {
                      id: 'zip_input',
                      type: 'input',
                      props: {
                        placeholder: 'ZIP',
                        flex: 0.5,
                        padding: '10px',
                        border: '1px solid #DDDDDD',
                        borderRadius: '4px',
                        fontSize: '14px',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'payment_section',
          type: 'card',
          props: {
            padding: '16px',
            backgroundColor: '#FFFFFF',
          },
          children: [
            {
              id: 'payment_label',
              type: 'text',
              props: {
                content: 'Payment Method',
                fontSize: '16px',
                fontWeight: '600',
                color: '#000000',
                marginBottom: '12px',
              },
            },
            {
              id: 'payment_form',
              type: 'column',
              props: { gap: '8px' },
              children: [
                {
                  id: 'card_number_input',
                  type: 'input',
                  props: {
                    placeholder: 'Card number',
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #DDDDDD',
                    borderRadius: '4px',
                    fontSize: '14px',
                  },
                },
                {
                  id: 'expiry_cvv_row',
                  type: 'row',
                  props: { gap: '8px' },
                  children: [
                    {
                      id: 'expiry_input',
                      type: 'input',
                      props: {
                        placeholder: 'MM/YY',
                        flex: 1,
                        padding: '10px',
                        border: '1px solid #DDDDDD',
                        borderRadius: '4px',
                        fontSize: '14px',
                      },
                    },
                    {
                      id: 'cvv_input',
                      type: 'input',
                      props: {
                        placeholder: 'CVV',
                        flex: 1,
                        padding: '10px',
                        border: '1px solid #DDDDDD',
                        borderRadius: '4px',
                        fontSize: '14px',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    actions: [
      {
        id: 'place_order_action',
        label: 'Place Order',
        action_type: 'api_call',
        payload: {
          endpoint: '/api/orders/create',
          method: 'POST',
          body: {
            product_item_id: '${product_item_id}',
            user_id: '${user_id}',
            payment_method: 'card',
          },
        },
      },
      {
        id: 'cancel_checkout_action',
        label: 'Cancel',
        action_type: 'dismiss',
        payload: {},
      },
    ],
  },
};
