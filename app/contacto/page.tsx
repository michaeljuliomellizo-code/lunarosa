import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  Heart,
  Sparkles,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-100">

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div className="relative">

            <div className="absolute -top-8 -left-8 w-56 h-56 rounded-full bg-pink-300 blur-3xl opacity-30" />

            <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-purple-200 blur-3xl opacity-30" />

            <div className="relative overflow-hidden rounded-3xl shadow-2xl">

              <Image
                src="/images/Contacto.png"
                alt="Contacto Luna Rosa"
                width={700}
                height={800}
                priority
                className="w-full h-auto object-cover hover:scale-105 transition duration-700"
              />

            </div>

          </div>

          <div>

            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 rounded-full px-5 py-2 font-semibold mb-6">

              <Sparkles size={18} />

              Contáctanos

            </div>

            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight">

              Estamos para ayudarte

            </h1>

            <p className="mt-8 text-lg text-gray-600 leading-8">

              Nuestro equipo está listo para responder todas tus preguntas,
              ayudarte con tu compra o asesorarte para encontrar el look
              perfecto.

            </p>

            <div className="mt-12 space-y-6">

              <div className="bg-white rounded-3xl shadow-lg p-6 border border-pink-100 hover:shadow-xl transition">

                <div className="flex items-center gap-5">

                  <div className="w-16 h-16 rounded-2xl bg-pink-500 flex items-center justify-center text-3xl">
                     📸
                   </div>

                  <div>

                    <h3 className="font-bold text-xl">

                      Instagram

                    </h3>

                    <p className="text-gray-500">

                      @Luna_Rosa

                    </p>

                  </div>

                </div>

                <Link
                  href="https://instagram.com/Luna_Rosa"
                  target="_blank"
                  className="mt-6 inline-flex w-full justify-center bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl py-3 font-semibold hover:scale-[1.02] transition"
                >
                  Visitar Instagram
                </Link>

              </div>

              <div className="bg-white rounded-3xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition">

                <div className="flex items-center gap-5">

                  <div className="w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center text-white">

                    <MessageCircle size={28} />

                  </div>

                  <div>

                    <h3 className="font-bold text-xl">

                      WhatsApp

                    </h3>

                    <p className="text-gray-500">

                      +57 312 385 1338

                    </p>

                  </div>

                </div>

                <Link
                  href="https://wa.me/573123851338"
                  target="_blank"
                  className="mt-6 inline-flex w-full justify-center bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl py-3 font-semibold hover:scale-[1.02] transition"
                >
                  Escribir por WhatsApp
                </Link>

              </div>

            </div>

            <div className="mt-12 bg-white/70 backdrop-blur-lg rounded-3xl p-8 border border-pink-100 shadow-lg">

              <div className="flex items-center gap-3 mb-4">

                <Heart className="text-pink-500" />

                <h3 className="font-bold text-xl">

                  Atención personalizada

                </h3>

              </div>

              <p className="text-gray-600 leading-8">

                Queremos que disfrutes la mejor experiencia de compra.
                Escríbenos y con gusto resolveremos cualquier inquietud sobre
                productos, pedidos, cambios, envíos o recomendaciones.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}