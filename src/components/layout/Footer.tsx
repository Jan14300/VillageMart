'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  const t = useTranslations('common');

  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Village Mart</h3>
            <p className="text-sm text-gray-400 mb-4">{t('tagline')}</p>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <FiMapPin className="mr-2 text-primary-light" />
                <span>123 Rural Road, Village Area, India</span>
              </div>
              <div className="flex items-center text-sm">
                <FiPhone className="mr-2 text-primary-light" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center text-sm">
                <FiMail className="mr-2 text-primary-light" />
                <span>support@villagemart.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary-light">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-light">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary-light">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/delivery-areas" className="hover:text-primary-light">
                  Delivery Areas
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary-light">
                  Work With Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/groceries" className="hover:text-primary-light">
                  Groceries
                </Link>
              </li>
              <li>
                <Link href="/category/household" className="hover:text-primary-light">
                  Household Items
                </Link>
              </li>
              <li>
                <Link href="/category/electronics" className="hover:text-primary-light">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/category/agriculture" className="hover:text-primary-light">
                  Agricultural Products
                </Link>
              </li>
              <li>
                <Link href="/category/clothing" className="hover:text-primary-light">
                  Clothing
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Download App */}
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Connected</h3>
            <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for updates</p>
            <div className="flex mb-4">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 text-gray-800 text-sm rounded-l-md focus:outline-none flex-1"
                suppressHydrationWarning
              />
              <button className="bg-primary text-white px-4 py-2 rounded-r-md text-sm" suppressHydrationWarning>
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-400 mb-2">Download our app</p>
            <div className="flex space-x-2">
              <button className="bg-black rounded-md px-3 py-2 text-xs flex items-center space-x-1" suppressHydrationWarning>
                <span>App Store</span>
              </button>
              <button className="bg-black rounded-md px-3 py-2 text-xs flex items-center space-x-1" suppressHydrationWarning>
                <span>Google Play</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Village Mart. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-primary-light">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-primary-light">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-primary-light">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}