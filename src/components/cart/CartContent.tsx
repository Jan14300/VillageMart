"use client";

import { useTranslations } from 'next-intl';
import { useCart } from '@/lib/context/CartContext';
import { initializeRazorpay, type RazorpayOptions } from '@/lib/razorpay';
import Image from 'next/image';
import Link from 'next/link';
import { FiTrash2, FiArrowLeft, FiPlus, FiMinus } from 'react-icons/fi';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function CartContent() {
  const t = useTranslations('cart');
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Calculate the original total price (without discounts)
  const originalTotalPrice = items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  // Calculate the total discount
  const totalDiscount = originalTotalPrice - totalPrice;

  // Delivery charges
  const deliveryCharge = totalPrice >= 499 ? 0 : 29;

  // Final amount
  const finalAmount = totalPrice + deliveryCharge;

  async function handleCheckout() {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      setIsLoading(true);

      // Create order via API
      console.log('Creating payment order...', { amount: finalAmount, currency: 'INR' });
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalAmount,
          currency: 'INR',
          receipt: `order_${Date.now()}`,
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Order creation API error:', response.status, errorText);
        throw new Error(`Failed to create order: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Order creation response:', responseData);

      if (!responseData.success) {
        console.error('Order creation failed:', responseData.error || 'Unknown error');
        throw new Error(responseData.error || 'Failed to create order');
      }

      if (!responseData.key) {
        console.error('Missing Razorpay key in response:', responseData);
        throw new Error('Payment configuration error: Missing API key');
      }
      
      if (!responseData.orderId) {
        console.error('Missing order ID in response:', responseData);
        throw new Error('Payment configuration error: Missing order ID');
      }

      // For development debugging
      console.log('Using Razorpay key:', responseData.key);
      console.log('Order ID:', responseData.orderId);

      // Initialize Razorpay
      const options: RazorpayOptions = {
        key: responseData.key,
        amount: responseData.amount,
        currency: responseData.currency || 'INR',
        name: 'Village Mart',
        description: `Order of ${totalItems} items`,
        order_id: responseData.orderId,
        image: '/images/logo.png',
        handler: function (response) {
          console.log('Payment handler response:', response);
          handlePaymentSuccess(response);
        },
        prefill: {
          name: '', // You can prefill this if you have user data
          email: '',
          contact: '',
        },
        theme: {
          color: '#16a34a',
        },
        // Add error callbacks
        modal: {
          ondismiss: function () {
            console.log('Checkout form closed');
            setIsLoading(false);
            toast.error('Checkout cancelled');
          }
        }
      };

      console.log('Initializing Razorpay with options:', options);

      try {
        await initializeRazorpay(options);
      } catch (razorpayError) {
        console.error('Razorpay initialization error:', razorpayError);
        toast.error('Failed to initialize payment gateway. Please try again later.');
      }

    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error instanceof Error ? error.message : 'Payment initialization failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePaymentSuccess(response: any) {
    try {
      console.log('Payment success, verifying payment...', response);

      // For testing purposes, simulate success without making the API call
      const isDevelopment = process.env.NODE_ENV === 'development';

      if (isDevelopment && !response.razorpay_payment_id) {
        console.log('Development mode: Simulating successful payment');
        toast.success('Payment successful! Your order has been placed.');
        clearCart();
        router.push('/orders');
        return;
      }

      // Validate payment response
      if (!response.razorpay_payment_id || !response.razorpay_order_id || !response.razorpay_signature) {
        console.error('Missing payment response parameters:', response);
        toast.error('Payment information incomplete. Please try again.');
        return;
      }

      // Verify payment
      console.log('Sending verification request with:', {
        payment_id: response.razorpay_payment_id,
        order_id: response.razorpay_order_id,
        has_signature: !!response.razorpay_signature
      });

      const verifyResponse = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        }),
      });

      if (!verifyResponse.ok) {
        const errorText = await verifyResponse.text();
        console.error('Verification API error:', verifyResponse.status, errorText);
        toast.error('Payment verification failed. Please contact support.');
        return;
      }

      const verifyData = await verifyResponse.json();
      console.log('Verification response:', verifyData);

      if (verifyData.success) {
        toast.success('Payment successful! Your order has been placed.');
        clearCart();
        router.push('/orders');
      } else {
        console.error('Payment verification failed:', verifyData.error || 'Unknown error');
        toast.error(verifyData.error || 'Payment verification failed. Please contact support.');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      toast.error('Something went wrong. Please check your order status.');
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-2xl font-bold mb-8 text-black">{t('yourCart')}</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <FiTrash2 className="mx-auto h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-xl font-medium mb-4 text-black">{t('emptyCart')}</h2>
          <p className="text-gray-500 mb-8">{t('emptyCartMessage')}</p>
          <Link href="/">
            <Button className="px-6 py-3">
              <FiArrowLeft className="mr-2" />
              {t('continueShopping')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold mb-8 text-black">{t('yourCart')}</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-medium text-black">{t.rich('items', { count: totalItems })}</h2>
            </div>

            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="p-4 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-20 h-20 relative flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-primary font-bold">
                        {formatPrice(item.discountPrice || item.price)}
                      </span>
                      {item.discountPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {formatPrice(item.price)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                      <FiMinus size={16} />
                    </button>

                    <span className="w-8 text-center font-medium">{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                      <FiPlus size={16} />
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-primary">
                      {formatPrice((item.discountPrice || item.price) * item.quantity)}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm flex items-center mt-1"
                    >
                      <FiTrash2 className="mr-1" size={14} />
                      {t('remove')}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <Link href="/">
              <Button variant="outline" className="text-sm">
                <FiArrowLeft className="mr-2" />
                {t('continueShopping')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          {/* Price Details */}
          <div className="bg-white rounded-lg shadow-md mb-4">
            <div className="p-4 border-b">
              <h2 className="font-medium text-black">PRICE DETAILS</h2>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-black">Price ({totalItems} items)</span>
                <span className="text-black">₹{originalTotalPrice}</span>
              </div>

              {totalDiscount > 0 && (
                <div className="flex justify-between">
                  <span className="text-black">Discount</span>
                  <span className="text-green-600">− ₹{totalDiscount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-black">Coupons for you</span>
                <span className="text-gray-500">−</span>
              </div>

              <div className="flex justify-between">
                <span className="text-black">Delivery Charges</span>
                {deliveryCharge === 0 ? (
                  <span className="text-green-600">FREE</span>
                ) : (
                  <span className="text-black">₹{deliveryCharge}</span>
                )}
              </div>

              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-black">Total Amount</span>
                  <span className="text-black">₹{finalAmount}</span>
                </div>
              </div>

              {totalDiscount > 0 && (
                <div className="pt-2 text-green-600 font-medium">
                  You will save ₹{totalDiscount} on this order
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-bold text-lg mb-4 text-black">{t('orderSummary')}</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-black">{t('subtotal')}</span>
                <span className="text-black">{formatPrice(totalPrice)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-black">{t('deliveryFee')}</span>
                <span className="text-black">{totalPrice >= 499 ? t('free') : formatPrice(29)}</span>
              </div>

              {totalPrice < 499 && (
                <div className="text-sm text-gray-600">
                  {t.rich('freeDeliveryMessage', {
                    amount: formatPrice(499 - totalPrice)
                  })}
                </div>
              )}

              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span className="text-black">{t('total')}</span>
                  <span className="text-primary">
                    {formatPrice(totalPrice >= 499 ? totalPrice : totalPrice + 29)}
                  </span>
                </div>
              </div>
            </div>

            <Button
              className="w-full py-3"
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : t('proceedToCheckout')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}