import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

interface CategoryCardProps {
  name: {
    en: string;
  };
  image: string;
  slug: string;
  locale: 'en';
}

export default function CategoryCard({ name, image, slug, locale }: CategoryCardProps) {
  const displayName = name[locale];

  return (
    <Link
      href={`/category/${slug}`}
      className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
    >
      <div className="relative h-48 sm:h-56">
        <Image
          src={image}
          alt={displayName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-primary/80 group-hover:via-primary/30 transition-all duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col space-y-1">
            <h3 className="text-white text-xl font-semibold group-hover:text-white transition-colors">
              {displayName}
            </h3>
            <div className="flex items-center text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <span>Browse products</span>
              <FiArrowRight className="ml-2" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}