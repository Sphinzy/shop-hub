'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product-card';
import { products, categories } from '@/lib/mock-data';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  // Get featured products (first 6)
  const featuredProducts = products.slice(0, 6);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Welcome to ShopHub
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-balance opacity-90">
            Discover amazing products and sell what you love
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg" variant="secondary">
                Start Shopping <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/sell">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Start Selling
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-balance">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <p className="font-semibold text-foreground">{category.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-balance">Featured Products</h2>
            <Link href="/shop">
              <Button variant="outline">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-balance">Ready to Sell?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of sellers making money on ShopHub
          </p>
          <Link href="/sell">
            <Button size="lg" variant="secondary">
              List Your Product Today
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
