import CategoryForm from "@/app/admin/CategoryForm";
import CategoryTable from "@/app/admin/CategoryTable";

export default function CategoriesPage() {
  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <CategoryForm />
      <CategoryTable />
    </div>
  );
}