export default function ProductFilters() {

  return (
    <aside className="bg-white border rounded-3xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Filtros
      </h2>

      <div className="space-y-6">

        <div>

          <h3 className="font-semibold mb-3">
            Categorías
          </h3>

          <div className="space-y-2">

            <label className="flex gap-2">
              <input type="checkbox" />
              Brasieres
            </label>

            <label className="flex gap-2">
              <input type="checkbox" />
              Pijamas
            </label>
          </div>
        </div>

        <div>

          <h3 className="font-semibold mb-3">
            Precio
          </h3>

          <input
            type="range"
            className="w-full"
          />
        </div>
      </div>
    </aside>
  );
}