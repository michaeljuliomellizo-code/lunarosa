import { supabase } from "@/lib/supabase/client";

export class PaymentProofService {

  //--------------------------------------------------------
  // Subir comprobante de pago
  //--------------------------------------------------------

  static async upload(
    file: File | null
  ): Promise<string> {

    if (!file) {
      return "";
    }

    const extension =
      file.name
        .split(".")
        .pop();

    const fileName =
      `${Date.now()}_${crypto.randomUUID()}.${extension}`;

    const {
      error,
    } = await supabase.storage
      .from("payment-proofs")
      .upload(
        fileName,
        file
      );

    if (error) {
      throw new Error(
        error.message
      );
    }

    const {
      data,
    } = supabase.storage
      .from("payment-proofs")
      .getPublicUrl(
        fileName
      );

    return data.publicUrl;

  }

  //--------------------------------------------------------
  // Eliminar comprobante
  //--------------------------------------------------------

  static async delete(
    publicUrl: string
  ) {

    if (!publicUrl) {
      return;
    }

    const fileName =
      publicUrl.split("/").pop();

    if (!fileName) {
      return;
    }

    const {
      error,
    } = await supabase.storage
      .from("payment-proofs")
      .remove([
        fileName,
      ]);

    if (error) {
      console.error(
        "No fue posible eliminar el comprobante:",
        error.message
      );
    }

  }

}