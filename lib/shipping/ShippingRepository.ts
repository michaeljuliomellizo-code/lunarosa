import { createClient } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase/client";



export class ShippingRepository {

  //----------------------------------------------------------
  // Buscar tarifa
  //----------------------------------------------------------

  static async findRate(
    department: string,
    municipality: string
  ) {

    const { data, error } =
      await supabase
        .from("shipping_rates")
        .select("*")
        .eq("department", department)
        .eq("municipality", municipality)
        .eq("active", true)
        .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  //----------------------------------------------------------
  // Existe cobertura
  //----------------------------------------------------------

  static async exists(
    department: string,
    municipality: string
  ): Promise<boolean> {

    const { count, error } =
      await supabase
        .from("shipping_rates")
        .select("id", {
          head: true,
          count: "exact",
        })
        .eq("department", department)
        .eq("municipality", municipality)
        .eq("active", true);

    if (error) {
      throw new Error(error.message);
    }

    return (count ?? 0) > 0;
  }

  //----------------------------------------------------------
  // Listar todas las tarifas
  //----------------------------------------------------------

  static async list() {

    const { data, error } =
      await supabase
        .from("shipping_rates")
        .select("*")
        .order("department")
        .order("municipality");

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }

  //----------------------------------------------------------
  // Crear tarifa
  //----------------------------------------------------------

  static async create(values: {
    department: string;
    municipality: string;
    price: number;
    estimated_days?: number;
    active?: boolean;
  }) {

    const { data, error } =
      await supabase
        .from("shipping_rates")
        .insert(values)
        .select()
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  //----------------------------------------------------------
  // Actualizar tarifa
  //----------------------------------------------------------

  static async update(
    id: string,
    values: Record<string, any>
  ) {

    const { data, error } =
      await supabase
        .from("shipping_rates")
        .update(values)
        .eq("id", id)
        .select()
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  //----------------------------------------------------------
  // Eliminar tarifa
  //----------------------------------------------------------

  static async delete(id: string) {

    const { error } =
      await supabase
        .from("shipping_rates")
        .delete()
        .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }

}