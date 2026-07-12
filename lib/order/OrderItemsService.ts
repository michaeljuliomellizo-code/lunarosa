import { OrderItemsRepository } from "./OrderItemsRepository";

import { OrderItemInput } from "./types";

export class OrderItemsService {
  //-----------------------------------------
  // Crear items
  //-----------------------------------------

  static async create(
    orderId: string,
    items: OrderItemInput[]
  ) {
    return await OrderItemsRepository.create(
      orderId,
      items
    );
  }

  //-----------------------------------------
  // Obtener items
  //-----------------------------------------

  static async findByOrder(
    orderId: string
  ) {
    return await OrderItemsRepository.findByOrder(
      orderId
    );
  }

  //-----------------------------------------
  // Buscar item
  //-----------------------------------------

  static async findById(
    id: string
  ) {
    return await OrderItemsRepository.findById(
      id
    );
  }

  //-----------------------------------------
  // Contar productos distintos
  //-----------------------------------------

  static async count(
    orderId: string
  ) {
    return await OrderItemsRepository.count(
      orderId
    );
  }

  //-----------------------------------------
  // Reemplazar items
  //-----------------------------------------

  static async replace(
    orderId: string,
    items: OrderItemInput[]
  ) {
    return await OrderItemsRepository.replace(
      orderId,
      items
    );
  }

  //-----------------------------------------
  // Eliminar items
  //-----------------------------------------

  static async delete(
    orderId: string
  ) {
    return await OrderItemsRepository.deleteByOrder(
      orderId
    );
  }

  //-----------------------------------------
  // Total de unidades
  //-----------------------------------------

  static async totalQuantity(
    orderId: string
  ) {
    const items =
      await this.findByOrder(
        orderId
      );

    return items.reduce(
      (
        total,
        item: any
      ) =>
        total +
        Number(item.quantity),
      0
    );
  }

  //-----------------------------------------
  // Total monetario
  //-----------------------------------------

  static async totalAmount(
    orderId: string
  ) {
    const items =
      await this.findByOrder(
        orderId
      );

    return items.reduce(
      (
        total,
        item: any
      ) =>
        total +
        Number(item.quantity) *
          Number(item.price),
      0
    );
  }

  //-----------------------------------------
  // Obtener inventario
  //-----------------------------------------

  static async getInventoryItems(
    orderId: string
  ) {
    const items =
      await this.findByOrder(
        orderId
      );

    return items.map(
      (item: any) => ({
        id:
          item.product_id,

        variant_id:
          item.variant_id,

        quantity:
          Number(
            item.quantity
          ),

        name:
          item.products?.name ??
          "Producto",

        color:
          item.product_variants
            ?.color,

        size:
          item.product_variants
            ?.size,
      })
    );
  }

  //-----------------------------------------
  // Pedido vacío
  //-----------------------------------------

  static async isEmpty(
    orderId: string
  ) {
    return (
      (await this.count(
        orderId
      )) === 0
    );
  }
}