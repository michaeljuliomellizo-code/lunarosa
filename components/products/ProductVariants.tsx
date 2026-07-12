export default function ProductVariants() {

  return (
    <div>

      <h3 className="font-semibold mb-4">
        Tallas
      </h3>

      <div className="flex gap-3">

        <button className="border px-5 py-3 rounded-full">
          S
        </button>

        <button className="border px-5 py-3 rounded-full">
          M
        </button>

        <button className="border px-5 py-3 rounded-full">
          L
        </button>
      </div>
    </div>
  );
}