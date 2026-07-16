import { InventoryService } from "@/lib/inventory/InventoryService";
import { CustomerService } from "@/lib/customer/CustomerService";
import { LoyaltyService } from "@/lib/loyalty/LoyaltyService";
import { ReferralService } from "@/lib/referral/ReferralService";

import { OrderRepository } from "@/lib/order/OrderRepository";
import { OrderItemsRepository } from "@/lib/order/OrderItemsRepository";
import { OrderHistoryService } from "@/lib/order/OrderHistoryService";
import { OrderNotificationService } from "@/lib/order/OrderNotificationService";

import {
  ORDER_STATUS,
  PAYMENT_STATUS,
} from "@/lib/order/constants";

export class PaymentService {
  static async approve(
    orderId: string
  ) {
    const order =
      await OrderRepository.findById(
        orderId
      );

    if (!order) {
      throw new Error(
        "Pedido no encontrado."
      );
    }

    const items =
      await OrderItemsRepository.findByOrder(
        orderId
      );

    await OrderRepository.updatePaymentStatus(
      orderId,
      PAYMENT_STATUS.PAID
    );

    await OrderRepository.updateStatus(
      orderId,
      ORDER_STATUS.PROCESSING
    );

    await InventoryService.discountStock(
      items.map((item: any) => ({
        id: item.product_id,
        variant_id:
          item.variant_id,
        quantity:
          item.quantity,
        name:
          item.products?.name,
      })),
      order.id,
      order.order_number
    );

    await CustomerService.registerPurchase({
      name:
        order.customer_name,
      email:
        order.customer_email,
      phone:
        order.phone,
      total:
        Number(order.total),
    });

    await LoyaltyService.processPurchase({
      email:
        order.customer_email,
      total:
        Number(order.total),
      orderId:
        order.id,
    });

    if (
      order.referral_code
    ) {
      await ReferralService.registerReferral(
        order.referral_code
      );
    }

    await OrderHistoryService.create(
      order.id,
      ORDER_STATUS.PROCESSING,
      "Pago aprobado"
    );

    await OrderNotificationService.paymentApproved({
      customerEmail:
        order.customer_email,
      customerName:
        order.customer_name,
      order_number:
        order.order_number ??
        order.id,
    });

    return true;
  }
    static async reject(
    orderId: string,
    reason?: string
  ) {
    const order =
      await OrderRepository.findById(
        orderId
      );

    if (!order) {
      throw new Error(
        "Pedido no encontrado."
      );
    }

    await OrderRepository.updatePaymentStatus(
      orderId,
      PAYMENT_STATUS.REJECTED
    );

    await OrderRepository.updateStatus(
      orderId,
      ORDER_STATUS.CANCELLED
    );

    await OrderRepository.updateRejectionReason(
      orderId,
      reason ?? null
    );

    await OrderHistoryService.create(
      order.id,
      ORDER_STATUS.CANCELLED,
      reason ??
        "Pago rechazado"
    );

    await OrderNotificationService.paymentRejected({
      customerEmail:
        order.customer_email,
      customerName:
        order.customer_name,
      order_number:
        order.order_number ??
        order.id,
      reason,
    });

    return true;
  }
    static async ship(
    orderId: string
  ) {
    const order =
      await OrderRepository.findById(
        orderId
      );

    if (!order) {
      throw new Error(
        "Pedido no encontrado."
      );
    }

    await OrderRepository.updateStatus(
      orderId,
      ORDER_STATUS.SHIPPED
    );

    await OrderRepository.updateShippedAt(
      orderId
    );

    await OrderHistoryService.create(
      order.id,
      ORDER_STATUS.SHIPPED,
      "Pedido enviado."
    );

    await OrderNotificationService.orderShipped({
      customerEmail:
        order.customer_email,
      customerName:
        order.customer_name,
      order_number:
        order.order_number ??
        order.id,
    });

    return true;
  }

  static async deliver(
    orderId: string
  ) {
    const order =
      await OrderRepository.findById(
        orderId
      );

    if (!order) {
      throw new Error(
        "Pedido no encontrado."
      );
    }

    await OrderRepository.updateStatus(
      orderId,
      ORDER_STATUS.DELIVERED
    );

    await OrderRepository.updateDeliveredAt(
      orderId
    );

    await OrderHistoryService.create(
      order.id,
      ORDER_STATUS.DELIVERED,
      "Pedido entregado."
    );

    await OrderNotificationService.orderDelivered({
      customerEmail:
        order.customer_email,
      customerName:
        order.customer_name,
      order_number:
        order.order_number ??
        order.id,
    });

    return true;
  }
}