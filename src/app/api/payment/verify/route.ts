import { NextResponse } from 'next/server';
import { verifyPaymentSignature } from '@/lib/payment';

export async function POST(request: Request) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await request.json();
    
    // Log the verification attempt
    console.log('Payment verification attempt:', {
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      has_signature: !!razorpay_signature
    });
    
    // Validate required fields
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      console.error('Missing required payment verification parameters');
      return NextResponse.json(
        { success: false, error: 'Missing required payment parameters' },
        { status: 400 }
      );
    }
    
    // Verify payment signature
    const isValid = verifyPaymentSignature(
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    );
    
    if (!isValid) {
      console.error('Payment verification failed: Invalid signature');
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      );
    }
    
    // In a real app, you would update your database here to mark the order as paid
    console.log('Payment verified successfully:', razorpay_payment_id);
    
    return NextResponse.json({
      success: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id
    });
    
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}