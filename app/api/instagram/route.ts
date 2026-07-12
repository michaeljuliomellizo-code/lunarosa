import { NextResponse } from "next/server";

export async function GET() {
  const token =
    process.env.INSTAGRAM_TOKEN;

  const accountId =
    process.env.INSTAGRAM_ACCOUNT_ID;

  const response =
    await fetch(
      `https://graph.facebook.com/v23.0/${accountId}/media?fields=id,caption,media_url,permalink,like_count&access_token=${token}`
    );

  const data =
    await response.json();

  return NextResponse.json(
    data
  );
}