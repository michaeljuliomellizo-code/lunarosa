import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface InventoryMovementInput {
  product_id: string;
  variant_id?: string | null;
  movement_type: string;
  quantity: number;
  previous_stock: number;
  new_stock: number;
  reference?: string | null;
  notes?: string | null;
}

export class InventoryMovementRepository {
  static async create(
    movement: InventoryMovementInput
  ) {
    const {
      data,
      error,
    } = await supabase
      .from("inventory_movements")
      .insert({
        product_id:
          movement.product_id,
        variant_id:
          movement.variant_id ?? null,
        movement_type:
          movement.movement_type,
        quantity:
          movement.quantity,
        previous_stock:
          movement.previous_stock,
        new_stock:
          movement.new_stock,
        reference:
          movement.reference ?? null,
        notes:
          movement.notes ?? null,
      })
      .select()
      .single();

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data;
  }

  static async findById(
    id: string
  ) {
    const {
      data,
      error,
    } = await supabase
      .from(
        "inventory_movements"
      )
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data;
  }

  static async findByProduct(
    productId: string
  ) {
    const {
      data,
      error,
    } = await supabase
      .from(
        "inventory_movements"
      )
      .select("*")
      .eq(
        "product_id",
        productId
      )
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data ?? [];
  }

  static async findByVariant(
    variantId: string
  ) {
    const {
      data,
      error,
    } = await supabase
      .from(
        "inventory_movements"
      )
      .select("*")
      .eq(
        "variant_id",
        variantId
      )
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data ?? [];
  }

  static async findByReference(
    reference: string
  ) {
    const {
      data,
      error,
    } = await supabase
      .from(
        "inventory_movements"
      )
      .select("*")
      .eq(
        "reference",
        reference
      )
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data ?? [];
  }

  static async list(
    limit = 100
  ) {
    const {
      data,
      error,
    } = await supabase
      .from(
        "inventory_movements"
      )
      .select("*")
      .order(
        "created_at",
        {
          ascending: false,
        }
      )
      .limit(limit);

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data ?? [];
  }

  static async delete(
    id: string
  ) {
    const { error } =
      await supabase
        .from(
          "inventory_movements"
        )
        .delete()
        .eq("id", id);

    if (error) {
      throw new Error(
        error.message
      );
    }

    return true;
  }
}