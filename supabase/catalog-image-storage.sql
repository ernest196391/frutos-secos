insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types) values ('colo-catalog','colo-catalog',true,5242880,array['image/jpeg','image/png','image/webp']) on conflict(id) do nothing;
create policy colo_catalog_images_admin_insert on storage.objects for insert to authenticated with check (bucket_id='colo-catalog' and (select public.colo_is_admin()));
create policy colo_catalog_images_admin_select on storage.objects for select to authenticated using (bucket_id='colo-catalog' and (select public.colo_is_admin()));
