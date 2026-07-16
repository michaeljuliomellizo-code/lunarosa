import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-pink-100 mt-20">

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-12
          sm:py-16
        "
      >

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-10
          ">

          {/* BRAND */}
          <div>

            <h2
              className="
                text-2xl
                sm:text-3xl
                font-bold
                text-pink-500
              "
            >
              Luna Rosa
            </h2>

            <p className="mt-4 text-gray-700">
              Moda femenina elegante y cómoda.
            </p>
          </div>

          {/* CATEGORIAS */}
          <div>

            <h3 className="font-bold text-lg mb-4">
              Categorías
            </h3>

            <ul className="space-y-2 text-gray-700">

              <li>Bodys</li>
              
            </ul>
          </div>

          {/* AYUDA */}
          <div>

            <h3 className="font-bold text-lg mb-4">
              Ayuda
            </h3>

            <ul className="space-y-2 text-gray-700">

              <li>
                <Link href="/contacto">
                  Contacto
                </Link>
              </li>

              <li>
                <Link href="/envios">
                  Envíos
                </Link>
              </li>

              <li>
                <Link href="/politicas">
                  Políticas
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACTO */}
          <div>

            <h3 className="font-bold text-lg mb-4">
              Contacto
            </h3>

            <div className="space-y-3 text-gray-700">

              <p>
                WhatsApp: 3123851338
              </p>

              <p className="break-all">
                lunarosa.mujer10@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 text-center text-gray-600">
          © 2026 Luna Rosa - Todos los derechos reservados
        </div>
      </div>
    </footer>
  );
}