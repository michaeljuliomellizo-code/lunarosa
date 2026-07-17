import Link from "next/link";


export default function Footer() {
 

  return (
    <footer className="bg-black text-white mt-20">

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        <div>

          <h2 className="text-3xl font-bold">
            Luna Rosa
          </h2>

          <p className="text-gray-500 mt-4">
            Moda femenina elegante y cómoda.
          </p>
        </div>

        <div>

          <h3 className="font-bold mb-4">
            Navegación
          </h3>

          <div className="flex flex-col gap-3">

            <Link href="/">
              Inicio
            </Link>

            <Link href="/catalogo">
              Catálogo
            </Link>
          </div>
        </div>

        <div>

          <h3 className="font-bold mb-4">
            Contacto
          </h3>

          <p>3123851338</p>

          <p className="mt-2">
            lunarosa.mujer10@gmail.com
          </p>
        </div>

        <div>

          <h3 className="font-bold mb-4">
            Soporte
          </h3>

          <p>
            Atención por WhatsApp
          </p>
        </div>
      </div>
    </footer>
  );
}