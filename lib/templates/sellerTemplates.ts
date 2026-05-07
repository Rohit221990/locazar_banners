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
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;padding:0 0 32px 0;">

  <div style="padding:18px 16px 14px;border-bottom:1px solid #EEEEEE;">
    <p style="margin:0;font-size:18px;font-weight:700;color:#111;">Add New Product</p>
    <p style="margin:4px 0 0;font-size:13px;color:#888;">Category: \${category}</p>
  </div>

  <div style="padding:16px;display:flex;flex-direction:column;gap:16px;">

    <!-- Product images -->
    <div>
      <p style="margin:0 0 6px;font-size:14px;font-weight:600;color:#333;">Product Images <span style="color:#FF3B30;">*</span></p>
      <p style="margin:0 0 10px;font-size:12px;color:#999;">Upload up to 5 clear photos. Good images increase sales.</p>
      <div style="border:2px dashed #007AFF;border-radius:12px;background:#F0F7FF;height:130px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;">
        <span style="font-size:30px;">📸</span>
        <p style="margin:6px 0 0;font-size:13px;color:#007AFF;font-weight:600;">+ Add Photos (up to 5)</p>
        <p style="margin:2px 0 0;font-size:11px;color:#AAAAAA;">Min 800×800 px · Max 10 MB each</p>
      </div>
    </div>

    <!-- Product name -->
    <div>
      <p style="margin:0 0 6px;font-size:14px;font-weight:600;color:#333;">Product Name <span style="color:#FF3B30;">*</span></p>
      <input type="text" placeholder="e.g. Cotton Kurta Set"
        style="width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid #DDDDDD;border-radius:10px;font-size:14px;color:#333;background:#FAFAFA;outline:none;" />
    </div>

    <!-- Description -->
    <div>
      <p style="margin:0 0 6px;font-size:14px;font-weight:600;color:#333;">Description</p>
      <textarea placeholder="Describe your product — size, material, usage..." rows="4"
        style="width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid #DDDDDD;border-radius:10px;font-size:14px;color:#333;background:#FAFAFA;outline:none;resize:none;"></textarea>
    </div>

    <!-- Price & Stock -->
    <div style="display:flex;gap:12px;">
      <div style="flex:1;">
        <p style="margin:0 0 6px;font-size:14px;font-weight:600;color:#333;">Price (₹) <span style="color:#FF3B30;">*</span></p>
        <input type="number" placeholder="0.00"
          style="width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid #DDDDDD;border-radius:10px;font-size:14px;color:#333;background:#FAFAFA;outline:none;" />
      </div>
      <div style="flex:1;">
        <p style="margin:0 0 6px;font-size:14px;font-weight:600;color:#333;">Stock Qty <span style="color:#FF3B30;">*</span></p>
        <input type="number" placeholder="1"
          style="width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid #DDDDDD;border-radius:10px;font-size:14px;color:#333;background:#FAFAFA;outline:none;" />
      </div>
    </div>

    <p style="margin:4px 0 0;font-size:11px;color:#AAAAAA;text-align:center;">Shop ID: \${shop_id}</p>
  </div>
</div>`,
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
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;padding:0 0 24px 0;">

  <div style="padding:18px 16px 14px;border-bottom:1px solid #EEEEEE;">
    <p style="margin:0;font-size:18px;font-weight:700;color:#111;">Product Photos</p>
    <p style="margin:6px 0 0;font-size:13px;color:#777;">Great photos help your product sell faster.</p>
  </div>

  <div style="padding:16px;">

    <!-- Tips -->
    <div style="background:#E8F5E9;border:1px solid #A5D6A7;border-radius:10px;padding:12px 14px;margin-bottom:16px;">
      <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#2E7D32;">📸 Photo Tips</p>
      <p style="margin:0 0 4px;font-size:12px;color:#388E3C;">✅ Use natural light or bright studio light</p>
      <p style="margin:0 0 4px;font-size:12px;color:#388E3C;">✅ White or neutral background preferred</p>
      <p style="margin:0 0 4px;font-size:12px;color:#388E3C;">✅ Show front, back, and close-up detail shots</p>
      <p style="margin:0;font-size:12px;color:#388E3C;">✅ Minimum resolution: 800 × 800 px</p>
    </div>

    <!-- Upload -->
    <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#333;">Upload Photos (up to 5)</p>
    <div style="border:2px dashed #007AFF;border-radius:12px;background:#F0F7FF;height:150px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;">
      <span style="font-size:34px;">🖼️</span>
      <p style="margin:8px 0 0;font-size:14px;color:#007AFF;font-weight:600;">+ Add Product Photos</p>
      <p style="margin:2px 0 0;font-size:11px;color:#AAAAAA;">JPG / PNG / WEBP · Max 10 MB each</p>
    </div>

    <p style="margin:12px 0 0;font-size:11px;color:#AAAAAA;text-align:center;">Item ID: \${product_item_id} · Shop: \${shop_id}</p>
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
      size: { height: '75%', expandable: true, initial_state: 'collapsed' },
    },
    content: {
      type: 'html',
      html: `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;padding:0 0 32px 0;">

  <div style="padding:18px 16px 14px;border-bottom:1px solid #EEEEEE;">
    <p style="margin:0;font-size:18px;font-weight:700;color:#111;">Shop Address</p>
    <p style="margin:6px 0 0;font-size:13px;color:#777;">Enter accurate address so customers and delivery partners can reach you.</p>
  </div>

  <div style="padding:16px;display:flex;flex-direction:column;gap:14px;">

    <div>
      <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#444;">Shop Name <span style="color:#FF3B30;">*</span></p>
      <input type="text" placeholder="e.g. Ravi Textiles"
        style="width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid #DDDDDD;border-radius:10px;font-size:14px;background:#FAFAFA;outline:none;" />
    </div>

    <div>
      <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#444;">Address Line 1 <span style="color:#FF3B30;">*</span></p>
      <input type="text" placeholder="Shop No., Building, Street"
        style="width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid #DDDDDD;border-radius:10px;font-size:14px;background:#FAFAFA;outline:none;" />
    </div>

    <div>
      <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#444;">Address Line 2</p>
      <input type="text" placeholder="Landmark, Area (optional)"
        style="width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid #DDDDDD;border-radius:10px;font-size:14px;background:#FAFAFA;outline:none;" />
    </div>

    <div style="display:flex;gap:10px;">
      <div style="flex:1.2;">
        <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#444;">City <span style="color:#FF3B30;">*</span></p>
        <input type="text" placeholder="City"
          style="width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid #DDDDDD;border-radius:10px;font-size:14px;background:#FAFAFA;outline:none;" />
      </div>
      <div style="flex:0.8;">
        <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#444;">PIN Code <span style="color:#FF3B30;">*</span></p>
        <input type="number" placeholder="6-digit PIN"
          style="width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid #DDDDDD;border-radius:10px;font-size:14px;background:#FAFAFA;outline:none;" />
      </div>
    </div>

    <div>
      <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#444;">State <span style="color:#FF3B30;">*</span></p>
      <input type="text" placeholder="e.g. Maharashtra"
        style="width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid #DDDDDD;border-radius:10px;font-size:14px;background:#FAFAFA;outline:none;" />
    </div>

    <div>
      <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#444;">Contact Phone <span style="color:#FF3B30;">*</span></p>
      <input type="tel" placeholder="10-digit mobile number"
        style="width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid #DDDDDD;border-radius:10px;font-size:14px;background:#FAFAFA;outline:none;" />
    </div>

    <p style="margin:0;font-size:11px;color:#AAAAAA;text-align:center;">Shop ID: \${shop_id}</p>
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
      html: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;padding:0 0 28px 0;">

  <!-- Grabber -->
  <div style="display:flex;justify-content:center;padding-top:14px;">
    <div style="width:40px;height:5px;background:#E5E5EA;border-radius:10px;"></div>
  </div>

  <!-- Icon + Header -->
  <div style="padding:24px 20px 16px;text-align:center;">
    <div style="font-size:48px;margin-bottom:12px;">📧</div>
    <p style="margin:0;font-size:20px;font-weight:700;color:#111;">Verify Your Email</p>
    <p style="margin:8px 0 0;font-size:14px;color:#666;line-height:1.5;">
      We sent a 6-digit OTP to<br/>
      <strong style="color:#333;">\${seller_email}</strong>
    </p>
  </div>

  <!-- OTP Input -->
  <div style="padding:0 20px 20px;">
    <p style="margin:0 0 10px;font-size:14px;font-weight:600;color:#333;">Enter OTP</p>
    <div style="display:flex;gap:10px;justify-content:center;margin-bottom:16px;">
      <input type="number" maxlength="1" style="width:48px;height:56px;text-align:center;font-size:22px;font-weight:700;border:2px solid #007AFF;border-radius:12px;outline:none;background:#F0F7FF;color:#007AFF;" />
      <input type="number" maxlength="1" style="width:48px;height:56px;text-align:center;font-size:22px;font-weight:700;border:2px solid #DDDDDD;border-radius:12px;outline:none;background:#FAFAFA;color:#333;" />
      <input type="number" maxlength="1" style="width:48px;height:56px;text-align:center;font-size:22px;font-weight:700;border:2px solid #DDDDDD;border-radius:12px;outline:none;background:#FAFAFA;color:#333;" />
      <input type="number" maxlength="1" style="width:48px;height:56px;text-align:center;font-size:22px;font-weight:700;border:2px solid #DDDDDD;border-radius:12px;outline:none;background:#FAFAFA;color:#333;" />
      <input type="number" maxlength="1" style="width:48px;height:56px;text-align:center;font-size:22px;font-weight:700;border:2px solid #DDDDDD;border-radius:12px;outline:none;background:#FAFAFA;color:#333;" />
      <input type="number" maxlength="1" style="width:48px;height:56px;text-align:center;font-size:22px;font-weight:700;border:2px solid #DDDDDD;border-radius:12px;outline:none;background:#FAFAFA;color:#333;" />
    </div>

    <!-- Resend -->
    <p style="text-align:center;font-size:13px;color:#888;margin:0 0 20px;">
      Didn't receive it?
      <span style="color:#007AFF;font-weight:600;cursor:pointer;">Resend OTP</span>
    </p>

    <!-- Notice -->
    <div style="background:#FFF8E1;border:1px solid #FFE082;border-radius:10px;padding:10px 14px;">
      <p style="margin:0;font-size:12px;color:#795548;">
        ⚠️ OTP is valid for 10 minutes. Do not share it with anyone.
      </p>
    </div>
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
      html: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;padding:0 0 28px 0;">

  <!-- Grabber -->
  <div style="display:flex;justify-content:center;padding-top:14px;">
    <div style="width:40px;height:5px;background:#E5E5EA;border-radius:10px;"></div>
  </div>

  <!-- Header -->
  <div style="padding:22px 18px 14px;border-bottom:1px solid #EEEEEE;">
    <p style="margin:0;font-size:19px;font-weight:700;color:#111;">Verify Shop Address</p>
    <p style="margin:6px 0 0;font-size:13px;color:#777;">Upload proof of your shop address to complete verification.</p>
  </div>

  <div style="padding:16px 18px;">

    <!-- Current address preview -->
    <div style="background:#F4F6FF;border:1px solid #D0D9FF;border-radius:10px;padding:12px 14px;margin-bottom:18px;">
      <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#4A5568;">📍 Address on File</p>
      <p style="margin:0;font-size:14px;color:#333;line-height:1.5;">\${shop_address}</p>
    </div>

    <!-- Document type -->
    <p style="margin:0 0 10px;font-size:14px;font-weight:600;color:#333;">Select Proof of Address</p>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;">
      <button style="padding:8px 14px;border-radius:20px;border:1.5px solid #007AFF;background:#EBF4FF;color:#007AFF;font-size:13px;font-weight:600;cursor:pointer;">Utility Bill</button>
      <button style="padding:8px 14px;border-radius:20px;border:1.5px solid #DDDDDD;background:#F5F5F5;color:#555;font-size:13px;cursor:pointer;">Rental Agreement</button>
      <button style="padding:8px 14px;border-radius:20px;border:1.5px solid #DDDDDD;background:#F5F5F5;color:#555;font-size:13px;cursor:pointer;">Bank Statement</button>
      <button style="padding:8px 14px;border-radius:20px;border:1.5px solid #DDDDDD;background:#F5F5F5;color:#555;font-size:13px;cursor:pointer;">Aadhar Card</button>
    </div>

    <!-- Upload -->
    <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#333;">Upload Document</p>
    <div style="border:2px dashed #AAAAAA;border-radius:12px;background:#FAFAFA;height:120px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;margin-bottom:16px;">
      <span style="font-size:28px;">📁</span>
      <p style="margin:6px 0 0;font-size:13px;color:#888;">Tap to upload address proof</p>
      <p style="margin:2px 0 0;font-size:11px;color:#BBBBBB;">JPG / PNG / PDF · Max 5 MB</p>
    </div>

    <!-- Notice -->
    <div style="background:#FFF8E1;border:1px solid #FFE082;border-radius:10px;padding:10px 14px;">
      <p style="margin:0;font-size:12px;color:#795548;line-height:1.6;">
        ⚠️ Document must clearly show your shop name and address. It must be issued within the last 3 months.
      </p>
    </div>

    <p style="margin:12px 0 0;font-size:11px;color:#AAAAAA;text-align:center;">Shop ID: \${shop_id}</p>
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
