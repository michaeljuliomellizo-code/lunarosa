"use client";

export default function CartCoupon() {

  return (
    <div className="bg-white border rounded-3xl p-6">

      <h3 className="text-xl font-bold mb-4">
        Cupón de descuento
      </h3>

      <div className="flex gap-4">

        <input
          type="text"
          placeholder="Código"
          className="flex-1 border rounded-full px-5 py-3"
        />

        <button className="bg-pink-400 text-white px-6 py-3 rounded-full">
          Aplicar
        </button>
      </div>
    </div>
  );
}