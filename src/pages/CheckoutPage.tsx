import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, Truck, AlertCircle } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useOrderStore } from '../stores/orderStore';
import { DELIVERY_METHODS } from '../types';
import { useAuthStore } from '../stores/authStore';

interface FormData {
  name: string;
  email: string;
  address: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getSubtotal, getTax, clearCart } = useCartStore();
  const { createOrder } = useOrderStore();
  const { user } = useAuthStore();

  const [formData, setFormData] = useState<FormData>({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    phone: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [deliveryMethod, setDeliveryMethod] = useState<'Standard' | 'Express'>('Standard');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.length < 2 || formData.name.length > 50) {
      newErrors.name = 'Name must be between 2 and 50 characters';
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.address.trim() || formData.address.length < 10 || formData.address.length > 200) {
      newErrors.address = 'Address must be between 10 and 200 characters';
    }

    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (items.length === 0) return;

    const order = createOrder(formData, deliveryMethod, items);
    clearCart();
    navigate(`/checkout/confirmation/${order.id}`);
  };

  const products = JSON.parse(localStorage.getItem('linkstyle_products') || '[]');
  const subtotal = getSubtotal();
  const tax = getTax();
  const deliveryPrice = DELIVERY_METHODS[deliveryMethod].price;
  const total = subtotal + tax + deliveryPrice;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
          <AlertCircle className="h-16 w-16 text-warning mx-auto mb-4" />
          <h1 className="font-display font-bold text-2xl text-text-primary mb-4">
            Your cart is empty
          </h1>
          <p className="text-text-secondary mb-8">
            Add some items to your cart before checking out.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display font-bold text-3xl text-text-primary mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="font-display font-bold text-xl text-text-primary mb-6">
              Shipping Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-text-primary font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all ${
                    errors.name ? 'border-error' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-error text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-text-primary font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all ${
                    errors.email ? 'border-error' : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-error text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-text-primary font-semibold mb-2">
                  Shipping Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none ${
                    errors.address ? 'border-error' : 'border-gray-300'
                  }`}
                  placeholder="123 Main Street, City, State, ZIP Code"
                />
                {errors.address && (
                  <p className="text-error text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-text-primary font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all ${
                    errors.phone ? 'border-error' : 'border-gray-300'
                  }`}
                  placeholder="+1 234 567 8900"
                />
                {errors.phone && (
                  <p className="text-error text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="font-display font-bold text-xl text-text-primary mb-6">
              Delivery Method
            </h2>

            <div className="space-y-4">
              {Object.entries(DELIVERY_METHODS).map(([key, method]) => (
                <label
                  key={key}
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    deliveryMethod === key
                      ? 'border-secondary bg-secondary bg-opacity-5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value={key}
                    checked={deliveryMethod === key}
                    onChange={() => setDeliveryMethod(key as 'Standard' | 'Express')}
                    className="w-4 h-4 text-secondary focus:ring-secondary"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-secondary" />
                      <span className="font-semibold text-text-primary">{method.name}</span>
                    </div>
                    <p className="text-text-secondary text-sm mt-1">{method.time}</p>
                  </div>
                  <span className="font-bold text-primary">${method.price.toFixed(2)}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <h2 className="font-display font-bold text-xl text-text-primary mb-6">
              Order Summary
            </h2>

            <div className="max-h-64 overflow-y-auto mb-6">
              {items.map(item => {
                const product = products.find((p: any) => p.id === item.productId);
                if (!product) return null;
                return (
                  <div key={item.productId} className="flex gap-4 py-3 border-b last:border-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-primary text-sm">{product.name}</h3>
                      <p className="text-text-secondary text-sm">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-primary">
                      ${(product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-text-secondary">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Delivery</span>
                <span>${deliveryPrice.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-text-primary">Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-accent bg-opacity-20 p-4 rounded-xl mb-6">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <p className="font-semibold text-text-primary">Cash on Delivery</p>
                  <p className="text-text-secondary text-sm">Pay when you receive your order</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
