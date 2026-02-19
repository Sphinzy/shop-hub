'use client';

import { useState } from 'react';
import { useCart } from '@/lib/context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'info' | 'shipping' | 'payment' | 'success'>('info');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber] = useState(`ORD-${Date.now()}`);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    if (currentStep === 'info') setCurrentStep('shipping');
    else if (currentStep === 'shipping') setCurrentStep('payment');
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      setCurrentStep('success');
    }, 2000);
  };

  if (items.length === 0 && currentStep !== 'success') {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <Link href="/shop">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shopping
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  if (currentStep === 'success') {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-green-100 p-4 rounded-full">
                <Check className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold">Order Confirmed!</h1>
            <p className="text-xl text-muted-foreground">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            <div className="bg-white p-6 rounded-lg border border-border space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="text-2xl font-bold">{orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold">${total.toFixed(2)}</p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Items ({items.length}):</p>
                <ul className="text-sm space-y-1">
                  {items.map((item) => (
                    <li key={item.id}>
                      {item.title} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-muted-foreground">
              A confirmation email has been sent to {formData.email}
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/profile" className="block">
                <Button className="w-full">View Order in Profile</Button>
              </Link>
              <Link href="/shop" className="block">
                <Button variant="outline" className="w-full">
                  Continue Shopping
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
        <Link href="/cart" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        {/* Progress Steps */}
        <div className="flex gap-4 mb-12">
          {['info', 'shipping', 'payment'].map((step, idx) => (
            <div key={step} className="flex items-center gap-2 flex-1">
              <div
                className={`flex-1 h-1 rounded-full transition ${
                  ['info', 'shipping', 'payment'].indexOf(currentStep) >= idx
                    ? 'bg-primary'
                    : 'bg-muted'
                }`}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-border p-8">
              {currentStep === 'info' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Contact Information</h2>
                  <div className="space-y-4">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleNextStep}
                    disabled={!formData.email || !formData.firstName || !formData.lastName}
                    className="w-full"
                  >
                    Continue to Shipping
                  </Button>
                </div>
              )}

              {currentStep === 'shipping' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Shipping Address</h2>
                  <div className="space-y-4">
                    <Input
                      type="text"
                      name="address"
                      placeholder="Street address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => setCurrentStep('info')}
                      variant="outline"
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      disabled={!formData.address || !formData.city || !formData.state || !formData.zipCode}
                      className="flex-1"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 'payment' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Payment Information</h2>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      This is a demo checkout. No real payment will be processed. Use any test card number.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <Input
                      type="text"
                      name="cardNumber"
                      placeholder="Card number (16 digits)"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="text"
                      name="cardName"
                      placeholder="Name on card"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => setCurrentStep('shipping')}
                      variant="outline"
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={
                        isProcessing ||
                        !formData.cardNumber ||
                        !formData.cardName ||
                        !formData.expiry ||
                        !formData.cvv
                      }
                      className="flex-1"
                    >
                      {isProcessing ? 'Processing...' : 'Place Order'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-20 h-fit">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
