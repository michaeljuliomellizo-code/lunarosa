"use client";

export default function Newsletter() {

  return (
    <section className="bg-pink-100 rounded-3xl p-10 text-center">

      <h2 className="text-4xl font-bold">
        Suscríbete
      </h2>

      <p className="mt-4 text-gray-700">
        Recibe promociones y novedades.
      </p>

      <div className="max-w-xl mx-auto flex gap-4 mt-8">

        <input
          type="email"
          placeholder="Tu correo"
          className="flex-1 border rounded-full px-6 py-4"
        />

        <button className="bg-pink-400 text-white px-8 rounded-full">
          Suscribirme
        </button>
      </div>
    </section>
  );
}