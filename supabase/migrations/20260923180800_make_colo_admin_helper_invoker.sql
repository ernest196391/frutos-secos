-- Applied in Supabase production
CREATE OR REPLACE FUNCTION public.colo_is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path TO 'public'
AS $function$
  select exists(
    select 1
    from public.colo_admin_accounts
    where id = (select auth.uid())
      and active
  );
$function$;

REVOKE ALL ON FUNCTION public.colo_is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.colo_is_admin() TO authenticated, service_role;
