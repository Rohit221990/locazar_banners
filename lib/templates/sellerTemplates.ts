/**
 * Seller Bottom Sheet Templates — HTML Content
 * All templates use type: "html" with self-contained inline-styled HTML.
 * ${variable} placeholders are replaced by the template engine from context.
 *
 * Intents:
 *   shop_image        → logo + banner upload UI
 *   shop_verification → PAN / Aadhar / Udyam / BRN / GST picker + upload
 *   add_product       → full product listing form
 *   product_image     → product photo upload with tips
 *   shop_address      → full Indian shop address form
 */

import { UITemplate } from '@/lib/types/ui';

export const sellerTemplates: Record<string, UITemplate> = {

  // ── 1. SHOP IMAGE ──────────────────────────────────────────────────────────
  shop_image: {
    bottom_sheet: {
      open: false,
      size: { height: '65%', expandable: true, initial_state: 'collapsed' },
    },
    content: {
      type: 'html',
      html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: linear-gradient(180deg, #062C26 0%, #031A17 100%); border-radius: 32px 32px 0 0; overflow: hidden; max-width: 420px; margin: 0 auto; padding-bottom: 30px; box-shadow: 0 -10px 40px rgba(0,0,0,0.4); border-top: 1px solid rgba(255,255,255,0.1);">
  
  <!-- Subtle Grabber -->
  <div style="padding-top: 14px; display: flex; justify-content: center;">
    <div style="width: 40px; height: 5px; background: rgba(255,255,255,0.2); border-radius: 10px;"></div>
  </div>

  <!-- Header -->
  <div style="padding: 32px 24px 20px; text-align: center;">
    <h2 style="margin: 0; font-size: 24px; font-weight: 800; color: #E3C58E; letter-spacing: -0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Premium Branding</h2>
    <p style="margin: 10px 0 0; font-size: 15px; color: #A5BDBA; line-height: 1.5; font-weight: 400;">Transform your storefront into a trusted brand with a professional shop image.</p>
  </div>

  <div style="padding: 0 24px 24px;">
    
    <!-- Visual Stage with Teal/Gold Gradient -->
    <div style="border-radius: 28px; background: radial-gradient(circle at top right, #0D4D43, #062C26); padding: 40px 15px; display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 35px; border: 1px solid rgba(227, 197, 142, 0.2); position: relative; overflow: hidden;">
      
      <!-- Decorative Background Glow -->
      <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: rgba(227, 197, 142, 0.1); filter: blur(40px); border-radius: 50%;"></div>

      <!-- State: Basic -->
      <div style="width: 110px; height: 145px; background: rgba(255,255,255,0.05); border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); padding: 12px; backdrop-filter: blur(10px);">
        <div style="width: 100%; height: 55px; background: rgba(255,255,255,0.1); border-radius: 12px; margin-bottom: 12px; display: flex; align-items: center; justify-content: center;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#66837F" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        </div>
        <div style="width: 70%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; margin-bottom: 6px;"></div>
        <div style="width: 40%; height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px;"></div>
      </div>

      <!-- Golden Divider -->
      <div style="color: #E3C58E; font-size: 20px; font-weight: bold; opacity: 0.8;">→</div>

      <!-- State: Premium (Branded) -->
      <div style="width: 130px; height: 165px; background: #FFF; border-radius: 20px; padding: 12px; box-shadow: 0 15px 35px rgba(0,0,0,0.4); position: relative; border: 2px solid #E3C58E;">
        <div style="width: 100%; height: 75px; background: linear-gradient(135deg, #1A1A1A, #333); border-radius: 12px; margin-bottom: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden;">
           <div style="color: #E3C58E; font-weight: 900; font-size: 10px; letter-spacing: 2px;">GOLDEN</div>
           <div style="color: #E3C58E; font-weight: 300; font-size: 8px; letter-spacing: 1px;">POTTERY</div>
        </div>
        <div style="width: 85%; height: 8px; background: #1C1C1E; border-radius: 4px; margin-bottom: 8px;"></div>
        <div style="color: #D4AF37; font-size: 11px; letter-spacing: 1px;">★★★★★</div>
        
        <!-- Premium Badge -->
        <div style="position: absolute; top: -12px; right: -12px; background: #E3C58E; color: #062C26; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 14px; border: 4px solid #031A17; font-weight: 900;">✓</div>
      </div>

    </div>

    <!-- Final Action Button with Glow -->
    <button onclick="SDUIChannel.postMessage('dismiss')" style="width: 100%; padding: 20px; border: none; border-radius: 22px; background: linear-gradient(90deg, #E3C58E 0%, #C9A762 100%); color: #031A17; font-size: 17px; font-weight: 800; cursor: pointer; box-shadow: 0 8px 25px rgba(227, 197, 142, 0.3); text-transform: uppercase; letter-spacing: 1px;">
      Got It
    </button>
    
  </div>
</div>`,
    },
    actions: [
      {
        id: 'si_save',
        label: 'Save Images',
        action_type: 'api_call',
        payload: { endpoint: '/api/seller/shop/images', method: 'POST', body: { shop_id: '\${shop_id}' } },
      },
      { id: 'si_skip', label: 'Skip for Now', action_type: 'dismiss', payload: {} },
    ],
  },

  // ── 2. SHOP VERIFICATION ───────────────────────────────────────────────────
  shop_verification: {
    bottom_sheet: {
      open: false,
      size: { height: '75%', expandable: true, initial_state: 'collapsed' },
    },
    content: {
      type: 'html',
      html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: linear-gradient(180deg, #062C26 0%, #031A17 100%); border-radius: 32px 32px 0 0; overflow: hidden; max-width: 420px; margin: 0 auto; box-shadow: 0 -10px 40px rgba(0,0,0,0.4); border-top: 1px solid rgba(255,255,255,0.1); padding-bottom: 30px;">
  
  <!-- Subtle Grabber -->
  <div style="padding-top: 14px; display: flex; justify-content: center;">
    <div style="width: 40px; height: 5px; background: rgba(255,255,255,0.2); border-radius: 10px;"></div>
  </div>

  <!-- Header Section -->
  <div style="padding: 32px 24px 16px; text-align: center;">
    <h2 style="margin: 0; font-size: 24px; font-weight: 800; color: #E3C58E; letter-spacing: -0.5px;">Trust & Verification</h2>
    <p style="margin: 10px 0 0; font-size: 15px; color: #A5BDBA; line-height: 1.5;">To protect our community, we verify every business before they go live on Locazar.</p>
  </div>

  <div style="padding: 0 24px 24px;">
    
    <!-- Info Container -->
    <div style="background: rgba(227, 197, 142, 0.05); border-radius: 24px; border: 1px solid rgba(227, 197, 142, 0.2); padding: 24px; margin-bottom: 32px;">
      
      <!-- List of Accepted Documents -->
      <p style="margin: 0 0 16px; font-size: 13px; font-weight: 700; color: #E3C58E; text-transform: uppercase; letter-spacing: 0.8px; text-align: center;">Accepted Documents</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px;">
        <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 12px; color: #FFF; font-size: 13px; text-align: center; border: 1px solid rgba(255,255,255,0.1);">PAN Card</div>
        <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 12px; color: #FFF; font-size: 13px; text-align: center; border: 1px solid rgba(255,255,255,0.1);">Aadhaar Card</div>
        <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 12px; color: #FFF; font-size: 13px; text-align: center; border: 1px solid rgba(255,255,255,0.1);">Udyam Reg.</div>
        <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 12px; color: #FFF; font-size: 13px; text-align: center; border: 1px solid rgba(255,255,255,0.1);">GST Cert.</div>
      </div>

      <!-- Process Explanation -->
      <div style="display: flex; gap: 16px; align-items: flex-start; margin-bottom: 16px;">
        <div style="color: #E3C58E; font-size: 18px;">🛡️</div>
        <p style="margin: 0; font-size: 13px; color: #A5BDBA; line-height: 1.5;">
          <strong style="color: #FFF;">Secure Handling:</strong> Your documents are encrypted and used only for business identity validation.
        </p>
      </div>

      <div style="display: flex; gap: 16px; align-items: flex-start;">
        <div style="color: #E3C58E; font-size: 18px;">⚡</div>
        <p style="margin: 0; font-size: 13px; color: #A5BDBA; line-height: 1.5;">
          <strong style="color: #FFF;">Quick Turnaround:</strong> Most shops are approved within 24 hours of submission.
        </p>
      </div>
    </div>

    <!-- Got It Button -->
    <button onclick="SDUIChannel.postMessage('dismiss')" style="width: 100%; padding: 20px; border: none; border-radius: 22px; background: linear-gradient(90deg, #E3C58E 0%, #C9A762 100%); color: #031A17; font-size: 17px; font-weight: 800; cursor: pointer; box-shadow: 0 10px 25px rgba(227, 197, 142, 0.2); text-transform: uppercase; letter-spacing: 1px;">
      Got It
    </button>
  </div>
</div>`,
    },
    actions: [
      {
        id: 'sv_submit',
        label: 'Submit for Verification',
        action_type: 'api_call',
        payload: { endpoint: '/api/seller/shop/verify', method: 'POST', body: { shop_id: '\${shop_id}' } },
      },
      { id: 'sv_later', label: 'Do it Later', action_type: 'dismiss', payload: {} },
    ],
  },

  // ── 3. ADD PRODUCT ─────────────────────────────────────────────────────────
  add_product: {
    bottom_sheet: {
      open: false,
      size: { height: 'full', expandable: false, initial_state: 'expanded' },
    },
    content: {
      type: 'html',
      html: `
      <div style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FFFFFF; border-radius: 28px 28px 0 0; box-shadow: 0 -10px 40px rgba(0,0,0,0.15); max-width: 500px; margin: auto; overflow: hidden; border: 1px solid #E5E5E5;">
  
  <!-- Handle -->
  <div style="width: 100%; display: flex; justify-content: center; padding-top: 14px;">
    <div style="width: 40px; height: 5px; background-color: #D1D1D6; border-radius: 10px;"></div>
  </div>

  <!-- Header -->
  <div style="padding: 24px 24px 20px; border-bottom: 1px solid #F2F2F2;">
    <h2 style="margin: 0; font-size: 22px; font-weight: 800; color: #1C1C1E; letter-spacing: -0.5px;">Listing Guide</h2>
    <p style="margin: 6px 0 0; font-size: 14px; color: #636366; line-height: 1.4;">Follow these standards to ensure your product is approved and reaches more buyers.</p>
  </div>

  <!-- Content Section -->
  <div style="padding: 24px; max-height: 65vh; overflow-y: auto; background: #FAFAFA;">
    
    <div style="display: flex; flex-direction: column; gap: 20px;">

      <!-- Image Policy -->
      <div style="background: #FFFFFF; padding: 16px; border-radius: 16px; border: 1px solid #E5E5EA;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
          <span style="font-size: 20px;">📸</span>
          <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: #1C1C1E;">Photography Standards</h3>
        </div>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #48484A; line-height: 1.6;">
          <li>Use a <b>plain white or neutral</b> background.</li>
          <li>Upload at least 3 angles (Front, Back, Detail).</li>
          <li>Ensure resolution is at least <b>1080 × 1080 px</b>.</li>
          <li>Avoid watermarks or heavy filters.</li>
        </ul>
      </div>

      <!-- Content Policy -->
      <div style="background: #FFFFFF; padding: 16px; border-radius: 16px; border: 1px solid #E5E5EA;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
          <span style="font-size: 20px;">✍️</span>
          <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: #1C1C1E;">Title & Description</h3>
        </div>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #48484A; line-height: 1.6;">
          <li>Include <b>Brand + Material + Product Type</b> in the title.</li>
          <li>Mention exact measurements (S, M, L or cm/inches).</li>
          <li>Be transparent about any wear or unique textures.</li>
        </ul>
      </div>

      <!-- Pricing Policy -->
      <div style="background: #FFFFFF; padding: 16px; border-radius: 16px; border: 1px solid #E5E5EA;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
          <span style="font-size: 20px;">💰</span>
          <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: #1C1C1E;">Pricing & Shipping</h3>
        </div>
        <p style="margin: 0; font-size: 13px; color: #48484A; line-height: 1.5;">
          Competitive pricing is key. Research similar items in the <b>${category}</b> category to stay within market range. Remember to account for the platform commission.
        </p>
      </div>

    </div>
  </div>

  <!-- Bottom Action (Dismiss) -->
  <div style="padding: 16px 24px 34px; background: #FFFFFF; border-top: 1px solid #F2F2F2;">
    <button style="width: 100%; background: #1C1C1E; color: #FFFFFF; border: none; padding: 16px; border-radius: 14px; font-size: 16px; font-weight: 600; cursor: pointer;">
      I Understand
    </button>
  </div>
</div>
`,
    },
    actions: [
      {
        id: 'ap_publish',
        label: 'Publish Product',
        action_type: 'api_call',
        payload: { endpoint: '/api/seller/products/create', method: 'POST', body: { shop_id: '\${shop_id}', category: '\${category}' } },
      },
      {
        id: 'ap_draft',
        label: 'Save as Draft',
        action_type: 'api_call',
        payload: { endpoint: '/api/seller/products/draft', method: 'POST', body: { shop_id: '\${shop_id}' } },
      },
      { id: 'ap_cancel', label: 'Cancel', action_type: 'dismiss', payload: {} },
    ],
  },

  // ── 4. PRODUCT IMAGE ───────────────────────────────────────────────────────
  product_image: {
    bottom_sheet: {
      open: false,
      size: { height: '50%', expandable: true, initial_state: 'collapsed' },
    },
    content: {
      type: 'html',
      html: `
<div style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FFFFFF; border-radius: 28px 28px 0 0; box-shadow: 0 -10px 40px rgba(0,0,0,0.15); max-width: 500px; margin: auto; overflow: hidden; border: 1px solid #E5E5E5;">
  
  <!-- Handle (Visual Cue for Bottom Sheet) -->
  <div style="width: 100%; display: flex; justify-content: center; padding-top: 14px;">
    <div style="width: 40px; height: 5px; background-color: #D1D1D6; border-radius: 10px;"></div>
  </div>

  <!-- Header -->
  <div style="padding: 24px 24px 20px; border-bottom: 1px solid #F2F2F2;">
    <h2 style="margin: 0; font-size: 22px; font-weight: 800; color: #1C1C1E; letter-spacing: -0.5px;">Product Photo Standards</h2>
    <p style="margin: 6px 0 0; font-size: 14px; color: #636366; line-height: 1.4;">Follow these standards to ensure your images are approved and increase visibility.</p>
  </div>

  <!-- Content Section (Non-interactive Guide) -->
  <div style="padding: 24px; max-height: 65vh; overflow-y: auto; background: #FAFAFA;">
    
    <div style="display: flex; flex-direction: column; gap: 20px;">

      <!-- Lighting & Background Guide -->
      <div style="background: #FFFFFF; padding: 16px; border-radius: 16px; border: 1px solid #E5E5EA;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
          <span style="font-size: 20px;">☀️</span>
          <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: #1C1C1E;">Lighting & Background</h3>
        </div>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #48484A; line-height: 1.6;">
          <li>Use <b>natural light</b> or bright studio light.</li>
          <li>White or neutral background preferred.</li>
          <li>Avoid harsh shadows or complex backdrops.</li>
        </ul>
      </div>

      <!-- Angles & Quality Guide -->
      <div style="background: #FFFFFF; padding: 16px; border-radius: 16px; border: 1px solid #E5E5EA;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
          <span style="font-size: 20px;">🔍</span>
          <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: #1C1C1E;">Angles & Quality</h3>
        </div>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #48484A; line-height: 1.6;">
          <li>Show front, back, and close-up detail shots.</li>
          <li>Minimum resolution: <b>800 × 800 px</b>.</li>
          <li>Supported formats: JPG, PNG, WEBP. Max 10 MB each.</li>
        </ul>
      </div>

    </div>
  </div>

  <!-- Bottom Action Button (Dismiss) -->
  <div style="padding: 16px 24px 34px; background: #FFFFFF; border-top: 1px solid #F2F2F2;">
    <button style="width: 100%; background: #1C1C1E; color: #FFFFFF; border: none; padding: 16px; border-radius: 14px; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
      Got It
    </button>
  </div>
</div>`,
    },
    actions: [
      {
        id: 'pi_save',
        label: 'Save Photos',
        action_type: 'api_call',
        payload: { endpoint: '/api/seller/products/images', method: 'POST', body: { product_item_id: '\${product_item_id}', shop_id: '\${shop_id}' } },
      },
      { id: 'pi_cancel', label: 'Cancel', action_type: 'dismiss', payload: {} },
    ],
  },

  // ── 5. SHOP ADDRESS ────────────────────────────────────────────────────────
  shop_address: {
    bottom_sheet: {
      open: false,
      size: { height: '80%', expandable: true, initial_state: 'collapsed' },
    },
    content: {
      type: 'html',
      html: `
<div style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FFFFFF; border-radius: 28px 28px 0 0; box-shadow: 0 -10px 40px rgba(0,0,0,0.15); max-width: 500px; margin: auto; overflow: hidden; border: 1px solid #E5E5E5;">
  
  <!-- Handle (Visual Cue for Bottom Sheet) -->
  <div style="width: 100%; display: flex; justify-content: center; padding-top: 14px;">
    <div style="width: 40px; height: 5px; background-color: #D1D1D6; border-radius: 10px;"></div>
  </div>

  <!-- Header -->
  <div style="padding: 24px 24px 20px; border-bottom: 1px solid #F2F2F2;">
    <h2 style="margin: 0; font-size: 22px; font-weight: 800; color: #1C1C1E; letter-spacing: -0.5px;">Address Guidelines</h2>
    <p style="margin: 6px 0 0; font-size: 14px; color: #636366; line-height: 1.4;">Ensuring your shop location is precise helps avoid delivery delays and failed pickups.</p>
  </div>

  <!-- Content Section (Non-interactive Guide) -->
  <div style="padding: 24px; max-height: 60vh; overflow-y: auto; background: #FAFAFA;">
    
    <div style="display: flex; flex-direction: column; gap: 20px;">

      <!-- Verification Standard -->
      <div style="background: #FFFFFF; padding: 16px; border-radius: 16px; border: 1px solid #E5E5EA;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
          <span style="font-size: 20px;">📍</span>
          <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: #1C1C1E;">Accurate Pinning</h3>
        </div>
        <p style="margin: 0; font-size: 13px; color: #48484A; line-height: 1.6;">
          Your address should match the <b>Google Maps</b> location. This allows our delivery partners to use GPS navigation directly to your doorstep.
        </p>
      </div>

      <!-- Detail Requirements -->
      <div style="background: #FFFFFF; padding: 16px; border-radius: 16px; border: 1px solid #E5E5EA;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
          <span style="font-size: 20px;">🏢</span>
          <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: #1C1C1E;">What to Include</h3>
        </div>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #48484A; line-height: 1.6;">
          <li><b>Landmarks:</b> Mention a well-known nearby building or shop.</li>
          <li><b>Shop Number:</b> Clearly state your unit or floor number.</li>
          <li><b>PIN Code:</b> Ensure your 6-digit code is current and verified.</li>
        </ul>
      </div>

      <!-- Logistic Benefits -->
      <div style="background: #EBF5FF; padding: 16px; border-radius: 16px; border: 1px solid #CCE5FF;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
          <span style="font-size: 18px;">🚚</span>
          <h3 style="margin: 0; font-size: 14px; font-weight: 700; color: #004085;">Why this matters</h3>
        </div>
        <p style="margin: 0; font-size: 12px; color: #004085; line-height: 1.5;">
          Verified addresses receive <b>20% faster pickups</b> and reduce the likelihood of "Address Not Found" returns.
        </p>
      </div>

    </div>

    <p style="margin: 24px 0 0; font-size: 11px; color: #999; text-align: center;">
      Referencing Shop: <b>${shop_id}</b>
    </p>
  </div>

  <!-- Bottom Action Button (Dismiss) -->
  <div style="padding: 16px 24px 34px; background: #FFFFFF; border-top: 1px solid #F2F2F2;">
    <button style="width: 100%; background: #1C1C1E; color: #FFFFFF; border: none; padding: 16px; border-radius: 14px; font-size: 16px; font-weight: 600; cursor: pointer;">
      I Understand
    </button>
  </div>
</div>`,
    },
    actions: [
      {
        id: 'sa_save',
        label: 'Save Address',
        action_type: 'api_call',
        payload: { endpoint: '/api/seller/shop/address', method: 'POST', body: { shop_id: '\${shop_id}' } },
      },
      { id: 'sa_cancel', label: 'Cancel', action_type: 'dismiss', payload: {} },
    ],
  },

  // ── 6. SELLER EMAIL VERIFICATION ──────────────────────────────────────────
  // Context: ${seller_email}, ${shop_id}
  seller_email_verification: {
    bottom_sheet: {
      open: false,
      size: { height: '55%', expandable: false, initial_state: 'expanded' },
    },
    content: {
      type: 'html',
      html: `<div style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FFFFFF; border-radius: 28px 28px 0 0; box-shadow: 0 -10px 40px rgba(0,0,0,0.15); max-width: 500px; margin: auto; overflow: hidden; border: 1px solid #E5E5E5;">
  
  <!-- Handle -->
  <div style="width: 100%; display: flex; justify-content: center; padding-top: 14px;">
    <div style="width: 40px; height: 5px; background-color: #D1D1D6; border-radius: 10px;"></div>
  </div>

  <!-- Header -->
  <div style="padding: 24px 24px 20px; text-align: center; border-bottom: 1px solid #F2F2F2;">
    <div style="font-size: 48px; margin-bottom: 12px;">📩</div>
    <h2 style="margin: 0; font-size: 22px; font-weight: 800; color: #1C1C1E; letter-spacing: -0.5px;">Email Verification Guide</h2>
    <p style="margin: 8px 0 0; font-size: 14px; color: #636366; line-height: 1.5;">
      We use One-Time Passwords (OTP) to keep your shop secure. Here is how it works.
    </p>
  </div>

  <!-- Content Section -->
  <div style="padding: 24px; max-height: 60vh; overflow-y: auto; background: #FAFAFA;">
    
    <div style="display: flex; flex-direction: column; gap: 20px;">

      <!-- Step 1: Delivery -->
      <div style="background: #FFFFFF; padding: 16px; border-radius: 16px; border: 1px solid #E5E5EA;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
          <span style="font-size: 20px;">🕒</span>
          <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: #1C1C1E;">Expected Delivery</h3>
        </div>
        <p style="margin: 0; font-size: 13px; color: #48484A; line-height: 1.6;">
          OTPs usually arrive within <b>60 seconds</b> at <b>${seller_email}</b>. If you don't see it, please check your <b>Spam</b> or <b>Promotions</b> folder.
        </p>
      </div>

      <!-- Step 2: Security -->
      <div style="background: #FFFFFF; padding: 16px; border-radius: 16px; border: 1px solid #E5E5EA;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
          <span style="font-size: 20px;">🛡️</span>
          <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: #1C1C1E;">Security Best Practices</h3>
        </div>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #48484A; line-height: 1.6;">
          <li>The code is only valid for <b>10 minutes</b>.</li>
          <li>Our support team will <b>never</b> ask you for this code.</li>
          <li>Each code can only be used once.</li>
        </ul>
      </div>

      <!-- Troubleshooting -->
      <div style="background: #FFF9C4; padding: 16px; border-radius: 16px; border: 1px solid #FFF176;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
          <span style="font-size: 18px;">⚠️</span>
          <h3 style="margin: 0; font-size: 14px; font-weight: 700; color: #5D4037;">Not Receiving the Code?</h3>
        </div>
        <p style="margin: 0; font-size: 12px; color: #5D4037; line-height: 1.5;">
          If you have tried resending and still haven't received it, ensure that your email server isn't blocking <b>noreply@yourdomain.com</b>.
        </p>
      </div>

    </div>
  </div>

  <!-- Bottom Action Button -->
  <div style="padding: 16px 24px 34px; background: #FFFFFF; border-top: 1px solid #F2F2F2;">
    <button style="width: 100%; background: #007AFF; color: #FFFFFF; border: none; padding: 16px; border-radius: 14px; font-size: 16px; font-weight: 600; cursor: pointer;">
      Got It, Continue
    </button>
  </div>
</div>`,
    },
    actions: [
      {
        id: 'sev_verify',
        label: 'Verify Email',
        action_type: 'api_call',
        payload: {
          endpoint: '/api/seller/auth/verify-email',
          method: 'POST',
          body: { shop_id: '\${shop_id}', email: '\${seller_email}' },
        },
      },
      { id: 'sev_cancel', label: 'Cancel', action_type: 'dismiss', payload: {} },
    ],
  },

  // ── 7. SELLER ADDRESS VERIFICATION ────────────────────────────────────────
  // Context: ${shop_id}, ${shop_address}
  seller_address_verification: {
    bottom_sheet: {
      open: false,
      size: { height: '70%', expandable: true, initial_state: 'collapsed' },
    },
    content: {
      type: 'html',
      html: `<div style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FFFFFF; border-radius: 28px 28px 0 0; box-shadow: 0 -10px 40px rgba(0,0,0,0.15); max-width: 500px; margin: auto; overflow: hidden; border: 1px solid #E5E5E5;">
  
  <!-- Handle -->
  <div style="width: 100%; display: flex; justify-content: center; padding-top: 14px;">
    <div style="width: 40px; height: 5px; background-color: #D1D1D6; border-radius: 10px;"></div>
  </div>

  <!-- Header -->
  <div style="padding: 24px 24px 20px; border-bottom: 1px solid #F2F2F2;">
    <h2 style="margin: 0; font-size: 22px; font-weight: 800; color: #1C1C1E; letter-spacing: -0.5px;">Verification Guide</h2>
    <p style="margin: 6px 0 0; font-size: 14px; color: #636366; line-height: 1.4;">Follow these steps to successfully verify your shop address.</p>
  </div>

  <!-- Content Section -->
  <div style="padding: 24px; max-height: 55vh; overflow-y: auto; background: #FAFAFA;">
    
    <div style="display: flex; flex-direction: column; gap: 20px;">

      <!-- Address Consistency -->
      <div style="background: #FFFFFF; padding: 16px; border-radius: 16px; border: 1px solid #E5E5EA;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
          <span style="font-size: 20px;">📄</span>
          <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: #1C1C1E;">Address Consistency</h3>
        </div>
        <p style="margin: 0; font-size: 13px; color: #48484A; line-height: 1.6;">
          The address on your document must <b>exactly match</b> the address you provided: <br/>
          <span style="color: #007AFF; font-family: monospace;">${shop_address}</span>
        </p>
      </div>

      <!-- Document Validity -->
      <div style="background: #FFFFFF; padding: 16px; border-radius: 16px; border: 1px solid #E5E5EA;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
          <span style="font-size: 20px;">📅</span>
          <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: #1C1C1E;">Document Validity</h3>
        </div>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #48484A; line-height: 1.6;">
          <li>Must be issued within the <b>last 3 months</b>.</li>
          <li>All four corners of the document must be visible.</li>
          <li>Text must be clear and legible (no blur or glare).</li>
        </ul>
      </div>

      <!-- Accepted Documents List -->
      <div style="background: #EBF5FF; padding: 16px; border-radius: 16px; border: 1px solid #CCE5FF;">
        <h3 style="margin: 0 0 8px; font-size: 14px; font-weight: 700; color: #004085;">Accepted Proofs</h3>
        <p style="margin: 0; font-size: 12px; color: #004085; line-height: 1.5;">
          Electricity/Water Bills, Rental Agreements, Bank Statements, or Government-issued Business Certificates.
        </p>
      </div>

    </div>

    <p style="margin: 24px 0 0; font-size: 11px; color: #999; text-align: center;">
      Shop ID Reference: <b>${shop_id}</b>
    </p>
  </div>

  <!-- Bottom Action Button -->
  <div style="padding: 16px 24px 34px; background: #FFFFFF; border-top: 1px solid #F2F2F2;">
    <button style="width: 100%; background: #1C1C1E; color: #FFFFFF; border: none; padding: 16px; border-radius: 14px; font-size: 16px; font-weight: 600; cursor: pointer;">
      Understood, Start Upload
    </button>
  </div>
</div>`,
    },
    actions: [
      {
        id: 'sav_submit',
        label: 'Submit Address Proof',
        action_type: 'api_call',
        payload: {
          endpoint: '/api/seller/shop/verify-address',
          method: 'POST',
          body: { shop_id: '\${shop_id}' },
        },
      },
      { id: 'sav_cancel', label: 'Cancel', action_type: 'dismiss', payload: {} },
    ],
  },
};
