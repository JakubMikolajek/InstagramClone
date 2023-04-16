import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-url-polyfill/auto";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/database";

interface AuthConfig {
  storage: typeof AsyncStorage;
  autoRefreshToken: boolean;
  persistSession: boolean;
  detectSessionInUrl: boolean;
}

const supabaseUrl: string = "";
const supabaseKey: string = "";

export const supabaseClient: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    } as AuthConfig,
  }
);
