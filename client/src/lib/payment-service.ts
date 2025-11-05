/**
 * Payment Service using Stripe client-side
 * For production, use Stripe Checkout redirect or Supabase Edge Functions
 */

import { loadStripe, Stripe } from "@stripe/stripe-js";
import { getCurrentUser } from "./auth-service";
import { getCart } from "./cart-service";

// Stripe publishable key - set via VITE_STRIPE_PUBLIC_KEY or hardcode
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || "";

let stripePromise: Promise<Stripe | null> | null = null;

/**
 * Initialize Stripe
 */
function getStripe(): Promise<Stripe | null> {
  if (!STRIPE_PUBLIC_KEY) {
    console.warn("Stripe public key not configured");
    return Promise.resolve(null);
  }

  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }

  return stripePromise;
}

/**
 * Create payment intent
 * Note: This requires a backend to securely create payment intents
 * For client-only solution, use Stripe Checkout redirect instead
 */
export async function createPaymentIntent(): Promise<{ clientSecret: string; amount: number }> {
  const user = getCurrentUser();
  if (!user) {
    throw new Error("You must be logged in to create a payment");
  }

  // Get cart total
  const cartItems = await getCart();
  if (cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.dish?.price || "0");
    return sum + price * item.quantity;
  }, 0);

  const deliveryFee = 40;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  // IMPORTANT: Payment intent creation requires Stripe secret key
  // This should be done via Supabase Edge Function or Stripe Checkout
  // For now, throw error indicating backend is needed
  throw new Error(
    "Payment intent creation requires backend. Use Stripe Checkout redirect or Supabase Edge Function."
  );
}

/**
 * Create Stripe Checkout session (redirect-based payment)
 * This requires a backend endpoint to create the session
 * Alternative: Use Supabase Edge Function
 */
export async function createCheckoutSession(
  orderId: string,
  amount: number
): Promise<string> {
  // This would call a backend endpoint or Supabase Edge Function
  // to create a Stripe Checkout session
  throw new Error(
    "Checkout session creation requires backend. Implement via Supabase Edge Function."
  );
}

/**
 * Process payment with Stripe Elements (client-side)
 */
export async function processPayment(
  clientSecret: string,
  paymentMethod: any
): Promise<{ success: boolean; error?: string }> {
  const stripe = await getStripe();
  if (!stripe) {
    throw new Error("Stripe is not configured");
  }

  try {
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Get Stripe instance
 */
export async function getStripeInstance(): Promise<Stripe | null> {
  return getStripe();
}

