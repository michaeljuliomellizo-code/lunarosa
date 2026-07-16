"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { supabase } from "@/lib/supabase/client";

interface ImportSummary {
  categoriesCreated: number;
  categoriesUpdated: number;
  productsCreated: number;
  productsUpdated: number;
  variantsCreated: number;
  variantsUpdated: number;
  inventoryImported: number;
  errors: number;
}

export default function ImportProducts() {

  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  const [summary, setSummary] =
    useState<ImportSummary | null>(null);

  async function importExcel(
    file: File
  ) {

    try {

      setLoading(true);

      setProgress(0);

      setSummary(null);

      const buffer =
        await file.arrayBuffer();

      const workbook =
        XLSX.read(buffer);

      const productsSheet =
        workbook.Sheets["Productos"];

      const categoriesSheet =
        workbook.Sheets["Categorias"];

      const variantsSheet =
        workbook.Sheets["Variantes"];

      const inventorySheet =
        workbook.Sheets["Inventario"];

      if (!productsSheet) {
        alert("No existe la hoja Productos.");
        return;
      }

      const products =
        XLSX.utils.sheet_to_json<any>(
          productsSheet
        );

      const categories =
        categoriesSheet
          ? XLSX.utils.sheet_to_json<any>(
              categoriesSheet
            )
          : [];

      const variants =
        variantsSheet
          ? XLSX.utils.sheet_to_json<any>(
              variantsSheet
            )
          : [];

      const inventory =
        inventorySheet
          ? XLSX.utils.sheet_to_json<any>(
              inventorySheet
            )
          : [];

      const result: ImportSummary = {

        categoriesCreated: 0,

        categoriesUpdated: 0,

        productsCreated: 0,

        productsUpdated: 0,

        variantsCreated: 0,

        variantsUpdated: 0,

        inventoryImported: 0,

        errors: 0,

      };

            setProgress(10);

      const categoryMap = new Map<
        string,
        string
      >();

      for (const category of categories) {

        try {

          const slug =
            category.Slug?.trim();

          if (!slug) continue;

          const {
            data: existingCategory,
          } = await supabase
            .from("categories")
            .select("id")
            .eq("slug", slug)
            .maybeSingle();

          const payload = {

            name: category.Nombre,

            slug,

            image:
              category.Imagen || null,

            featured:
              String(
                category.Destacada
              ).toUpperCase() === "SI",

            is_active:
              String(
                category.Activa
              ).toUpperCase() === "SI",

            sort_order:
              Number(
                category.Orden
              ) || 0,

            meta_title:
              category.MetaTitle || null,

            meta_description:
              category.MetaDescription || null,

          };

          if (existingCategory) {

            await supabase
              .from("categories")
              .update(payload)
              .eq(
                "id",
                existingCategory.id
              );

            categoryMap.set(
              slug,
              existingCategory.id
            );

            result.categoriesUpdated++;

          } else {

            const {
              data: newCategory,
            } = await supabase
              .from("categories")
              .insert(payload)
              .select("id")
              .single();

            if (newCategory) {

              categoryMap.set(
                slug,
                newCategory.id
              );

            }

            result.categoriesCreated++;

          }

        } catch (error) {

          console.error(error);

          result.errors++;

        }

      }

      setProgress(25);

            const productMap = new Map<
        string,
        string
      >();

      for (const product of products) {

        try {

          const slug =
            product.Slug?.trim();

          if (!slug) continue;

          let categoryId: string | null = null;

          if (product.CategoriaID) {

            categoryId =
              product.CategoriaID;

          } else if (product.CategoriaSlug) {

            categoryId =
              categoryMap.get(
                product.CategoriaSlug
              ) || null;

          }

          const payload = {

            category_id:
              categoryId,

            name:
              product.Nombre,

            slug,

            description:
              product.Descripcion,

            price:
              Number(
                product.Precio
              ) || 0,

            compare_price:
              Number(
                product.PrecioAnterior
              ) || 0,

            stock:
              Number(
                product.Stock
              ) || 0,

            sku:
              product.SKU || null,

            featured:
              String(
                product.Destacado
              ).toUpperCase() === "SI",

            active:
              String(
                product.Activo
              ).toUpperCase() === "SI",

            image:
              product.Imagen || null,

            meta_title:
              product.MetaTitle || null,

            meta_description:
              product.MetaDescription || null,

          };

          const {
            data: existingProduct,
          } = await supabase
            .from("products")
            .select("id")
            .eq("slug", slug)
            .maybeSingle();

          if (existingProduct) {

            await supabase
              .from("products")
              .update(payload)
              .eq(
                "id",
                existingProduct.id
              );

            productMap.set(
              slug,
              existingProduct.id
            );

            result.productsUpdated++;

          } else {

            const {
              data: newProduct,
            } = await supabase
              .from("products")
              .insert(payload)
              .select("id")
              .single();

            if (newProduct) {

              productMap.set(
                slug,
                newProduct.id
              );

            }

            result.productsCreated++;

          }

        } catch (error) {

          console.error(error);

          result.errors++;

        }

      }

      setProgress(55);

            for (const variant of variants) {

        try {

          let productId: string | null = null;

          if (variant.ProductoID) {

            productId = variant.ProductoID;

          } else if (variant.ProductoSlug) {

            productId =
              productMap.get(
                variant.ProductoSlug
              ) || null;

          }

          if (!productId) continue;

          const payload = {

            product_id: productId,

            color:
              variant.Color,

            size:
              variant.Talla,

            sku:
              variant.SKU || null,

            price:
              Number(
                variant.Precio
              ) || 0,

            stock:
              Number(
                variant.Stock
              ) || 0,

            image:
              variant.Imagen || null,

            active:
              String(
                variant.Activa
              ).toUpperCase() === "SI",

          };

          const {
            data: existingVariant,
          } = await supabase
            .from("product_variants")
            .select("id")
            .eq("product_id", productId)
            .eq("color", variant.Color)
            .eq("size", variant.Talla)
            .maybeSingle();

          if (existingVariant) {

            await supabase
              .from("product_variants")
              .update(payload)
              .eq(
                "id",
                existingVariant.id
              );

            result.variantsUpdated++;

          } else {

            await supabase
              .from("product_variants")
              .insert(payload);

            result.variantsCreated++;

          }

        } catch (error) {

          console.error(error);

          result.errors++;

        }

      }

      setProgress(80);

            for (const movement of inventory) {

        try {

          let productId: string | null = null;

          if (movement.ProductoID) {

            productId = movement.ProductoID;

          } else if (movement.ProductoSlug) {

            productId =
              productMap.get(
                movement.ProductoSlug
              ) || null;

          }

          if (!productId) continue;

          let variantId: string | null = null;

          if (movement.VarianteID) {

            variantId = movement.VarianteID;

          }

          const reference =
            movement.Referencia ||
            `IMPORT-${productId}-${movement.Fecha}`;

          const {
            data: existingMovement,
          } = await supabase
            .from("inventory_movements")
            .select("id")
            .eq("reference", reference)
            .maybeSingle();

          if (existingMovement) {
            continue;
          }

          await supabase
            .from("inventory_movements")
            .insert({

              product_id: productId,

              variant_id: variantId,

              movement_type:
                movement.TipoMovimiento,

              quantity:
                Number(
                  movement.Cantidad
                ) || 0,

              previous_stock:
                Number(
                  movement.StockAnterior
                ) || 0,

              new_stock:
                Number(
                  movement.StockNuevo
                ) || 0,

              reference,

              notes:
                movement.Notas || null,

              created_by:
                movement.CreadoPor || null,

              created_at:
                movement.Fecha
                  ? new Date(
                      movement.Fecha
                    ).toISOString()
                  : new Date().toISOString(),

            });

          result.inventoryImported++;

        } catch (error) {

          console.error(error);

          result.errors++;

        }

      }

      setProgress(100);

      setSummary(result);

      alert(
        `Importación finalizada

Categorías creadas: ${result.categoriesCreated}

Categorías actualizadas: ${result.categoriesUpdated}

Productos creados: ${result.productsCreated}

Productos actualizados: ${result.productsUpdated}

Variantes creadas: ${result.variantsCreated}

Variantes actualizadas: ${result.variantsUpdated}

Movimientos importados: ${result.inventoryImported}

Errores: ${result.errors}`
      );

    } catch (error: any) {

      console.error(error);

      alert(
        error.message ??
        "Error importando archivo"
      );

    } finally {

      setLoading(false);

      setProgress(0);

    }

  }

  return (

    <div className="space-y-4">

      <input
        type="file"
        accept=".xlsx"
        disabled={loading}
        onChange={(e) => {

          const file =
            e.target.files?.[0];

          if (!file) return;

          importExcel(file);

        }}
      />

      {loading && (

        <div className="space-y-2">

          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">

            <div
              className="bg-pink-500 h-4 transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <p className="text-sm text-gray-700">

            Importando...

            {progress}%

          </p>

        </div>

      )}

      {summary && (

        <div className="rounded-xl border bg-green-50 p-5">

          <h3 className="font-bold text-lg mb-4">

            Resumen de Importación

          </h3>

          <div className="grid md:grid-cols-2 gap-2 text-sm">

            <p>✅ Categorías creadas: {summary.categoriesCreated}</p>

            <p>✅ Categorías actualizadas: {summary.categoriesUpdated}</p>

            <p>✅ Productos creados: {summary.productsCreated}</p>

            <p>✅ Productos actualizados: {summary.productsUpdated}</p>

            <p>✅ Variantes creadas: {summary.variantsCreated}</p>

            <p>✅ Variantes actualizadas: {summary.variantsUpdated}</p>

            <p>✅ Inventario importado: {summary.inventoryImported}</p>

            <p>❌ Errores: {summary.errors}</p>

          </div>

        </div>

      )}

    </div>

  );

}