"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface User {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  role: string;
  created_at: string;
}

export default function UserTable() {
  const [users, setUsers] = useState<
    User[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  async function loadUsers() {
    try {
      setLoading(true);

      const { data, error } =
        await supabase
          .from("profiles")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) {
        console.error(error);
        return;
      }

      setUsers(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function updateRole(
    userId: string,
    role: string
  ) {
    const { error } =
      await supabase
        .from("profiles")
        .update({
          role,
        })
        .eq("id", userId);

    if (error) {
      alert(error.message);
      return;
    }

    loadUsers();
  }

  async function deleteUser(
    userId: string
  ) {
    const confirmDelete =
      confirm(
        "¿Eliminar usuario?"
      );

    if (!confirmDelete) return;

    const { error } =
      await supabase
        .from("profiles")
        .delete()
        .eq("id", userId);

    if (error) {
      alert(error.message);
      return;
    }

    loadUsers();
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        Cargando usuarios...
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6">
        Usuarios
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">
                Nombre
              </th>

              <th className="text-left py-3">
                Email
              </th>

              <th className="text-left py-3">
                Teléfono
              </th>

              <th className="text-left py-3">
                Rol
              </th>

              <th className="text-left py-3">
                Registro
              </th>

              <th className="text-left py-3">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b"
              >
                <td className="py-3">
                  {user.full_name ||
                    "-"}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.phone ||
                    "-"}
                </td>

                <td>
                  <select
                    value={user.role}
                    onChange={(e) =>
                      updateRole(
                        user.id,
                        e.target.value
                      )
                    }
                    className="
                      border
                      rounded
                      p-2
                    "
                  >
                    <option value="customer">
                      Cliente
                    </option>

                    <option value="admin">
                      Administrador
                    </option>
                  </select>
                </td>

                <td>
                  {new Date(
                    user.created_at
                  ).toLocaleDateString()}
                </td>

                <td>
                  <button
                    onClick={() =>
                      deleteUser(
                        user.id
                      )
                    }
                    className="
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      px-3
                      py-1
                      rounded
                    "
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-8">
            No existen usuarios
          </div>
        )}
      </div>
    </div>
  );
}