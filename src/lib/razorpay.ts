declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number; // in smallest currency unit (paise for INR)
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  handler: (response: any) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: object;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
    animation?: boolean;
    backdropclose?: boolean;
    escape?: boolean;
  };
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      console.log('Razorpay already loaded');
      return resolve(true);
    }
    
    console.log('Loading Razorpay script...');
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded successfully');
      resolve(true);
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const initializeRazorpay = async (options: RazorpayOptions): Promise<void> => {
  try {
    console.log('Loading Razorpay script...');
    const isLoaded = await loadRazorpayScript();
    
    if (isLoaded) {
      console.log('Razorpay loaded, creating checkout instance...');
      
      if (!window.Razorpay) {
        console.error('Razorpay not available in window object');
        throw new Error('Razorpay SDK not available');
      }
      
      if (!options.key) {
        console.error('Missing key in Razorpay options');
        throw new Error('Invalid Razorpay configuration: missing key');
      }
      
      if (!options.order_id) {
        console.error('Missing order_id in Razorpay options');
        throw new Error('Invalid Razorpay configuration: missing order ID');
      }
      
      // Create the Razorpay instance
      const razorpay = new window.Razorpay(options);
      console.log('Opening Razorpay checkout...');
      razorpay.open();
      console.log('Razorpay checkout opened');
    } else {
      throw new Error('Razorpay SDK failed to load. Check your internet connection.');
    }
  } catch (error) {
    console.error('Error initializing Razorpay:', error);
    throw error;
  }
}; 