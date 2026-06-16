-- Run in Supabase SQL Editor (https://supabase.com/dashboard)

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text not null,
  business_name text,
  service text,
  quantity text,
  need_by date,
  notes text,
  design_path text,
  design_filename text,
  status text not null default 'new' check (
    status in ('new', 'reviewing', 'quoted', 'production', 'ready', 'completed', 'declined')
  ),
  internal_notes text
);

create index if not exists quotes_status_idx on public.quotes (status);
create index if not exists quotes_created_at_idx on public.quotes (created_at desc);

-- RLS: ON with no public policies = locked from browser/anon key.
-- Admin panel uses SUPABASE_SERVICE_ROLE_KEY on the server only (bypasses RLS).
alter table public.quotes enable row level security;

-- Storage bucket (create in Dashboard → Storage → New bucket)
-- Name: quote-designs
-- Public: OFF (private)

-- Optional: auto-update updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists quotes_set_updated_at on public.quotes;
create trigger quotes_set_updated_at
before update on public.quotes
for each row execute function public.set_updated_at();
