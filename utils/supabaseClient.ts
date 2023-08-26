import { Token } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export const supabaseClient = async (token: string) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl!, supabaseKey!, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  return supabase;
};
