// sdui_client.go
// Drop this file into your Go server.
// It contains the SDUI client + all API calls to the Next.js SDUI server.
//
// Usage:
//   client := sdui.NewClient("http://localhost:3000")
//   template, err := client.GetSellerUI("shop_verification", map[string]string{"shop_id": "s_123"})

package sdui

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// ─── Base URL ────────────────────────────────────────────────────────────────

const DefaultSDUIBaseURL = "http://localhost:3002"

// ─── Intent constants ────────────────────────────────────────────────────────

// Seller intents  →  POST /api/ui/seller
const (
	IntentShopImage        = "shop_image"
	IntentShopVerification = "shop_verification"
	IntentAddProduct       = "add_product"
	IntentProductImage     = "product_image"
	IntentShopAddress      = "shop_address"
)

// User/buyer intents  →  POST /api/ui/user
const (
	IntentProductView   = "product_view"
	IntentOrderSuccess  = "order_success"
	IntentOrderTracking = "order_tracking"
	IntentSellerProfile = "seller_profile"
)

// Product/order intents  →  POST /api/ui/bottom-sheet
const (
	IntentOrderSummary   = "order_summary"
	IntentProductDetails = "product_details"
	IntentCheckout       = "checkout"
)

// ─── Request / Response types ─────────────────────────────────────────────────

type sduiRequest struct {
	Intent  string            `json:"intent"`
	Context map[string]string `json:"context,omitempty"`
}

type SDUIResponse struct {
	Success bool        `json:"success"`
	Data    *UITemplate `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

type UITemplate struct {
	BottomSheet BottomSheetConfig `json:"bottom_sheet"`
	Content     Content           `json:"content"`
	Actions     []UIAction        `json:"actions"`
}

type BottomSheetConfig struct {
	Open bool            `json:"open"`
	Size BottomSheetSize `json:"size"`
}

type BottomSheetSize struct {
	Height       string `json:"height"`
	Expandable   bool   `json:"expandable"`
	InitialState string `json:"initial_state"`
}

type Content struct {
	Type       string        `json:"type"`
	Components []interface{} `json:"components,omitempty"`
	HTML       string        `json:"html,omitempty"`
}

type UIAction struct {
	ID         string                 `json:"id"`
	Label      string                 `json:"label"`
	ActionType string                 `json:"action_type"`
	Payload    map[string]interface{} `json:"payload"`
}

// ─── Client ───────────────────────────────────────────────────────────────────

type Client struct {
	baseURL    string
	httpClient *http.Client
}

func NewClient(baseURL string) *Client {
	return &Client{
		baseURL: baseURL,
		httpClient: &http.Client{
			Timeout: 5 * time.Second,
		},
	}
}

func (c *Client) post(path string, intent string, ctx map[string]string) (*SDUIResponse, error) {
	payload, err := json.Marshal(sduiRequest{Intent: intent, Context: ctx})
	if err != nil {
		return nil, fmt.Errorf("sdui: marshal error: %w", err)
	}

	resp, err := c.httpClient.Post(c.baseURL+path, "application/json", bytes.NewBuffer(payload))
	if err != nil {
		return nil, fmt.Errorf("sdui: request failed: %w", err)
	}
	defer resp.Body.Close()

	var result SDUIResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("sdui: decode error: %w", err)
	}
	return &result, nil
}

// ─── Seller API calls  →  POST /api/ui/seller ────────────────────────────────

// GetShopImageUI — seller uploads shop logo and banner
func (c *Client) GetShopImageUI(shopID string) (*SDUIResponse, error) {
	return c.post("/api/ui/seller", IntentShopImage, map[string]string{
		"shop_id": shopID,
	})
}

// GetShopVerificationUI — seller submits PAN / Aadhar / Udyam / BRN / GST
func (c *Client) GetShopVerificationUI(shopID string) (*SDUIResponse, error) {
	return c.post("/api/ui/seller", IntentShopVerification, map[string]string{
		"shop_id": shopID,
	})
}

// GetAddProductUI — seller adds a new product listing
func (c *Client) GetAddProductUI(shopID, category string) (*SDUIResponse, error) {
	return c.post("/api/ui/seller", IntentAddProduct, map[string]string{
		"shop_id":  shopID,
		"category": category,
	})
}

// GetProductImageUI — seller uploads product photos
func (c *Client) GetProductImageUI(shopID, productItemID string) (*SDUIResponse, error) {
	return c.post("/api/ui/seller", IntentProductImage, map[string]string{
		"shop_id":         shopID,
		"product_item_id": productItemID,
	})
}

// GetShopAddressUI — seller sets their shop address
func (c *Client) GetShopAddressUI(shopID string) (*SDUIResponse, error) {
	return c.post("/api/ui/seller", IntentShopAddress, map[string]string{
		"shop_id": shopID,
	})
}

// ─── User / Buyer API calls  →  POST /api/ui/user ───────────────────────────

// GetProductViewUI — buyer views a product item
func (c *Client) GetProductViewUI(productItemID, itemName, itemPrice, originalPrice, discountPercent, description, imageURL, rating, reviewCount, shopName string) (*SDUIResponse, error) {
	return c.post("/api/ui/user", IntentProductView, map[string]string{
		"product_item_id":  productItemID,
		"item_name":        itemName,
		"item_price":       itemPrice,
		"original_price":   originalPrice,
		"discount_percent": discountPercent,
		"description":      description,
		"item_image_url":   imageURL,
		"rating":           rating,
		"review_count":     reviewCount,
		"shop_name":        shopName,
	})
}

// GetOrderSuccessUI — shown after buyer places an order
func (c *Client) GetOrderSuccessUI(orderID, itemName, itemPrice, estimatedDelivery string) (*SDUIResponse, error) {
	return c.post("/api/ui/user", IntentOrderSuccess, map[string]string{
		"order_id":           orderID,
		"item_name":          itemName,
		"item_price":         itemPrice,
		"estimated_delivery": estimatedDelivery,
	})
}

// GetOrderTrackingUI — buyer tracks their delivery
func (c *Client) GetOrderTrackingUI(orderID, currentStatus, placedAt, dispatchedAt, outForDeliveryAt, deliveredAt string) (*SDUIResponse, error) {
	return c.post("/api/ui/user", IntentOrderTracking, map[string]string{
		"order_id":            orderID,
		"current_status":      currentStatus,
		"placed_at":           placedAt,
		"dispatched_at":       dispatchedAt,
		"out_for_delivery_at": outForDeliveryAt,
		"delivered_at":        deliveredAt,
	})
}

// GetSellerProfileUI — buyer views a seller's shop card
func (c *Client) GetSellerProfileUI(shopID, shopName, logoURL, rating, totalProducts, verified, shopAddress string) (*SDUIResponse, error) {
	return c.post("/api/ui/user", IntentSellerProfile, map[string]string{
		"shop_id":        shopID,
		"shop_name":      shopName,
		"shop_logo_url":  logoURL,
		"seller_rating":  rating,
		"total_products": totalProducts,
		"verified":       verified,
		"shop_address":   shopAddress,
	})
}

// ─── Product / Order API calls  →  POST /api/ui/bottom-sheet ────────────────

// GetProductDetailsUI — product detail bottom sheet
func (c *Client) GetProductDetailsUI(productItemID, itemName, itemPrice, originalPrice, discountPercent, description, imageURL, rating, reviewCount string) (*SDUIResponse, error) {
	return c.post("/api/ui/bottom-sheet", IntentProductDetails, map[string]string{
		"product_item_id":  productItemID,
		"item_name":        itemName,
		"item_price":       itemPrice,
		"original_price":   originalPrice,
		"discount_percent": discountPercent,
		"description":      description,
		"item_image_url":   imageURL,
		"rating":           rating,
		"review_count":     reviewCount,
	})
}

// GetOrderSummaryUI — order summary before checkout
func (c *Client) GetOrderSummaryUI(productItemID, itemName, itemPrice, shippingPrice, taxAmount, totalPrice string) (*SDUIResponse, error) {
	return c.post("/api/ui/bottom-sheet", IntentOrderSummary, map[string]string{
		"product_item_id": productItemID,
		"item_name":       itemName,
		"item_price":      itemPrice,
		"shipping_price":  shippingPrice,
		"tax_amount":      taxAmount,
		"total_price":     totalPrice,
	})
}

// GetCheckoutUI — full checkout form
func (c *Client) GetCheckoutUI(productItemID, userID string) (*SDUIResponse, error) {
	return c.post("/api/ui/bottom-sheet", IntentCheckout, map[string]string{
		"product_item_id": productItemID,
		"user_id":         userID,
	})
}

// ─── Example usage (remove in production) ────────────────────────────────────
//
//  client := sdui.NewClient("http://localhost:3000")
//
//  // Seller: open shop verification sheet
//  tmpl, err := client.GetShopVerificationUI("s_123")
//
//  // User: open product view sheet
//  tmpl, err := client.GetProductViewUI("item_42", "Cotton Kurta", "499", "799", "38", "Comfortable cotton...", "https://...", "4.5", "120", "Ravi Textiles")
//
//  // Product: open checkout sheet
//  tmpl, err := client.GetCheckoutUI("item_42", "u_001")
//
//  if err != nil || !tmpl.Success {
//      // handle error
//  }
//  // send tmpl.Data to mobile client
