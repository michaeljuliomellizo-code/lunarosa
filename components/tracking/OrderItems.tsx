interface Props {

  items: any[];

}

export default function OrderItems({

  items,

}: Props) {

  return (

    <div className="bg-white rounded-3xl border p-6">

      <h2 className="text-xl font-semibold mb-5">

        Productos

      </h2>

      {items.map((item, index) => (

        <div

          key={index}

          className="flex justify-between border-b last:border-none py-4"

        >

          <div>

            <p className="font-semibold">

              {item.products?.name}

            </p>

            {item.product_variants?.color && (

              <p className="text-sm text-gray-600">

                Color: {item.product_variants.color}

              </p>

            )}

            {item.product_variants?.size && (

              <p className="text-sm text-gray-600">

                Talla: {item.product_variants.size}

              </p>

            )}

            <p className="text-sm text-gray-600">

              Cantidad: {item.quantity}

            </p>

          </div>

          <div className="font-semibold">

            $

            {Number(item.price).toLocaleString("es-CO")}

          </div>

        </div>

      ))}

    </div>

  );

}