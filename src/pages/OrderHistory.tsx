import { Link } from 'react-router-dom';
import { Package, ArrowLeft, Clock, CheckCircle, Truck } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useOrderStore } from '../stores/orderStore';

export default function OrderHistory() {
  const { user } = useAuthStore();
  const { getOrdersByUser } = useOrderStore();

  const orders = user ? getOrdersByUser(user.id) : [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-5 w-5" />;
      case 'Shipped':
        return <Truck className="h-5 w-5" />;
      case 'Delivered':
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-warning text-text-primary';
      case 'Shipped':
        return 'bg-secondary text-white';
      case 'Delivered':
        return 'bg-success text-white';
      default:
        return 'bg-gray-300 text-text-primary';
    }
  };

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            to="/account"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Account
          </Link>
          <h1 className="font-display font-bold text-3xl text-text-primary">Order History</h1>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md mx-auto">
          <div className="bg-gradient-to-br from-primary to-secondary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="h-10 w-10 text-white" />
          </div>
          <h2 className="font-display font-bold text-xl text-text-primary mb-4">
            No Orders Yet
          </h2>
          <p className="text-text-secondary mb-8">
            You haven't placed any orders yet. Start shopping to see your order history here.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in-up">
              <div className="bg-background p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <p className="font-bold text-text-primary">{order.id}</p>
                    <p className="text-text-secondary text-sm">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className="font-bold text-xl text-primary">${order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-text-primary mb-3">Items</h3>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-text-secondary">
                            {item.productName} × {item.quantity}
                          </span>
                          <span className="text-text-primary font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-text-primary mb-3">Shipping Address</h3>
                    <p className="text-text-secondary text-sm">
                      {order.shippingAddress.name}<br />
                      {order.shippingAddress.address}<br />
                      {order.shippingAddress.email}
                    </p>

                    <h3 className="font-semibold text-text-primary mt-4 mb-3">Delivery Method</h3>
                    <p className="text-text-secondary text-sm">
                      {order.deliveryMethod === 'Standard' ? 'Standard Delivery' : 'Express Delivery'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
