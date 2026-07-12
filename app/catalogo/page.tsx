import { createClient } from "@/lib/supabase/server";

import ProductCard from "@/components/catalog/ProductCard";
import CatalogFilters from "@/components/catalog/CatalogFilters";
import Pagination from "@/components/catalog/Pagination";

const PRODUCTS_PER_PAGE = 12;

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;

  const supabase = await createClient();

  const search =
    params.q || "";

  const category =
    params.category || "";

  const sort =
    params.sort || "newest";

  const page = Number(
    params.page || 1
  );

  const { data: categories } =
    await supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("name");

  let query = supabase
    .from("products")
    .select(
      `
      *,
      categories (
        name,
        slug
      )
    `,
      { count: "exact" }
    )
    .eq("active", true);

  if (search) {
    query = query.ilike(
      "name",
      `%${search}%`
    );
  }

  if (category) {
    const selectedCategory =
      categories?.find(
        (c) => c.slug === category
      );

    if (selectedCategory) {
      query = query.eq(
        "category_id",
        selectedCategory.id
      );
    }
  }

  if (sort === "price_asc") {
    query = query.order(
      "price",
      {
        ascending: true,
      }
    );
  } else if (
    sort === "price_desc"
  ) {
    query = query.order(
      "price",
      {
        ascending: false,
      }
    );
  } else if (
    sort === "featured"
  ) {
    query = query
      .eq("featured", true)
      .order(
        "created_at",
        {
          ascending: false,
        }
      );
  } else {
    query = query.order(
      "created_at",
      {
        ascending: false,
      }
    );
  }

  const from =
    (page - 1) *
    PRODUCTS_PER_PAGE;

  const to =
    from +
    PRODUCTS_PER_PAGE -
    1;

  const {
    data: products,
    count,
  } = await query.range(
    from,
    to
  );

  const totalPages = Math.ceil(
    (count || 0) /
      PRODUCTS_PER_PAGE
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">
        Catálogo
      </h1>

      <CatalogFilters
        categories={
          categories || []
        }
        selectedCategory={
          category
        }
        selectedSort={sort}
        search={search}
      />

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-8
        "
      >
        {products?.map(
          (product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          )
        )}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        searchParams={{
          q: search,
          category,
          sort,
        }}
      />
    </div>
  );
}