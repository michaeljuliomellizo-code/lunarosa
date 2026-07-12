import ProductCard from "./ProductCard";

interface Props {
  products: any[];
}

export default function ProductGrid({
  products,
}: Props) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}