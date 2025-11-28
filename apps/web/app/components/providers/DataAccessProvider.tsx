"use client";

import { useEffect, useRef } from "react";
import { initializeDatabaseAccess } from "@fish-budget/data-access";

export function DataAccessProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initalized = useRef(false);

  useEffect(() => {
    if (initalized.current) return;
    initalized.current = true;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error(
        "Supabase URL or Anon Key is missing in environment variables.",
      );
      return;
    }

    initializeDatabaseAccess({
      url: supabaseUrl,
      anonKey: supabaseAnonKey,
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
    });

    console.log("Database client initialized.");
  }, []);

  return <>{children}</>;
}
