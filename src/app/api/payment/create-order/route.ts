import { NextResponse } from 'next/server';

// Use environment variables instead of hardcoded values
const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_gGgY5VEwsyhoK2';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'KoacLYFOgTtecv47PB8x7HAM';

// For development/testing we'll use a mock order approach
// Setting to false to use actual Razorpay API
const MOCK_MODE = false;

export async function POST(request: Request) {
  try {
    const { amount, currency = 'INR', receipt = 'village_mart_order' } = await request.json();
    
    // Basic validation
    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }
    
    // Convert amount to paise (Razorpay uses smallest currency unit)
    const amountInPaise = Math.round(amount * 100);
    
    console.log('Creating order with:', {
      amount: amountInPaise,
      currency,
      key: RAZORPAY_KEY_ID
    });
    
    if (MOCK_MODE) {
      // Create a fake order for testing/development
      // No actual API call to Razorpay in mock mode
      console.log('Creating mock Razorpay order for testing...');
      
      // Generate a random order ID 
      const mockOrderId = 'order_' + Math.random().toString(36).substring(2, 15);
      
      return NextResponse.json({
        success: true,
        orderId: mockOrderId,
        amount: amountInPaise,
        currency,
        key: RAZORPAY_KEY_ID
      });
    }
    
    // Real Razorpay API integration for production
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64')}`
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency,
        receipt,
        payment_capture: 1 // Auto-capture payment
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Razorpay API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to create payment order' }, 
        { status: response.status }
      );
    }
    
    const order = await response.json();
    
    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: amountInPaise,
      currency,
      key: RAZORPAY_KEY_ID
    });
    
  } catch (error) {
    console.error('Payment order creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}