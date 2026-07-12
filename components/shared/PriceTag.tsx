interface Props {
  price: number;
}

export default function PriceTag({
  price,
}: Props) {

  return (
    <span className="text-pink-500 font-bold text-2xl">
      ${price}
    </span>
  );
}