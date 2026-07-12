"use client";

import { create } from "zustand";

interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
}

interface Store {
  products: Product[];

  addProduct: (
    product: Product
  ) => void;
}

export const useRecentlyViewedStore =
  create<Store>((set) => ({
    products: [],

    addProduct: (
      product
    ) =>
      set((state) => ({
        products: [
          product,
          ...state.products.filter(
            (p) =>
              p.id !==
              product.id
          ),
        ].slice(0, 8),
      })),
  }));