import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export class InventoryRepository {
  static async findVariant(
    variantId: string
  ) {
    const { data, error } =
      await supabase
        .from("product_variants")
        .select("*")
        .eq("id", variantId)
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  static async findProduct(
    productId: string
  ) {
    const { data, error } =
      await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  static async updateVariantStock(
    variantId: string,
    stock: number
  ) {
    const { data, error } =
      await supabase
        .from("product_variants")
        .update({
          stock,
        })
        .eq("id", variantId)
        .select()
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  static async updateProductStock(
    productId: string,
    stock: number
  ) {
    const { data, error } =
      await supabase
        .from("products")
        .update({
          stock,
        })
        .eq("id", productId)
        .select()
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  static async increaseVariantStock(
    variantId: string,
    quantity: number
  ) {
    const variant =
      await this.findVariant(
        variantId
      );

    return await this.updateVariantStock(
      variantId,
      Number(
        variant.stock ?? 0
      ) + Number(quantity)
    );
  }

  static async decreaseVariantStock(
    variantId: string,
    quantity: number
  ) {
    const variant =
      await this.findVariant(
        variantId
      );

    const newStock =
      Number(
        variant.stock ?? 0
      ) - Number(quantity);

    if (newStock < 0) {
      throw new Error(
        "Stock insuficiente."
      );
    }

    return await this.updateVariantStock(
      variantId,
      newStock
    );
  }

  static async increaseProductStock(
    productId: string,
    quantity: number
  ) {
    const product =
      await this.findProduct(
        productId
      );

    return await this.updateProductStock(
      productId,
      Number(
        product.stock ?? 0
      ) + Number(quantity)
    );
  }

  static async decreaseProductStock(
    productId: string,
    quantity: number
  ) {
    const product =
      await this.findProduct(
        productId
      );

    const newStock =
      Number(
        product.stock ?? 0
      ) - Number(quantity);

    if (newStock < 0) {
      throw new Error(
        "Stock insuficiente."
      );
    }

    return await this.updateProductStock(
      productId,
      newStock
    );
  }

  static async listLowStock(
    limit = 20,
    threshold = 5
  ) {
    const { data, error } =
      await supabase
        .from("product_variants")
        .select(`
          *,
          products(
            id,
            name,
            slug
          )
        `)
        .lte(
          "stock",
          threshold
        )
        .order(
          "stock",
          {
            ascending: true,
          }
        )
        .limit(limit);

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }
}