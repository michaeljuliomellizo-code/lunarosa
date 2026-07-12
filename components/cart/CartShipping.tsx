"use client";

export default function CartShipping() {

  return (
    <div className="bg-white border rounded-3xl p-6">

      <h3 className="text-xl font-bold mb-4">
        Calcular envío
      </h3>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Ciudad"
          className="w-full border rounded-full px-5 py-3"
        />

        <input
          type="text"
          placeholder="Código postal"
          className="w-full border rounded-full px-5 py-3"
        />

        <button className="bg-black text-white px-6 py-3 rounded-full">
          Calcular
        </button>
      </div>
    </div>
  );
}