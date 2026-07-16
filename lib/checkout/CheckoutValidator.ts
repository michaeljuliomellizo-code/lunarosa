import { PaymentMethod } from "@/lib/order/constants";

export interface CheckoutValidationData {

  itemsCount: number;

  shippingAvailable: boolean;

  department: string;

  municipality: string;

  shippingAddress: string;

  paymentMethod: PaymentMethod;

  paymentReference: string;

  paymentFile: File | null;

}

export class CheckoutValidator {

  //----------------------------------------------------------
  // Validar checkout completo
  //----------------------------------------------------------

  static validate(
    data: CheckoutValidationData
  ) {

    if (data.itemsCount === 0) {

      throw new Error(
        "El carrito está vacío."
      );

    }

    if (!data.shippingAvailable) {

      throw new Error(
        "Actualmente no realizamos envíos a este municipio."
      );

    }

    if (
      !data.department ||
      !data.municipality ||
      !data.shippingAddress
    ) {

      throw new Error(
        "Debes completar la dirección de envío."
      );

    }

    if (
      data.paymentMethod !== "contraentrega"
    ) {

      if (!data.paymentReference.trim()) {

        throw new Error(
          "Debes ingresar la referencia del pago."
        );

      }

      if (!data.paymentFile) {

        throw new Error(
          "Debes adjuntar el comprobante del pago."
        );

      }

    }

  }

}