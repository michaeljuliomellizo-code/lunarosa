import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "./constants";

export interface OrderItemInput {
  id: string;

  variant_id?: string | null;

  quantity: number;

  price: number;
}

export interface CreateOrderInput {
  customer_name: string;

  customer_email: string;

  customer_phone?: string;

  shipping_address: string;

  notes?: string;

  payment_method: PaymentMethod;

  payment_reference?: string | null;

  payment_proof?: string | null;

  coupon_code?: string | null;

  referral_code?: string | null;

  subtotal: number;

  shipping: number;

  total: number;

  items: OrderItemInput[];
}

export interface OrderSummary {
  id: string;

  orderNumber: string;

  customer_name: string;

  customer_email: string;

  customer_phone?: string | null;

  shipping_address?: string | null;

  notes?: string | null;

  subtotal: number;

  shipping: number;

  total: number;

  coupon_code?: string | null;

  referral_code?: string | null;

  payment_method: PaymentMethod;

  payment_reference?: string | null;

  payment_proof?: string | null;

  payment_status: PaymentStatus;

  status: OrderStatus;

  rejection_reason?: string | null;

  shipped_at?: string | null;

  delivered_at?: string | null;

  created_at: string;

  updated_at?: string;
}

export interface OrderItem {
  id: string;

  order_id: string;

  product_id: string;

  variant_id?: string | null;

  quantity: number;

  price: number;

  products?: {
    id: string;
    name: string;
    slug?: string;
    image?: string | null;
    price?: number;
  };

  product_variants?: {
    id: string;
    size?: string | null;
    color?: string | null;
  };
}

export interface OrderWithRelations
  extends OrderSummary {
  order_items: OrderItem[];

  order_status_history?: any[];
}