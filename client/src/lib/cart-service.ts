/**
 * Cart Service using Supabase
 * Handles cart operations for authenticated users
 */

import { supabase } from "./supabase-client";
import { getCurrentUser } from "./auth-service";

export interface CartItem {
  id: string;
  dishId: string;
  quantity: number;
  dish?: {
    id: string;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
  };
}

/**
 * Get user's cart items
 */
export async function getCart(): Promise<CartItem[]> {
  const user = getCurrentUser();
  if (!user) {
    return [];
  }

  try {
    // Get cart items with dish details
    const cartItems = await supabase.select("cart_items", {
      filter: { user_id: `eq.${user.id}` },
    });

    if (!cartItems || cartItems.length === 0) {
      return [];
    }

    // Fetch dish details for each cart item
    const cartWithDishes = await Promise.all(
      cartItems.map(async (item: any) => {
        const dishes = await supabase.select("dishes", {
          filter: { id: `eq.${item.dish_id}` },
          limit: 1,
        });

        return {
          id: item.id,
          dishId: item.dish_id,
          quantity: item.quantity,
          dish: dishes && dishes.length > 0 ? dishes[0] : undefined,
        };
      })
    );

    return cartWithDishes;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
}

/**
 * Add item to cart
 */
export async function addToCart(dishId: string, quantity: number = 1): Promise<CartItem> {
  const user = getCurrentUser();
  if (!user) {
    throw new Error("You must be logged in to add items to cart");
  }

  try {
    // Check if item already exists in cart
    const existingItems = await supabase.select("cart_items", {
      filter: {
        user_id: `eq.${user.id}`,
        dish_id: `eq.${dishId}`,
      },
      limit: 1,
    });

    if (existingItems && existingItems.length > 0) {
      // Update quantity
      const existingItem = existingItems[0] as any;
      await supabase.update(
        "cart_items",
        { id: `eq.${existingItem.id}` },
        { quantity: existingItem.quantity + quantity }
      );
      return {
        id: existingItem.id,
        dishId: existingItem.dish_id,
        quantity: existingItem.quantity + quantity,
      } as CartItem;
    } else {
      // Insert new cart item
      const newItem = await supabase.insert("cart_items", {
        user_id: user.id,
        dish_id: dishId,
        quantity,
      });
      return {
        id: (newItem as any).id,
        dishId,
        quantity,
      } as CartItem;
    }
  } catch (error: any) {
    console.error("Error adding to cart:", error);
    throw new Error(error.message || "Failed to add item to cart");
  }
}

/**
 * Update cart item quantity
 */
export async function updateCartItem(cartItemId: string, quantity: number): Promise<void> {
  const user = getCurrentUser();
  if (!user) {
    throw new Error("You must be logged in to update cart");
  }

  try {
    if (quantity <= 0) {
      // Remove item
      await supabase.delete("cart_items", { id: `eq.${cartItemId}` });
    } else {
      // Update quantity
      await supabase.update("cart_items", { id: `eq.${cartItemId}` }, { quantity });
    }
  } catch (error: any) {
    console.error("Error updating cart:", error);
    throw new Error(error.message || "Failed to update cart");
  }
}

/**
 * Remove item from cart
 */
export async function removeFromCart(cartItemId: string): Promise<void> {
  const user = getCurrentUser();
  if (!user) {
    throw new Error("You must be logged in to remove items from cart");
  }

  try {
    await supabase.delete("cart_items", { id: `eq.${cartItemId}` });
  } catch (error: any) {
    console.error("Error removing from cart:", error);
    throw new Error(error.message || "Failed to remove item from cart");
  }
}

/**
 * Clear entire cart
 */
export async function clearCart(): Promise<void> {
  const user = getCurrentUser();
  if (!user) {
    throw new Error("You must be logged in to clear cart");
  }

  try {
    // Get all cart items for user
    const cartItems = await supabase.select("cart_items", {
      filter: { user_id: `eq.${user.id}` },
    });

    if (cartItems && cartItems.length > 0) {
      // Delete all items
      await Promise.all(
        cartItems.map((item: any) =>
          supabase.delete("cart_items", { id: `eq.${item.id}` })
        )
      );
    }
  } catch (error: any) {
    console.error("Error clearing cart:", error);
    throw new Error(error.message || "Failed to clear cart");
  }
}

