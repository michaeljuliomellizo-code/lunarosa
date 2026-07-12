"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";



export default function Hero() {

  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-pink-50 min-h-[700px] flex items-center">

      {/* Marca de agua */}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

        <Image
          src="/LunaRosa.png"
          alt="Luna Rosa"
          width={700}
          height={700}
          priority
          className="opacity-10 object-contain"
          style={{
            width: "700px",
            height: "auto",
          }}
        />
      </div>

      {/* Contenido */}

      <div className="relative z-10 max-w-7xl mx-auto px-4">

        <div className="max-w-2xl">

          <h1 className="text-6xl md:text-7xl font-bold text-black leading-tight">

            Luna Rosa

          </h1>

          <p className="text-2xl text-gray-600 mt-6">

            Elegancia y comodidad para cada mujer

          </p>
          

          <div className="flex gap-5 mt-10">

            <button
              onClick={() => router.push("/catalogo")}
              className="
                bg-pink-400
                hover:bg-pink-500
                text-white
                px-10
                py-5
                rounded-full
                text-lg
                font-semibold
                transition
                hover:scale-105
              "
            >
              Comprar Ahora
            </button>

            <button
              onClick={() => {
                const section =
                  document.getElementById("catalogo");

                if (section) {
                  section.scrollIntoView({
                    behavior: "smooth",
                  });
                } else {
                  router.push("/catalogo");
                }
              }}
              className="
                border
                border-pink-400
                text-pink-500
                hover:bg-pink-100
                px-10
                py-5
                rounded-full
                text-lg
                font-semibold
                transition
                hover:scale-105
              "
            >
              Ver Catálogo
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}