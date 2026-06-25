import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../stores/cartStore';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const staggerClass = `stagger-${(index % 5) + 1}`;

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 opacity-0 animate-fade-in-up ${staggerClass}`}
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
            <Eye className="h-8 w-8 text-white" />
          </div>
          <div className="absolute top-2 right-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              product.category === 'Electronics' ? 'bg-secondary text-white' :
              product.category === 'Clothing' ? 'bg-primary text-white' :
              'bg-accent text-text-primary'
            }`}>
              {product.category}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-semibold text-lg text-text-primary hover:text-primary transition-colors truncate">
            {product.name}
          </h3>
        </Link>
        <p className="text-text-secondary text-sm mt-1 line-clamp-2 h-10">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="font-display font-bold text-xl text-primary">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              isAdded
                ? 'bg-success text-white'
                : 'bg-primary text-white hover:bg-opacity-90 hover:shadow-md'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            {isAdded ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
