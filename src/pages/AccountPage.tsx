import { Link } from 'react-router-dom';
import { User, Package, LogOut, Settings } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

export default function AccountPage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display font-bold text-3xl text-text-primary mb-8">My Account</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-white" />
              </div>
              <h2 className="font-display font-bold text-xl text-text-primary">{user.name}</h2>
              <p className="text-text-secondary">{user.email}</p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                user.role === 'Admin' ? 'bg-primary text-white' : 'bg-secondary text-white'
              }`}>
                {user.role}
              </span>
            </div>

            <div className="space-y-2">
              <Link
                to="/account"
                className="flex items-center gap-3 px-4 py-3 bg-primary bg-opacity-10 text-primary rounded-xl transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="font-semibold">Profile</span>
              </Link>
              <Link
                to="/account/orders"
                className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:bg-background rounded-xl transition-colors"
              >
                <Package className="h-5 w-5" />
                <span className="font-semibold">My Orders</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error hover:text-white rounded-xl transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-semibold">Logout</span>
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="font-display font-bold text-xl text-text-primary mb-6 flex items-center gap-2">
              <Settings className="h-6 w-6" />
              Account Details
            </h2>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-text-secondary text-sm mb-2">Full Name</label>
                  <p className="text-text-primary font-semibold">{user.name}</p>
                </div>
                <div>
                  <label className="block text-text-secondary text-sm mb-2">Email Address</label>
                  <p className="text-text-primary font-semibold">{user.email}</p>
                </div>
                <div>
                  <label className="block text-text-secondary text-sm mb-2">Account Type</label>
                  <p className="text-text-primary font-semibold">{user.role}</p>
                </div>
                <div>
                  <label className="block text-text-secondary text-sm mb-2">Member Since</label>
                  <p className="text-text-primary font-semibold">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <h3 className="font-display font-semibold text-lg text-text-primary mb-4">Quick Actions</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  to="/account/orders"
                  className="flex items-center gap-3 p-4 bg-background rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <Package className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-semibold text-text-primary">View Orders</p>
                    <p className="text-text-secondary text-sm">Track your purchases</p>
                  </div>
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-3 p-4 bg-background rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <Package className="h-8 w-8 text-secondary" />
                  <div>
                    <p className="font-semibold text-text-primary">Continue Shopping</p>
                    <p className="text-text-secondary text-sm">Browse our catalog</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
