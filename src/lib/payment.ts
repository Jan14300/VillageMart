import crypto from 'crypto';

// Use environment variables instead of hardcoded values
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'CrzJMdJIAxGQnlFjMnGPcGlH';

// For development/testing we'll use a mock approach
const MOCK_MODE = true;

// Verify Razorpay payment signature
export function verifyPaymentSignature(
  paymentId: string,
  orderId: string,
  signature: string
) {
  if (MOCK_MODE) {
    // In mock mode, always return true for testing
    return true;
  }
  
  const payload = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(payload)
    .digest('hex');
  
  return expectedSignature === signature;
}