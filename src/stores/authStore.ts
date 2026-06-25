import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  initialize: () => void;
}

const hashPassword = (password: string): string => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'hash_' + Math.abs(hash).toString(16);
};

const generateId = (): string => {
  return 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAdmin: false,

  initialize: () => {
    const currentUserId = localStorage.getItem('linkstyle_current_user');
    if (currentUserId) {
      const users = JSON.parse(localStorage.getItem('linkstyle_users') || '[]');
      const user = users.find((u: User) => u.id === currentUserId);
      if (user) {
        set({ user, isAdmin: user.role === 'Admin' });
      }
    }

    const users = JSON.parse(localStorage.getItem('linkstyle_users') || '[]');
    if (users.length === 0) {
      const adminUser: User = {
        id: generateId(),
        name: 'Admin',
        email: 'admin@linkstyle.com',
        password: hashPassword('admin123'),
        role: 'Admin',
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('linkstyle_users', JSON.stringify([adminUser]));
    }
  },

  login: (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('linkstyle_users') || '[]');
    const user = users.find((u: User) => u.email === email && u.password === hashPassword(password));
    if (user) {
      localStorage.setItem('linkstyle_current_user', user.id);
      set({ user, isAdmin: user.role === 'Admin' });
      return true;
    }
    return false;
  },

  register: (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('linkstyle_users') || '[]');
    if (users.some((u: User) => u.email === email)) {
      return false;
    }
    const newUser: User = {
      id: generateId(),
      name,
      email,
      password: hashPassword(password),
      role: 'Customer',
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('linkstyle_users', JSON.stringify(users));
    localStorage.setItem('linkstyle_current_user', newUser.id);
    set({ user: newUser, isAdmin: false });
    return true;
  },

  logout: () => {
    localStorage.removeItem('linkstyle_current_user');
    set({ user: null, isAdmin: false });
  }
}));
