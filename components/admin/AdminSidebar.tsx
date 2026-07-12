"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { logout } from "@/lib/auth/logout";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function goToStore() {
    await logout();

    router.replace("/");

    router.refresh();
  }

  const menu = [
    {
      name: "Dashboard",
      href: "/admin",
    },
    {
      name: "Productos",
      href: "/admin/productos",
    },
    {
      name: "Categorías",
      href: "/admin/categorias",
    },
    {
      name: "Órdenes",
      href: "/admin/ordenes",
    },
    {
      name: "Clientes CRM",
      href: "/admin/clientes",
    },
    {
      name: "Marketing",
      href: "/admin/marketing",
    },
    {
      name: "Cupones",
      href: "/admin/cupones",
    },
    {
      name: "Referidos",
      href: "/admin/referrals",
    },
    {
      name: "Programa Fidelización",
      href: "/admin/fidelizacion",
    },
    {
      name: "Reseñas",
      href: "/admin/reviews",
    },
    {
      name: "Reportes",
      href: "/admin/reportes",
    },
    {
      name: "Configuración",
      href: "/admin/configuracion",
    },
  ];

  return (
    <aside
      className="
        w-64
        min-h-screen
        bg-white
        border-r
        flex
        flex-col
      "
    >
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">
          Luna Rosa
        </h2>

        <p className="text-gray-500 text-sm">
          Panel Administrativo
        </p>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`
                  block
                  px-4
                  py-3
                  rounded-lg
                  font-medium
                  transition
                  ${
                    pathname === item.href
                      ? "bg-pink-500 text-white"
                      : "text-gray-700 hover:bg-pink-100"
                  }
                `}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={goToStore}
          className="
            block
            w-full
            text-center
            bg-gray-100
            hover:bg-gray-200
            rounded-lg
            py-3
            transition
          "
        >
          Ver Tienda
        </button>
      </div>
    </aside>
  );
}