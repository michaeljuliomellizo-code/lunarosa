export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

export const PAYMENT_STATUS = {
  PENDING: "pending",
  WAITING_VALIDATION: "waiting_validation",
  PAID: "paid",
  REJECTED: "rejected",
  REFUNDED: "refunded",
} as const;

export const PAYMENT_METHOD = {
  CASH_ON_DELIVERY: "contraentrega",
  TRANSFER: "transferencia",
  NEQUI: "nequi",
  DAVIPLATA: "daviplata",
  PSE: "pse",
  LLAVE: "llave",
} as const;

export const PAYMENT_METHODS_REQUIRING_PROOF: PaymentMethod[] = [
  PAYMENT_METHOD.TRANSFER,
  PAYMENT_METHOD.NEQUI,
  PAYMENT_METHOD.DAVIPLATA,
  PAYMENT_METHOD.PSE,
  PAYMENT_METHOD.LLAVE,
] as const;

export type OrderStatus =
  (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export type PaymentStatus =
  (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export type PaymentMethod =
  (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];