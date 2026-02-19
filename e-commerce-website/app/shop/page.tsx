'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/product-card';
import { products, categories } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || '');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory) {
      const category = categories.find((c) => c.slug === selectedCategory);
      if (category) {
        filtered = filtered.filter((p) => p.category_id === category.id);
      }
    }

    // Filter by price
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, priceRange, sortBy]);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-balance">Shop Products</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full mb-4 p-3 bg-muted rounded-lg flex items-center justify-between"
            >
              <span className="font-semibold">Filters</span>
              <ChevronDown className={`w-5 h-5 transition ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              {/* Category Filter */}
              <div className="bg-white p-4 rounded-lg border border-border">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`block w-full text-left px-3 py-2 rounded transition ${
                      selectedCategory === ''
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`block w-full text-left px-3 py-2 rounded transition ${
                        selectedCategory === category.slug
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="bg-white p-4 rounded-lg border border-border">
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Max Price: ${priceRange[1]}</label>
                    <input
                      type="range"
                      min="0"
                      max="300"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                  <Button
                    onClick={() => setPriceRange([0, 300])}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Reset Price
                  </Button>
                </div>
              </div>

              {/* Sort */}
              <div className="bg-white p-4 rounded-lg border border-border">
                <h3 className="font-semibold mb-4">Sort By</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSortBy('newest')}
                    className={`block w-full text-left px-3 py-2 rounded transition ${
                      sortBy === 'newest'
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    Newest
                  </button>
                  <button
                    onClick={() => setSortBy('price-low')}
                    className={`block w-full text-left px-3 py-2 rounded transition ${
                      sortBy === 'price-low'
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    Price: Low to High
                  </button>
                  <button
                    onClick={() => setSortBy('price-high')}
                    className={`block w-full text-left px-3 py-2 rounded transition ${
                      sortBy === 'price-high'
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    Price: High to Low
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 text-muted-foreground">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </div>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
