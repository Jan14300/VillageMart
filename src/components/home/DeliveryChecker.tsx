"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FiMapPin, FiSearch, FiCheck, FiX, FiTruck, FiInfo } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { isValidPincode } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function DeliveryChecker() {
  const t = useTranslations('home');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{
    status: 'idle' | 'loading' | 'success' | 'error';
    message?: string;
    deliveryDays?: number;
    deliveryCharge?: number;
    freeDeliveryThreshold?: number;
    estimatedDeliveryDate?: string;
  }>({
    status: 'idle',
  });

  // Animation for the component entry
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleCheck = async () => {
    if (!input.trim()) return;

    setResult({ status: 'loading' });

    try {
      const response = await fetch('/api/check-pincode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pincode: input.trim() }),
      });

      const data = await response.json();

      if (data.available) {
        setResult({
          status: 'success',
          message: data.message || 'Delivery available!',
          deliveryDays: data.deliveryDays || 3,
          deliveryCharge: data.deliveryCharge,
          freeDeliveryThreshold: data.freeDeliveryThreshold,
          estimatedDeliveryDate: data.estimatedDeliveryDate,
        });
      } else {
        setResult({
          status: 'error',
          message: 'Delivery not available to this location',
        });
      }
    } catch (error) {
      setResult({
        status: 'error',
        message: 'An error occurred. Please try again.',
      });
    }
  };

  return (
    <motion.div
      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl"
      style={{
        background: 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
      }}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 relative">
        <span className="relative inline-block">
          {t('deliveryCheck')}
          <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/20 rounded-full"></span>
        </span>
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-2">
        <div className="relative flex-grow group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-200 group-focus-within:text-primary">
            <FiMapPin className="text-gray-400 group-focus-within:text-primary transition-colors duration-200" />
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('enterPincode')}
            className="block w-full pl-12 pr-4 py-4 text-gray-700 font-medium border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-gray-50/50 focus:bg-white shadow-sm"
            suppressHydrationWarning
            onKeyDown={(e) => e.key === 'Enter' && input.trim() && handleCheck()}
          />
        </div>
        <Button
          onClick={handleCheck}
          disabled={result.status === 'loading' || !input.trim()}
          className="flex items-center justify-center py-4 px-8 rounded-xl font-medium transition-all duration-300 hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          style={{
            background: result.status === 'loading' ? '#64748b' : 'var(--color-primary)',
          }}
        >
          {result.status === 'loading' ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="font-medium">Checking...</span>
            </span>
          ) : (
            <>
              <FiSearch className="mr-2 text-lg" />
              <span>{t('check')}</span>
            </>
          )}
        </Button>
      </div>

      {result.status === 'success' && (
        <div
          className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5 flex items-start shadow-sm animate-fadeIn overflow-hidden relative"
          style={{
            animation: 'fadeInUp 0.5s ease-out forwards',
          }}
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
          <div className="bg-green-100 p-2 rounded-full mr-4">
            <FiCheck className="text-green-600 text-lg" />
          </div>
          <div>
            <p className="text-green-800 font-semibold text-lg">{result.message}</p>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center bg-green-100/50 rounded-lg px-3 py-2 w-fit">
                <FiTruck className="text-green-600 mr-2" />
                <p className="text-green-700 font-medium">
                  Estimated delivery: <span className="font-bold">{result.deliveryDays} days</span>
                  {result.estimatedDeliveryDate && <span className="ml-1">(by {result.estimatedDeliveryDate})</span>}
                </p>
              </div>

              {result.deliveryCharge !== undefined && (
                <div className="flex items-center bg-green-100/50 rounded-lg px-3 py-2 w-fit">
                  <FiInfo className="text-green-600 mr-2" />
                  <p className="text-green-700 font-medium">
                    Delivery fee: <span className="font-bold">₹{result.deliveryCharge}</span>
                    {result.freeDeliveryThreshold && (
                      <span className="ml-1">(Free above ₹{result.freeDeliveryThreshold})</span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {result.status === 'error' && (
        <div
          className="mt-6 bg-red-50 border border-red-200 rounded-xl p-5 flex items-start shadow-sm overflow-hidden relative"
          style={{
            animation: 'fadeInUp 0.5s ease-out forwards',
          }}
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
          <div className="bg-red-100 p-2 rounded-full mr-4">
            <FiX className="text-red-600 text-lg" />
          </div>
          <div>
            <p className="text-red-800 font-semibold text-lg">{result.message}</p>
            <div className="flex items-center mt-2 bg-red-100/50 rounded-lg px-3 py-2">
              <FiInfo className="text-red-600 mr-2" />
              <p className="text-red-700 font-medium">
                Try another location or contact customer support for assistance.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </motion.div>
  );
}