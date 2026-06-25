import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartItemCard({ productId, quantity }: { productId: string; quantity: number }) {
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const removeItem = useCartStore(state => state.removeItem);

  const products = JSON.parse(localStorage.getItem('linkstyle_products') || '[]');
  const product = products.find((p: any) => p.id === productId);

  if (!product) return null;

  return (
    <div className="flex gap-4 bg-white rounded-xl shadow-md p-4 animate-fade-in-up">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
      </Link>

      <div className="flex-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-semibold text-lg text-text-primary hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-text-secondary text-sm mt-1">{product.category}</p>
        <p className="font-bold text-lg text-primary mt-2">${product.price.toFixed(2)}</p>
      </div>

      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeItem(productId)}
          className="p-2 text-error hover:bg-error hover:text-white rounded-lg transition-colors"
        >
          <Trash2 className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(productId, quantity - 1)}
            className="p-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-semibold">{quantity}</span>
          <button
            onClick={() => updateQuantity(productId, quantity + 1)}
            className="p-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <p className="font-bold text-primary">
          ${(product.price * quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
