"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OrderPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function OrderPagination({
  currentPage,
  totalPages,
}: OrderPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white rounded-xl shadow p-4">
      <div className="text-sm text-gray-500">
        Página{" "}
        <span className="font-semibold">
          {currentPage}
        </span>{" "}
        de{" "}
        <span className="font-semibold">
          {totalPages}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={
            currentPage > 1
              ? `/admin/ordenes?page=${currentPage - 1}`
              : "#"
          }
          className={`
            flex
            items-center
            justify-center
            w-10
            h-10
            rounded-lg
            border
            transition
            ${
              currentPage === 1
                ? "pointer-events-none opacity-40"
                : "hover:bg-gray-100"
            }
          `}
        >
          <ChevronLeft size={18} />
        </Link>

        {pages.map((page) => (
          <Link
            key={page}
            href={`/admin/ordenes?page=${page}`}
            className={`
              flex
              items-center
              justify-center
              w-10
              h-10
              rounded-lg
              border
              text-sm
              font-semibold
              transition
              ${
                page === currentPage
                  ? "bg-pink-600 text-white border-pink-600"
                  : "hover:bg-gray-100"
              }
            `}
          >
            {page}
          </Link>
        ))}

        <Link
          href={
            currentPage < totalPages
              ? `/admin/ordenes?page=${currentPage + 1}`
              : "#"
          }
          className={`
            flex
            items-center
            justify-center
            w-10
            h-10
            rounded-lg
            border
            transition
            ${
              currentPage === totalPages
                ? "pointer-events-none opacity-40"
                : "hover:bg-gray-100"
            }
          `}
        >
          <ChevronRight size={18} />
        </Link>
      </div>
    </div>
  );
}