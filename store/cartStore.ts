"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  variant_id?: string;
  name: string;
  color?: string;
  size?: string;
  sku?: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartStore {
  items: CartItem[];

  couponCode: string | null;
  discountPercent: number;

  addItem: (item: CartItem) => void;

  removeItem: (
    id: string,
    variantId?: string
  ) => void;

  increaseQuantity: (
    id: string,
    variantId?: string
  ) => void;

  decreaseQuantity: (
    id: string,
    variantId?: string
  ) => void;

  clearCart: () => void;

  applyCoupon: (
    code: string,
    discount: number
  ) => void;

  removeCoupon: () => void;

  getSubtotal: () => number;

  getDiscountAmount: () => number;

  getTotal: () => number;

  getItemsCount: () => number;

  getUniqueItemsCount: () => number;
}

export const useCartStore =
  create<CartStore>()(
    persist(
      (set, get) => ({

        items: [],

        couponCode: null,

        discountPercent: 0,

        addItem: (item) =>
          set((state) => {

            const existing =
              state.items.find(
                (i) =>
                  i.id === item.id &&
                  i.variant_id ===
                    item.variant_id
              );

            if (existing) {
              return {
                items:
                  state.items.map(
                    (i) =>
                      i.id === item.id &&
                      i.variant_id ===
                        item.variant_id
                        ? {
                            ...i,
                            quantity:
                              i.quantity + 1,
                          }
                        : i
                  ),
              };
            }

            return {
              items: [
                ...state.items,
                item,
              ],
            };

          }),

        removeItem: (
          id,
          variantId
        ) =>
          set((state) => ({
            items:
              state.items.filter(
                (i) =>
                  !(
                    i.id === id &&
                    i.variant_id ===
                      variantId
                  )
              ),
          })),

        increaseQuantity: (
          id,
          variantId
        ) =>
          set((state) => ({
            items:
              state.items.map(
                (i) =>
                  i.id === id &&
                  i.variant_id ===
                    variantId
                    ? {
                        ...i,
                        quantity:
                          i.quantity + 1,
                      }
                    : i
              ),
          })),
                  decreaseQuantity: (
          id,
          variantId
        ) =>
          set((state) => ({
            items:
              state.items
                .map((i) =>
                  i.id === id &&
                  i.variant_id ===
                    variantId
                    ? {
                        ...i,
                        quantity:
                          i.quantity - 1,
                      }
                    : i
                )
                .filter(
                  (i) =>
                    i.quantity > 0
                ),
          })),

        clearCart: () =>
          set({
            items: [],
            couponCode: null,
            discountPercent: 0,
          }),

        applyCoupon: (
          code,
          discount
        ) =>
          set({
            couponCode: code,
            discountPercent:
              discount,
          }),

        removeCoupon: () =>
          set({
            couponCode: null,
            discountPercent: 0,
          }),

        getSubtotal: () => {
          return get().items.reduce(
            (
              total,
              item
            ) =>
              total +
              item.price *
                item.quantity,
            0
          );
        },

        getDiscountAmount: () => {
          const subtotal =
            get().getSubtotal();

          return (
            subtotal *
            (get()
              .discountPercent /
              100)
          );
        },

        getTotal: () => {
          return (
            get().getSubtotal() -
            get().getDiscountAmount()
          );
        },

        getItemsCount: () => {
          return get().items.reduce(
            (total, item) => total + item.quantity,
            0
          );
        },

        getUniqueItemsCount: () => {
          return get().items.length;
        },

      }),
      {
        name:
          "luna-rosa-cart",
      }
    )
  );