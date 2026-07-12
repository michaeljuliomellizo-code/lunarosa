import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      product_id,
      customer_email,
      rating,
      comment,
    } = body;

    if (
      !product_id ||
      !customer_email ||
      !rating
    ) {
      return NextResponse.json(
        {
          error: "Datos incompletos",
        },
        {
          status: 400,
        }
      );
    }

    const { data: purchases } =
      await supabase
        .from("order_items")
        .select(`
          product_id,
          orders (
            customer_email,
            status
          )
        `)
        .eq(
          "product_id",
          product_id
        );

        console.log("PRODUCT ID:", product_id);
        console.log("EMAIL:", customer_email);
        console.log("PURCHASES:", purchases);

        const hasPurchased =
          purchases?.some(
            (item: any) =>
              item.orders?.customer_email ===
                customer_email &&
              [
                "pending",
                "approved",
                "shipped",
                "delivered",
              ].includes(
                item.orders?.status
              )
          );

        console.log(
          "HAS PURCHASED:",
          hasPurchased
        );
    /*
    if (!hasPurchased) {
      return NextResponse.json(
        {
          error:
            "Solo los clientes que compraron este producto pueden dejar reseñas",
        },
        {
          status: 403,
        }
      );
    }
    */
    const {
      data: existingReview,
    } = await supabase
      .from("reviews")
      .select("id")
      .eq(
        "product_id",
        product_id
      )
      .eq(
        "customer_email",
        customer_email
      )
      .maybeSingle();

    if (existingReview) {
      return NextResponse.json(
        {
          error:
            "Ya has dejado una reseña para este producto",
        },
        {
          status: 400,
        }
      );
    }

    const { error } =
      await supabase
        .from("reviews")
        .insert({
          product_id,
          customer_email,
          rating,
          comment,
          approved: false,
        });

    if (error) {
      console.log(
        "ERROR INSERT REVIEW:",
        error
      );

      return NextResponse.json(
        {
          error: error.message,
          details: error,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Reseña enviada correctamente. Será publicada después de ser aprobada.",
    });
    } catch (error: any) {

      console.log(
        "ERROR GENERAL REVIEW:",
        error
      );

      return NextResponse.json(
        {
          error:
            error.message ||
            "Error interno",
        },
        {
          status: 500,
        }
      );
    }
}