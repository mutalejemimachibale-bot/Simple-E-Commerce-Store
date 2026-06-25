import { create } from 'zustand';
import { Product, CATEGORIES } from '../types';
import { initialProducts } from '../data/products';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  categories: readonly string[];
  searchQuery: string;
  selectedCategory: string;
  priceRange: [number, number];
  currentPage: number;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setPage: (page: number) => void;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  initialize: () => void;
  escapeHtml: (str: string) => string;
}

const generateId = (): string => {
  return 'prod_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const escapeHtml = (str: string): string => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  categories: CATEGORIES,
  searchQuery: '',
  selectedCategory: '',
  priceRange: [0, 1000],
  currentPage: 1,

  initialize: () => {
    let savedProducts = localStorage.getItem('linkstyle_products');
    let products: Product[];
    
    if (savedProducts) {
      products = JSON.parse(savedProducts);
      const needsUpdate = products.some(p => p.image.includes('picsum.photos'));
      if (needsUpdate) {
        products = products.map(saved => {
          const initial = initialProducts.find(i => i.id === saved.id);
          return initial ? { ...saved, image: initial.image } : saved;
        });
        localStorage.setItem('linkstyle_products', JSON.stringify(products));
      }
      
      const existingIds = new Set(products.map(p => p.id));
      const newProducts = initialProducts.filter(p => !existingIds.has(p.id));
      if (newProducts.length > 0) {
        products = [...products, ...newProducts];
        localStorage.setItem('linkstyle_products', JSON.stringify(products));
      }
    } else {
      products = initialProducts;
      localStorage.setItem('linkstyle_products', JSON.stringify(products));
    }
    
    set({ products });
    get().applyFilters();
  },

  escapeHtml,

  applyFilters: () => {
    const { products, searchQuery, selectedCategory, priceRange } = get();
    const sanitizedQuery = escapeHtml(searchQuery.toLowerCase().trim());

    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(sanitizedQuery);
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    set({ filteredProducts: filtered, currentPage: 1 });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query.slice(0, 100) });
    get().applyFilters();
  },

  setCategory: (category: string) => {
    set({ selectedCategory: category });
    get().applyFilters();
  },

  setPriceRange: (range: [number, number]) => {
    const [min, max] = range;
    if (min >= 0 && max <= 10000 && min <= max) {
      set({ priceRange: [min, max] });
      get().applyFilters();
    }
  },

  setPage: (page: number) => {
    set({ currentPage: page });
  },

  addProduct: (productData) => {
    const newProduct: Product = {
      ...productData,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    const products = [...get().products, newProduct];
    localStorage.setItem('linkstyle_products', JSON.stringify(products));
    set({ products });
    get().applyFilters();
  },

  updateProduct: (id: string, productData: Partial<Product>) => {
    const products = get().products.map(p =>
      p.id === id ? { ...p, ...productData } : p
    );
    localStorage.setItem('linkstyle_products', JSON.stringify(products));
    set({ products });
    get().applyFilters();
  },

  deleteProduct: (id: string) => {
    const products = get().products.filter(p => p.id !== id);
    localStorage.setItem('linkstyle_products', JSON.stringify(products));
    set({ products });
    get().applyFilters();
  }
}));
