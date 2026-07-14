import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import WishlistButton from "@/components/products/WishlistButton";
import RelatedProducts from "@/components/products/RelatedProducts";
import ProductVariantSelector from "@/components/products/ProductVariantSelector";
import AddToCartButton from "@/components/products/AddToCartButton";
import ReviewForm from "@/components/products/ReviewForm";

export default async function ProductPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!product) {
    notFound();
  }

  const { data: variants } = await supabase
    .from("product_variants")
    .select("*")
    .eq("product_id", product.id)
    .eq("active", true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12">

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-8
          lg:gap-12
          items-start
        "
      >

        <div>
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="
                w-full
                rounded-2xl
                shadow-lg
                object-cover
                max-h-[700px]
              "
            />
          )}
        </div>

        <div className="flex flex-col">

          <h1
            className="
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-bold
              leading-tight
            "
          >
            {product.name}
          </h1>

          {product.description && (
            <p
              className="
                mt-4
                sm:mt-6
                text-gray-600
                text-sm
                sm:text-base
                leading-7
              "
            >
              {product.description}
            </p>
          )}

          <div className="mt-8">

            <p
              className="
                text-2xl
                sm:text-3xl
                lg:text-4xl
                font-bold
                text-pink-600
              "
            >
              $
              {Number(product.price).toLocaleString()}
            </p>

            {product.compare_price && (
              <p
                className="
                  text-sm
                  sm:text-lg
                  text-gray-400
                  line-through
                "
              >
                $
                {Number(
                  product.compare_price
                ).toLocaleString()}
              </p>
            )}

          </div>

          <div className="mt-4">

            {Number(product.stock) > 0 ? (
              <p className="text-green-600 font-medium">
                Disponible
              </p>
            ) : (
              <p className="text-red-600 font-medium">
                Agotado
              </p>
            )}

          </div>

          <div className="mt-6 sm:mt-8">

            {variants && variants.length > 0 ? (

              <ProductVariantSelector
                product={{
                  id: String(product.id),
                  name: product.name,
                  image: product.image,
                  price: Number(product.price),
                }}
                variants={variants.map((variant) => ({
                  id: String(variant.id),
                  color: variant.color,
                  size: variant.size,
                  sku: variant.sku || "",
                  stock: Number(variant.stock),
                  price: Number(variant.price),
                  image: variant.image,
                  active: variant.active,
                }))}
              />

            ) : (

              <AddToCartButton
                product={{
                  id: String(product.id),
                  name: product.name,
                  image: product.image,
                  price: Number(product.price),
                }}
                variantId=""
                color=""
                size=""
                sku={product.sku || ""}
              />

            )}

          </div>

          <div className="mt-4 sm:mt-6">

            <WishlistButton
              productId={String(product.id)}
            />

          </div>

        </div>

      </div>

      <div className="mt-14 sm:mt-20">
        <RelatedProducts
          categoryId={String(product.category_id)}
          currentProductId={String(product.id)}
        />
      </div>

      <div
        className="
          mt-14
          sm:mt-20
          border-t
          pt-10
          sm:pt-16
        "
      >

        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-12">

            <h2
              className="
                text-2xl
                sm:text-3xl
                lg:text-4xl
                font-bold
              "
            >
              Opiniones de Clientes
            </h2>

            <p className="text-gray-500 mt-3">
              Comentarios reales de quienes ya compraron
            </p>

          </div>

          <ReviewForm
            productId={String(product.id)}
          />

        </div>

      </div>

    </div>
  );
}