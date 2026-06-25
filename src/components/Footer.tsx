import { Link } from 'react-router-dom';
import { Store, Heart, Twitter, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-text-primary to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg">
                <Store className="h-6 w-6 text-white" />
              </div>
              <span className="font-display font-bold text-2xl">Link&Style</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your destination for Electronics, Clothing, and Books. Shop smart, live stylish with our curated collection of premium products.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-primary transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/account" className="text-gray-300 hover:text-primary transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/account/orders" className="text-gray-300 hover:text-primary transition-colors">
                  Order History
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300">Electronics</span>
              </li>
              <li>
                <span className="text-gray-300">Clothing</span>
              </li>
              <li>
                <span className="text-gray-300">Books</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; 2024 Link&Style. All rights reserved.
          </p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Made with</span>
            <Heart className="h-4 w-4 text-primary animate-pulse-slow" />
            <span className="text-gray-400 text-sm">using React & TailwindCSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
