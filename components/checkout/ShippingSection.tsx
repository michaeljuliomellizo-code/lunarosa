"use client";

import DepartmentMunicipalitySelector from "./DepartmentMunicipalitySelector";

interface ShippingSectionProps {
  department: string;
  municipality: string;
  shippingAddress: string;

  shippingLoading: boolean;
  shippingAvailable: boolean;
  shippingCost: number;
  estimatedDays: number | null;

  loading: boolean;

  setDepartment: React.Dispatch<React.SetStateAction<string>>;
  setMunicipality: React.Dispatch<React.SetStateAction<string>>;
  setShippingAddress: React.Dispatch<React.SetStateAction<string>>;
}

export default function ShippingSection({
  department,
  municipality,
  shippingAddress,

  shippingLoading,
  shippingAvailable,
  shippingCost,
  estimatedDays,

  loading,

  setDepartment,
  setMunicipality,
  setShippingAddress,
}: ShippingSectionProps) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border">

      <h2 className="text-2xl font-bold mb-6">
        Dirección de envío
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <DepartmentMunicipalitySelector
          department={department}
          municipality={municipality}
          onDepartmentChange={setDepartment}
          onMunicipalityChange={setMunicipality}
        />

        <div className="md:col-span-2">

          {shippingLoading && (
            <p className="text-sm text-gray-600">
              Calculando costo de envío...
            </p>
          )}

          {!shippingLoading &&
            !shippingAvailable && (
              <div className="rounded-lg border border-red-300 bg-red-50 p-3">
                <p className="font-semibold text-red-700">
                  ⚠ Actualmente no realizamos envíos a este municipio.
                </p>
              </div>
            )}

          {!shippingLoading &&
            shippingAvailable &&
            shippingCost > 0 && (
              <div className="rounded-lg border border-pink-200 bg-pink-50 p-3">

                <p className="font-semibold text-pink-700">
                  🚚 Envío: $
                  {shippingCost.toLocaleString("es-CO")}
                </p>

                {estimatedDays && (
                  <p className="text-sm text-gray-700 mt-1">
                    Tiempo estimado:{" "}
                    {estimatedDays} días hábiles.
                  </p>
                )}

              </div>
            )}

        </div>

        <input
          type="text"
          placeholder="Dirección de entrega"
          value={shippingAddress}
          onChange={(e) =>
            setShippingAddress(e.target.value)
          }
          className="border rounded-lg p-3 w-full md:col-span-2"
          required
          disabled={loading}
        />

      </div>

    </div>
  );
}