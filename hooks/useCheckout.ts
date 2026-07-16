"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useCartStore } from "@/store/cartStore";

import { PaymentMethod } from "@/lib/order/constants";
import { ShippingService } from "@/lib/shipping/ShippingService";
import { isBogota } from "@/lib/shipping/isBogota";
import { getDeliveryEstimate } from "@/lib/shipping/DeliveryTime";

import { CheckoutValidator } from "@/lib/checkout/CheckoutValidator";
import { CheckoutService } from "@/lib/checkout/CheckoutService";
import { PaymentProofService } from "@/lib/checkout/PaymentProofService";

export function useCheckout() {

  //------------------------------------------------------
  // Router
  //------------------------------------------------------

  const router = useRouter();

  const submittingRef = useRef(false);

  //------------------------------------------------------
  // Cart Store
  //------------------------------------------------------

  const items = useCartStore(
    (state) => state.items
  );

  const subtotal = useCartStore(
    (state) => state.getSubtotal()
  );

  const discount = useCartStore(
    (state) => state.getDiscountAmount()
  );

  const couponCode = useCartStore(
    (state) => state.couponCode
  );

  const totalProducts = useCartStore(
    (state) => state.getItemsCount()
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  //------------------------------------------------------
  // Estados generales
  //------------------------------------------------------

  const [mounted, setMounted] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  //------------------------------------------------------
  // Cliente
  //------------------------------------------------------

  const [customerName, setCustomerName] =
    useState("");

  const [customerEmail, setCustomerEmail] =
    useState("");

  const [customerPhone, setCustomerPhone] =
    useState("");

  //------------------------------------------------------
  // Dirección
  //------------------------------------------------------

  const [department, setDepartment] =
    useState("");

  const [municipality, setMunicipality] =
    useState("");

  const [shippingAddress, setShippingAddress] =
    useState("");

  //------------------------------------------------------
  // Pedido
  //------------------------------------------------------

  const [notes, setNotes] =
    useState("");

  const [referralCode, setReferralCode] =
    useState("");

  //------------------------------------------------------
  // Pago
  //------------------------------------------------------

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState<PaymentMethod>(
    "contraentrega"
  );

  const [
    paymentReference,
    setPaymentReference,
  ] = useState("");

  const [
    paymentFile,
    setPaymentFile,
  ] = useState<File | null>(null);

  //------------------------------------------------------
  // Envío
  //------------------------------------------------------

  const [
    shippingCost,
    setShippingCost,
  ] = useState(0);

  const [
    shippingLoading,
    setShippingLoading,
  ] = useState(false);

  const [
    shippingAvailable,
    setShippingAvailable,
  ] = useState(true);

  const [
    estimatedDays,
    setEstimatedDays,
  ] = useState<number | null>(null);

  //------------------------------------------------------
  // Derivados
  //------------------------------------------------------

  const bogotaShipping =
    isBogota(
      department,
      municipality
    );

  const allowCashOnDelivery =
    bogotaShipping;

  const deliveryEstimate =
    getDeliveryEstimate(
      department,
      municipality
    );

  const total =
    subtotal -
    discount +
    shippingCost;
	
  //------------------------------------------------------
  // Calcular envío
  //------------------------------------------------------

  const calculateShipping = async (
    currentDepartment: string,
    currentMunicipality: string
  ) => {

    if (
      !currentDepartment ||
      !currentMunicipality
    ) {

      setShippingCost(0);

      setShippingAvailable(true);

      setEstimatedDays(null);

      return;

    }

    setShippingLoading(true);

    try {

      const result =
        await ShippingService.calculate(
          currentDepartment,
          currentMunicipality
        );

      setShippingCost(
        result.price
      );

      setShippingAvailable(
        result.available
      );

      setEstimatedDays(
        result.estimated_days
      );

    } catch (error) {

      console.error(
        "Error calculando envío",
        error
      );

      setShippingCost(0);

      setShippingAvailable(false);

      setEstimatedDays(null);

    } finally {

      setShippingLoading(false);

    }

  };

  //------------------------------------------------------
  // Reiniciar formulario
  //------------------------------------------------------

  const resetForm = () => {

    setCustomerName("");

    setCustomerEmail("");

    setCustomerPhone("");

    setDepartment("");

    setMunicipality("");

    setShippingAddress("");

    setNotes("");

    setReferralCode("");

    setPaymentMethod(
      "contraentrega"
    );

    setPaymentReference("");

    setPaymentFile(null);

    setShippingCost(0);

    setEstimatedDays(null);

    setShippingAvailable(true);

  };

  //------------------------------------------------------
  // Inicialización
  //------------------------------------------------------

  useEffect(() => {

    setMounted(true);

  }, []);

  //------------------------------------------------------
  // Recalcular envío
  //------------------------------------------------------

  useEffect(() => {

    calculateShipping(
      department,
      municipality
    );

  }, [
    department,
    municipality,
    subtotal,
  ]);

  //------------------------------------------------------
  // Contraentrega solo Bogotá
  //------------------------------------------------------

  useEffect(() => {

    if (
      !allowCashOnDelivery &&
      paymentMethod ===
        "contraentrega"
    ) {

      setPaymentMethod(
        "nequi"
      );

    }

  }, [
    allowCashOnDelivery,
    paymentMethod,
  ]);

  //------------------------------------------------------
  // Limpiar datos de pago
  //------------------------------------------------------

  useEffect(() => {

    if (
      paymentMethod ===
      "contraentrega"
    ) {

      setPaymentReference("");

      setPaymentFile(null);

    }

  }, [paymentMethod]);

  //------------------------------------------------------
  // Carrito abandonado
  //------------------------------------------------------

  useEffect(() => {

    if (
      !customerEmail ||
      items.length === 0
    ) {

      return;

    }

    const timer =
      setTimeout(async () => {

        try {

          await fetch(
            "/api/abandoned-cart",
            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

              },

              body: JSON.stringify({

                email:
                  customerEmail,

                customer_name:
                  customerName,

                items,

                total,

              }),

            }
          );

        } catch (error) {

          console.error(
            "ABANDONED CART",
            error
          );

        }

      }, 5000);

    return () =>
      clearTimeout(timer);

  }, [

    customerEmail,

    customerName,

    items,

    total,

  ]);
  
    //------------------------------------------------------
  // Crear pedido
  //------------------------------------------------------

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (submittingRef.current) {
      return;
    }

    submittingRef.current = true;

    setLoading(true);

    try {

      //--------------------------------------------------
      // Validar Checkout
      //--------------------------------------------------

      CheckoutValidator.validate({

        itemsCount: items.length,

        shippingAvailable,

        department,

        municipality,

        shippingAddress,

        paymentMethod,

        paymentReference,

        paymentFile,

      });

      //--------------------------------------------------
      // Subir comprobante
      //--------------------------------------------------

      let paymentProofUrl = "";

      if (
        paymentMethod !==
          "contraentrega" &&
        paymentFile
      ) {

        paymentProofUrl =
          await PaymentProofService.upload(
            paymentFile
          );

      }

      //--------------------------------------------------
      // Crear pedido
      //--------------------------------------------------

      const order =
        await CheckoutService.createOrder({

          customer_name:
            customerName,

          customer_email:
            customerEmail,

          customer_phone:
            customerPhone,

          department,

          municipality,

          shipping_address:
            shippingAddress,

          notes,

          subtotal,

          shipping:
            shippingCost,

          total,

          coupon_code:
            couponCode,

          referral_code:
            referralCode,

          payment_method:
            paymentMethod,

          payment_reference:
            paymentReference,

          payment_proof:
            paymentProofUrl,

          items: items.map(
            (item) => ({

              id: item.id,

              variant_id:
                item.variant_id ??
                null,

              quantity:
                item.quantity,

              price:
                item.price,

            })
          ),

        });

      //--------------------------------------------------
      // Limpiar carrito
      //--------------------------------------------------

      clearCart();

      resetForm();

      //--------------------------------------------------
      // Redireccionar
      //--------------------------------------------------

      router.replace(
        `/pago/${order.orderId}`
      );

    } catch (error: any) {

      console.error(error);

      alert(

        error.message ??

        "Error al crear el pedido."

      );

    } finally {

      submittingRef.current = false;

      setLoading(false);

    }

  };
  
    //------------------------------------------------------
  // Exportar Hook
  //------------------------------------------------------

  return {

    //--------------------------------------------------
    // Estado
    //--------------------------------------------------

    mounted,

    loading,

    //--------------------------------------------------
    // Carrito
    //--------------------------------------------------

    items,

    subtotal,

    discount,

    total,

    totalProducts,

    couponCode,

    //--------------------------------------------------
    // Cliente
    //--------------------------------------------------

    customerName,

    setCustomerName,

    customerEmail,

    setCustomerEmail,

    customerPhone,

    setCustomerPhone,

    //--------------------------------------------------
    // Dirección
    //--------------------------------------------------

    department,

    setDepartment,

    municipality,

    setMunicipality,

    shippingAddress,

    setShippingAddress,

    //--------------------------------------------------
    // Envío
    //--------------------------------------------------

    shippingCost,

    shippingLoading,

    shippingAvailable,

    estimatedDays,

    calculateShipping,

    bogotaShipping,

    allowCashOnDelivery,

    deliveryEstimate,

    //--------------------------------------------------
    // Pedido
    //--------------------------------------------------

    notes,

    setNotes,

    referralCode,

    setReferralCode,

    //--------------------------------------------------
    // Pago
    //--------------------------------------------------

    paymentMethod,

    setPaymentMethod,

    paymentReference,

    setPaymentReference,

    paymentFile,

    setPaymentFile,

    //--------------------------------------------------
    // Acciones
    //--------------------------------------------------

    handleSubmit,

  };

}