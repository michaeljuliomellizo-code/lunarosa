import ProductPrice from "./ProductPrice";
import ProductVariants from "./ProductVariants";
import ProductStock from "./ProductStock";
import AddToCartButton from "./AddToCartButton";

interface Props {
  product: any;
}

export default function ProductInfo({
  product,
}: Props) {

  return (
    <div>

      <p className="text-pink-500 uppercase font-semibold">
        Luna Rosa
      </p>

      <h1 className="text-5xl font-bold mt-4">
        {product.name}
      </h1>

      <div className="mt-6">
        <ProductPrice price={product.price} />
      </div>

      <p className="mt-6 text-gray-700 leading-relaxed">
        {product.description}
      </p>

      <div className="mt-8">
        <ProductVariants />
      </div>

      <div className="mt-6">
        <ProductStock stock={product.stock} />
      </div>

      <div className="mt-10">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}