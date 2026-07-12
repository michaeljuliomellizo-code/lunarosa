"use client";

import { supabase } from "@/lib/supabase/client";

export async function logout() {
  try {
    await supabase.auth.signOut();

    window.location.replace("/");
  } catch (error) {
    console.error(error);

    window.location.replace("/");
  }
}