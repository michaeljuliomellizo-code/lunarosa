"use client";

import {
  ShoppingCart,
  DollarSign,
  Users,
  Gift,
} from "lucide-react";

interface DashboardStatsProps {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalReferrals: number;
}

export default function DashboardStats({
  totalSales,
  totalOrders,
  totalCustomers,
  totalReferrals,
}: DashboardStatsProps) {
  const cards = [
    {
      title: "Ventas",
      value: `$${totalSales.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      title: "Pedidos",
      value: totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: "bg-pink-500",
    },
    {
      title: "Clientes",
      value: totalCustomers.toLocaleString(),
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Referidos",
      value: totalReferrals.toLocaleString(),
      icon: Gift,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map(({ title, value, icon: Icon, color }) => (
        <div
          key={title}
          className="bg-white rounded-xl shadow p-6 flex items-center justify-between"
        >
          <div>
            <p className="text-gray-500 text-sm">
              {title}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {value}
            </h2>
          </div>

          <div
            className={`${color} w-14 h-14 rounded-xl flex items-center justify-center text-white`}
          >
            <Icon size={28} />
          </div>
        </div>
      ))}
    </div>
  );
}