import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart, ArrowLeft, Check } from 'lucide-react';
import { useProductStore } from '../stores/productStore';
import { useCartStore } from '../stores/cartStore';
import { CATEGORIES } from '../types';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const products = useProductStore(state => state.products);
  const addItem = useCartStore(state => state.addItem);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="font-display font-bold text-2xl text-text-primary mb-4">
          Product Not Found
        </h1>
        <Link to="/" className="text-primary hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const otherProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Products
      </Link>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 md:h-96 object-cover rounded-xl"
            />
            <div className="absolute top-4 left-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                product.category === 'Electronics' ? 'bg-secondary text-white' :
                product.category === 'Clothing' ? 'bg-primary text-white' :
                'bg-accent text-text-primary'
              }`}>
                {product.category}
              </span>
            </div>
          </div>

          <div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="font-display font-bold text-4xl text-primary">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-text-secondary">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-text-primary font-semibold">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-text-primary hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 font-semibold min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 text-text-primary hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 ${
                isAdded
                  ? 'bg-success text-white'
                  : product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:shadow-lg'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="h-6 w-6" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="h-6 w-6" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {otherProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display font-bold text-2xl text-text-primary mb-6">
            More {product.category} Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherProducts.map(p => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-text-primary truncate">{p.name}</h3>
                  <p className="font-bold text-primary mt-2">${p.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
