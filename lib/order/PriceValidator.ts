import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export class PriceValidator {
  static async calculate(items: any[]) {
    let subtotal = 0;

    for (const item of items) {
      const { data: product } = await supabase
        .from("products")
        .select("price")
        .eq("id", item.id)
        .single();

      if (!product) {
        throw new Error(
          `Producto inexistente ${item.id}`
        );
      }

      subtotal +=
        Number(product.price) *
        Number(item.quantity);
    }

    return subtotal;
  }
}