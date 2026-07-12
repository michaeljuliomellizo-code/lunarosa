import EditProductForm from "@/app/admin/EditProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <EditProductForm productId={id} />
    </div>
  );
}