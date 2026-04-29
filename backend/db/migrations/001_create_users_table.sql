create table users (
  id uuid primary key default gen_random_uuid(),
  fname text not null,
  lname text not null,
  email text not null unique,
  password text not null,
  avatar_url text,
  avatar_path text, 
  created_at timestamptz default now()
);