import Link from "next/link";

export default function AdminSidebar() {

  return (
    <aside className="w-72 min-h-screen bg-black text-white p-8">

      <h2 className="text-3xl font-bold mb-10">
        Luna Rosa
      </h2>

      <nav className="flex flex-col gap-5">

        <Link href="/admin">
          Dashboard
        </Link>

        <Link href="/admin/productos">
          Productos
        </Link>

        <Link href="/admin/categorias">
          Categorías
        </Link>

        <Link href="/admin/ordenes">
          Órdenes
        </Link>

        <Link href="/admin/usuarios">
          Usuarios
        </Link>

        <Link href="/admin/inventario">
          Inventario
        </Link>

        <Link href="/admin/cupones">
          Cupones
        </Link>

        <Link href="/admin/configuracion">
          Configuración
        </Link>
      </nav>
    </aside>
  );
}