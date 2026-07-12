import { createClient } from "@/lib/supabase/server";

export default async function LoyaltyAdminPage() {
  const supabase =
    await createClient();

  const {
    data: members,
  } =
    await supabase
      .from(
        "customer_loyalty"
      )
      .select("*")
      .order(
        "points",
        {
          ascending: false,
        }
      );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Fidelización VIP
        </h1>

        <p className="text-gray-500 mt-2">
          Clientes más valiosos
        </p>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left">
                Cliente
              </th>

              <th className="p-4 text-left">
                Nivel
              </th>

              <th className="p-4 text-left">
                Puntos
              </th>

              <th className="p-4 text-left">
                Históricos
              </th>
            </tr>
          </thead>

          <tbody>
            {members?.map(
              (
                member: any
              ) => (
                <tr
                  key={
                    member.id
                  }
                  className="border-b"
                >
                  <td className="p-4">
                    {
                      member.customer_name
                    }
                  </td>

                  <td className="p-4">
                    {
                      member.level
                    }
                  </td>

                  <td className="p-4">
                    {
                      member.points
                    }
                  </td>

                  <td className="p-4">
                    {
                      member.lifetime_points
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}