"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-pink-50 min-h-[520px] md:min-h-[700px] flex items-center justify-center">

      {/* Marca de agua */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/LunaRosa.png"
          alt="Luna Rosa"
          width={700}
          height={700}
          priority
          className="opacity-10 object-contain w-[280px] sm:w-[420px] md:w-[700px] h-auto"
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">

        <div className="max-w-3xl mx-auto text-center">

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight">
            Luna Rosa
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mt-4 md:mt-6">
            Elegancia y comodidad para cada mujer
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 md:mt-10">

            <button
              onClick={() => router.push("/catalogo")}
              className="
                bg-pink-400
                hover:bg-pink-500
                text-white
                w-full
                sm:w-auto
                px-8
                py-4
                rounded-full
                text-base
                md:text-lg
                font-semibold
                transition
                hover:scale-105
              "
            >
              Comprar Ahora
            </button>

            <button
              onClick={() => {
                const section = document.getElementById("catalogo");

                if (section) {
                  section.scrollIntoView({
                    behavior: "smooth",
                  });
                } else {
                  router.push("/catalogo");
                }
              }}
              className="
                bg-pink-400
                hover:bg-pink-500
                text-white
                w-full
                sm:w-auto
                px-8
                py-4
                rounded-full
                text-base
                md:text-lg
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