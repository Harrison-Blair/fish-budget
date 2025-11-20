import { createClient, SupportedStorage } from "@supabase/supabase-js";

export interface SupabaseConifg {
    url: string
    anonKey: string
    storage?: SupportedStorage
}

export function createSupabaseClient(config: SupabaseConifg) {
    const { url, anonKey, storage } = config

    if (!url || !anonKey) {
        throw new Error('Client needs BOTH url AND anonKey')
    }

    return createClient(url, anonKey, {
        auth: {
            storage: storage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        }
    })
}