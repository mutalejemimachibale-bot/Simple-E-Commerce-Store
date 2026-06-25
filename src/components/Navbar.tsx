import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Store } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';
import { useProductStore } from '../stores/productStore';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuthStore();
  const itemCount = useCartStore(state => state.getItemCount());
  const { searchQuery, setSearchQuery } = useProductStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
    setIsSearchOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg">
                <Store className="h-6 w-6 text-white" />
              </div>
              <span className="font-display font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Link&Style
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-text-primary hover:text-primary transition-colors font-semibold">
              Home
            </Link>
            <Link to="/cart" className="text-text-primary hover:text-primary transition-colors font-semibold">
              Cart
            </Link>
            {user && (
              <Link to="/account" className="text-text-primary hover:text-primary transition-colors font-semibold">
                Account
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="text-text-primary hover:text-primary transition-colors font-semibold">
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-text-secondary hover:text-primary transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              to="/cart"
              className="p-2 text-text-secondary hover:text-primary transition-colors relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="p-2 text-text-secondary hover:text-primary transition-colors">
                  <User className="h-5 w-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-semibold text-text-primary">{user.name}</p>
                    <p className="text-xs text-text-secondary">{user.email}</p>
                  </div>
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-text-primary hover:bg-background transition-colors"
                  >
                    My Account
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-background transition-colors"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-error hover:bg-background transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
              >
                Login
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-text-secondary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="py-4 border-t">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-text-primary hover:text-primary transition-colors font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/cart"
                className="text-text-primary hover:text-primary transition-colors font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart
              </Link>
              {user ? (
                <>
                  <Link
                    to="/account"
                    className="text-text-primary hover:text-primary transition-colors font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Account
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-text-primary hover:text-primary transition-colors font-semibold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-error font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-primary font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
