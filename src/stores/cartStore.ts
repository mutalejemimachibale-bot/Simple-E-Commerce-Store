import { create } from 'zustand';
import { Product, CartItem, TAX_RATE } from '../types';
import { useAuthStore } from './authStore';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  initialize: () => void;
}

const getCartKey = (): string => {
  const user = useAuthStore.getState().user;
  if (user) {
    return `linkstyle_cart_${user.id}`;
  }
  let sessionId = sessionStorage.getItem('linkstyle_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    sessionStorage.setItem('linkstyle_session_id', sessionId);
  }
  return `linkstyle_cart_${sessionId}`;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  initialize: () => {
    const cartKey = getCartKey();
    const savedItems = localStorage.getItem(cartKey);
    if (savedItems) {
      set({ items: JSON.parse(savedItems) });
    }
  },

  addItem: (product: Product, quantity: number) => {
    const items = [...get().items];
    const existingIndex = items.findIndex(item => item.productId === product.id);

    if (existingIndex >= 0) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({ productId: product.id, quantity });
    }

    set({ items });
    localStorage.setItem(getCartKey(), JSON.stringify(items));
  },

  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    const items = get().items.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    );
    set({ items });
    localStorage.setItem(getCartKey(), JSON.stringify(items));
  },

  removeItem: (productId: string) => {
    const items = get().items.filter(item => item.productId !== productId);
    set({ items });
    localStorage.setItem(getCartKey(), JSON.stringify(items));
  },

  clearCart: () => {
    set({ items: [] });
    localStorage.setItem(getCartKey(), JSON.stringify([]));
  },

  getSubtotal: () => {
    const items = get().items;
    const products = JSON.parse(localStorage.getItem('linkstyle_products') || '[]');
    return items.reduce((sum, item) => {
      const product = products.find((p: Product) => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  },

  getTax: () => {
    return get().getSubtotal() * TAX_RATE;
  },

  getTotal: () => {
    return get().getSubtotal() + get().getTax();
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  }
}));
