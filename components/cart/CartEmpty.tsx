import Link from "next/link";

export default function CartEmpty() {

  return (
    <div className="bg-white border rounded-3xl p-16 text-center">

      <h2 className="text-4xl font-bold">
        Tu carrito está vacío
      </h2>

      <p className="text-gray-700 mt-4">
        Agrega productos para continuar.
      </p>

      <Link
        href="/catalogo"
        className="inline-block mt-8 bg-pink-400 text-white px-8 py-4 rounded-full"
      >
        Ir al catálogo
      </Link>
    </div>
  );
}