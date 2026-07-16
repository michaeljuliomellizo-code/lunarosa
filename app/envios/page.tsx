import Image from "next/image";
import Link from "next/link";
import {
  Truck,
  MapPin,
  Package,
  ShieldCheck,
  Clock3,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

export default function EnviosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-100">

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">

        <div className="
          grid
          lg:grid-cols-2
          gap-10
          lg:gap-16
          items-center
          ">

          <div>

            <div className="inline-flex items-center gap-3 bg-pink-100 px-6 py-3 rounded-full">

              <Truck
                className="text-pink-600"
                size={22}
              />

              <span className="font-semibold text-pink-700">
                Información de Envíos
              </span>

            </div>

            <h1 className="
              mt-6
              text-4xl
              sm:text-5xl
              lg:text-6xl
              font-black
              leading-tight
              ">

              Enviamos a
              <span className="text-pink-600">
                {" "}
                todo Colombia
              </span>

            </h1>

            <p className="mt-8 text-lg text-gray-700 leading-8">

              En Luna Rosa queremos que recibas tus prendas favoritas
              de forma rápida, segura y confiable.

              Trabajamos con transportadoras nacionales para llegar a
              cualquier ciudad del país.

            </p>

            <div className="mt-12 space-y-5">

              <div className="flex items-center gap-4">

                <BadgeCheck
                  className="text-pink-500"
                  size={28}
                />

                <span className="text-lg">
                  Cobertura Nacional.
                </span>

              </div>

              <div className="flex items-center gap-4">

                <Clock3
                  className="text-pink-500"
                  size={28}
                />

                <span className="text-lg">
                  Despachos rápidos y seguros.
                </span>

              </div>

            </div>

          </div>

          <div className="relative">

            <div className="absolute -inset-6 rounded-[40px] bg-pink-200 blur-3xl opacity-30"></div>

            <div className="relative overflow-hidden rounded-[40px] shadow-2xl">

              <Image
                src="/Envio.png"
                alt="Envíos Luna Rosa"
                width={700}
                height={700}
                priority
                className="w-full h-auto object-cover hover:scale-105 transition duration-700"
              />

            </div>

          </div>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
          lg:gap-8
          ">

          <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-6 md:p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

            <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center">

              <MapPin
                className="text-pink-600"
                size={32}
              />

            </div>

            <h2 className="text-2xl font-bold mt-6">
              Bogotá
            </h2>

            <p className="mt-5 text-gray-700 leading-7">

              Todos los pedidos con destino en Bogotá tienen una tarifa
              fija de envío.

            </p>

            <div className="mt-8 bg-pink-50 rounded-2xl p-6 text-center">

              <p className="text-gray-600">
                Valor del envío
              </p>

              <p className="text-5xl font-black text-pink-600 mt-2">

                $12.000

              </p>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-6 md:p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

            <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center">

              <Package
                className="text-pink-600"
                size={32}
              />

            </div>

            <h2 className="text-2xl font-bold mt-6">

              Fuera de Bogotá

            </h2>

            <p className="mt-5 text-gray-700 leading-7">

              Enviamos a cualquier ciudad de Colombia mediante
              transportadoras nacionales.

            </p>

            <div className="mt-8 bg-pink-50 rounded-2xl p-6">

              <p className="font-bold text-pink-600">

                Valor del envío

              </p>

              <p className="mt-4 text-gray-700 leading-7">

                El costo depende de la ciudad o municipio de destino y
                será calculado antes de finalizar tu compra.

              </p>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-6 md:p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

            <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center">

              <ShieldCheck
                className="text-pink-600"
                size={32}
              />

            </div>

            <h2 className="text-2xl font-bold mt-6">

              Pago Contra Entrega

            </h2>

            <p className="
              text-4xl
              md:text-5xl
              font-black
              ">

              Este método de pago únicamente está disponible para
              entregas dentro de Bogotá.

            </p>

            <div className="mt-8 bg-green-50 rounded-2xl p-6">

              <p className="font-bold text-green-700">

                ✔ Disponible solo en Bogotá

              </p>

            </div>

          </div>

        </div>

      </section>

      <section className="pb-24 px-6">

        <div className="max-w-6xl mx-auto rounded-[40px] bg-gradient-to-r from-pink-500 via-pink-600 to-pink-500 p-8 md:p-12 text-white shadow-2xl">

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div>

              <h2 className="text-4xl font-black">

                ¿Necesitas ayuda con tu envío?

              </h2>

              <p className="mt-6 text-pink-100 text-lg leading-8">

                Si deseas conocer el estado de tu pedido, los tiempos
                de entrega o tienes cualquier inquietud, nuestro equipo
                estará encantado de ayudarte.

              </p>

            </div>

            <div className="flex justify-center lg:justify-end">

              <Link
                href="https://wa.me/573123851338"
                target="_blank"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  w-full
                  sm:w-auto
                  bg-white
                  text-pink-600
                  px-8
                  py-4
                  rounded-full
                  font-bold
                  text-base
                  md:text-lg
                  "
              >
                Contactar por WhatsApp

                <ArrowRight size={22} />

              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}