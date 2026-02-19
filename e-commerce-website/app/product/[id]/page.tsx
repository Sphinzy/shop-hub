'use client';

import { products, categories } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AddToCartButton from '@/components/add-to-cart-button';
import ProductCard from '@/components/product-card';
import { ArrowLeft, Star } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <Link href="/shop">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const category = categories.find((c) => c.id === product.category_id);
  const relatedProducts = products
    .filter((p) => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8 text-muted-foreground">
          <Link href="/shop" className="hover:text-foreground">
            Shop
          </Link>
          <span>/</span>
          {category && (
            <>
              <Link href={`/shop?category=${category.slug}`} className="hover:text-foreground">
                {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span>{product.title}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden border border-border">
            <div className="relative w-full aspect-square bg-muted">
              {product.image_url && (
                <Image
                  src={product.image_url}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              {category && (
                <Link href={`/shop?category=${category.slug}`} className="text-primary text-sm font-semibold mb-2 block">
                  {category.name}
                </Link>
              )}
              <h1 className="text-4xl font-bold mb-4">{product.title}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(248 reviews)</span>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price and Stock */}
            <div className="bg-muted p-6 rounded-lg mb-6">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">Stock: {product.stock} available</p>
                <div className="w-full bg-muted-foreground/20 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${(product.stock / 30) * 100}%` }}
                  />
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-4">
                <AddToCartButton product={product} />
                <Button variant="outline" className="flex-1">
                  Add to Wishlist
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-3 bg-muted rounded">
                <span className="text-muted-foreground">SKU:</span>
                <span className="font-semibold">SHP-{product.id}</span>
              </div>
              <div className="flex justify-between p-3 bg-muted rounded">
                <span className="text-muted-foreground">Category:</span>
                <span className="font-semibold">{category?.name}</span>
              </div>
              <div className="flex justify-between p-3 bg-muted rounded">
                <span className="text-muted-foreground">Free Shipping:</span>
                <span className="font-semibold text-green-600">Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
