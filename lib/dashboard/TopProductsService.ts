import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface TopProduct {
  productId: string;
  name: string;
  slug: string;
  image: string | null;
  quantity: number;
  revenue: number;
  averagePrice: number;
}

export class TopProductsService {
  static async getTopProducts(
    limit = 10
  ): Promise<TopProduct[]> {
    const { data, error } =
      await supabase
        .from("order_items")
        .select(`
          quantity,
          price,
          product_id,
          products(
            id,
            name,
            slug,
            image
          )
        `);

    if (error) {
      throw new Error(error.message);
    }

    const map = new Map<
      string,
      TopProduct
    >();

    data?.forEach((item: any) => {
      const product =
        item.products;

      if (!product) return;

      if (
        !map.has(product.id)
      ) {
        map.set(product.id, {
          productId:
            product.id,
          name:
            product.name,
          slug:
            product.slug,
          image:
            product.image ??
            null,
          quantity: 0,
          revenue: 0,
          averagePrice: 0,
        });
      }

      const current =
        map.get(product.id)!;

      current.quantity +=
        Number(
          item.quantity
        );

      current.revenue +=
        Number(item.price) *
        Number(item.quantity);
    });

    const products =
      Array.from(
        map.values()
      ).map((item) => ({
        ...item,
        averagePrice:
          item.quantity > 0
            ? item.revenue /
              item.quantity
            : 0,
      }));

    products.sort(
      (a, b) =>
        b.quantity -
        a.quantity
    );

    return products.slice(
      0,
      limit
    );
  }

  static async getTopFive() {
    return this.getTopProducts(
      5
    );
  }

  static async getTopTen() {
    return this.getTopProducts(
      10
    );
  }

  static async getBestSeller() {
    const products =
      await this.getTopProducts(
        1
      );

    return (
      products[0] ??
      null
    );
  }

  static async totalUnitsSold() {
    const products =
      await this.getTopProducts(
        1000
      );

    return products.reduce(
      (sum, item) =>
        sum +
        item.quantity,
      0
    );
  }

  static async totalRevenue() {
    const products =
      await this.getTopProducts(
        1000
      );

    return products.reduce(
      (sum, item) =>
        sum +
        item.revenue,
      0
    );
  }
}