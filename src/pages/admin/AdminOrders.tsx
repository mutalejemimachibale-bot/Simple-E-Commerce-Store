import { Package, Clock, Truck, CheckCircle } from 'lucide-react';
import { useOrderStore } from '../../stores/orderStore';

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useOrderStore();

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case 'Pending':
        return 'Shipped';
      case 'Shipped':
        return 'Delivered';
      default:
        return null;
    }
  };

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

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    if (window.confirm(`Update order status to "${newStatus}"?`)) {
      updateOrderStatus(orderId, newStatus as any);
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
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-text-primary">Orders</h1>
        <p className="text-text-secondary mt-2">{orders.length} total orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md mx-auto">
          <div className="bg-gradient-to-br from-primary to-secondary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="h-10 w-10 text-white" />
          </div>
          <h2 className="font-display font-bold text-xl text-text-primary mb-4">
            No Orders Yet
          </h2>
          <p className="text-text-secondary">
            Orders will appear here once customers start placing them.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedOrders.map(order => {
            const nextStatus = getNextStatus(order.status);
            return (
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
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                      <h3 className="font-semibold text-text-primary mb-3">Customer</h3>
                      <p className="text-text-secondary text-sm">
                        {order.shippingAddress.name}<br />
                        {order.shippingAddress.email}<br />
                        {order.shippingAddress.phone}
                      </p>

                      <h3 className="font-semibold text-text-primary mt-4 mb-2">Shipping Address</h3>
                      <p className="text-text-secondary text-sm">
                        {order.shippingAddress.address}
                      </p>

                      <h3 className="font-semibold text-text-primary mt-4 mb-2">Delivery Method</h3>
                      <p className="text-text-secondary text-sm">
                        {order.deliveryMethod === 'Standard' ? 'Standard Delivery' : 'Express Delivery'}
                      </p>
                    </div>
                  </div>

                  {nextStatus && (
                    <div className="border-t pt-4 flex justify-end">
                      <button
                        onClick={() => handleUpdateStatus(order.id, nextStatus)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 ${
                          nextStatus === 'Shipped'
                            ? 'bg-secondary text-white hover:bg-opacity-90'
                            : 'bg-success text-white hover:bg-opacity-90'
                        }`}
                      >
                        <Truck className="h-5 w-5" />
                        Mark as {nextStatus}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
