import {
  CreateOrderInput,
  OrderSummary,
} from "./types";

import { OrderValidator } from "./OrderValidator";

import { OrderRepository } from "./OrderRepository";
import { OrderItemsRepository } from "./OrderItemsRepository";

import { OrderHistoryService } from "./OrderHistoryService";
import { OrderNotificationService } from "./OrderNotificationService";
import { InventoryService } from "@/lib/inventory/InventoryService";

import { CustomerService } from "@/lib/customer/CustomerService";

import { ReferralService } from "@/lib/referral/ReferralService";

export class OrderService {
  static async create(
    input: CreateOrderInput
  ): Promise<OrderSummary> {

    //-----------------------------------------
    // Validar pedido
    //-----------------------------------------

    OrderValidator.validate(input);

    //-----------------------------------------
    // Validar inventario
    //-----------------------------------------

    await InventoryService.validateStock(
      input.items.map(item => ({
        id: item.id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        name: ""
      }))
    );

    //-----------------------------------------
    // Crear pedido
    //-----------------------------------------

    const order =
      await OrderRepository.create(input);

    if (!order) {
      throw new Error(
        "No fue posible crear el pedido."
      );
    }

    try {

      //-----------------------------------------
      // Crear items
      //-----------------------------------------

      await OrderItemsRepository.create(
        order.id,
        input.items
      );

      const fullOrder =
      await OrderRepository.findWithRelations(
        order.id
      );

      //-----------------------------------------
      // Historial
      //-----------------------------------------

      await OrderHistoryService.create(
        order.id,
        order.status,
        "Pedido creado"
      );

      //-----------------------------------------
      // Inventario
      //-----------------------------------------

      await InventoryService.discountStock(

        input.items.map(item => ({

          id: item.id,

          variant_id: item.variant_id,

          quantity: item.quantity,

          name: ""

        })),

        order.id,

        order.order_number

      );

      //-----------------------------------------
      // Cliente
      //-----------------------------------------

      await CustomerService.registerPurchase({

        name: input.customer_name,

        email: input.customer_email,

        phone: input.customer_phone,

        total: Number(input.total)

      });

      //-----------------------------------------
      // Referidos
      //-----------------------------------------

      if (input.referral_code) {

        try {

          await ReferralService.registerReferral(
            input.referral_code
          );

        } catch {}

      }

      //-----------------------------------------
      // Correo + Notificación
      //-----------------------------------------

      try {

        await OrderNotificationService.orderCreated(
          fullOrder
        );

      } catch {}

      //-----------------------------------------

      return fullOrder as OrderSummary;

    } catch (error) {

      //-----------------------------------------
      // Rollback
      //-----------------------------------------

      await OrderRepository.delete(
        order.id
      );

      throw error;

    }

  }

  static async findById(
    id: string
  ) {
    return await OrderRepository.findById(
      id
    );
  }

  static async findWithRelations(
    id: string
  ) {
    return await OrderRepository.findWithRelations(
      id
    );
  }

  static async findHistory(
    orderId: string
  ) {
    return await OrderHistoryService.timeline(
      orderId
    );
  }

  static async countItems(
    orderId: string
  ) {
    return await OrderItemsRepository.count(
      orderId
    );
  }

  static async replaceItems(
    orderId: string,
    items: CreateOrderInput["items"]
  ) {
    return await OrderItemsRepository.replace(
      orderId,
      items
    );
  }

  static async isEmpty(
    orderId: string
  ) {
    const count =
      await OrderItemsRepository.count(
        orderId
      );

    return count === 0;
  }

  static async findItems(
    orderId: string
  ) {
    return await OrderItemsRepository.findByOrder(
      orderId
    );
  }

  static async updateStatus(
    id: string,
    status: string
  ) {
    return await OrderRepository.updateStatus(
      id,
      status
    );
  }

  static async updatePaymentStatus(
    id: string,
    paymentStatus: string
  ) {
    return await OrderRepository.updatePaymentStatus(
      id,
      paymentStatus
    );
  }

  static async updateRejectionReason(
    id: string,
    reason: string | null
  ) {
    return await OrderRepository.updateRejectionReason(
      id,
      reason
    );
  }

  static async updateShippedAt(
    id: string
  ) {
    return await OrderRepository.updateShippedAt(
      id
    );
  }

  static async updateDeliveredAt(
    id: string
  ) {
    return await OrderRepository.updateDeliveredAt(
      id
    );
  }

  static async cancel(
    id: string
  ) {
    return await OrderRepository.cancel(
      id
    );
  }

  static async exists(
    id: string
  ) {
    return await OrderRepository.exists(
      id
    );
  }

  static async update(
    id: string,
    values: Record<
      string,
      any
    >
  ) {
    return await OrderRepository.update(
      id,
      values
    );
  }

  static async delete(
    orderId: string
  ) {
    await OrderItemsRepository.deleteByOrder(
      orderId
    );

    await OrderRepository.delete(
      orderId
    );

    return true;
  }

  static async list(
    limit = 100
  ) {
    return await OrderRepository.list(
      limit
    );
  }
}