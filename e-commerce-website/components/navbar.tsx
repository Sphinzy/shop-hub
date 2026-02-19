'use client';

import Link from 'next/link';
import { useCart } from '@/lib/context';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { items } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 font-bold text-2xl text-primary">
            ShopHub
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-foreground hover:text-primary transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/sell"
              className="text-foreground hover:text-primary transition-colors"
            >
              Sell
            </Link>
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/search" className="text-foreground hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            <Link href="/profile" className="text-foreground hover:text-primary transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <Link href="/cart" className="relative text-foreground hover:text-primary transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link href="/cart" className="relative text-foreground">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 rounded hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="block px-4 py-2 rounded hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/sell"
              className="block px-4 py-2 rounded hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              Sell
            </Link>
            <Link
              href="/search"
              className="block px-4 py-2 rounded hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              Search
            </Link>
            <Link
              href="/profile"
              className="block px-4 py-2 rounded hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
