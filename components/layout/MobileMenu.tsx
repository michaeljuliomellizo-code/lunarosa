"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function MobileMenu() {

  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">

      <button
        onClick={() => setOpen(true)}
      >
        <Menu size={26} />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-50">

          <div className="w-72 h-full bg-white p-6">

            <div className="flex justify-between items-center mb-10">

              <h2 className="text-2xl font-bold text-pink-400">
                Menú
              </h2>

              <button
                onClick={() => setOpen(false)}
              >
                <X />
              </button>
            </div>

            <nav className="flex flex-col gap-5">

              <Link href="/">
                Inicio
              </Link>

              <Link href="/catalogo">
                Catálogo
              </Link>

              <Link href="/carrito">
                Carrito
              </Link>

            </nav>
          </div>
        </div>
      )}
    </div>
  );
}