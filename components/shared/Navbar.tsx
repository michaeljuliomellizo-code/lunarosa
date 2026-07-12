"use client";

import Link from "next/link";

import Logo from "./Logo";

import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const items = useCartStore(
    (state) => state.items
  );

  const cartCount =
    items.reduce(
      (acc, item) =>
        acc + item.quantity,
      0
    );

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        <Logo />

        <nav className="hidden lg:flex items-center gap-8 font-medium">
          <Link
            href="/"
            className="hover:text-pink-500 transition"
          >
            Inicio
          </Link>

          <Link
            href="/catalogo"
            className="hover:text-pink-500 transition"
          >
            Catálogo
          </Link>

          <Link
            href="/favoritos"
            className="hover:text-pink-500 transition"
          >
            Favoritos
          </Link>

          <Link
            href="/carrito"
            className="relative hover:text-pink-500 transition"
          >
            Carrito

            {cartCount > 0 && (
              <span className="absolute -top-3 -right-5 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            href="/admin"
            className="bg-pink-400 hover:bg-pink-500 text-white px-5 py-2 rounded-full transition"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}