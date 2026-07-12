import { PAYMENT_METHODS_REQUIRING_PROOF,  PaymentMethod,} from "@/lib/order/constants";

import {
  CreateOrderInput,
  OrderItemInput,
} from "./types";

export class OrderValidator {
  static validate(
    data: CreateOrderInput
  ) {
    if (!data.customer_name?.trim()) {
      throw new Error(
        "El nombre del cliente es obligatorio."
      );
    }

    if (!data.customer_email?.trim()) {
      throw new Error(
        "El correo electrónico es obligatorio."
      );
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        data.customer_email
      )
    ) {
      throw new Error(
        "El correo electrónico no es válido."
      );
    }

    if (!data.customer_phone?.trim()) {
      throw new Error(
        "El teléfono es obligatorio."
      );
    }

    if (!data.shipping_address?.trim()) {
      throw new Error(
        "La dirección de envío es obligatoria."
      );
    }

    if (!data.payment_method) {
      throw new Error(
        "Debe seleccionar un método de pago."
      );
    }

    if (
      PAYMENT_METHODS_REQUIRING_PROOF.includes( data.payment_method as PaymentMethod )
    ) {
      if (!data.payment_reference?.trim()) {
        throw new Error(
          "Debe ingresar el número de referencia del pago."
        );
      }

      if (!data.payment_proof?.trim()) {
        throw new Error(
          "Debe subir el comprobante del pago."
        );
      }
    }

    if (
      !Array.isArray(data.items) ||
      data.items.length === 0
    ) {
      throw new Error(
        "El pedido no contiene productos."
      );
    }

    data.items.forEach((item) =>
      this.validateItem(item)
    );

    if (Number(data.subtotal) < 0) {
      throw new Error(
        "Subtotal inválido."
      );
    }

    if (Number(data.shipping) < 0) {
      throw new Error(
        "Valor de envío inválido."
      );
    }

    if (Number(data.total) <= 0) {
      throw new Error(
        "El total debe ser mayor a cero."
      );
    }
  }

  private static validateItem(
    item: OrderItemInput
  ) {
    if (!item.id) {
      throw new Error(
        "Uno de los productos no tiene ID."
      );
    }

    if (
      Number(item.quantity) <= 0
    ) {
      throw new Error(
        "Cantidad inválida."
      );
    }

    if (
      Number(item.price) <= 0
    ) {
      throw new Error(
        "Precio inválido."
      );
    }
  }
}