import { OrderService } from "./OrderService";
import { OrderHistoryService } from "./OrderHistoryService";

import {
  ORDER_STATUS,
  PAYMENT_STATUS,
} from "./constants";

export class OrderAdminService {
  //----------------------------------------
  // Aprobar pago
  //----------------------------------------

  static async approvePayment(
    orderId: string
  ) {
    const order =
      await OrderService.findById(
        orderId
      );

    if (!order) {
      throw new Error(
        "Pedido no encontrado."
      );
    }

    await OrderService.updatePaymentStatus(
      orderId,
      PAYMENT_STATUS.PAID
    );

    await OrderService.updateStatus(
      orderId,
      ORDER_STATUS.PROCESSING
    );

    await OrderHistoryService.create(
      orderId,
      ORDER_STATUS.PROCESSING,
      "Pago aprobado por administrador."
    );

    /*
    Sprint 1.5.x

    await InventoryService.discountStock(...)

    await NotificationService.paymentApproved(...)

    await CustomerService.registerPurchase(...)

    await LoyaltyService.processPurchase(...)

    await ReferralService.processReferral(...)
    */

    return true;
  }

  //----------------------------------------
  // Rechazar pago
  //----------------------------------------

  static async rejectPayment(
    orderId: string,
    reason: string
  ) {
    const order =
      await OrderService.findById(
        orderId
      );

    if (!order) {
      throw new Error(
        "Pedido no encontrado."
      );
    }

    await OrderService.updatePaymentStatus(
      orderId,
      PAYMENT_STATUS.REJECTED
    );

    await OrderService.updateRejectionReason(
      orderId,
      reason
    );

    await OrderHistoryService.create(
      orderId,
      ORDER_STATUS.PENDING,
      `Pago rechazado: ${reason}`
    );

    return true;
  }

  //----------------------------------------
  // Procesando
  //----------------------------------------

  static async markProcessing(
    orderId: string
  ) {
    await OrderService.updateStatus(
      orderId,
      ORDER_STATUS.PROCESSING
    );

    await OrderHistoryService.create(
      orderId,
      ORDER_STATUS.PROCESSING,
      "Pedido en preparación."
    );

    return true;
  }

  //----------------------------------------
  // Enviado
  //----------------------------------------

  static async markShipped(
    orderId: string
  ) {
    await OrderService.updateStatus(
      orderId,
      ORDER_STATUS.SHIPPED
    );

    await OrderService.updateShippedAt(
      orderId
    );

    await OrderHistoryService.create(
      orderId,
      ORDER_STATUS.SHIPPED,
      "Pedido enviado."
    );

    return true;
  }

  //----------------------------------------
  // Entregado
  //----------------------------------------

  static async markDelivered(
    orderId: string
  ) {
    await OrderService.updateStatus(
      orderId,
      ORDER_STATUS.DELIVERED
    );

    await OrderService.updateDeliveredAt(
      orderId
    );

    await OrderHistoryService.create(
      orderId,
      ORDER_STATUS.DELIVERED,
      "Pedido entregado."
    );

    return true;
  }

  //----------------------------------------
  // Cancelar
  //----------------------------------------

  static async cancelOrder(
    orderId: string
  ) {
    await OrderService.cancel(
      orderId
    );

    await OrderHistoryService.create(
      orderId,
      ORDER_STATUS.CANCELLED,
      "Pedido cancelado."
    );

    return true;
  }
}