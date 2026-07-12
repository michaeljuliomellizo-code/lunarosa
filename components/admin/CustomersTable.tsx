"use client";

import { useState } from "react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  total_spent: number;
  total_orders: number;
  last_order_at: string | null;
  created_at: string;
}

export default function CustomersTable({
  customers,
}: {
  customers: Customer[];
}) {
  const [search, setSearch] =
    useState("");

  const filtered =
    customers.filter(
      (customer) =>
        customer.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        customer.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="p-6 border-b">
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            w-full
            border
            rounded-lg
            p-3
          "
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left">
                Cliente
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Teléfono
              </th>

              <th className="p-4 text-left">
                Pedidos
              </th>

              <th className="p-4 text-left">
                Total Gastado
              </th>

              <th className="p-4 text-left">
                Última Compra
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(
              (customer) => (
                <tr
                  key={
                    customer.id
                  }
                  className="border-b"
                >
                  <td className="p-4 font-medium">
                    {
                      customer.name
                    }
                  </td>

                  <td className="p-4">
                    {
                      customer.email
                    }
                  </td>

                  <td className="p-4">
                    {
                      customer.phone
                    }
                  </td>

                  <td className="p-4">
                    {
                      customer.total_orders
                    }
                  </td>

                  <td className="p-4 font-bold text-green-600">
                    $
                    {Number(
                      customer.total_spent ||
                        0
                    ).toLocaleString()}
                  </td>

                  <td className="p-4">
                    {customer.last_order_at
                      ? new Date(
                          customer.last_order_at
                        ).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}