const inventory = [
  {
    sku: "BRA-001",
    product: "Brasier Rosa",
    stock: 5,
  },
];

export default function InventoryTable() {

  return (
    <div className="bg-white border rounded-3xl overflow-hidden">

      <table className="w-full">

        <thead className="bg-pink-50">

          <tr>

            <th className="p-5 text-left">
              SKU
            </th>

            <th className="p-5 text-left">
              Producto
            </th>

            <th className="p-5 text-left">
              Stock
            </th>
          </tr>
        </thead>

        <tbody>

          {inventory.map((item) => (
            <tr
              key={item.sku}
              className="border-t"
            >

              <td className="p-5">
                {item.sku}
              </td>

              <td className="p-5">
                {item.product}
              </td>

              <td className="p-5 text-red-500 font-bold">
                {item.stock}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}