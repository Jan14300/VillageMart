import crypto from 'crypto';

// Use environment variables instead of hardcoded values
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'KoacLYFOgTtecv47PB8x7HAM';

// For development/testing we'll use a mock approach
// Setting to false to use actual signature verification
const MOCK_MODE = false;

// Verify Razorpay payment signature
export function verifyPaymentSignature(
  paymentId: string,
  orderId: string,
  signature: string
) {
  // Basic validation first
  if (!paymentId || !orderId || !signature) {
    console.error('Missing required parameters for payment verification');
    return false;
  }

  if (MOCK_MODE) {
    // In mock mode, always return true for testing
    console.log('MOCK_MODE: Bypassing signature verification');
    return true;
  }
  
  try {
    const payload = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(payload)
      .digest('hex');
    
    const isValid = expectedSignature === signature;
    console.log('Payment signature verification:', isValid ? 'SUCCESS' : 'FAILED');
    return isValid;
  } catch (error) {
    console.error('Error verifying payment signature:', error);
    return false;
  }
}