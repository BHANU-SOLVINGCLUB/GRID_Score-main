// SMS Service for Bulk SMS API
// https://www.bulksms.com/ or similar bulk SMS providers

interface SMSConfig {
  apiKey: string;
  senderId: string;
  apiUrl?: string;
}

export class SMSService {
  private config: SMSConfig;

  constructor() {
    this.config = {
      apiKey: process.env.BULK_SMS_API_KEY || '',
      senderId: process.env.BULK_SMS_SENDER_ID || 'CaterPlan',
      apiUrl: process.env.BULK_SMS_API_URL || 'https://api.bulksms.com/v1/messages',
    };
  }

  async sendOTP(phone: string, otp: string): Promise<boolean> {
    try {
      // Format phone number (remove +91 if present, ensure 10 digits)
      const formattedPhone = phone.replace(/^\+91/, '').replace(/\D/g, '');
      
      const message = `Your OTP for The Cater Planner is: ${otp}. Valid for 10 minutes. Do not share with anyone.`;

      // Check if API key is configured
      if (!this.config.apiKey) {
        console.warn('⚠️  Bulk SMS API Key not configured. OTP:', otp);
        // In development, just log the OTP
        console.log(`📱 SMS to ${formattedPhone}: ${message}`);
        return true;
      }

      // Send SMS using Bulk SMS API
      // Format depends on your specific Bulk SMS provider
      // This is a common format, adjust based on your provider's documentation
      const response = await fetch(this.config.apiUrl!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(this.config.apiKey).toString('base64')}`,
        },
        body: JSON.stringify({
          to: `+91${formattedPhone}`,
          from: this.config.senderId,
          body: message,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('SMS API Error:', error);
        // Still return true in development to allow testing
        if (process.env.NODE_ENV === 'development') {
          console.log(`📱 SMS to ${formattedPhone}: ${message}`);
          return true;
        }
        return false;
      }

      console.log(`✅ SMS sent to ${formattedPhone}`);
      return true;
    } catch (error) {
      console.error('Error sending SMS:', error);
      // In development, log the OTP for testing
      if (process.env.NODE_ENV === 'development') {
        console.log(`📱 SMS to ${phone}: Your OTP is ${otp}`);
        return true;
      }
      return false;
    }
  }

  generateOTP(): string {
    // Generate 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}

export const smsService = new SMSService();
