import { supabase } from "@/lib/supabase/client";

export class PaymentProofService {
  static async upload(file: File) {
    const extension = file.name.split(".").pop();

    const fileName =
      `${Date.now()}_${crypto.randomUUID()}.${extension}`;

    const { error } =
      await supabase.storage
        .from("payment-proofs")
        .upload(fileName, file);

    if (error) {
      throw new Error(error.message);
    }

    const { data } =
      supabase.storage
        .from("payment-proofs")
        .getPublicUrl(fileName);

    return data.publicUrl;
  }
}