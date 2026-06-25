import { Sparkles, ShoppingBag, BookOpen, Shirt } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';
import { useProductStore } from '../stores/productStore';
import { PRODUCTS_PER_PAGE } from '../types';

export default function HomePage() {
  const { filteredProducts, currentPage, searchQuery } = useProductStore();

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full opacity-10 animate-pulse-slow" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent rounded-full opacity-20 animate-pulse-slow" />
          <div className="absolute top-40 right-40 w-20 h-20 bg-secondary rounded-full opacity-15 animate-pulse-slow" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">New Season Collection</span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
                Shop Smart,
                <br />
                <span className="text-accent">Live Stylish</span>
              </h1>
              <p className="text-lg md:text-xl text-white text-opacity-90 mb-8 max-w-lg">
                Discover our curated collection of premium Electronics, Fashion, and Books. Quality products at unbeatable prices.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Shop Now
                </Link>
                <Link
                  to="/cart"
                  className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-primary transition-all"
                >
                  View Cart
                </Link>
              </div>
            </div>

            <div className="hidden md:grid grid-cols-3 gap-4">
              <div className="space-y-4">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 animate-fade-in-up stagger-1">
                  <Shirt className="h-8 w-8 text-white mb-2" />
                  <p className="text-white font-semibold">Clothing</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 animate-fade-in-up stagger-2">
                  <BookOpen className="h-8 w-8 text-white mb-2" />
                  <p className="text-white font-semibold">Books</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 animate-fade-in-up stagger-3">
                  <ShoppingBag className="h-8 w-8 text-white mb-2" />
                  <p className="text-white font-semibold">Electronics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar />

          <div className="flex-1">
            <div className="mb-6">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
              </h2>
              <p className="text-text-secondary mt-2">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>

            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
                <Pagination />
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-md">
                <ShoppingBag className="h-16 w-16 text-text-secondary mx-auto mb-4" />
                <h3 className="font-display font-semibold text-xl text-text-primary mb-2">
                  No products found
                </h3>
                <p className="text-text-secondary">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
