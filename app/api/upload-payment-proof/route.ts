import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(
  request: Request
) {
  try {
    const formData =
      await request.formData();

    const file =
      formData.get(
        "file"
      ) as File;

    if (!file) {
      return NextResponse.json(
        {
          error:
            "Archivo requerido",
        },
        {
          status: 400,
        }
      );
    }

    const extension =
      file.name
        .split(".")
        .pop();

    const fileName =
      `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${extension}`;

    const buffer =
      Buffer.from(
        await file.arrayBuffer()
      );

    const { error } =
      await supabase.storage
        .from(
          "payment-proofs"
        )
        .upload(
          fileName,
          buffer,
          {
            contentType:
              file.type,
          }
        );

    if (error) {
      return NextResponse.json(
        {
          error:
            error.message,
        },
        {
          status: 400,
        }
      );
    }

    const {
      data: publicUrl,
    } =
      supabase.storage
        .from(
          "payment-proofs"
        )
        .getPublicUrl(
          fileName
        );

    return NextResponse.json({
      url:
        publicUrl.publicUrl,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}