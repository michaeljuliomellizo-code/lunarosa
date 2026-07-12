"use client";

import * as XLSX from "xlsx";
import { supabase } from "@/lib/supabase/client";

export default function ExportProducts() {

  async function exportExcel() {

    try {

      const [
        productsResult,
        categoriesResult,
        variantsResult,
        inventoryResult,
      ] = await Promise.all([

        supabase
          .from("products")
          .select("*"),

        supabase
          .from("categories")
          .select("*"),

        supabase
          .from("product_variants")
          .select("*"),

        supabase
          .from("inventory_movements")
          .select("*"),

      ]);

      if (productsResult.error)
        throw productsResult.error;

      if (categoriesResult.error)
        throw categoriesResult.error;

      if (variantsResult.error)
        throw variantsResult.error;

      if (inventoryResult.error)
        throw inventoryResult.error;

      const products =
        productsResult.data ?? [];

      const categories =
        categoriesResult.data ?? [];

      const variants =
        variantsResult.data ?? [];

      const inventory =
        inventoryResult.data ?? [];

            const productRows = products.map((p) => ({

        ID: p.id,

        Nombre: p.name,

        Slug: p.slug,

        CategoriaID: p.category_id,

        Descripcion: p.description,

        Precio: Number(p.price),

        PrecioAnterior: Number(p.compare_price ?? 0),

        Stock: Number(p.stock),

        SKU: p.sku,

        Destacado: p.featured ? "SI" : "NO",

        Activo: p.active ? "SI" : "NO",

        Imagen: p.image,

        MetaTitle: p.meta_title,

        MetaDescription: p.meta_description,

        Creado: p.created_at
          ? new Date(p.created_at).toLocaleString()
          : "",

        Actualizado: p.updated_at
          ? new Date(p.updated_at).toLocaleString()
          : "",

      }));


      const categoryRows = categories.map((c) => ({

        ID: c.id,

        Nombre: c.name,

        Slug: c.slug,

        Imagen: c.image,

        Activa: c.is_active ? "SI" : "NO",

        Destacada: c.featured ? "SI" : "NO",

        Orden: c.sort_order,

        MetaTitle: c.meta_title,

        MetaDescription: c.meta_description,

        Creada: c.created_at
          ? new Date(c.created_at).toLocaleString()
          : "",

        Actualizada: c.updated_at
          ? new Date(c.updated_at).toLocaleString()
          : "",

      }));


      const variantRows = variants.map((v) => ({

        ID: v.id,

        ProductoID: v.product_id,

        Color: v.color,

        Talla: v.size,

        SKU: v.sku,

        Precio: Number(v.price),

        Stock: Number(v.stock),

        Imagen: v.image,

        Activa: v.active ? "SI" : "NO",

        Creada: v.created_at
          ? new Date(v.created_at).toLocaleString()
          : "",

      }));


      const inventoryRows = inventory.map((i) => ({

        ID: i.id,

        ProductoID: i.product_id,

        VarianteID: i.variant_id,

        TipoMovimiento: i.movement_type,

        Cantidad: i.quantity,

        StockAnterior: i.previous_stock,

        StockNuevo: i.new_stock,

        Referencia: i.reference,

        Notas: i.notes,

        CreadoPor: i.created_by,

        Fecha: i.created_at
          ? new Date(i.created_at).toLocaleString()
          : "",

      }));

            const wb = XLSX.utils.book_new();

      const wsProducts =
        XLSX.utils.json_to_sheet(productRows);

      const wsCategories =
        XLSX.utils.json_to_sheet(categoryRows);

      const wsVariants =
        XLSX.utils.json_to_sheet(variantRows);

      const wsInventory =
        XLSX.utils.json_to_sheet(inventoryRows);

      XLSX.utils.book_append_sheet(
        wb,
        wsProducts,
        "Productos"
      );

      XLSX.utils.book_append_sheet(
        wb,
        wsCategories,
        "Categorias"
      );

      XLSX.utils.book_append_sheet(
        wb,
        wsVariants,
        "Variantes"
      );

      XLSX.utils.book_append_sheet(
        wb,
        wsInventory,
        "Inventario"
      );

      const today = new Date();

      const fileName =
        `LunaRosa_Productos_${
          today.getFullYear()
        }-${
          String(
            today.getMonth() + 1
          ).padStart(2, "0")
        }-${
          String(
            today.getDate()
          ).padStart(2, "0")
        }.xlsx`;

      XLSX.writeFile(
        wb,
        fileName
      );

    } catch (error: any) {

      console.error(error);

      alert(
        error.message ??
        "Error exportando productos"
      );

    }

  }

  return (

    <button
      onClick={exportExcel}
      className="
        bg-blue-600
        hover:bg-blue-700
        transition
        text-white
        px-5
        py-3
        rounded-lg
        font-semibold
        shadow
      "
    >
      📥 Exportar Catálogo Completo
    </button>

  );

}