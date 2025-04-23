import { getTranslations } from 'next-intl/server';
import MainLayout from '@/components/layout/MainLayout';
import DeliveryChecker from '@/components/home/DeliveryChecker';
import ProductCard from '@/components/products/ProductCard';
import CategoryCard from '@/components/products/CategoryCard';
import ImageCarousel from '@/components/home/ImageCarousel';
import { FiTruck, FiCreditCard, FiPhoneCall, FiShield } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

const featuredProducts = [
  {
    id: '1',
    name: {
      en: 'Maggi Pazzta Instant - Cheesy Tomato Twist Pasta  (68.5 g)'
    },
    price: 33,
    discountPrice: 30,
    image: '/images/maggi_pasta.png',
    inStock: true,
    slug: 'Maggi-Pazzta-Instant',
  },
  {
    id: '2',
    name: {
      en: 'Daawat Biryani Basmati Rice| World S Longest Rice Grain Expands 24Mm* | Tasty, Non-Sticky & Rich Aroma |Naturally Aged|1 Kg'
    },
    price: 220,
    discountPrice: 215,
    image: '/images/daawat.png',
    inStock: true,
    slug: 'Daawat-Biryani-Basmati-Rice',
  },
  {
    id: '3',
    name: {
      en: '7-Inch Chef Knife - German High Carbon Stainless Steel, Ultra Sharp Full Tang Kitchen Knife for Professional Cooking'
    },
    price: 499,
    discountPrice: 429,
    image: '/images/chef_knife.png',
    inStock: true,
    slug: '7-Inch-Chef-Knife',
  },
  {
    id: '4',
    name: {
      en: 'Portronics POR 343 UFO USB Home Charger 6 Ports 8A Charging Station for Smartphones and Tablets - White'
    },
    price: 699,
    discountPrice: 599,
    image: '/images/charging_station.png',
    inStock: true,
    slug: 'UFO-USB-Home-Charger',
  },
];

const categories = [
  {
    id: '1',
    name: {
      en: 'Groceries & Essentials'
    },
    image: '/images/Groceries & Essentials.png',
    slug: 'groceries-essentials',
  },
  {
    id: '2',
    name: {
      en: 'Agricultural Products'
    },
    image: '/images/Agricultural Products.png',
    slug: 'agricultural-products',
  },
  {
    id: '3',
    name: {
      en: 'Home & Kitchen'
    },
    image: '/images/Home & Kitchen.png',
    slug: 'home-kitchen',
  },
  {
    id: '4',
    name: {
      en: 'Electronics'
    },
    image: '/images/Electronics.png',
    slug: 'electronics',
  },
];

type Props = {
  params: { locale: string };
};

export const dynamic = 'force-dynamic'; // OR use generateStaticParams below

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  // Await params before accessing its properties
  const { locale } = await params;

  // Now you can perform async operations like getTranslations
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="block">Village Mart</span>
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-primary-light">
                Delivering products to every rural corner
              </p>
              <p className="mb-8 text-white/80">
                Shop for groceries, home essentials, electronics and more with reliable delivery to rural areas.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/categories"
                  className="bg-white text-primary font-medium px-6 py-3 rounded-md hover:bg-gray-100 transition-colors text-center"
                >
                  Explore Products
                </Link>
                <Link
                  href="#delivery-check"
                  className="bg-transparent border border-white text-white font-medium px-6 py-3 rounded-md hover:bg-white/10 transition-colors text-center"
                >
                  Check Delivery Area
                </Link>
              </div>
            </div>
            <div className="hidden md:block transform transition-transform duration-300 hover:scale-105">
              <ImageCarousel
                images={[
                  { src: "/images/carousel-1.png", alt: "Rural products" },
                  { src: "/images/carousel-2.png", alt: "Rural products" },
                  { src: "/images/carousel-3.png", alt: "Village marketplace" },
                  { src: "/images/carousel-4.png", alt: "Rural commerce" },
                ]}
                autoplayInterval={2000}
                showIndicators={true}
                showArrows={true}
                className="h-[400px] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: <FiTruck className="text-primary text-xl" />,
                title: 'Rural Delivery',
                desc: "We reach where others don't",
              },
              {
                icon: <FiCreditCard className="text-primary text-xl" />,
                title: 'Flexible Payments',
                desc: 'UPI, COD and more',
              },
              {
                icon: <FiPhoneCall className="text-primary text-xl" />,
                title: 'Phone Support',
                desc: 'Call for assistance',
              },
              {
                icon: <FiShield className="text-primary text-xl" />,
                title: 'Quality Promise',
                desc: 'Authentic products',
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-4 rounded-lg text-center shadow-sm">
                <div className="bg-primary/10 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                  {feature.icon}
                </div>
                <h3 className="font-medium text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-primary">
            {t('categories')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                image={category.image}
                slug={category.slug}
                locale={locale as 'en'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              {t('featured')}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products from rural artisans and farmers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                discountPrice={product.discountPrice}
                image={product.image}
                inStock={product.inStock}
                slug={product.slug}
                locale={locale as 'en'}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md font-medium inline-block transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Delivery Check Section */}
      <section id="delivery-check" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2 bg-primary p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">{t('deliveryCheck')}</h3>
                <p className="mb-6">
                  Enter your PIN code or village name to check if we deliver to your area.
                </p>
                <div className="hidden md:block">
                  <Image
                    src="/images/delivery_service.gif"
                    alt="Delivery service"
                    width={200}
                    height={200}
                    className="mt-8 mx-auto"
                  />
                </div>
              </div>
              <div className="md:col-span-3 p-8">
                <DeliveryChecker />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">What Our Customers Say</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Village Mart has made shopping so convenient. I don't have to travel 20km to the nearest town anymore!",
                name: "Ramesh K.",
                village: "Bahadurpur Village"
              },
              {
                quote: "The quality of products is excellent. Their delivery is always on time, even during monsoon season.",
                name: "Sunita D.",
                village: "Chandpur"
              },
              {
                quote: "Amazing service! They deliver agricultural tools that were hard to find in our remote area.",
                name: "Vikram S.",
                village: "Nayagaon"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-primary text-4xl mb-4">"</div>
                <p className="text-gray-700 mb-4">{testimonial.quote}</p>
                <div className="flex items-center mt-6">
                  <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-medium">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-800">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.village}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
  ];
};