import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export class NotificationService {
  private static async create(
    title: string,
    message: string
  ) {
    const { error } = await supabase
      .from("notifications")
      .insert({
        title,
        message,
        read: false,
      });

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }

  //------------------------------------
  // NUEVO PEDIDO
  //------------------------------------

  static async newOrder(
    orderId: string,
    customerName: string
  ) {
    return this.create(
      "Nuevo pedido",
      `Se creó el pedido ${orderId} del cliente ${customerName}.`
    );
  }

  //------------------------------------
  // PAGO APROBADO
  //------------------------------------

  static async paymentApproved(
    orderId: string
  ) {
    return this.create(
      "Pago aprobado",
      `El pago del pedido ${orderId} fue aprobado.`
    );
  }

  //------------------------------------
  // PAGO RECHAZADO
  //------------------------------------

  static async paymentRejected(
    orderId: string,
    reason?: string
  ) {
    return this.create(
      "Pago rechazado",
      reason
        ? `El pago del pedido ${orderId} fue rechazado. Motivo: ${reason}`
        : `El pago del pedido ${orderId} fue rechazado.`
    );
  }

  //------------------------------------
  // PEDIDO EN PREPARACIÓN
  //------------------------------------

  static async orderProcessing(
    orderId: string
  ) {
    return this.create(
      "Pedido en preparación",
      `El pedido ${orderId} comenzó su proceso de preparación.`
    );
  }

  //------------------------------------
  // PEDIDO ENVIADO
  //------------------------------------

  static async orderShipped(
    orderId: string
  ) {
    return this.create(
      "Pedido enviado",
      `El pedido ${orderId} fue enviado.`
    );
  }

  //------------------------------------
  // PEDIDO ENTREGADO
  //------------------------------------

  static async orderDelivered(
    orderId: string
  ) {
    return this.create(
      "Pedido entregado",
      `El pedido ${orderId} fue entregado.`
    );
  }

  //------------------------------------
  // PEDIDO CANCELADO
  //------------------------------------

  static async orderCancelled(
    orderId: string
  ) {
    return this.create(
      "Pedido cancelado",
      `El pedido ${orderId} fue cancelado.`
    );
  }

  //------------------------------------
  // STOCK BAJO
  //------------------------------------

  static async lowStock(
    productName: string,
    stock: number
  ) {
    return this.create(
      "Stock bajo",
      `${productName} tiene solamente ${stock} unidades disponibles.`
    );
  }

  //------------------------------------
  // PRODUCTO AGOTADO
  //------------------------------------

  static async outOfStock(
    productName: string
  ) {
    return this.create(
      "Producto agotado",
      `${productName} se encuentra sin inventario.`
    );
  }

  //------------------------------------
  // ERROR SISTEMA
  //------------------------------------

  static async systemError(
    message: string
  ) {
    return this.create(
      "Error del sistema",
      message
    );
  }
}