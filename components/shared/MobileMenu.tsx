"use client";

import Link from "next/link";

interface Props {
  open: boolean;
}

export default function MobileMenu({
  open,
}: Props) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 p-10">

      <nav className="flex flex-col gap-6 text-2xl">

        <Link href="/">
          Inicio
        </Link>

        <Link href="/catalogo">
          Catálogo
        </Link>

        <Link href="/carrito">
          Carrito
        </Link>

        <Link href="/perfil">
          Cuenta
        </Link>
      </nav>
    </div>
  );
}