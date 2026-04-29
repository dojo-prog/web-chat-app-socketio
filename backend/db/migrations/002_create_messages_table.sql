create table messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references public.users(id) not null,
  receiver_id uuid references public.users(id) not null,
  content text,
  image_url text, 
  image_path text, 
  created_at timestamptz default now(),

  constraint message_not_empty 
  check (content is not null or image_url is not null)
);