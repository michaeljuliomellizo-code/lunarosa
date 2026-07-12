interface Item {
  id: string;

  quantity: number;

  price: number;

  products: {
    name: string;
    image: string | null;
  } | null;
}

interface Props {
  items: Item[];
}

export default function OrderItems({
  items,
}: Props) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="
            flex
            gap-4
            border
            rounded-xl
            p-4
          "
        >
          <img
            src={
              item.products?.image ||
              "/placeholder.jpg"
            }
            alt={
              item.products?.name ||
              ""
            }
            className="
              w-20
              h-20
              object-cover
              rounded-lg
            "
          />

          <div className="flex-1">
            <h3 className="font-semibold">
              {item.products?.name}
            </h3>

            <p>
              Cantidad:
              {item.quantity}
            </p>

            <p>
              $
              {Number(
                item.price
              ).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}