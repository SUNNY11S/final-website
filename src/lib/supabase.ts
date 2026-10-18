import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && publishableKey);
export const supabase = isSupabaseConfigured ? createClient(url!, publishableKey!) : null;

export type ProductRow = {
  id: string;
  name: string;
  category: 'indoor-packages' | 'stand-packages';
  category_label: string;
  price: number;
  original_price: number | null;
  badge: string | null;
  short_desc: string;
  features: string[];
  plants_included: string[];
  care_level: 'Easy' | 'Beginner' | 'Moderate';
  light_requirement: string;
  watering: string;
  image_url: string;
  ideal_for: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type OrderRow = {
  id: string;
  order_code: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  delivery_zone: 'dhaka' | 'outside-dhaka';
  payment_method: 'cod' | 'bkash';
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
};
