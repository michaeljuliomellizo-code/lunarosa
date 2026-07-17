import Link from "next/link";
import { useTheme } from "../providers/ThemeProvider";


interface Props {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    compare_price: number | null;
    image: string | null;
  };
}

export default function ProductCard({
  
  product,
}: Props) {

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="
        bg-white
        rounded-2xl
        shadow
        overflow-hidden
        hover:shadow-xl
        transition-all
        duration-300
        flex
        flex-col
        h-full
      "
    >
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="
            w-full
            h-48
            sm:h-56
            md:h-64
            lg:h-72
            object-cover
          "
        />
      ) : (
        <div
          className="
            h-48
            sm:h-56
            md:h-64
            lg:h-72
            bg-gray-100
          "
        />
      )}

      <div
        className="
          p-3
          sm:p-4
          flex
          flex-col
          flex-1
        "
      >
        <h3
          className="
            font-semibold
            text-sm
            sm:text-base
            md:text-lg
            line-clamp-2
            min-h-[3rem]
          "
        >
          {product.name}
        </h3>

        <div className="mt-2 flex gap-2 items-center">
          <span
            className="
              text-pink-600
              font-bold
              text-base
              sm:text-lg
            "
          >
            ${Number(product.price).toLocaleString()}
          </span>

          {product.compare_price && (
            <span
              className="
                line-through
                text-gray-500
                text-xs
                sm:text-sm
              "
            >
              ${Number(product.compare_price).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}