import { NextResponse } from 'next/server';
import { verifyPaymentSignature } from '@/lib/payment';

export async function POST(request: Request) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await request.json();
    
    // Verify payment signature
    const isValid = verifyPaymentSignature(
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    );
    
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      );
    }
    
    // In a real app, you would update your database here to mark the order as paid
    
    return NextResponse.json({
      success: true,
      paymentId: razorpay_payment_id
    });
    
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}