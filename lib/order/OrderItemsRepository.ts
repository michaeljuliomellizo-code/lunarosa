import { createClient } from "@supabase/supabase-js";

import { OrderItemInput } from "./types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export class OrderItemsRepository {
  //-----------------------------------------
  // Crear items de una orden
  //-----------------------------------------

  static async create(
    orderId: string,
    items: OrderItemInput[]
  ) {
    const payload = items.map((item) => ({
      order_id: orderId,
      product_id: item.id,
      variant_id: item.variant_id ?? null,
      quantity: Number(item.quantity),
      price: Number(item.price),
    }));

    const { data, error } = await supabase
      .from("order_items")
      .insert(payload)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  //-----------------------------------------
  // Obtener items
  //-----------------------------------------

  static async findByOrder(
    orderId: string
  ) {
    const { data, error } =
      await supabase
        .from("order_items")
        .select(`
          *,
          products(
            id,
            name,
            slug,
            image,
            price
          ),
          product_variants(
            id,
            size,
            color
          )
        `)
        .eq("order_id", orderId);

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }

  //-----------------------------------------
  // Buscar por id
  //-----------------------------------------

  static async findById(
    id: string
  ) {
    const { data, error } =
      await supabase
        .from("order_items")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
      return null;
    }

    return data;
  }

  //-----------------------------------------
  // Contar items
  //-----------------------------------------

  static async count(
    orderId: string
  ) {
    const {
      count,
      error,
    } = await supabase
      .from("order_items")
      .select("*", {
        head: true,
        count: "exact",
      })
      .eq("order_id", orderId);

    if (error) {
      throw new Error(error.message);
    }

    return count ?? 0;
  }

  //-----------------------------------------
  // Actualizar item
  //-----------------------------------------

  static async update(
    id: string,
    values: Record<string, any>
  ) {
    const { data, error } =
      await supabase
        .from("order_items")
        .update(values)
        .eq("id", id)
        .select()
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  //-----------------------------------------
  // Eliminar todos los items
  //-----------------------------------------

  static async deleteByOrder(
    orderId: string
  ) {
    const { error } =
      await supabase
        .from("order_items")
        .delete()
        .eq("order_id", orderId);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }

  //-----------------------------------------
  // Eliminar un item
  //-----------------------------------------

  static async delete(
    id: string
  ) {
    const { error } =
      await supabase
        .from("order_items")
        .delete()
        .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }

  //-----------------------------------------
  // Reemplazar items
  //-----------------------------------------

  static async replace(
    orderId: string,
    items: OrderItemInput[]
  ) {
    await this.deleteByOrder(orderId);

    return await this.create(
      orderId,
      items
    );
  }

  //-----------------------------------------
  // Existe la orden
  //-----------------------------------------

  static async exists(
    orderId: string
  ) {
    const {
      count,
      error,
    } = await supabase
      .from("order_items")
      .select("*", {
        head: true,
        count: "exact",
      })
      .eq("order_id", orderId);

    if (error) {
      throw new Error(error.message);
    }

    return (count ?? 0) > 0;
  }
}