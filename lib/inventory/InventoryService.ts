import { updateStock } from "./updateStock";

import { InventoryRepository } from "./InventoryRepository";
import { InventoryMovementRepository } from "./InventoryMovementRepository";

import { NotificationService } from "@/lib/notification/NotificationService";

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  variant_id?: string | null;
  color?: string;
  size?: string;
}

export class InventoryService {
  static async validateStock(
    items: InventoryItem[]
  ) {
    for (const item of items) {
      if (item.variant_id) {
        const variant =
          await InventoryRepository.findVariant(
            item.variant_id
          );

        if (!variant) {
          throw new Error(
            `La variante de ${item.name} no existe.`
          );
        }

        if (
          Number(variant.stock) <
          Number(item.quantity)
        ) {
          throw new Error(
            `Stock insuficiente para ${item.name}. Disponible: ${variant.stock}`
          );
        }

        continue;
      }

      const product =
        await InventoryRepository.findProduct(
          item.id
        );

      if (!product) {
        throw new Error(
          `El producto ${item.name} no existe.`
        );
      }

      if (
        Number(product.stock) <
        Number(item.quantity)
      ) {
        throw new Error(
          `Stock insuficiente para ${item.name}. Disponible: ${product.stock}`
        );
      }
    }
  }

  static async discountStock(
    items: InventoryItem[],
    orderId: string,
    order_number?: string
  ) {
    for (const item of items) {
      if (item.variant_id) {
        await this.discountVariant(
          item,
          orderId,
          order_number
        );

        continue;
      }

      await this.discountProduct(
        item,
        orderId,
        order_number
      );
    }
  }
    private static async discountVariant(
    item: InventoryItem,
    orderId: string,
    order_number?: string
  ) {
    const variant =
      await InventoryRepository.findVariant(
        item.variant_id!
      );

    if (!variant) {
      throw new Error(
        "Variante no encontrada."
      );
    }

    const newStock =
      await updateStock({
        variantId:
          item.variant_id!,
        quantity:
          -Number(
            item.quantity
          ),
        movementType:
          "sale",
        reference:
          orderId,
        notes: `Venta pedido ${
          order_number ??
          orderId
        }`,
      });

    if (newStock <= 5) {
      await NotificationService.lowStock(
        item.name,
        newStock
      );
    }

    if (newStock <= 0) {
      await NotificationService.outOfStock(
        item.name
      );
    }
  }

  private static async discountProduct(
    item: InventoryItem,
    orderId: string,
    order_number?: string
  ) {
    const product =
      await InventoryRepository.findProduct(
        item.id
      );

    if (!product) {
      throw new Error(
        "Producto no encontrado."
      );
    }

    const previousStock =
      Number(
        product.stock
      );

    const newStock =
      previousStock -
      Number(
        item.quantity
      );

    if (newStock < 0) {
      throw new Error(
        "Insufficient stock"
      );
    }

    await InventoryRepository.updateProductStock(
      item.id,
      newStock
    );

    await InventoryMovementRepository.create({
      product_id:
        item.id,
      variant_id:
        null,
      movement_type:
        "sale",
      quantity:
        -Number(
          item.quantity
        ),
      previous_stock:
        previousStock,
      new_stock:
        newStock,
      reference:
        orderId,
      notes: `Venta pedido ${
        order_number ??
        orderId
      }`,
    });

    if (newStock <= 5) {
      await NotificationService.lowStock(
        item.name,
        newStock
      );
    }

    if (newStock <= 0) {
      await NotificationService.outOfStock(
        item.name
      );
    }
  }
    static async restoreStock(
    items: InventoryItem[],
    orderId: string
  ) {
    for (const item of items) {
      if (item.variant_id) {
        await updateStock({
          variantId:
            item.variant_id,
          quantity:
            Number(
              item.quantity
            ),
          movementType:
            "return",
          reference:
            orderId,
          notes:
            "Restauración de inventario",
        });

        continue;
      }

      const product =
        await InventoryRepository.findProduct(
          item.id
        );

      if (!product) {
        continue;
      }

      const previousStock =
        Number(
          product.stock
        );

      const newStock =
        previousStock +
        Number(
          item.quantity
        );

      await InventoryRepository.updateProductStock(
        item.id,
        newStock
      );

      await InventoryMovementRepository.create({
        product_id:
          item.id,
        variant_id:
          null,
        movement_type:
          "return",
        quantity:
          Number(
            item.quantity
          ),
        previous_stock:
          previousStock,
        new_stock:
          newStock,
        reference:
          orderId,
        notes:
          "Restauración de inventario",
      });
    }
  }
}