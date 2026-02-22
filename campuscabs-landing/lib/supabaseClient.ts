import { createClient } from "@supabase/supabase-js";

// TODO(vercel-deployment): upgrade to typed client once Supabase types are generated
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; 
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//if either env var is missing at deployment 
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required."
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 