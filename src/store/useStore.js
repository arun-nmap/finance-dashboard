// src/store/useStore.js

import { create } from "zustand";

export const useStore = create((set) => ({
  transactions: [],
  role: "viewer",
  darkMode: false,

  activeTab: "dashboard",

  setTransactions: (data) => set({ transactions: data }),
  setRole: (role) => set({ role }),
  toggleDark: () => set((s) => ({ darkMode: !s.darkMode })),

  setActiveTab: (tab) => set({ activeTab: tab }),
}));