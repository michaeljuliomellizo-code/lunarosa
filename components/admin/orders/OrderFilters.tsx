"use client";

import { Search, X } from "lucide-react";

export default function OrderFilters() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Buscar
          </label>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              placeholder="Pedido, cliente, correo o teléfono..."
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                pl-10
                pr-4
                py-2.5
                outline-none
                focus:ring-2
                focus:ring-pink-500
                focus:border-pink-500
              "
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Estado
          </label>

          <select
            className="
              w-full
              rounded-lg
              border
              border-gray-300
              px-3
              py-2.5
              outline-none
              focus:ring-2
              focus:ring-pink-500
              focus:border-pink-500
            "
          >
            <option value="">
              Todos
            </option>

            <option value="pending">
              Pendiente
            </option>

            <option value="processing">
              Procesando
            </option>

            <option value="shipped">
              Enviado
            </option>

            <option value="delivered">
              Entregado
            </option>

            <option value="cancelled">
              Cancelado
            </option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Pago
          </label>

          <select
            className="
              w-full
              rounded-lg
              border
              border-gray-300
              px-3
              py-2.5
              outline-none
              focus:ring-2
              focus:ring-pink-500
              focus:border-pink-500
            "
          >
            <option value="">
              Todos
            </option>

            <option value="pending">
              Pendiente
            </option>

            <option value="waiting_validation">
              Validación
            </option>

            <option value="paid">
              Aprobado
            </option>

            <option value="rejected">
              Rechazado
            </option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Método
          </label>

          <select
            className="
              w-full
              rounded-lg
              border
              border-gray-300
              px-3
              py-2.5
              outline-none
              focus:ring-2
              focus:ring-pink-500
              focus:border-pink-500
            "
          >
            <option value="">
              Todos
            </option>

            <option value="transferencia">
              Transferencia
            </option>

            <option value="contraentrega">
              Contra entrega
            </option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-gray-200
              hover:bg-gray-300
              px-4
              py-2.5
              transition
            "
          >
            <X size={18} />

            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
}