"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

import { useCartStore } from "@/store/cartStore";

export default function CheckoutForm() {
  const router = useRouter();

  const submittingRef =
    useRef(false);

  const items = useCartStore(
    (state) => state.items
  );

  const subtotal =
    useCartStore((state) =>
      state.getSubtotal()
    );

  const total =
    useCartStore((state) =>
      state.getTotal()
    );

  const couponCode =
    useCartStore((state) =>
      state.couponCode
    );

  const clearCart =
    useCartStore((state) =>
      state.clearCart
    );

  const [mounted, setMounted] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [
    customerName,
    setCustomerName,
  ] = useState("");

  const [
    customerEmail,
    setCustomerEmail,
  ] = useState("");

  const [
    customerPhone,
    setCustomerPhone,
  ] = useState("");

  const [
    shippingAddress,
    setShippingAddress,
  ] = useState("");

  const [notes, setNotes] =
    useState("");

  const [
    referralCode,
    setReferralCode,
  ] = useState("");

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState(
    "contraentrega"
  );

  const [
    paymentReference,
    setPaymentReference,
  ] = useState("");

  const [
    paymentFile,
    setPaymentFile,
  ] = useState<File | null>(
    null
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer =
      setTimeout(async () => {
        if (
          customerEmail &&
          items.length > 0
        ) {
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
            console.error(error);
          }
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
    async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (submittingRef.current) {
      return;
    }

    if (items.length === 0) {
      alert(
        "El carrito está vacío."
      );
      return;
    }

    submittingRef.current = true;
    setLoading(true);

    const orderItems = items.map(
      (item) => ({
        ...item,
      })
    );

    try {
      let paymentProofUrl = "";

      if (
        paymentMethod !==
          "contraentrega" &&
        paymentFile
      ) {
        const extension =
          paymentFile.name
            .split(".")
            .pop();

        const fileName =
          `${Date.now()}_${crypto.randomUUID()}.${extension}`;

        const {
          error: uploadError,
        } =
          await supabase.storage
            .from(
              "payment-proofs"
            )
            .upload(
              fileName,
              paymentFile
            );

        if (uploadError) {
          throw new Error(
            uploadError.message
          );
        }

        const { data } =
          supabase.storage
            .from(
              "payment-proofs"
            )
            .getPublicUrl(
              fileName
            );

        paymentProofUrl =
          data.publicUrl;
      }
      console.log(orderItems);
      const response =
        await fetch(
          "/api/order",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              customer_name:
                customerName,
              customer_email:
                customerEmail,
              customer_phone:
                customerPhone,
              shipping_address:
                shippingAddress,
              notes,
              subtotal,
              shipping: 0,
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
              items:
                orderItems,
            }),
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

      clearCart();

      router.replace(
        `/pago/${data.orderId}`
      );
    } catch (error: any) {
      alert(
        error.message ??
          "Error al crear el pedido."
      );
    } finally {
      submittingRef.current =
        false;
      setLoading(false);
    }
  }
    if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <div className="animate-pulse">
          Cargando checkout...
        </div>
      </div>
    );
  }

  const totalProducts = items.reduce(
    (total, item) =>
      total + Number(item.quantity),
    0
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="bg-white p-6 rounded-xl border">
        <h2 className="text-2xl font-bold mb-6">
          Datos del Cliente
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Nombre completo"
            value={customerName}
            onChange={(e) =>
              setCustomerName(
                e.target.value
              )
            }
            className="border rounded-lg p-3"
            required
            disabled={loading}
          />

          <input
            type="email"
            placeholder="Correo"
            value={customerEmail}
            onChange={(e) =>
              setCustomerEmail(
                e.target.value
              )
            }
            className="border rounded-lg p-3"
            required
            disabled={loading}
          />

          <input
            type="text"
            placeholder="Teléfono"
            value={customerPhone}
            onChange={(e) =>
              setCustomerPhone(
                e.target.value
              )
            }
            className="border rounded-lg p-3"
            required
            disabled={loading}
          />

          <input
            type="text"
            placeholder="Dirección de entrega"
            value={shippingAddress}
            onChange={(e) =>
              setShippingAddress(
                e.target.value
              )
            }
            className="border rounded-lg p-3"
            required
            disabled={loading}
          />

          <input
            type="text"
            placeholder="Código de referido (opcional)"
            value={referralCode}
            onChange={(e) =>
              setReferralCode(
                e.target.value
              )
            }
            className="border rounded-lg p-3"
            disabled={loading}
          />

        </div>

        <textarea
          placeholder="Notas del pedido"
          value={notes}
          onChange={(e) =>
            setNotes(
              e.target.value
            )
          }
          className="border rounded-lg p-3 w-full mt-4"
          rows={4}
          disabled={loading}
        />

      </div>

      <div className="bg-pink-50 border rounded-xl p-6">

        <h2 className="font-bold text-xl mb-4">
          Método de Pago
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

                    <button
            type="button"
            disabled={loading}
            onClick={() =>
              setPaymentMethod(
                "contraentrega"
              )
            }
            className={`border-2 rounded-2xl p-5 text-left transition-all ${
              paymentMethod ===
              "contraentrega"
                ? "border-pink-500 bg-pink-50"
                : "border-gray-200 bg-white"
            } ${
              loading
                ? "opacity-60 cursor-not-allowed"
                : ""
            }`}
          >
            <div className="text-3xl mb-2">
              🚚
            </div>

            <h3 className="font-bold text-lg">
              Contraentrega
            </h3>

            <p className="text-gray-500 text-sm">
              Paga cuando recibas tu pedido.
            </p>
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              setPaymentMethod("nequi")
            }
            className={`border-2 rounded-2xl p-5 text-left transition-all ${
              paymentMethod ===
              "nequi"
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 bg-white"
            } ${
              loading
                ? "opacity-60 cursor-not-allowed"
                : ""
            }`}
          >
            <div className="text-3xl mb-2">
              💜
            </div>

            <h3 className="font-bold text-lg">
              Nequi
            </h3>

            <p className="text-gray-500 text-sm">
              3123851338
            </p>
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              setPaymentMethod(
                "daviplata"
              )
            }
            className={`border-2 rounded-2xl p-5 text-left transition-all ${
              paymentMethod ===
              "daviplata"
                ? "border-red-500 bg-red-50"
                : "border-gray-200 bg-white"
            } ${
              loading
                ? "opacity-60 cursor-not-allowed"
                : ""
            }`}
          >
            <div className="text-3xl mb-2">
              ❤️
            </div>

            <h3 className="font-bold text-lg">
              Daviplata
            </h3>

            <p className="text-gray-500 text-sm">
              3123851338
            </p>
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              setPaymentMethod("llave")
            }
            className={`border-2 rounded-2xl p-5 text-left transition-all ${
              paymentMethod ===
              "llave"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-white"
            } ${
              loading
                ? "opacity-60 cursor-not-allowed"
                : ""
            }`}
          >
            <div className="text-3xl mb-2">
              🔑
            </div>

            <h3 className="font-bold text-lg">
              Llave
            </h3>

            <p className="text-gray-500 text-sm">
              3204095701
            </p>
          </button>

        </div>

        <div className="mt-6 space-y-2 text-sm">
          <p>
            <strong>Llave:</strong>{" "}
            3204095701
          </p>

          <p>
            <strong>Nequi:</strong>{" "}
            3123851338
          </p>

          <p>
            <strong>Daviplata:</strong>{" "}
            3123851338
          </p>
        </div>

        {paymentMethod !==
          "contraentrega" && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">

            <h3 className="font-bold mb-2">
              Instrucciones de pago
            </h3>

            {paymentMethod ===
              "nequi" && (
              <p>
                Realiza tu pago al número{" "}
                <strong>
                  3123851338
                </strong>
                .
              </p>
            )}

            {paymentMethod ===
              "daviplata" && (
              <p>
                Realiza tu pago al número{" "}
                <strong>
                  3123851338
                </strong>
                .
              </p>
            )}

            {paymentMethod ===
              "llave" && (
              <p>
                Realiza la transferencia usando la llave{" "}
                <strong>
                  3204095701
                </strong>
                .
              </p>
            )}

          </div>
        )}

        {paymentMethod !==
          "contraentrega" && (
          <div className="mt-6 space-y-4">

            <input
              type="text"
              placeholder="Número de referencia del pago"
              value={
                paymentReference
              }
              onChange={(e) =>
                setPaymentReference(
                  e.target.value
                )
              }
              className="border rounded-lg p-3 w-full"
              disabled={loading}
            />

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) =>
                setPaymentFile(
                  e.target.files?.[0] ??
                    null
                )
              }
              className="border rounded-lg p-3 w-full"
              disabled={loading}
            />

          </div>
        )}

      </div>
            <div className="bg-gradient-to-br from-white to-pink-50 border rounded-3xl p-6 shadow-sm">

        <h2 className="font-bold text-xl mb-4">
          Resumen
        </h2>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>

          <span>
            {mounted
              ? `$${Number(
                  subtotal
                ).toLocaleString()}`
              : "$0"}
          </span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Envío</span>

          <span>Gratis</span>
        </div>

        {couponCode && (
          <div className="flex justify-between mb-2 text-green-600">
            <span>Cupón</span>

            <span>
              {couponCode}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm text-gray-500 mb-4">

          <span>
            Productos
          </span>

          <span>
            {totalProducts}
          </span>

        </div>

        <div className="border-t pt-4 mt-4 flex justify-between text-xl font-bold">

          <span>Total</span>

          <span>
            {mounted
              ? `$${Number(
                  total
                ).toLocaleString()}`
              : "$0"}
          </span>

        </div>

      </div>

      <button
        type="submit"
        disabled={
          loading ||
          submittingRef.current ||
          items.length === 0
        }
        className="
          w-full
          bg-gradient-to-r
          from-pink-500
          to-fuchsia-600
          hover:scale-[1.01]
          transition-all
          shadow-lg
          disabled:bg-gray-400
          disabled:cursor-not-allowed
          disabled:opacity-70
          text-white
          py-4
          rounded-xl
          font-semibold
          text-lg
        "
      >
        {loading
          ? "Procesando pedido..."
          : "Crear Pedido"}
      </button>

    </form>
  );
}