import { InventoryRepository } from "./InventoryRepository";
import { InventoryMovementRepository } from "./InventoryMovementRepository";

type MovementType =
  | "purchase"
  | "sale"
  | "return"
  | "adjustment"
  | "reservation"
  | "reservation_release"
  | "manual_update"
  | "restock";

interface UpdateStockProps {
  variantId: string;
  quantity: number;
  movementType: MovementType;
  notes?: string;
  reference?: string;
}

export async function updateStock({
  variantId,
  quantity,
  movementType,
  notes,
  reference,
}: UpdateStockProps) {
  //--------------------------------------------------
  // Validaciones
  //--------------------------------------------------

  if (!variantId) {
    throw new Error("Variant ID is required.");
  }

  const quantityValue = Number(quantity);

  if (Number.isNaN(quantityValue)) {
    throw new Error("Invalid quantity.");
  }

  if (quantityValue === 0) {
    throw new Error("Quantity cannot be zero.");
  }

  //--------------------------------------------------
  // Buscar variante
  //--------------------------------------------------

  const variant =
    await InventoryRepository.findVariant(
      variantId
    );

  if (!variant) {
    throw new Error(
      `Variant ${variantId} not found.`
    );
  }

  //--------------------------------------------------
  // Calcular stock
  //--------------------------------------------------

  const previousStock = Number(
    variant.stock ?? 0
  );

  const newStock =
    previousStock + quantityValue;

  if (newStock < 0) {
    throw new Error(
      `Insufficient stock. Available: ${previousStock}, requested movement: ${quantityValue}.`
    );
  }

  //--------------------------------------------------
  // Actualizar inventario
  //--------------------------------------------------

  await InventoryRepository.updateVariantStock(
    variantId,
    newStock
  );

  //--------------------------------------------------
  // Registrar movimiento
  //--------------------------------------------------

  await InventoryMovementRepository.create({
    product_id:
      variant.product_id,

    variant_id:
      variantId,

    movement_type:
      movementType,

    quantity:
      quantityValue,

    previous_stock:
      previousStock,

    new_stock:
      newStock,

    reference:
      reference ?? null,

    notes:
      notes ?? null,
  });

  //--------------------------------------------------
  // Resultado
  //--------------------------------------------------

  return newStock;
}