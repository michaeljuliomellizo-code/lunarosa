import { OrderService } from "./OrderService";

import { OrderHistoryService } from "./OrderHistoryService";

import {
  ORDER_STATUS,
  PAYMENT_STATUS,
} from "./constants";

import { InventoryService } from "@/lib/inventory/InventoryService";

import { CustomerService } from "@/lib/customer/CustomerService";

import { LoyaltyService } from "@/lib/loyalty/LoyaltyService";

import { ReferralService } from "@/lib/referral/ReferralService";

import { OrderNotificationService } from "./OrderNotificationService";

export class OrderWorkflowService {
  //---------------------------------------------------
  // Aprobar Pago
  //---------------------------------------------------

  static async approvePayment(
    orderId: string
  ) {
    //----------------------------------
    // Pedido
    //----------------------------------

    const order =
      await OrderService.findWithRelations(
        orderId
      );

    if (!order) {
      throw new Error(
        "Pedido no encontrado."
      );
    }

    //----------------------------------
    // Actualizar pago
    //----------------------------------

    await OrderService.updatePaymentStatus(
      orderId,
      PAYMENT_STATUS.PAID
    );

    //----------------------------------
    // Estado
    //----------------------------------

    await OrderService.updateStatus(
      orderId,
      ORDER_STATUS.PROCESSING
    );

    //----------------------------------
    // Historial
    //----------------------------------

    await OrderHistoryService.create(
      orderId,
      ORDER_STATUS.PROCESSING,
      "Pago aprobado por administrador."
    );

    //----------------------------------
    // Inventario
    //----------------------------------

    await InventoryService.discountStock(
      order.order_items.map(
        (item: any) => ({
          id: item.product_id,

          variant_id:
            item.variant_id,

          quantity:
            item.quantity,

          name:
            item.products?.name ??
            "Producto",
        })
      ),
      order.id,
      order.order_number
    );

    //----------------------------------
    // Cliente
    //----------------------------------

    await CustomerService.registerPurchase(
      {
        name:
          order.customer_name,

        email:
          order.customer_email,

        phone:
          order.customer_phone,

        total:
          Number(order.total),
      }
    );

    //----------------------------------
    // Fidelización
    //----------------------------------

    try {
      await LoyaltyService.processPurchase(
        {
          email:
            order.customer_email,

          orderId:
            order.id,

          total:
            Number(order.total),
        }
      );
    } catch {}

    //----------------------------------
    // Referidos
    //----------------------------------

    try {
      await ReferralService.processPurchase(
        order.customer_email,
        Number(order.total)
      );
    } catch {}

    //----------------------------------
    // Notificación
    //----------------------------------

    try {
      await OrderNotificationService.paymentApproved(
        {
          
          order_number:
            order.order_number,

          customerName:
            order.customer_name,

          customerEmail:
            order.customer_email,

          
        }
      );
    } catch {}

    return true;
  }
}