interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  categories: Category[];
  selectedCategory: string;
  selectedSort: string;
  search: string;
}

export default function CatalogFilters({
  categories,
  selectedCategory,
  selectedSort,
  search,
}: Props) {
  return (
    <form
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-4
        sm:p-6
        mb-8
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-4
      "
    >
      <input
        type="text"
        name="q"
        defaultValue={search}
        placeholder="Buscar productos..."
        className="
          w-full
          border
          rounded-xl
          px-4
          py-3
          text-sm
          sm:text-base
          focus:ring-2
          focus:ring-pink-400
          focus:border-pink-400
          outline-none
        "
      />

      <select
        name="category"
        defaultValue={selectedCategory}
        className="
          w-full
          border
          rounded-xl
          px-4
          py-3
          text-sm
          sm:text-base
          focus:ring-2
          focus:ring-pink-400
          focus:border-pink-400
          outline-none
        "
      >
        <option value="">
          Todas las categorías
        </option>

        {categories.map((category) => (
          <option
            key={category.id}
            value={category.slug}
          >
            {category.name}
          </option>
        ))}
      </select>

      <select
        name="sort"
        defaultValue={selectedSort}
        className="
          border
          rounded-lg
          p-3
        "
      >
        <option value="newest">
          Más recientes
        </option>

        <option value="price_asc">
          Menor precio
        </option>

        <option value="price_desc">
          Mayor precio
        </option>

        <option value="featured">
          Destacados
        </option>
      </select>

      <button
        className="
          w-full
          bg-pink-500
          hover:bg-pink-600
          text-white
          font-semibold
          rounded-xl
          py-3
          transition
          duration-200
        "
      >
        Aplicar
      </button>
    </form>
  );
}