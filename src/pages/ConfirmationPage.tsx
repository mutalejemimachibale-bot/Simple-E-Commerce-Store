import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react';
import { useOrderStore } from '../stores/orderStore';

export default function ConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById } = useOrderStore();

  const order = getOrderById(orderId || '');

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
          <h1 className="font-display font-bold text-2xl text-text-primary mb-4">
            Order Not Found
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all"
          >
            <Home className="h-5 w-5" />
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-success bg-opacity-20 rounded-full mb-6">
          <CheckCircle className="h-12 w-12 text-success" />
        </div>
        <h1 className="font-display font-bold text-4xl text-text-primary mb-4">
          Order Confirmed!
        </h1>
        <p className="text-text-secondary text-lg">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-opacity-80 text-sm">Order ID</p>
              <p className="text-white font-bold text-xl">{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-white text-opacity-80 text-sm">Order Date</p>
              <p className="text-white font-semibold">{formatDate(order.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className={`px-4 py-2 rounded-full font-semibold ${
              order.status === 'Pending' ? 'bg-warning text-text-primary' :
              order.status === 'Shipped' ? 'bg-secondary text-white' :
              'bg-success text-white'
            }`}>
              {order.status}
            </div>
            <span className="text-text-secondary">Cash on Delivery</span>
          </div>

          <div className="mb-6">
            <h2 className="font-display font-semibold text-lg text-text-primary mb-4">
              Items Ordered
            </h2>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
                  <div>
                    <p className="font-semibold text-text-primary">{item.productName}</p>
                    <p className="text-text-secondary text-sm">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                  </div>
                  <p className="font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="font-display font-semibold text-lg text-text-primary mb-3">
                Shipping Address
              </h2>
              <div className="text-text-secondary">
                <p className="font-semibold text-text-primary">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.email}</p>
                <p>{order.shippingAddress.phone}</p>
              </div>
            </div>

            <div>
              <h2 className="font-display font-semibold text-lg text-text-primary mb-3">
                Order Summary
              </h2>
              <div className="space-y-2 text-text-secondary">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>${order.deliveryMethod === 'Standard' ? '5.99' : '15.99'}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span className="text-text-primary">Total</span>
                  <span className="text-primary">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-background p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-bold hover:bg-opacity-90 transition-all"
            >
              <ShoppingBag className="h-5 w-5" />
              Continue Shopping
            </Link>
            <Link
              to="/account/orders"
              className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all"
            >
              <Package className="h-5 w-5" />
              View All Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
