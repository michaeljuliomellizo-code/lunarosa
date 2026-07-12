"use client";

export type OrderAdminAction =
  | "approve"
  | "reject"
  | "processing"
  | "ship"
  | "deliver"
  | "cancel";

export class OrderAdminClient {
  static async execute(
    orderId: string,
    action: OrderAdminAction,
    body?: unknown
  ) {
    const response = await fetch(
      `/api/admin/orders/${orderId}/${action}`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: body
          ? JSON.stringify(body)
          : undefined,
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ??
          "Error procesando el pedido."
      );
    }

    return result;
  }

  static approvePayment(
    orderId: string
  ) {
    return this.execute(
      orderId,
      "approve"
    );
  }

  static rejectPayment(
    orderId: string,
    reason: string
  ) {
    return this.execute(
      orderId,
      "reject",
      {
        reason,
      }
    );
  }

  static processing(
    orderId: string
  ) {
    return this.execute(
      orderId,
      "processing"
    );
  }

  static shipped(
    orderId: string,
    carrier = "",
    trackingNumber = ""
  ) {
    return this.execute(
      orderId,
      "ship",
      {
        carrier,
        trackingNumber,
      }
    );
  }

  static delivered(
    orderId: string
  ) {
    return this.execute(
      orderId,
      "deliver"
    );
  }

  static cancel(
    orderId: string
  ) {
    return this.execute(
      orderId,
      "cancel"
    );
  }
}