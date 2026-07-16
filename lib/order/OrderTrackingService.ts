import { supabase } from "@/lib/supabase/client";
import { OrderWithRelations } from "./types";

export class OrderTrackingService {
  /**
   * Buscar pedido por número de pedido
   */
  static async getByorder_number(
    order_number: string
  ): Promise<OrderWithRelations | null> {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (
          *,
          products (
            id,
            name,
            slug,
            image,
            price
          ),
          product_variants (
            id,
            color,
            size
          )
        ),
        order_status_history (
          *
        )
      `
      )
      .eq("order_number", order_number)
      .single();

    if (error) {
      console.error(
        "Error obteniendo pedido:",
        error.message
      );
      return null;
    }

    return data as OrderWithRelations;
  }

  /**
   * Buscar pedido por id
   */
  static async getById(
    id: string
  ): Promise<OrderWithRelations | null> {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (
          *,
          products (
            id,
            name,
            slug,
            image,
            price
          ),
          product_variants (
            id,
            color,
            size
          )
        ),
        order_status_history (
          *
        )
      `
      )
      .eq("id", id)
      .single();

    if (error) {
      console.error(
        "Error obteniendo pedido:",
        error.message
      );
      return null;
    }

    return data as OrderWithRelations;
  }
}