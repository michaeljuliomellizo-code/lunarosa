export interface CheckoutCustomerData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface CheckoutShippingData {
  department: string;
  municipality: string;
  shippingAddress: string;
  shippingCost: number;
  shippingLoading: boolean;
  shippingAvailable: boolean;
  estimatedDays: number | null;
}

export interface CheckoutPaymentData {
  paymentMethod: string;
  paymentReference: string;
  paymentFile: File | null;
}

export interface CheckoutExtraData {
  notes: string;
  referralCode: string;
  couponCode: string | null;
}

export interface CheckoutTotals {
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  totalProducts: number;
}

export interface CheckoutItem {
  id: string;
  productId: string;
  name: string;
  slug?: string;
  image?: string;
  color?: string;
  size?: string;
  price: number;
  quantity: number;
}

export interface CustomerSectionProps {
  loading: boolean;

  customerName: string;
  customerEmail: string;
  customerPhone: string;

  department: string;
  municipality: string;
  shippingAddress: string;

  referralCode: string;
  notes: string;

  onCustomerNameChange: (value: string) => void;
  onCustomerEmailChange: (value: string) => void;
  onCustomerPhoneChange: (value: string) => void;

  onDepartmentChange: (value: string) => void;
  onMunicipalityChange: (value: string) => void;
  onShippingAddressChange: (value: string) => void;

  onReferralCodeChange: (value: string) => void;
  onNotesChange: (value: string) => void;
}

export interface PaymentSectionProps {
  loading: boolean;

  paymentMethod: string;
  paymentReference: string;
  paymentFile: File | null;

  onPaymentMethodChange: (value: string) => void;
  onPaymentReferenceChange: (value: string) => void;
  onPaymentFileChange: (file: File | null) => void;
}

export interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  totalProducts: number;
  couponCode: string | null;
  mounted: boolean;
}