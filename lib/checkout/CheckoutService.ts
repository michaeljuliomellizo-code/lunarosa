import { CreateOrderInput } from "@/lib/order/types";

export interface CheckoutResponse {
  orderId: string;
}

export class CheckoutService {

  //----------------------------------------------------------
  // Crear pedido
  //----------------------------------------------------------

  static async createOrder(
    payload: CreateOrderInput
  ): Promise<CheckoutResponse> {

    const response = await fetch(
      "/api/order",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          payload
        ),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.error ??
        "No fue posible crear el pedido."
      );

    }

    return {

      orderId:
        data.orderId,

    };

  }

}