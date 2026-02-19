import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import AddToCartButton from './add-to-cart-button';

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    image_url?: string;
    category_id?: number;
    description?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image_url || '/placeholder.jpg';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full h-48 bg-muted overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-cover hover:scale-105 transition-transform"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg text-foreground hover:text-primary line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {product.description || 'No description available'}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
