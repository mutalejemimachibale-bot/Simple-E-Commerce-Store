import { Link } from 'react-router-dom';
import { Package, ShoppingBag, Users, DollarSign, ArrowRight } from 'lucide-react';
import { useProductStore } from '../../stores/productStore';
import { useOrderStore } from '../../stores/orderStore';
import { useAuthStore } from '../../stores/authStore';

export default function AdminDashboard() {
  const products = useProductStore(state => state.products);
  const orders = useOrderStore(state => state.orders);
  const { user } = useAuthStore();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'from-primary to-secondary',
      link: '/admin/products'
    },
    {
      label: 'Total Orders',
      value: orders.length,
      icon: ShoppingBag,
      color: 'from-secondary to-accent',
      link: '/admin/orders'
    },
    {
      label: 'Pending Orders',
      value: pendingOrders,
      icon: Users,
      color: 'from-warning to-primary',
      link: '/admin/orders'
    },
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'from-success to-secondary',
      link: '/admin/orders'
    }
  ];

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-text-primary">
          Admin Dashboard
        </h1>
        <p className="text-text-secondary mt-2">
          Welcome back, {user?.name}. Here's what's happening with your store.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <ArrowRight className="h-5 w-5 text-text-secondary" />
            </div>
            <p className="text-text-secondary text-sm">{stat.label}</p>
            <p className="font-display font-bold text-2xl text-text-primary">{stat.value}</p>
          </Link>
        ))}
      </div>

      {outOfStock > 0 && (
        <div className="bg-warning bg-opacity-20 border border-warning rounded-xl p-4 mb-8">
          <p className="text-warning font-semibold">
            {outOfStock} {outOfStock === 1 ? 'product is' : 'products are'} out of stock
          </p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="font-display font-bold text-xl text-text-primary">Recent Orders</h2>
          <Link to="/admin/orders" className="text-primary font-semibold hover:underline">
            View All
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingBag className="h-12 w-12 text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-background transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-primary">{order.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                      {order.items.length} items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-primary">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Pending' ? 'bg-warning text-text-primary' :
                        order.status === 'Shipped' ? 'bg-secondary text-white' :
                        'bg-success text-white'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
