'use client';

import { useCart } from '@/lib/context';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface AddToCartButtonProps {
  product: {
    id: number;
    title: string;
    price: number;
    image_url?: string;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleClick}
      className={`transition-all ${
        isAdded
          ? 'bg-green-500 hover:bg-green-600'
          : 'bg-primary hover:bg-primary/90'
      }`}
      size="sm"
    >
      {isAdded ? '✓ Added' : <ShoppingCart className="w-4 h-4" />}
    </Button>
  );
}
