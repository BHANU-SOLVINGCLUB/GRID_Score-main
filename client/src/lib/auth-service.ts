/**
 * Authentication Service using Supabase
 * Handles OTP-based authentication without Express backend
 */

import { supabase } from "./supabase-client";

export interface User {
  id: string;
  username: string;
  phone: string | null;
  isVerified: boolean;
}

/**
 * Generate a 6-digit OTP
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send OTP - stores OTP in Supabase and logs it (SMS would require Edge Function)
 */
export async function sendOTP(phone: string): Promise<{ success: boolean; otp?: string }> {
  try {
    // Validate phone
    if (!/^[0-9]{10}$/.test(phone)) {
      throw new Error("Phone must be 10 digits");
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP in Supabase
    try {
      await supabase.insert("otp_verifications", {
        phone,
        otp,
        expires_at: expiresAt.toISOString(),
        is_used: false,
      });
    } catch (error) {
      console.error("Error storing OTP:", error);
      throw new Error("Failed to send OTP");
    }

    // In production, you'd call an SMS service here
    // For now, log it (in dev, this will be shown to user)
    console.log(`📱 OTP for ${phone}: ${otp}`);

    // Return OTP in development (will be shown in UI)
    const isDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    return {
      success: true,
      otp: isDev ? otp : undefined, // Only return OTP in dev mode
    };
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    throw new Error(error.message || "Failed to send OTP");
  }
}

/**
 * Verify OTP and login/signup user
 */
export async function verifyOTP(
  phone: string,
  otp: string,
  username?: string
): Promise<{ success: boolean; user: User }> {
  try {
    // Validate inputs
    if (!/^[0-9]{10}$/.test(phone)) {
      throw new Error("Phone must be 10 digits");
    }
    if (!/^[0-9]{6}$/.test(otp)) {
      throw new Error("OTP must be 6 digits");
    }

    // Find valid OTP
    const otpRecords = await supabase.select("otp_verifications", {
      filter: {
        phone: `eq.${phone}`,
        otp: `eq.${otp}`,
        is_used: `eq.false`,
      },
      limit: 1,
    });

    if (!otpRecords || otpRecords.length === 0) {
      throw new Error("Invalid or expired OTP");
    }

    const otpRecord = otpRecords[0] as any;
    const expiresAt = new Date(otpRecord.expires_at);

    // Check if expired
    if (expiresAt < new Date()) {
      throw new Error("OTP has expired");
    }

    // Mark OTP as used
    await supabase.update(
      "otp_verifications",
      { id: `eq.${otpRecord.id}` },
      { is_used: true }
    );

    // Check if user exists
    const existingUsers = await supabase.select("users", {
      filter: { phone: `eq.${phone}` },
      limit: 1,
    });

    let user: User;

    if (existingUsers && existingUsers.length > 0) {
      // User exists, update verification status
      await supabase.update(
        "users",
        { id: `eq.${(existingUsers[0] as any).id}` },
        { is_verified: true }
      );
      user = existingUsers[0] as User;
    } else {
      // Create new user
      if (!username || username.length < 2) {
        throw new Error("Username is required for new users (minimum 2 characters)");
      }

      const newUser = await supabase.insert("users", {
        username,
        phone,
        is_verified: true,
      });

      user = newUser as unknown as User;
    }

    // Store user in localStorage for session management
    localStorage.setItem("userId", user.id);
    localStorage.setItem("username", user.username);
    localStorage.setItem("phone", user.phone || "");

    return {
      success: true,
      user,
    };
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    throw new Error(error.message || "Failed to verify OTP");
  }
}

/**
 * Check if phone number exists
 */
export async function checkPhone(phone: string): Promise<{ exists: boolean; username: string | null }> {
  try {
    if (!/^[0-9]{10}$/.test(phone)) {
      throw new Error("Phone must be 10 digits");
    }

    const users = await supabase.select("users", {
      filter: { phone: `eq.${phone}` },
      limit: 1,
    });

    return {
      exists: users && users.length > 0,
      username: users && users.length > 0 ? (users[0] as any).username : null,
    };
  } catch (error: any) {
    console.error("Error checking phone:", error);
    throw new Error(error.message || "Failed to check phone");
  }
}

/**
 * Get current user from localStorage
 */
export function getCurrentUser(): { id: string; username: string; phone: string } | null {
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const phone = localStorage.getItem("phone");

  if (userId && username) {
    return { id: userId, username, phone: phone || "" };
  }

  return null;
}

/**
 * Logout user
 */
export function logout(): void {
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  localStorage.removeItem("phone");
}

