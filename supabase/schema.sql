-- Run this once in Supabase → SQL Editor.
-- Anonymous per-device storage: each browser sends an x-device-id header and
-- row-level security only lets it read/write rows with that same device_id.

create table if not exists mood_entries (
  device_id  text not null,
  date       date not null,
  mood       int  not null check (mood between 1 and 5),
  cause      text,
  sleep      int,
  note       text,
  updated_at timestamptz default now(),
  primary key (device_id, date)
);

create table if not exists problem_entries (
  device_id  text   not null,
  id         bigint not null,
  created_at timestamptz default now(),
  problem    text   not null,
  response   jsonb,
  primary key (device_id, id)
);

alter table mood_entries    enable row level security;
alter table problem_entries enable row level security;

create or replace function current_device_id() returns text
language sql stable as $$
  select coalesce(
    (current_setting('request.headers', true)::json ->> 'x-device-id'),
    ''
  );
$$;

drop policy if exists "device owns moods" on mood_entries;
create policy "device owns moods" on mood_entries
  for all to anon
  using (device_id = current_device_id() and device_id <> '')
  with check (device_id = current_device_id() and device_id <> '');

drop policy if exists "device owns problems" on problem_entries;
create policy "device owns problems" on problem_entries
  for all to anon
  using (device_id = current_device_id() and device_id <> '')
  with check (device_id = current_device_id() and device_id <> '');
