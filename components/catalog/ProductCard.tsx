import Link from "next/link";

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
        rounded-xl
        shadow
        overflow-hidden
        hover:shadow-xl
        transition
      "
    >
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="
            w-full
            h-72
            object-cover
          "
        />
      ) : (
        <div className="h-72 bg-gray-100" />
      )}

      <div className="p-4">
        <h3 className="font-semibold">
          {product.name}
        </h3>

        <div className="mt-2 flex gap-2 items-center">
          <span className="text-pink-600 font-bold">
            ${Number(product.price).toLocaleString()}
          </span>

          {product.compare_price && (
            <span className="line-through text-gray-400">
              ${Number(product.compare_price).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}