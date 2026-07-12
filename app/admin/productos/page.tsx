import ProductTable from "@/app/admin/ProductTable";
import ProductForm from "@/app/admin/ProductForm";

import ImportProducts from "@/app/admin/ImportProducts";
import ExportProducts from "@/app/admin/ExportProducts";

export default function ProductsPage() {
  return (
    <div className="space-y-8">

      <div className="flex gap-4">
        <ImportProducts />
        <ExportProducts />
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <ProductForm />
        <ProductTable />
      </div>

    </div>
  );
}