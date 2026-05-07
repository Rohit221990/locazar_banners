/**
 * User (Buyer) Bottom Sheet Templates
 * Intents: product_view | order_success | order_tracking | seller_profile
 *
 * Context variables are marked as ${variable_name} — inject from Go server.
 */

import { UITemplate } from '@/lib/types/ui';

export const userTemplates: Record<string, UITemplate> = {

  // ── 1. PRODUCT VIEW ────────────────────────────────────────────────────────
  // Context: ${product_item_id}, ${item_name}, ${item_price}, ${original_price},
  //          ${discount_percent}, ${description}, ${item_image_url},
  //          ${rating}, ${review_count}, ${shop_name}
  product_view: {
    bottom_sheet: {
      open: false,
      size: { height: '75%', expandable: true, initial_state: 'collapsed' },
    },
    content: {
      type: 'json',
      components: [
        {
          id: 'pv_image',
          type: 'image',
          props: { src: '${item_image_url}', width: '100%', height: '280px', borderRadius: '0px', objectFit: 'cover' },
        },
        {
          id: 'pv_info',
          type: 'card',
          props: { padding: '16px', backgroundColor: '#FFFFFF' },
          children: [
            { id: 'pv_name', type: 'text', props: { content: '${item_name}', fontSize: '20px', fontWeight: '700', color: '#111111', marginBottom: '4px' } },
            { id: 'pv_shop', type: 'text', props: { content: 'Sold by: ${shop_name}', fontSize: '12px', color: '#888888', marginBottom: '8px' } },
            {
              id: 'pv_rating_row',
              type: 'row',
              props: { alignItems: 'center', gap: '6px', marginBottom: '12px' },
              children: [
                { id: 'pv_stars', type: 'text', props: { content: '⭐ ${rating}', fontSize: '14px', color: '#F59E0B', fontWeight: '600' } },
                { id: 'pv_reviews', type: 'text', props: { content: '(${review_count} reviews)', fontSize: '12px', color: '#888888' } },
              ],
            },
            {
              id: 'pv_price_row',
              type: 'row',
              props: { alignItems: 'center', gap: '10px', marginBottom: '4px' },
              children: [
                { id: 'pv_price', type: 'text', props: { content: '₹${item_price}', fontSize: '24px', fontWeight: '700', color: '#007AFF' } },
                { id: 'pv_original', type: 'text', props: { content: '₹${original_price}', fontSize: '14px', color: '#AAAAAA', textDecoration: 'line-through' } },
                { id: 'pv_discount', type: 'text', props: { content: '${discount_percent}% OFF', fontSize: '13px', color: '#FF3B30', fontWeight: '600' } },
              ],
            },
            { id: 'pv_desc_label', type: 'text', props: { content: 'About this item', fontSize: '15px', fontWeight: '600', color: '#333333', marginTop: '14px', marginBottom: '6px' } },
            { id: 'pv_desc', type: 'text', props: { content: '${description}', fontSize: '14px', color: '#555555', lineHeight: '1.6' } },
          ],
        },
      ],
    },
    actions: [
      {
        id: 'pv_buy_now',
        label: 'Buy Now',
        action_type: 'navigation',
        payload: { route: '/checkout', params: { product_item_id: '${product_item_id}', quantity: 1 } },
      },
      {
        id: 'pv_wishlist',
        label: 'Save to Wishlist',
        action_type: 'api_call',
        payload: { endpoint: '/api/user/wishlist/add', method: 'POST', body: { product_item_id: '${product_item_id}' } },
      },
      {
        id: 'pv_close',
        label: 'Close',
        action_type: 'dismiss',
        payload: {},
      },
    ],
  },

  // ── 2. ORDER SUCCESS ───────────────────────────────────────────────────────
  // Context: ${order_id}, ${item_name}, ${item_price}, ${estimated_delivery}
  order_success: {
    bottom_sheet: {
      open: false,
      size: { height: '50%', expandable: false, initial_state: 'expanded' },
    },
    content: {
      type: 'json',
      components: [
        {
          id: 'os_icon_row',
          type: 'row',
          props: { justifyContent: 'center', padding: '24px 16px 8px 16px' },
          children: [
            { id: 'os_icon', type: 'text', props: { content: '✅', fontSize: '52px', textAlign: 'center' } },
          ],
        },
        {
          id: 'os_title',
          type: 'text',
          props: { content: 'Order Placed!', fontSize: '22px', fontWeight: '700', color: '#111111', textAlign: 'center', marginBottom: '6px' },
        },
        {
          id: 'os_subtitle',
          type: 'text',
          props: { content: 'Your order has been confirmed.', fontSize: '14px', color: '#666666', textAlign: 'center', marginBottom: '16px' },
        },
        {
          id: 'os_details',
          type: 'card',
          props: { padding: '14px 16px', margin: '0 16px', backgroundColor: '#F4F6FF', borderRadius: '10px', border: '1px solid #D0D9FF' },
          children: [
            {
              id: 'os_order_row',
              type: 'row',
              props: { justifyContent: 'space_between', marginBottom: '8px' },
              children: [
                { id: 'os_order_label', type: 'text', props: { content: 'Order ID', fontSize: '13px', color: '#666666' } },
                { id: 'os_order_value', type: 'text', props: { content: '#${order_id}', fontSize: '13px', fontWeight: '600', color: '#333333' } },
              ],
            },
            {
              id: 'os_item_row',
              type: 'row',
              props: { justifyContent: 'space_between', marginBottom: '8px' },
              children: [
                { id: 'os_item_label', type: 'text', props: { content: 'Item', fontSize: '13px', color: '#666666' } },
                { id: 'os_item_value', type: 'text', props: { content: '${item_name}', fontSize: '13px', fontWeight: '600', color: '#333333' } },
              ],
            },
            {
              id: 'os_amount_row',
              type: 'row',
              props: { justifyContent: 'space_between', marginBottom: '8px' },
              children: [
                { id: 'os_amount_label', type: 'text', props: { content: 'Amount Paid', fontSize: '13px', color: '#666666' } },
                { id: 'os_amount_value', type: 'text', props: { content: '₹${item_price}', fontSize: '13px', fontWeight: '700', color: '#007AFF' } },
              ],
            },
            {
              id: 'os_delivery_row',
              type: 'row',
              props: { justifyContent: 'space_between' },
              children: [
                { id: 'os_del_label', type: 'text', props: { content: 'Expected Delivery', fontSize: '13px', color: '#666666' } },
                { id: 'os_del_value', type: 'text', props: { content: '${estimated_delivery}', fontSize: '13px', fontWeight: '600', color: '#34C759' } },
              ],
            },
          ],
        },
      ],
    },
    actions: [
      {
        id: 'os_track',
        label: 'Track Order',
        action_type: 'navigation',
        payload: { route: '/orders/track', params: { order_id: '${order_id}' } },
      },
      {
        id: 'os_home',
        label: 'Continue Shopping',
        action_type: 'dismiss',
        payload: {},
      },
    ],
  },

  // ── 3. ORDER TRACKING ──────────────────────────────────────────────────────
  // Context: ${order_id}, ${item_name}, ${current_status},
  //          ${placed_at}, ${dispatched_at}, ${out_for_delivery_at}, ${delivered_at}
  order_tracking: {
    bottom_sheet: {
      open: false,
      size: { height: '75%', expandable: true, initial_state: 'collapsed' },
    },
    content: {
      type: 'json',
      components: [
        {
          id: 'ot_header',
          type: 'card',
          props: { padding: '16px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E0E0E0' },
          children: [
            { id: 'ot_title', type: 'text', props: { content: 'Track Order', fontSize: '18px', fontWeight: '700', color: '#111111' } },
            { id: 'ot_order_id', type: 'text', props: { content: 'Order #${order_id}', fontSize: '13px', color: '#888888', marginTop: '4px' } },
          ],
        },
        {
          id: 'ot_status_banner',
          type: 'card',
          props: { padding: '14px 16px', margin: '12px 16px 0 16px', backgroundColor: '#E8F5E9', borderRadius: '10px', border: '1px solid #A5D6A7' },
          children: [
            { id: 'ot_status_label', type: 'text', props: { content: 'Current Status', fontSize: '12px', color: '#555555', marginBottom: '4px' } },
            { id: 'ot_status_value', type: 'text', props: { content: '${current_status}', fontSize: '16px', fontWeight: '700', color: '#2E7D32' } },
          ],
        },
        {
          id: 'ot_timeline',
          type: 'card',
          props: { padding: '16px', margin: '12px 16px 0 16px', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E0E0E0' },
          children: [
            { id: 'ot_tl_label', type: 'text', props: { content: 'Delivery Timeline', fontSize: '14px', fontWeight: '600', color: '#333333', marginBottom: '12px' } },
            {
              id: 'ot_step_placed',
              type: 'row',
              props: { alignItems: 'flex-start', gap: '10px', marginBottom: '14px' },
              children: [
                { id: 'ot_dot_placed', type: 'text', props: { content: '🟢', fontSize: '16px' } },
                {
                  id: 'ot_placed_col', type: 'column', props: { flex: 1 },
                  children: [
                    { id: 'ot_placed_title', type: 'text', props: { content: 'Order Placed', fontSize: '14px', fontWeight: '600', color: '#333333' } },
                    { id: 'ot_placed_time', type: 'text', props: { content: '${placed_at}', fontSize: '12px', color: '#888888' } },
                  ],
                },
              ],
            },
            {
              id: 'ot_step_dispatched',
              type: 'row',
              props: { alignItems: 'flex-start', gap: '10px', marginBottom: '14px' },
              children: [
                { id: 'ot_dot_dispatch', type: 'text', props: { content: '🟡', fontSize: '16px' } },
                {
                  id: 'ot_dispatch_col', type: 'column', props: { flex: 1 },
                  children: [
                    { id: 'ot_dispatch_title', type: 'text', props: { content: 'Dispatched', fontSize: '14px', fontWeight: '600', color: '#333333' } },
                    { id: 'ot_dispatch_time', type: 'text', props: { content: '${dispatched_at}', fontSize: '12px', color: '#888888' } },
                  ],
                },
              ],
            },
            {
              id: 'ot_step_ofd',
              type: 'row',
              props: { alignItems: 'flex-start', gap: '10px', marginBottom: '14px' },
              children: [
                { id: 'ot_dot_ofd', type: 'text', props: { content: '🔵', fontSize: '16px' } },
                {
                  id: 'ot_ofd_col', type: 'column', props: { flex: 1 },
                  children: [
                    { id: 'ot_ofd_title', type: 'text', props: { content: 'Out for Delivery', fontSize: '14px', fontWeight: '600', color: '#333333' } },
                    { id: 'ot_ofd_time', type: 'text', props: { content: '${out_for_delivery_at}', fontSize: '12px', color: '#888888' } },
                  ],
                },
              ],
            },
            {
              id: 'ot_step_delivered',
              type: 'row',
              props: { alignItems: 'flex-start', gap: '10px' },
              children: [
                { id: 'ot_dot_delivered', type: 'text', props: { content: '✅', fontSize: '16px' } },
                {
                  id: 'ot_delivered_col', type: 'column', props: { flex: 1 },
                  children: [
                    { id: 'ot_delivered_title', type: 'text', props: { content: 'Delivered', fontSize: '14px', fontWeight: '600', color: '#333333' } },
                    { id: 'ot_delivered_time', type: 'text', props: { content: '${delivered_at}', fontSize: '12px', color: '#888888' } },
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
        id: 'ot_help',
        label: 'Need Help?',
        action_type: 'api_call',
        payload: { endpoint: '/api/user/support/order', method: 'POST', body: { order_id: '${order_id}' } },
      },
      {
        id: 'ot_close',
        label: 'Close',
        action_type: 'dismiss',
        payload: {},
      },
    ],
  },

  // ── 4. SELLER PROFILE ──────────────────────────────────────────────────────
  // Context: ${shop_id}, ${shop_name}, ${shop_logo_url}, ${seller_rating},
  //          ${total_products}, ${verified}, ${shop_address}
  seller_profile: {
    bottom_sheet: {
      open: false,
      size: { height: '50%', expandable: true, initial_state: 'collapsed' },
    },
    content: {
      type: 'json',
      components: [
        {
          id: 'sp_top',
          type: 'card',
          props: { padding: '20px 16px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E0E0E0' },
          children: [
            {
              id: 'sp_top_row',
              type: 'row',
              props: { alignItems: 'center', gap: '14px' },
              children: [
                { id: 'sp_logo', type: 'image', props: { src: '${shop_logo_url}', width: '64px', height: '64px', borderRadius: '32px', border: '2px solid #E0E0E0' } },
                {
                  id: 'sp_info_col',
                  type: 'column',
                  props: { flex: 1 },
                  children: [
                    { id: 'sp_name', type: 'text', props: { content: '${shop_name}', fontSize: '17px', fontWeight: '700', color: '#111111' } },
                    { id: 'sp_verified', type: 'text', props: { content: '${verified}', fontSize: '12px', color: '#34C759', fontWeight: '600', marginTop: '2px' } },
                    { id: 'sp_rating', type: 'text', props: { content: '⭐ ${seller_rating} · ${total_products} Products', fontSize: '13px', color: '#666666', marginTop: '4px' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'sp_address_card',
          type: 'card',
          props: { padding: '14px 16px', margin: '12px 16px 0 16px', backgroundColor: '#F9F9F9', borderRadius: '10px', border: '1px solid #E0E0E0' },
          children: [
            { id: 'sp_addr_label', type: 'text', props: { content: '📍 Shop Location', fontSize: '13px', fontWeight: '600', color: '#444444', marginBottom: '4px' } },
            { id: 'sp_addr_value', type: 'text', props: { content: '${shop_address}', fontSize: '13px', color: '#666666', lineHeight: '1.5' } },
          ],
        },
      ],
    },
    actions: [
      {
        id: 'sp_view_products',
        label: 'View All Products',
        action_type: 'navigation',
        payload: { route: '/shop', params: { shop_id: '${shop_id}' } },
      },
      {
        id: 'sp_close',
        label: 'Close',
        action_type: 'dismiss',
        payload: {},
      },
    ],
  },
};
