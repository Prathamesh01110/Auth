create table money (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  label text not null,
  amount numeric not null,
  created_at timestamptz default now()
);
alter table money enable row level security;
create policy "own money" on money using (auth.uid() = user_id) with check (auth.uid() = user_id);