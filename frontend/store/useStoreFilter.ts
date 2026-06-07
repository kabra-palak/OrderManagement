import { create } from "zustand";

interface StoreFilterState {
  storeId: string;
  setStoreId: (id: string) => void;
}

export const useStoreFilter = create<StoreFilterState>((set) => ({
  storeId: "",
  setStoreId: (id) => set({ storeId: id }),
}));