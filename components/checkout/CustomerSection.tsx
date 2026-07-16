"use client";

interface CustomerSectionProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  referralCode: string;
  notes: string;

  loading: boolean;

  setCustomerName: React.Dispatch<React.SetStateAction<string>>;
  setCustomerEmail: React.Dispatch<React.SetStateAction<string>>;
  setCustomerPhone: React.Dispatch<React.SetStateAction<string>>;
  setReferralCode: React.Dispatch<React.SetStateAction<string>>;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
}

export default function CustomerSection({
  customerName,
  customerEmail,
  customerPhone,
  referralCode,
  notes,
  loading,
  setCustomerName,
  setCustomerEmail,
  setCustomerPhone,
  setReferralCode,
  setNotes,
}: CustomerSectionProps) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border">
      <h2 className="text-2xl font-bold mb-6">
        Datos del Cliente
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Nombre completo"
          value={customerName}
          onChange={(e) =>
            setCustomerName(e.target.value)
          }
          className="border rounded-lg p-3 w-full"
          required
          disabled={loading}
        />

        <input
          type="email"
          placeholder="Correo"
          value={customerEmail}
          onChange={(e) =>
            setCustomerEmail(e.target.value)
          }
          className="border rounded-lg p-3 w-full"
          required
          disabled={loading}
        />

        <input
          type="text"
          placeholder="Teléfono"
          value={customerPhone}
          onChange={(e) =>
            setCustomerPhone(e.target.value)
          }
          className="border rounded-lg p-3 w-full"
          required
          disabled={loading}
        />

        <input
          type="text"
          placeholder="Código de referido (opcional)"
          value={referralCode}
          onChange={(e) =>
            setReferralCode(e.target.value)
          }
          className="border rounded-lg p-3 w-full"
          disabled={loading}
        />

      </div>

      <textarea
        placeholder="Notas del pedido"
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
        className="border rounded-lg p-3 w-full mt-4"
        rows={4}
        disabled={loading}
      />
    </div>
  );
}