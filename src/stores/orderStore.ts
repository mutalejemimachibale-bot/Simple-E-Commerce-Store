import { create } from 'zustand';
import { Order, ShippingAddress, CartItem, OrderItem, DELIVERY_METHODS } from '../types';
import { useAuthStore } from './authStore';
import { useCartStore } from './cartStore';

interface OrderState {
  orders: Order[];
  createOrder: (
    shippingAddress: ShippingAddress,
    deliveryMethod: 'Standard' | 'Express',
    cartItems: CartItem[]
  ) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrdersByUser: (userId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
  initialize: () => void;
}

const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `LS-${timestamp}-${random}`;
};

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],

  initialize: () => {
    const savedOrders = localStorage.getItem('linkstyle_orders');
    if (savedOrders) {
      set({ orders: JSON.parse(savedOrders) });
    }
  },

  createOrder: (shippingAddress, deliveryMethod, cartItems) => {
    const products = JSON.parse(localStorage.getItem('linkstyle_products') || '[]');
    const user = useAuthStore.getState().user;

    const orderItems: OrderItem[] = cartItems.map(item => {
      const product = products.find((p: any) => p.id === item.productId);
      return {
        productId: item.productId,
        productName: product ? product.name : 'Unknown Product',
        price: product ? product.price : 0,
        quantity: item.quantity
      };
    });

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryPrice = DELIVERY_METHODS[deliveryMethod].price;
    const tax = subtotal * 0.10;
    const total = subtotal + tax + deliveryPrice;

    const newOrder: Order = {
      id: generateOrderId(),
      userId: user?.id || null,
      items: orderItems,
      shippingAddress,
      deliveryMethod,
      subtotal,
      tax,
      total,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    const orders = [...get().orders, newOrder];
    localStorage.setItem('linkstyle_orders', JSON.stringify(orders));
    set({ orders });

    return newOrder;
  },

  updateOrderStatus: (orderId, status) => {
    const orders = get().orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    );
    localStorage.setItem('linkstyle_orders', JSON.stringify(orders));
    set({ orders });
  },

  getOrdersByUser: (userId) => {
    return get().orders.filter(order => order.userId === userId);
  },

  getOrderById: (orderId) => {
    return get().orders.find(order => order.id === orderId);
  }
}));
