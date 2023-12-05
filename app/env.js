import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://cdvxqubbyuncwjszoyfs.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkdnhxdWJieXVuY3dqc3pveWZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyMDk1NzMsImV4cCI6MjAxNjc4NTU3M30.aFPLEbWobEgOl8008goSh1KcLZEZ_2gWGurTWDTH4ws";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
