"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}

export default function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: Props) {
  if (totalPages <= 1) return null;

  const createHref = (page: number) => {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    params.set("page", page.toString());

    return `/catalogo?${params.toString()}`;
  };

  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-4">

      <p className="text-sm text-gray-500">
        Página <span className="font-semibold">{currentPage}</span> de{" "}
        <span className="font-semibold">{totalPages}</span>
      </p>

      <div className="flex items-center gap-2">

        <Link
          href={currentPage > 1 ? createHref(currentPage - 1) : "#"}
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all
          ${
            currentPage === 1
              ? "pointer-events-none opacity-40"
              : "hover:bg-pink-50 hover:border-pink-500"
          }`}
        >
          <ChevronLeft size={18} />
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-2">
          {pages.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-gray-400"
                >
                  ...
                </span>
              );
            }

            return (
              <Link
                key={`page-${page}`}
                href={createHref(Number(page))}
                className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-all
                ${
                  Number(page) === currentPage
                    ? "bg-pink-600 text-white border-pink-600 shadow-lg"
                    : "hover:bg-pink-50 hover:border-pink-500"
                }`}
              >
                {page}
              </Link>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="sm:hidden rounded-full bg-pink-600 px-4 py-2 text-sm font-semibold text-white shadow">
          {currentPage} / {totalPages}
        </div>

        <Link
          href={
            currentPage < totalPages
              ? createHref(currentPage + 1)
              : "#"
          }
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all
          ${
            currentPage === totalPages
              ? "pointer-events-none opacity-40"
              : "hover:bg-pink-50 hover:border-pink-500"
          }`}
        >
          <ChevronRight size={18} />
        </Link>

      </div>

    </div>
  );
}