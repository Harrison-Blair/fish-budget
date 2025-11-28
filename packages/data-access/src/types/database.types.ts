export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      budget_allocations: {
        Row: {
          allocated_amount: number;
          category_id: number;
          profile_id: string;
          template_id: number;
        };
        Insert: {
          allocated_amount: number;
          category_id: number;
          profile_id: string;
          template_id: number;
        };
        Update: {
          allocated_amount?: number;
          category_id?: number;
          profile_id?: string;
          template_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "budget_allocations_profile_id_template_id_fkey";
            columns: ["profile_id", "template_id"];
            isOneToOne: false;
            referencedRelation: "profile_budget_templates";
            referencedColumns: ["profile_id", "template_id"];
          },
          {
            foreignKeyName: "budget_allocations_template_id_category_id_fkey";
            columns: ["template_id", "category_id"];
            isOneToOne: false;
            referencedRelation: "budget_categories";
            referencedColumns: ["template_id", "id"];
          },
        ];
      };
      budget_categories: {
        Row: {
          description: string | null;
          id: number;
          name: string;
          parent_id: number | null;
          template_id: number;
        };
        Insert: {
          description?: string | null;
          id: number;
          name: string;
          parent_id?: number | null;
          template_id: number;
        };
        Update: {
          description?: string | null;
          id?: number;
          name?: string;
          parent_id?: number | null;
          template_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "budget_categories_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "budget_templates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "budget_categories_template_id_parent_id_fkey";
            columns: ["template_id", "parent_id"];
            isOneToOne: false;
            referencedRelation: "budget_categories";
            referencedColumns: ["template_id", "id"];
          },
        ];
      };
      budget_template_rules: {
        Row: {
          category_id: number;
          fixed_amount: number | null;
          name: string | null;
          percentage_allocation: number | null;
          template_id: number;
        };
        Insert: {
          category_id: number;
          fixed_amount?: number | null;
          name?: string | null;
          percentage_allocation?: number | null;
          template_id: number;
        };
        Update: {
          category_id?: number;
          fixed_amount?: number | null;
          name?: string | null;
          percentage_allocation?: number | null;
          template_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "budget_template_rules_template_id_category_id_fkey";
            columns: ["template_id", "category_id"];
            isOneToOne: true;
            referencedRelation: "budget_categories";
            referencedColumns: ["template_id", "id"];
          },
          {
            foreignKeyName: "budget_template_rules_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "budget_templates";
            referencedColumns: ["id"];
          },
        ];
      };
      budget_templates: {
        Row: {
          author_profile_id: string;
          description: string | null;
          id: number;
          name: string;
          recurrence_interval: number;
          recurrence_rule: Database["public"]["Enums"]["recurrence_rule"];
        };
        Insert: {
          author_profile_id: string;
          description?: string | null;
          id?: number;
          name: string;
          recurrence_interval: number;
          recurrence_rule: Database["public"]["Enums"]["recurrence_rule"];
        };
        Update: {
          author_profile_id?: string;
          description?: string | null;
          id?: number;
          name?: string;
          recurrence_interval?: number;
          recurrence_rule?: Database["public"]["Enums"]["recurrence_rule"];
        };
        Relationships: [
          {
            foreignKeyName: "budget_templates_author_profile_id_fkey";
            columns: ["author_profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profile_budget_templates: {
        Row: {
          is_active: boolean;
          profile_id: string;
          start_date: string;
          template_id: number;
        };
        Insert: {
          is_active?: boolean;
          profile_id: string;
          start_date: string;
          template_id: number;
        };
        Update: {
          is_active?: boolean;
          profile_id?: string;
          start_date?: string;
          template_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "profile_budget_templates_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profile_budget_templates_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "budget_templates";
            referencedColumns: ["id"];
          },
        ];
      };
      profile_budget_transactions: {
        Row: {
          category_id: number | null;
          profile_id: string;
          template_id: number;
          transaction_id: number;
        };
        Insert: {
          category_id?: number | null;
          profile_id: string;
          template_id: number;
          transaction_id: number;
        };
        Update: {
          category_id?: number | null;
          profile_id?: string;
          template_id?: number;
          transaction_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "profile_budget_transactions_profile_id_template_id_fkey";
            columns: ["profile_id", "template_id"];
            isOneToOne: false;
            referencedRelation: "profile_budget_templates";
            referencedColumns: ["profile_id", "template_id"];
          },
          {
            foreignKeyName: "profile_budget_transactions_profile_id_transaction_id_fkey";
            columns: ["profile_id", "transaction_id"];
            isOneToOne: false;
            referencedRelation: "transactions";
            referencedColumns: ["profile_id", "id"];
          },
          {
            foreignKeyName: "profile_budget_transactions_template_id_category_id_fkey";
            columns: ["template_id", "category_id"];
            isOneToOne: false;
            referencedRelation: "budget_categories";
            referencedColumns: ["template_id", "id"];
          },
        ];
      };
      profiles: {
        Row: {
          id: string;
          username: string;
        };
        Insert: {
          id: string;
          username: string;
        };
        Update: {
          id?: string;
          username?: string;
        };
        Relationships: [];
      };
      transaction_templates: {
        Row: {
          amount: number;
          description: string | null;
          end_date: string | null;
          id: number;
          is_active: boolean;
          name: string;
          profile_id: string;
          recurrence_interval: number;
          recurrence_rule: Database["public"]["Enums"]["recurrence_rule"];
          start_date: string;
        };
        Insert: {
          amount: number;
          description?: string | null;
          end_date?: string | null;
          id: number;
          is_active?: boolean;
          name: string;
          profile_id: string;
          recurrence_interval: number;
          recurrence_rule: Database["public"]["Enums"]["recurrence_rule"];
          start_date: string;
        };
        Update: {
          amount?: number;
          description?: string | null;
          end_date?: string | null;
          id?: number;
          is_active?: boolean;
          name?: string;
          profile_id?: string;
          recurrence_interval?: number;
          recurrence_rule?: Database["public"]["Enums"]["recurrence_rule"];
          start_date?: string;
        };
        Relationships: [
          {
            foreignKeyName: "transaction_templates_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      transactions: {
        Row: {
          amount: number;
          date: string;
          description: string | null;
          id: number;
          name: string;
          profile_id: string;
          template_id: number | null;
        };
        Insert: {
          amount: number;
          date: string;
          description?: string | null;
          id: number;
          name: string;
          profile_id: string;
          template_id?: number | null;
        };
        Update: {
          amount?: number;
          date?: string;
          description?: string | null;
          id?: number;
          name?: string;
          profile_id?: string;
          template_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "transactions_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transactions_profile_id_template_id_fkey";
            columns: ["profile_id", "template_id"];
            isOneToOne: false;
            referencedRelation: "transaction_templates";
            referencedColumns: ["profile_id", "id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      recurrence_rule: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      recurrence_rule: ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"],
    },
  },
} as const;
