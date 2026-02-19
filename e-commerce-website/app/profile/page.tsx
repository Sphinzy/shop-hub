'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User, LogOut, Plus, ShoppingBag } from 'lucide-react';

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('');

  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-02-15',
      total: 159.97,
      status: 'delivered',
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 79.99 },
        { name: 'Designer T-Shirt', quantity: 1, price: 34.99 },
      ],
    },
    {
      id: 'ORD-002',
      date: '2024-02-10',
      total: 99.98,
      status: 'in-transit',
      items: [{ name: 'Running Shoes', quantity: 2, price: 49.99 }],
    },
    {
      id: 'ORD-003',
      date: '2024-02-01',
      total: 89.99,
      status: 'delivered',
      items: [{ name: 'Yoga Mat', quantity: 1, price: 24.99 }],
    },
  ];

  const mockSellerProducts = [
    {
      id: 1,
      title: 'Vintage Camera',
      price: 150.00,
      sales: 12,
      image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      title: 'Leather Watch',
      price: 89.99,
      sales: 8,
      image: 'https://images.unsplash.com/photo-1523170335684-f42b4a3b0d38?w=400&h=300&fit=crop',
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsLoggedIn(true);
      setShowLoginForm(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg border border-border p-12 text-center">
            <User className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">Sign In to Your Account</h1>
            <p className="text-muted-foreground mb-8">
              Access your orders, saved items, and seller dashboard
            </p>

            {!showLoginForm ? (
              <div className="space-y-4">
                <Button onClick={() => setShowLoginForm(true)} className="w-full">
                  Sign In
                </Button>
                <p className="text-muted-foreground">
                  Don&apos;t have an account?{' '}
                  <button className="text-primary hover:underline">
                    Create one now
                  </button>
                </p>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-border rounded-lg"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowLoginForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Sign In
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg border border-border p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
              <p className="text-muted-foreground">{email}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
              <p className="text-2xl font-bold">{mockOrders.length}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
              <p className="text-2xl font-bold">
                ${mockOrders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Products Listed</p>
              <p className="text-2xl font-bold">{mockSellerProducts.length}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-border p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" />
                Order History
              </h2>

              {mockOrders.length > 0 ? (
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-border rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded ${
                              order.status === 'delivered'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {order.status === 'delivered'
                              ? 'Delivered'
                              : 'In Transit'}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {order.items.map((item, idx) => (
                          <p key={idx}>
                            {item.name} × {item.quantity}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No orders yet
                </p>
              )}
            </div>
          </div>

          {/* Seller Products Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-8 sticky top-20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Your Products</h3>
                <Link href="/sell">
                  <Button size="sm" className="flex items-center gap-1">
                    <Plus className="w-4 h-4" />
                    List New
                  </Button>
                </Link>
              </div>

              {mockSellerProducts.length > 0 ? (
                <div className="space-y-4">
                  {mockSellerProducts.map((product) => (
                    <div key={product.id} className="border border-border rounded-lg overflow-hidden hover:shadow-md transition">
                      <div className="relative w-full h-24 bg-muted">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <p className="font-semibold text-sm line-clamp-1">
                          {product.title}
                        </p>
                        <p className="text-primary font-bold text-sm">
                          ${product.price.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {product.sales} sales
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8 text-sm">
                  No products listed yet
                </p>
              )}

              <Link href="/sell" className="block mt-6">
                <Button variant="outline" className="w-full">
                  Start Selling
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
