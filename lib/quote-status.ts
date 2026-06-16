export type QuoteStatus =
  | "new"
  | "reviewing"
  | "quoted"
  | "production"
  | "ready"
  | "completed"
  | "declined";

export type QuoteRecord = {
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
  design_path: string | null;
  design_filename: string | null;
  status: QuoteStatus;
  internal_notes: string | null;
};

export const quoteStatusOptions: { value: QuoteStatus; label: string; color: string }[] = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200" },
  { value: "reviewing", label: "Reviewing", color: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200" },
  { value: "quoted", label: "Quoted", color: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200" },
  { value: "production", label: "In Production", color: "bg-brand/15 text-brand" },
  { value: "ready", label: "Ready", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200" },
  { value: "completed", label: "Completed", color: "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200" },
  { value: "declined", label: "Declined", color: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200" },
];

export function getStatusMeta(status: QuoteStatus) {
  return quoteStatusOptions.find((item) => item.value === status) ?? quoteStatusOptions[0];
}
