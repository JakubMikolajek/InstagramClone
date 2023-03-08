import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-url-polyfill/auto"
import {createClient} from "@supabase/supabase-js";
import {Database} from "../types/database";

const supabaseUrl = ""
const supabaseKey = ""

export const client = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
})
