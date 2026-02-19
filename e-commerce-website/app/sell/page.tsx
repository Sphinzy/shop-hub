'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { categories } from '@/lib/mock-data';

export default function SellPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate image upload - in real app, upload to server
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSubmitted(true);
      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          price: '',
          category: '',
          stock: '',
          imageUrl: '',
        });
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="text-center space-y-6 bg-white rounded-lg border border-border p-12">
            <div className="flex justify-center">
              <div className="bg-green-100 p-4 rounded-full">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold">Product Listed Successfully!</h1>
            <p className="text-lg text-muted-foreground">
              Your product &quot;{formData.title}&quot; has been added to the marketplace.
            </p>
            <div className="space-y-3">
              <Button onClick={() => setIsSubmitted(false)} className="w-full">
                List Another Product
              </Button>
              <Link href="/profile" className="block">
                <Button variant="outline" className="w-full">
                  View My Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-lg border border-border p-8">
          <h1 className="text-4xl font-bold mb-2">List a Product</h1>
          <p className="text-muted-foreground mb-8">
            Fill in the details below to add your product to ShopHub marketplace
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Title */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Product Title <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                name="title"
                placeholder="Enter product title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Be specific and clear about what you&apos;re selling
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                placeholder="Describe your product in detail. Include condition, features, and any relevant details."
                value={formData.description}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-border rounded-lg resize-none h-32 font-sans"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-border rounded-lg"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <span className="text-muted-foreground mr-2">$</span>
                  <Input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  name="stock"
                  placeholder="0"
                  min="0"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Product Image <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  required
                />
                <label htmlFor="image-upload" className="cursor-pointer block">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-semibold">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                </label>
              </div>
              {formData.imageUrl && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                  <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={
                  isProcessing ||
                  !formData.title ||
                  !formData.description ||
                  !formData.price ||
                  !formData.category ||
                  !formData.stock ||
                  !formData.imageUrl
                }
                className="flex-1"
              >
                {isProcessing ? 'Listing Product...' : 'List Product'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
