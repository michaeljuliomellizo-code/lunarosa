"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import Logo from "./Logo";

import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const items = useCartStore((state) => state.items);

  const cartCount = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">

        <Logo />

        {/* Desktop */}

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
            className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full transition"
          >
            Admin
          </Link>

        </nav>

        {/* Mobile Button */}

        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X size={30} />
          ) : (
            <Menu size={30} />
          )}
        </button>

      </div>

      {/* Mobile Menu */}

      {open && (

        <div className="lg:hidden border-t bg-white">

          <nav className="flex flex-col p-4 gap-4 text-lg">

            <Link
              href="/"
              onClick={() => setOpen(false)}
            >
              Inicio
            </Link>

            <Link
              href="/catalogo"
              onClick={() => setOpen(false)}
            >
              Catálogo
            </Link>

            <Link
              href="/favoritos"
              onClick={() => setOpen(false)}
            >
              Favoritos
            </Link>

            <Link
              href="/carrito"
              onClick={() => setOpen(false)}
              className="flex justify-between"
            >
              <span>Carrito</span>

              {cartCount > 0 && (
                <span className="bg-pink-500 text-white rounded-full px-2 text-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="bg-pink-500 text-white rounded-xl text-center py-3"
            >
              Admin
            </Link>

          </nav>

        </div>

      )}

    </header>
  );
}