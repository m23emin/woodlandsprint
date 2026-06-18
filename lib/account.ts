export type CustomerProfile = {
  id: string;
  full_name: string;
  phone: string | null;
  business_name: string | null;
  email: string;
  created_at: string;
  updated_at: string;
};

export type CustomerQuote = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  phone: string;
  email: string;
  business_name: string | null;
  service: string | null;
  quantity: string | null;
  need_by: string | null;
  notes: string | null;
  design_filename: string | null;
  design_path: string | null;
  status: import("@/lib/quote-status").QuoteStatus;
};

export const customerQuoteColumns =
  "id, created_at, updated_at, name, phone, email, business_name, service, quantity, need_by, notes, design_filename, design_path, status";
