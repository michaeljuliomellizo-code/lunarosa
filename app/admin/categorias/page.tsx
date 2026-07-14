"use client";

import { useState } from "react";

import CategoryForm from "@/app/admin/CategoryForm";
import CategoryTable from "@/app/admin/CategoryTable";

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  is_active: boolean;
}

export default function CategoriesPage() {
  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  const [refreshKey, setRefreshKey] =
    useState(0);

  function refreshTable() {
    setEditingCategory(null);
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <CategoryForm
        category={editingCategory}
        onSaved={refreshTable}
        onCancel={() =>
          setEditingCategory(null)
        }
      />

      <CategoryTable
        refreshKey={refreshKey}
        onEdit={(category) =>
          setEditingCategory(category)
        }
      />
    </div>
  );
}