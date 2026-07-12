"use client";

interface ProductStockProps {
  stock: number;
}

export default function ProductStock({
  stock,
}: ProductStockProps) {
  if (stock <= 0) {
    return (
      <div className="inline-flex items-center rounded-lg bg-red-100 px-4 py-2 text-red-700 font-semibold">
        Agotado
      </div>
    );
  }

  if (stock <= 5) {
    return (
      <div className="inline-flex items-center rounded-lg bg-yellow-100 px-4 py-2 text-yellow-700 font-semibold">
        Últimas {stock} unidades
      </div>
    );
  }

  return (
    <div className="inline-flex items-center rounded-lg bg-green-100 px-4 py-2 text-green-700 font-semibold">
      Disponible ({stock})
    </div>
  );
}