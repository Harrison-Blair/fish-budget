import { createClient, SupportedStorage } from "@supabase/supabase-js";
import { Database } from "../types/database.types.js";

let clientInstance: ReturnType<typeof createClient<Database>> | null = null;

export interface SupabaseConifg {
  url: string;
  anonKey: string;
  storage?: SupportedStorage;
}

export function createSupabaseClient(config: SupabaseConifg) {
  if (clientInstance) {
    console.warn("Supabase client instance already created.");
    return;
  }

  const { url, anonKey, storage } = config;

  if (!url || !anonKey) {
    throw new Error("Client needs BOTH url AND anonKey");
  }

  return createClient<Database>(url, anonKey, {
    auth: {
      storage: storage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
}

export function getClient() {
  if (!clientInstance) {
    throw new Error(
      "Supabase client instance not created yet. Call createSupabaseClient() first.",
    );
  }
  return clientInstance;
}
