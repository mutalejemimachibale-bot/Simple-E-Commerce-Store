export interface Product {
  id: string;
  name: string;
  category: 'Electronics' | 'Clothing' | 'Books';
  price: number;
  description: string;
  image: string;
  stock: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'Customer' | 'Admin';
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ShippingAddress {
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string | null;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  deliveryMethod: 'Standard' | 'Express';
  subtotal: number;
  tax: number;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  createdAt: string;
}

export const CATEGORIES = ['Electronics', 'Clothing', 'Books'] as const;

export const PRODUCTS_PER_PAGE = 10;

export const DELIVERY_METHODS = {
  Standard: { name: 'Standard Delivery', time: '5-7 Business Days', price: 5.99 },
  Express: { name: 'Express Delivery', time: '1-2 Business Days', price: 15.99 },
} as const;

export const TAX_RATE = 0.10;
