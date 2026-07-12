import { createClient } from "@/lib/supabase/server";
import CustomersTable from "@/components/admin/CustomersTable";

export default async function CustomersPage() {
  const supabase =
    await createClient();

  const { data: customers } =
    await supabase
      .from("customers")
      .select("*")
      .order(
        "total_spent",
        {
          ascending: false,
        }
      );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Clientes
        </h1>

        <p className="text-gray-500 mt-2">
          CRM de clientes
        </p>
      </div>

      <CustomersTable
        customers={
          customers || []
        }
      />
    </div>
  );
}