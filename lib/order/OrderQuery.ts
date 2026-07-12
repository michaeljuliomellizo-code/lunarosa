import { OrderRepository } from "./OrderRepository";
import { OrderItemsRepository } from "./OrderItemsRepository";

import {
  ORDER_STATUS,
  PAYMENT_STATUS,
} from "./constants";

export class OrderQuery {
  static async findById(
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

    return order;
  }

  static async findWithItems(
    orderId: string
  ) {
    const order =
      await this.findById(
        orderId
      );

    const items =
      await OrderItemsRepository.findByOrder(
        orderId
      );

    return {
      ...order,
      order_items: items,
    };
  }

  static async list(
    limit = 100
  ) {
    return await OrderRepository.list(
      limit
    );
  }

  static async findByCustomer(
    email: string
  ) {
    const orders =
      await OrderRepository.list(
        1000
      );

    return orders.filter(
      (order: any) =>
        order.customer_email ===
        email
    );
  }

  static async findPendingPayments() {
    const orders =
      await OrderRepository.list(
        1000
      );

    return orders.filter(
      (order: any) =>
        order.payment_status ===
        PAYMENT_STATUS.WAITING_VALIDATION
    );
  }

  static async findPendingOrders() {
    const orders =
      await OrderRepository.list(
        1000
      );

    return orders.filter(
      (order: any) =>
        order.status ===
        ORDER_STATUS.PENDING
    );
  }

  static async findProcessingOrders() {
    const orders =
      await OrderRepository.list(
        1000
      );

    return orders.filter(
      (order: any) =>
        order.status ===
        ORDER_STATUS.PROCESSING
    );
  }

  static async findShippedOrders() {
    const orders =
      await OrderRepository.list(
        1000
      );

    return orders.filter(
      (order: any) =>
        order.status ===
        ORDER_STATUS.SHIPPED
    );
  }

  static async findDeliveredOrders() {
    const orders =
      await OrderRepository.list(
        1000
      );

    return orders.filter(
      (order: any) =>
        order.status ===
        ORDER_STATUS.DELIVERED
    );
  }

  static async findCancelledOrders() {
    const orders =
      await OrderRepository.list(
        1000
      );

    return orders.filter(
      (order: any) =>
        order.status ===
        ORDER_STATUS.CANCELLED
    );
  }
}