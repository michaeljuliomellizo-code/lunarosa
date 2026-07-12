"use client";

import {
  useEffect,
  useState,
} from "react";

interface ProductSales {
  productId: string;
  name: string;
  slug: string;
  quantity: number;
  revenue: number;
}

interface SalesByProductTableProps {
  filters?: {
    startDate?: string;
    endDate?: string;
    status?: string;
  };
}

export default function SalesByProductTable({
  filters,
}: SalesByProductTableProps) {
  const [products, setProducts] =
    useState<ProductSales[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProducts();
  }, [filters]);

  async function loadProducts() {
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
          `/api/admin/reports/sales-by-product?${params.toString()}`
        );

      const json =
        await response.json();

      if (!response.ok) {
        throw new Error(
          json.error ??
            "Error cargando productos."
        );
      }

      setProducts(
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
        Productos Más Vendidos
      </h2>

      {products.length === 0 ? (
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
                  Producto
                </th>

                <th className="text-center py-3">
                  Cantidad
                </th>

                <th className="text-right py-3">
                  Ingresos
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map(
                (
                  product,
                  index
                ) => (
                  <tr
                    key={
                      product.productId
                    }
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="py-4 font-semibold">
                      {index + 1}
                    </td>

                    <td>

                      <div className="font-medium">
                        {
                          product.name
                        }
                      </div>

                      <div className="text-xs text-gray-500">
                        {
                          product.slug
                        }
                      </div>

                    </td>

                    <td className="text-center font-semibold">
                      {
                        product.quantity
                      }
                    </td>

                    <td className="text-right font-bold text-green-600">
                      $
                      {product.revenue.toLocaleString()}
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