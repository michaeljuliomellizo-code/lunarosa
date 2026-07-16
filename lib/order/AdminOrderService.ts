import { AdminOrderRepository } from "./AdminOrderRepository";

import {
  ORDER_STATUS,
  PAYMENT_STATUS,
  OrderStatus,
  PaymentStatus,
} from "./constants";

import { OrderNotificationService } from "./OrderNotificationService";

export class AdminOrderService {
  static async getOrders() {
    return await AdminOrderRepository.getAll();
  }

  static async getOrder(id: string) {
    return await AdminOrderRepository.getById(id);
  }

  static async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
    notes?: string
  ) {
    await AdminOrderRepository.updateStatus(
      orderId,
      status
    );

    await AdminOrderRepository.addHistory(
      orderId,
      status,
      notes
    );

    const notification =
      await AdminOrderRepository.getNotificationData(
        orderId
      );

    switch (status) {
      case ORDER_STATUS.PROCESSING:
        await OrderNotificationService.orderProcessing(
          notification
        );
        break;

      case ORDER_STATUS.SHIPPED:
        await OrderNotificationService.orderShipped(
          notification
        );
        break;

      case ORDER_STATUS.DELIVERED:
        await OrderNotificationService.orderDelivered(
          notification
        );
        break;

      case ORDER_STATUS.CANCELLED:
        await OrderNotificationService.orderCancelled({
          ...notification,
          reason: notes,
        });
        break;
    }

    return true;
  }

  static async updatePaymentStatus(
    orderId: string,
    paymentStatus: PaymentStatus,
    reason?: string
  ) {
    await AdminOrderRepository.updatePaymentStatus(
      orderId,
      paymentStatus
    );

    const notification =
      await AdminOrderRepository.getNotificationData(
        orderId
      );

    switch (paymentStatus) {
      case PAYMENT_STATUS.PAID:
        await OrderNotificationService.paymentApproved(
          notification
        );
        break;

      case PAYMENT_STATUS.REJECTED:
        await OrderNotificationService.paymentRejected({
          ...notification,
          reason,
        });
        break;
    }

    return true;
  }

  static async updateTracking(
    orderId: string,
    trackingNumber: string,
    carrier: string,
    trackingUrl?: string
  ) {
    await AdminOrderRepository.updateTracking(
      orderId,
      trackingNumber,
      carrier,
      trackingUrl
    );

    return true;
  }

  static async updateCarrier(
    orderId: string,
    carrier: string
  ) {
    await AdminOrderRepository.updateCarrier(
      orderId,
      carrier
    );

    return true;
  }

  static async updateGuide(
    orderId: string,
    guide: string
  ) {
    await AdminOrderRepository.updateGuide(
      orderId,
      guide
    );

    return true;
  }
}