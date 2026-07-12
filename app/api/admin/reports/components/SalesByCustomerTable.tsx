"use client";

import {
  useEffect,
  useState,
} from "react";

interface CustomerSales {
  email: string;
  customer: string;
  orders: number;
  total: number;
}

interface SalesByCustomerTableProps {
  filters?: {
    startDate?: string;
    endDate?: string;
    status?: string;
  };
}

export default function SalesByCustomerTable({
  filters,
}: SalesByCustomerTableProps) {
  const [customers, setCustomers] =
    useState<CustomerSales[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadCustomers();
  }, [filters]);

  async function loadCustomers() {
    try {
      setLoading(true);

      const params =
        new URLSearchParams();

      if (filters?.startDate) {
        params.append(
          "startDate",
          filters.startDate
        );
      }

      if (filters?.endDate) {
        params.append(
          "endDate",
          filters.endDate
        );
      }

      if (filters?.status) {
        params.append(
          "status",
          filters.status
        );
      }

      const response =
        await fetch(
          `/api/admin/reports/sales-by-customer?${params.toString()}`
        );

      const json =
        await response.json();

      if (!response.ok) {
        throw new Error(
          json.error ??
            "Error cargando clientes."
        );
      }

      setCustomers(
        json.data ?? []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 animate-pulse h-[420px]" />
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-6">
        Mejores Clientes
      </h2>

      {customers.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No existen ventas para el período seleccionado.
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  #
                </th>

                <th className="text-left py-3">
                  Cliente
                </th>

                <th className="text-left py-3">
                  Email
                </th>

                <th className="text-center py-3">
                  Pedidos
                </th>

                <th className="text-right py-3">
                  Total Comprado
                </th>

              </tr>

            </thead>

            <tbody>

              {customers.map(
                (
                  customer,
                  index
                ) => (
                  <tr
                    key={
                      customer.email
                    }
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="py-4 font-semibold">
                      {index + 1}
                    </td>

                    <td>

                      <div className="font-medium">
                        {
                          customer.customer
                        }
                      </div>

                    </td>

                    <td className="text-gray-600">
                      {
                        customer.email
                      }
                    </td>

                    <td className="text-center font-semibold">
                      {
                        customer.orders
                      }
                    </td>

                    <td className="text-right font-bold text-green-600">
                      $
                      {customer.total.toLocaleString()}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}