# Paso 2 — Seguridad Supabase

## Cambios aplicados

### Base de datos
- Revocado acceso de `anon` a `colo_admin_accounts` y `colo_orders`.
- `authenticated` recibe solo:
  - SELECT en `colo_admin_accounts`;
  - SELECT/UPDATE en `colo_orders`.
- RLS sigue siendo la frontera de autorización.
- Política de cuenta propia optimizada con `(select auth.uid())`.
- `colo_is_admin()` funciona como SECURITY INVOKER.
- `anon` no puede ejecutar `colo_is_admin()`.
- Nueva tabla `colo_order_rate_limits`, cerrada a anon/authenticated.

### Edge Function colo-orders v3
El endpoint sigue siendo público para permitir checkout sin cuenta, pero ahora:
- solo admite POST;
- rechaza payloads >100 KB;
- limita create y track por IP hasheada en ventanas de 10 minutos;
- valida formato de referencia COLO-*;
- valida y limita teléfono, nombre, dirección, artículos, cantidades, precios y totales;
- devuelve Cache-Control: no-store.

## Resultado
El warning de acceso anónimo a una función SECURITY DEFINER fue eliminado. La función administrativa ya no eleva privilegios.
