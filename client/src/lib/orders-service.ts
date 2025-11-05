/**
 * Orders Service using Supabase
 * Handles order creation and management
 */

import { supabase } from "./supabase-client";
import { getCurrentUser } from "./auth-service";
import { getCart } from "./cart-service";
import { clearCart } from "./cart-service";

export interface Order {
  id: string;
  orderNumber: number;
  userId: string;
  addressId: string;
  subtotal: string;
  deliveryFee: string;
  tax: string;
  total: string;
  deliveryDate: string;
  deliveryTime: string;
  status: string;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  dishId: string;
  quantity: number;
  price: string;
}

/**
 * Create a new order
 */
export async function createOrder(
  addressId: string,
  deliveryDate: string,
  deliveryTime: string
): Promise<Order> {
  const user = getCurrentUser();
  if (!user) {
    throw new Error("You must be logged in to place an order");
  }

  try {
    // Get user's cart
    const cartItems = await getCart();
    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.dish?.price || "0");
      return sum + price * item.quantity;
    }, 0);

    const deliveryFee = 40;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + deliveryFee + tax;

    // Get next order number
    const lastOrders = await supabase.select("orders", {
      order: "order_number.desc",
      limit: 1,
    });

    const nextOrderNumber =
      lastOrders && lastOrders.length > 0
        ? ((lastOrders[0] as any).order_number || 10000000) + 1
        : 10000001;

    // Create order
    const newOrder = await supabase.insert("orders", {
      user_id: user.id,
      address_id: addressId,
      order_number: nextOrderNumber,
      subtotal: subtotal.toString(),
      delivery_fee: deliveryFee.toString(),
      tax: tax.toString(),
      total: total.toString(),
      delivery_date: deliveryDate,
      delivery_time: deliveryTime,
      status: "pending",
    });

    const order = newOrder as unknown as Order;

    // Create order items
    const orderItemsData = cartItems.map((item) => ({
      order_id: order.id,
      dish_id: item.dishId,
      quantity: item.quantity,
      price: item.dish?.price || "0",
    }));

    await Promise.all(
      orderItemsData.map((item) => supabase.insert("order_items", item))
    );

    // Clear cart
    await clearCart();

    return order;
  } catch (error: any) {
    console.error("Error creating order:", error);
    throw new Error(error.message || "Failed to create order");
  }
}

/**
 * Get user's orders
 */
export async function getOrders(): Promise<Order[]> {
  const user = getCurrentUser();
  if (!user) {
    return [];
  }

  try {
    const orders = await supabase.select("orders", {
      filter: { user_id: `eq.${user.id}` },
      order: "created_at.desc",
    });

    return (orders || []) as Order[];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

/**
 * Get order details by ID
 */
export async function getOrderDetails(orderId: string): Promise<Order & { items: OrderItem[]; address: any }> {
  const user = getCurrentUser();
  if (!user) {
    throw new Error("You must be logged in to view order details");
  }

  try {
    // Get order
    const orders = await supabase.select("orders", {
      filter: {
        id: `eq.${orderId}`,
        user_id: `eq.${user.id}`,
      },
      limit: 1,
    });

    if (!orders || orders.length === 0) {
      throw new Error("Order not found");
    }

    const order = orders[0] as any;

    // Get order items
    const orderItems = await supabase.select("order_items", {
      filter: { order_id: `eq.${orderId}` },
    });

    // Get address
    const addresses = await supabase.select("addresses", {
      filter: { id: `eq.${order.address_id}` },
      limit: 1,
    });

    return {
      ...order,
      items: (orderItems || []) as OrderItem[],
      address: addresses && addresses.length > 0 ? addresses[0] : null,
    };
  } catch (error: any) {
    console.error("Error fetching order details:", error);
    throw new Error(error.message || "Failed to fetch order details");
  }
}

