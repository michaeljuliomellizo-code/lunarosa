"use client";

import type { PaymentMethod } from "@/lib/order/constants";

interface PaymentSectionProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>;

  paymentReference: string;
  setPaymentReference: React.Dispatch<React.SetStateAction<string>>;

  paymentFile: File | null;
  setPaymentFile: React.Dispatch<React.SetStateAction<File | null>>;

  allowCashOnDelivery: boolean;
  loading: boolean;
}

export default function PaymentSection({
  paymentMethod,
  setPaymentMethod,
  paymentReference,
  setPaymentReference,
  setPaymentFile,
  allowCashOnDelivery,
  loading,
}: PaymentSectionProps) {
  return (
    <div className="bg-pink-50 border rounded-xl p-6">

      <h2 className="font-bold text-xl mb-4">
        Método de Pago
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {allowCashOnDelivery && (
          <button
            type="button"
            disabled={loading}
            onClick={() => setPaymentMethod("contraentrega")}
            className={`border-2 rounded-2xl p-5 text-left transition-all ${
              paymentMethod === "contraentrega"
                ? "border-pink-500 bg-pink-50"
                : "border-gray-200 bg-white"
            } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <div className="text-3xl mb-2">🚚</div>

            <h3 className="font-bold text-lg">
              Contraentrega
            </h3>

            <p className="text-gray-600 text-sm">
              Paga cuando recibas tu pedido.
            </p>
          </button>
        )}

        <button
          type="button"
          disabled={loading}
          onClick={() => setPaymentMethod("nequi")}
          className={`border-2 rounded-2xl p-5 text-left transition-all ${
            paymentMethod === "nequi"
              ? "border-purple-500 bg-purple-50"
              : "border-gray-200 bg-white"
          } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <div className="text-3xl mb-2">💜</div>

          <h3 className="font-bold text-lg">
            Nequi
          </h3>

          <p className="text-gray-600 text-sm">
            3123851338
          </p>
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => setPaymentMethod("daviplata")}
          className={`border-2 rounded-2xl p-5 text-left transition-all ${
            paymentMethod === "daviplata"
              ? "border-red-500 bg-red-50"
              : "border-gray-200 bg-white"
          } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <div className="text-3xl mb-2">❤️</div>

          <h3 className="font-bold text-lg">
            Daviplata
          </h3>

          <p className="text-gray-600 text-sm">
            3123851338
          </p>
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => setPaymentMethod("llave")}
          className={`border-2 rounded-2xl p-5 text-left transition-all ${
            paymentMethod === "llave"
              ? "border-green-500 bg-green-50"
              : "border-gray-200 bg-white"
          } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <div className="text-3xl mb-2">🔑</div>

          <h3 className="font-bold text-lg">
            Llave
          </h3>

          <p className="text-gray-600 text-sm">
            3204095701
          </p>
        </button>

      </div>

      <div className="mt-6 space-y-2 text-sm">

        <p>
          <strong>Llave:</strong> 3204095701
        </p>

        <p>
          <strong>Nequi:</strong> 3123851338
        </p>

        <p>
          <strong>Daviplata:</strong> 3123851338
        </p>

      </div>

      {paymentMethod !== "contraentrega" && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">

          <h3 className="font-bold mb-2">
            Instrucciones de pago
          </h3>

          {paymentMethod === "nequi" && (
            <p>
              Realiza tu pago al número <strong>3123851338</strong>.
            </p>
          )}

          {paymentMethod === "daviplata" && (
            <p>
              Realiza tu pago al número <strong>3123851338</strong>.
            </p>
          )}

          {paymentMethod === "llave" && (
            <p>
              Realiza la transferencia usando la llave <strong>3204095701</strong>.
            </p>
          )}

        </div>
      )}

      {paymentMethod !== "contraentrega" && (
        <div className="mt-6 space-y-4">

          <input
            type="text"
            placeholder="Número de referencia del pago"
            value={paymentReference}
            onChange={(e) => setPaymentReference(e.target.value)}
            className="border rounded-lg p-3 w-full"
            disabled={loading}
          />

          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) =>
              setPaymentFile(e.target.files?.[0] ?? null)
            }
            className="border rounded-lg p-3 w-full"
            disabled={loading}
          />

        </div>
      )}

    </div>
  );
}