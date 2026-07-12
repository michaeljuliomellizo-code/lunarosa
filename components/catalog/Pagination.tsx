import Link from "next/link";

interface Props {
  currentPage: number;
  totalPages: number;
  searchParams: Record<
    string,
    string | undefined
  >;
}

export default function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-10">
      {Array.from(
        { length: totalPages },
        (_, i) => i + 1
      ).map((page) => {
        const params =
          new URLSearchParams();

        Object.entries(searchParams).forEach(
          ([key, value]) => {
            if (value) {
              params.set(key, value);
            }
          }
        );

        params.set(
          "page",
          page.toString()
        );

        return (
          <Link
            key={page}
            href={`/catalogo?${params.toString()}`}
            className={`
              px-4 py-2 rounded
              ${
                page === currentPage
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100"
              }
            `}
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
}