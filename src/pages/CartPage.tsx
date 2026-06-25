import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import CartItemCard from '../components/CartItemCard';

export default function CartPage() {
  const { items, clearCart, getSubtotal, getTax, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
          <div className="bg-gradient-to-br from-primary to-secondary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-10 w-10 text-white" />
          </div>
          <h1 className="font-display font-bold text-2xl text-text-primary mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-text-secondary mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all"
          >
            <ShoppingBag className="h-5 w-5" />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-text-primary">Shopping Cart</h1>
          <p className="text-text-secondary mt-2">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        </div>
        <button
          onClick={clearCart}
          className="flex items-center gap-2 px-4 py-2 text-error hover:bg-error hover:text-white rounded-lg transition-colors"
        >
          <Trash2 className="h-5 w-5" />
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <CartItemCard key={item.productId} productId={item.productId} quantity={item.quantity} />
          ))}

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mt-4"
          >
            <ArrowLeft className="h-5 w-5" />
            Continue Shopping
          </Link>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <h2 className="font-display font-bold text-xl text-text-primary mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-text-secondary">
                <span>Subtotal</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Tax (10%)</span>
                <span>${getTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-text-primary">Total</span>
                  <span className="text-primary">${getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full py-4 bg-primary text-white text-center rounded-xl font-bold hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
