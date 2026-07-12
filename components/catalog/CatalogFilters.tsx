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
        rounded-xl
        shadow
        p-6
        mb-10
        grid
        md:grid-cols-4
        gap-4
      "
    >
      <input
        type="text"
        name="q"
        defaultValue={search}
        placeholder="Buscar productos..."
        className="
          border
          rounded-lg
          p-3
        "
      />

      <select
        name="category"
        defaultValue={selectedCategory}
        className="
          border
          rounded-lg
          p-3
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
          bg-pink-500
          text-white
          rounded-lg
          p-3
        "
      >
        Aplicar
      </button>
    </form>
  );
}