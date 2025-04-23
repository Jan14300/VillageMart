"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/context/CartContext';

interface ProductCardProps {
  id: string;
  name: {
    en: string;
  };
  price: number;
  discountPrice?: number;
  image: string;
  inStock: boolean;
  slug: string;
  locale: 'en';
}

export default function ProductCard({
  id,
  name,
  price,
  discountPrice,
  image,
  inStock,
  slug,
  locale,
}: ProductCardProps) {
  const t = useTranslations('product');
  const { addItem } = useCart();
  const displayName = name[locale];

  const handleAddToCart = () => {
    // Add the product to cart
    addItem({
      id,
      name: displayName,
      price,
      discountPrice,
      image,
      slug
    });

  };

  const discountPercentage = discountPrice ? Math.round(((price - discountPrice) / price) * 100) : 0;

  return (
    <div className="group rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <Link href={`/product/${slug}`} className="block overflow-hidden relative">
        <div className="aspect-square overflow-hidden bg-gray-50">
          <Image
            src={image}
            alt={displayName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {!inStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg">
              {t('outOfStock')}
            </span>
          </div>
        )}

        {discountPrice && (
          <div className="absolute top-3 right-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-full px-3 py-1.5 shadow-md transform rotate-2 flex items-center justify-center">
              <span className="text-sm">{discountPercentage}% OFF</span>
            </div>
          </div>
        )}

        {inStock && (
          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm text-primary text-xs font-medium rounded-full px-3 py-1.5 shadow-sm">
              {t('viewDetails')}
            </div>
          </div>
        )}
      </Link>

      <div className="p-5">
        <Link href={`/product/${slug}`} className="block group-hover:text-primary transition-colors">
          <h3 className="font-medium text-gray-800 line-clamp-2 mb-3 min-h-[2.5rem] text-lg">
            {displayName}
          </h3>
        </Link>

        <div className="flex items-center justify-between mb-4">
          <div>
            {discountPrice ? (
              <div className="flex items-baseline">
                <span className="text-xl font-bold text-primary">
                  {formatPrice(discountPrice)}
                </span>
                <span className="text-sm text-gray-500 line-through ml-2">
                  {formatPrice(price)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-primary">
                {formatPrice(price)}
              </span>
            )}
          </div>

          <div>
            {inStock ? (
              <span className="text-xs bg-green-100 text-green-800 px-2.5 py-1 rounded-full font-medium border border-green-200">
                {t('available')}
              </span>
            ) : (
              <span className="text-xs bg-red-100 text-red-800 px-2.5 py-1 rounded-full font-medium border border-red-200">
                {t('outOfStock')}
              </span>
            )}
          </div>
        </div>

        <Button
          variant="default"
          disabled={!inStock}
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center text-sm font-medium py-2.5 shadow-sm hover:shadow group-hover:bg-primary-dark transition-all duration-300"
        >
          <FiShoppingCart className="mr-2" />
          {t('addToCart')}
        </Button>
      </div>
    </div>
  );
}