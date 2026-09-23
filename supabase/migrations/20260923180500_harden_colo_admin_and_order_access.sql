-- Applied in Supabase production
REVOKE ALL ON FUNCTION public.colo_is_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.colo_is_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.colo_is_admin() TO authenticated, service_role;

REVOKE ALL ON TABLE public.colo_admin_accounts FROM anon;
REVOKE ALL ON TABLE public.colo_orders FROM anon;
GRANT SELECT ON TABLE public.colo_admin_accounts TO authenticated;
GRANT SELECT, UPDATE ON TABLE public.colo_orders TO authenticated;

DROP POLICY IF EXISTS "colo admin sees self" ON public.colo_admin_accounts;
CREATE POLICY "colo admin sees self"
ON public.colo_admin_accounts
FOR SELECT TO authenticated
USING (id = (select auth.uid()));

CREATE TABLE IF NOT EXISTS public.colo_order_rate_limits (
  client_hash text NOT NULL,
  action text NOT NULL CHECK (action IN ('create','track')),
  window_start timestamptz NOT NULL,
  request_count integer NOT NULL DEFAULT 0 CHECK (request_count >= 0),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (client_hash, action)
);
ALTER TABLE public.colo_order_rate_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.colo_order_rate_limits FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.colo_order_rate_limits TO service_role;
