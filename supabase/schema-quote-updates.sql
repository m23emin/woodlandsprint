-- Run after schema.sql and schema-customers.sql

-- Admin quote amount visible to customer
alter table public.quotes
  add column if not exists quoted_amount numeric(10, 2),
  add column if not exists quoted_message text,
  add column if not exists additional_designs jsonb not null default '[]'::jsonb;

-- Link guest quotes when customer registers with same email
create or replace function public.link_quotes_to_user(p_user_id uuid, p_email text)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_count integer;
begin
  update public.quotes
  set user_id = p_user_id
  where lower(email) = lower(p_email)
    and user_id is null;

  get diagnostics updated_count = row_count;
  return updated_count;
end;
$$;
