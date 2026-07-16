import Link from "next/link";

interface Props {
  productName: string;
}

export default function ProductBreadcrumb({
  productName,
}: Props) {

  return (
    <div className="flex gap-2 text-gray-600 text-sm mb-10">

      <Link href="/">
        Inicio
      </Link>

      /

      <Link href="/catalogo">
        Catálogo
      </Link>

      /

      <span>
        {productName}
      </span>
    </div>
  );
}