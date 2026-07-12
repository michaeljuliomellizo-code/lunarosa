import Link from "next/link";

export default function AccountSidebar() {

  return (
    <aside className="bg-white border rounded-3xl p-6">

      <nav className="flex flex-col gap-4">

        <Link href="/perfil">
          Mi Perfil
        </Link>

        <Link href="/perfil/pedidos">
          Pedidos
        </Link>

        <Link href="/perfil/favoritos">
          Favoritos
        </Link>

        <Link href="/perfil/direcciones">
          Direcciones
        </Link>

        <Link href="/perfil/password">
          Contraseña
        </Link>
      </nav>
    </aside>
  );
}