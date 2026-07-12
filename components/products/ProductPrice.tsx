interface Props {
  price: number;
}

export default function ProductPrice({
  price,
}: Props) {

  return (
    <div className="text-4xl font-bold text-pink-500">

      ${price}

    </div>
  );
}