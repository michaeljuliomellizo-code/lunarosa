"use client";

import CustomerSection from "./CustomerSection";
import ShippingSection from "./ShippingSection";
import PaymentSection from "./PaymentSection";
import OrderSummary from "./OrderSummary";
import CheckoutActions from "./CheckoutActions";

import { useCheckout } from "@/hooks/useCheckout";

export default function CheckoutForm() {
  const checkout = useCheckout();

  if (!checkout.mounted) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <div className="animate-pulse">
          Cargando checkout...
        </div>
      </div>
    );
  }
  console.log("CheckoutForm items:", checkout.items);
  return (
    <form
      onSubmit={checkout.handleSubmit}
      className="space-y-6 max-w-5xl mx-auto"
    >
      <CustomerSection
        customerName={checkout.customerName}
        setCustomerName={checkout.setCustomerName}
        customerEmail={checkout.customerEmail}
        setCustomerEmail={checkout.setCustomerEmail}
        customerPhone={checkout.customerPhone}
        setCustomerPhone={checkout.setCustomerPhone}
        notes={checkout.notes}
        setNotes={checkout.setNotes}
        referralCode={checkout.referralCode}
        setReferralCode={checkout.setReferralCode}
        loading={checkout.loading}
      />

      <ShippingSection
        department={checkout.department}
        setDepartment={checkout.setDepartment}
        municipality={checkout.municipality}
        setMunicipality={checkout.setMunicipality}
        shippingAddress={checkout.shippingAddress}
        setShippingAddress={checkout.setShippingAddress}
        shippingCost={checkout.shippingCost}
        shippingLoading={checkout.shippingLoading}
        shippingAvailable={checkout.shippingAvailable}
        estimatedDays={checkout.estimatedDays}
        loading={checkout.loading}
      />
            <PaymentSection
        paymentMethod={checkout.paymentMethod}
        setPaymentMethod={checkout.setPaymentMethod}
        paymentReference={checkout.paymentReference}
        setPaymentReference={checkout.setPaymentReference}
        paymentFile={checkout.paymentFile}
        setPaymentFile={checkout.setPaymentFile}
        allowCashOnDelivery={checkout.allowCashOnDelivery}
        loading={checkout.loading}
      />

      <OrderSummary
        items={checkout.items}
        subtotal={checkout.subtotal}
        discount={checkout.discount}
        shippingCost={checkout.shippingCost}
        shippingLoading={checkout.shippingLoading}
        shippingAvailable={checkout.shippingAvailable}
        estimatedDays={checkout.estimatedDays}
        deliveryEstimate={checkout.deliveryEstimate}
        couponCode={checkout.couponCode}
        totalProducts={checkout.totalProducts}
        total={checkout.total}
      />

      <CheckoutActions
        loading={checkout.loading}
        disabled={
          checkout.loading ||
          checkout.items.length === 0 ||
          !checkout.shippingAvailable
        }
      />
        
    </form>
  );
}