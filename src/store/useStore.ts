import { create } from 'zustand';
import { Developer } from '../types';

interface Store {
  user: Developer | null;
  setUser: (user: Developer | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isAuthenticated: false,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
}));