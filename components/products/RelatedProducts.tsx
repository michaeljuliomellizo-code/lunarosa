import Link from "next/link";
import Image from "next/image";

import { createClient } from "@/lib/supabase/server";


interface Props {
  categoryId: string;
  currentProductId: string;
}

export default async function RelatedProducts({
  categoryId,
  currentProductId,
}: Props) {
  const supabase =
    await createClient();



  const {
    data: products,
    error,
  } = await supabase
    .from("products")
    .select(`
      id,
      name,
      slug,
      image,
      price,
      compare_price
    `)
    .eq(
      "category_id",
      categoryId
    )
    .eq(
      "active",
      true
    )
    .neq(
      "id",
      currentProductId
    )
    .limit(4);

  if (
    error ||
    !products ||
    products.length === 0
  ) {
    return null;
  }

  return (
    <section className="mt-20">
      <h2 className="text-3xl font-bold mb-8">
        Productos Relacionados
      </h2>

      <div
        className="
          grid
          grid-cols-2
          grid-cols-1 sm:grid-cols-2 md:grid-cols-4
          gap-6
        "
      >
        {products.map(
          (product) => (
            <Link
              key={product.id}
              href={`/producto/${product.slug}`}
              className="
                bg-white
                border
                rounded-2xl
                overflow-hidden
                hover:shadow-xl
                transition
                duration-300
              "
            >
              <div
                className="
                  relative
                  h-64
                  bg-gray-100
                "
              >
                <Image
                  src={
                    product.image ||
                    "/placeholder.jpg"
                  }
                  alt={
                    product.name
                  }
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3
                  className="
                    font-semibold
                    line-clamp-2
                    min-h-[48px]
                  "
                >
                  {product.name}
                </h3>

                <div className="mt-3">
                  <p
                    className="
                      text-pink-600
                      text-xl
                      font-bold
                    "
                  >
                    $
                    {Number(
                      product.price
                    ).toLocaleString()}
                  </p>

                  {product.compare_price && (
                    <p
                      className="
                        text-gray-500
                        line-through
                        text-sm
                      "
                    >
                      $
                      {Number(
                        product.compare_price
                      ).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
}