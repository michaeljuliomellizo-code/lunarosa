"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { supabase } from "@/lib/supabase/client";

interface Customer {
  email: string;

  name: string;

  phone: string;

  totalSpent: number;

  ordersCount: number;

  averageOrder: number;

  lastOrder: string;
}

export default function CustomersTable() {
  const [customers, setCustomers] =
    useState<Customer[]>([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    const { data } =
      await supabase
        .from("orders")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    const grouped:
      Record<string, Customer> = {};

    data?.forEach((order) => {
      const email =
        order.customer_email;

      if (!grouped[email]) {
        grouped[email] = {
          email,

          name:
            order.customer_name,

          phone:
            order.phone,

          totalSpent: 0,

          ordersCount: 0,

          averageOrder: 0,

          lastOrder:
            order.created_at,
        };
      }

      grouped[email].totalSpent +=
        Number(order.total);

      grouped[email].ordersCount +=
        1;
    });

    const result =
      Object.values(grouped).map(
        (customer) => ({
          ...customer,

          averageOrder:
            customer.totalSpent /
            customer.ordersCount,
        })
      );

    result.sort(
      (a, b) =>
        b.totalSpent -
        a.totalSpent
    );

    setCustomers(result);
  }

  function getSegment(
    total: number
  ) {
    if (total >= 1000000)
      return "VIP";

    if (total >= 500000)
      return "Frecuente";

    return "Nuevo";
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h1 className="text-3xl font-bold mb-6">
        CRM Clientes
      </h1>

      <div className="overflow-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th>Cliente</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Pedidos</th>
              <th>Total Comprado</th>
              <th>Promedio</th>
              <th>Segmento</th>
              <th></th>
            </tr>
          </thead>

          <tbody>

            {customers.map(
              (customer) => (
                <tr
                  key={
                    customer.email
                  }
                  className="border-b"
                >
                  <td className="py-3">
                    {customer.name}
                  </td>

                  <td>
                    {
                      customer.email
                    }
                  </td>

                  <td>
                    {
                      customer.phone
                    }
                  </td>

                  <td>
                    {
                      customer.ordersCount
                    }
                  </td>

                  <td>
                    $
                    {customer.totalSpent.toLocaleString()}
                  </td>

                  <td>
                    $
                    {customer.averageOrder.toLocaleString()}
                  </td>

                  <td>

                    {getSegment(
                      customer.totalSpent
                    ) === "VIP" ? (
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">
                        VIP
                      </span>
                    ) : getSegment(
                        customer.totalSpent
                      ) ===
                      "Frecuente" ? (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                        Frecuente
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                        Nuevo
                      </span>
                    )}

                  </td>

                  <td>

                    <Link
                      href={`/admin/clientes/${customer.email}`}
                      className="bg-pink-500 text-white px-3 py-2 rounded"
                    >
                      Ver
                    </Link>

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