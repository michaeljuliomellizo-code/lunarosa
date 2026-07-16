"use client";

interface CheckoutActionsProps {
  loading: boolean;
  disabled: boolean;
}

export default function CheckoutActions({
  loading,
  disabled,
}: CheckoutActionsProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="
        w-full
        bg-gradient-to-r
        from-pink-500
        to-fuchsia-600
        hover:scale-[1.01]
        transition-all
        shadow-lg
        disabled:bg-gray-400
        disabled:cursor-not-allowed
        disabled:opacity-70
        text-white
        py-3
        sm:py-4
        rounded-xl
        font-semibold
        text-base
        sm:text-lg
      "
    >
      {loading
        ? "Procesando pedido..."
        : "Crear Pedido"}
    </button>
  );
}