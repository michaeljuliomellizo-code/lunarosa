"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen border-r bg-white p-6">

      <h2 className="text-2xl font-bold text-pink-400 mb-10">
        Luna Rosa
      </h2>

      <nav className="flex flex-col gap-4">

        <Link
          href="/admin"
          className="hover:text-pink-400"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/productos"
          className="hover:text-pink-400"
        >
          Productos
        </Link>

        <Link
          href="/admin/categorias"
          className="hover:text-pink-400"
        >
          Categorías
        </Link>

        <Link
          href="/admin/orders"
          className="hover:text-pink-400"
        >
          Órdenes
        </Link>

        <Link
          href="/admin/users"
          className="hover:text-pink-400"
        >
          Usuarios
        </Link>

        <Link
          href="/admin/analytics"
          className="hover:text-pink-400"
        >
          Analytics
        </Link>
      </nav>
    </aside>
  );
}