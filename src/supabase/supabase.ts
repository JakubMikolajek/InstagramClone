import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-url-polyfill/auto"
import {createClient} from "@supabase/supabase-js";
import {Database} from "../types/database";

const supabaseUrl = "https://aqqnzwqssgqpxvwlqmpy.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxcW56d3Fzc2dxcHh2d2xxbXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgwMTgyODgsImV4cCI6MTk5MzU5NDI4OH0.iUEAChIMAYGR9svTttHidExkofbj4XGPfzB-Q7ka-Co"

export const client = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
})
