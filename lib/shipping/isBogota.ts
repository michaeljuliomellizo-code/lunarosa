/**
 * Determina si un envío corresponde a Bogotá.
 *
 * Se utiliza para:
 * - Aplicar envío fijo.
 * - Habilitar pago contra entrega.
 * - Mostrar reglas especiales de envío.
 */

export function isBogota(
  department: string | null | undefined,
  municipality: string | null | undefined
): boolean {

  const dep =
    (department ?? "")
      .trim()
      .toLowerCase();

  const city =
    (municipality ?? "")
      .trim()
      .toLowerCase();

  return (

    dep === "bogotá d.c." ||

    dep === "bogota d.c." ||

    dep === "bogotá" ||

    dep === "bogota" ||

    city === "bogotá" ||

    city === "bogota"

  );

}