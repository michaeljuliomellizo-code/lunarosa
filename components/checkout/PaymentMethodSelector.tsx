"use client";

interface Props {
  value: string;
  onChange: (
    value: string
  ) => void;
}

export default function PaymentMethodSelector({
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-3">
      <label className="block font-semibold">
        Método de Pago
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="
          w-full
          border
          rounded-xl
          p-4
        "
      >
        <option value="">
          Seleccionar
        </option>

        <option value="contraentrega">
          Contraentrega
        </option>

        <option value="nequi">
          Nequi
        </option>

        <option value="daviplata">
          Daviplata
        </option>

        <option value="llave">
          Llave
        </option>

      </select>
    </div>
  );
}