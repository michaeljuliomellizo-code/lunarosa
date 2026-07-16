import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import RelatedProducts from "@/components/products/RelatedProducts";
import ReviewForm from "@/components/products/ReviewForm";
import ProductDetailClient from "@/components/products/ProductDetailClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {

  const { slug } = await params;

  const supabase = await createClient();

  const { data: product } =
    await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

  if (!product) {

    notFound();

  }

  const { data: variants } =
    await supabase
      .from("product_variants")
      .select("*")
      .eq("product_id", product.id)
      .eq("active", true);

  return (

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12">

      <ProductDetailClient

        product={{
          id: String(product.id),
          name: product.name,
          image: product.image,
          price: Number(product.price),
          sku: product.sku ?? "",
          stock: Number(product.stock),
          description: product.description,
          compare_price:
            product.compare_price,
        }}

        variants={
          (variants ?? []).map(
            (variant) => ({

              id: String(
                variant.id
              ),

              color:
                variant.color,

              size:
                variant.size,

              sku:
                variant.sku ??
                "",

              stock: Number(
                variant.stock
              ),

              price: Number(
                variant.price
              ),

              image:
                variant.image,

              active:
                variant.active,

            })
          )
        }

      />

      <div className="mt-16">

        <RelatedProducts
          categoryId={String(product.category_id)}
          currentProductId={String(product.id)}
        />

      </div>

      <div className="mt-20 border-t pt-16">

        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-12">

            <h2 className="text-3xl font-bold">

              Opiniones de Clientes

            </h2>

            <p className="text-gray-600 mt-3">

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