# COLO — Bitácora de aprendizaje para automatización

Objetivo: que cada tienda nueva herede las decisiones correctas y no repita errores ya resueltos.

## Reglas que ya son plantilla

1. **Assets públicos en `public/`.** Error cometido: guardar el hero en la raíz y referenciarlo como URL pública. Next.js devolvía 404. Regla: cualquier imagen servida por URL debe existir bajo `public/` y los tests deben comprobarlo.
2. **No abrir WhatsApp antes de persistir.** Error inicial: checkout podía depender solo del mensaje. Regla: crear pedido con referencia única antes de salir a WhatsApp; si falla, bloquear la salida.
3. **Idempotencia por referencia.** Reintentos/refrescos no pueden crear operaciones duplicadas.
4. **RLS no sustituye una auditoría.** Una tabla con RLS puede seguir expuesta mediante funciones SECURITY DEFINER. Regla: ejecutar advisors después de cada migración y revocar RPC públicos innecesarios.
5. **Seguimiento requiere dos factores de conocimiento.** Nunca exponer un pedido solo por referencia; usar referencia + teléfono y no devolver el teléfono.
6. **Tarifas no se inventan.** Heredar una fuente canónica versionada. Colo usa el tarifario NEXO y permite fallback municipio → localidad.
7. **Configuración por tenant.** Marca, moneda, locale, WhatsApp, dirección, prefijo y tarifas no deben quedar escritos en componentes.
8. **Copy orientado a acción.** Eliminar texto que explica el sistema pero no ayuda a comprar, confirmar o seguir.
9. **Admin con allowlist real.** Autenticarse no equivale a administrar. Comprobar sesión + tabla de administradores; recuperación no debe revelar si un correo existe.
10. **No hardcodear un correo de administrador en políticas.** El acceso debe depender de una tabla/función de rol.
11. **Estados explícitos.** recibido → confirmado → preparando → listo → en_camino → entregado/cancelado. La UI y la base comparten los mismos valores.
12. **Auditar producción, no solo código.** Cierre de bloque exige build/deployment READY, rutas críticas y prueba real controlada cuando haya persistencia.

## Evolución tomada de CUYANA

- Recuperación de contraseña desde el propio panel.
- No enumerar cuentas en mensajes de recuperación.
- Admin mobile-first.
- Los fallos deben mostrarse; no devolver “ok” cuando cero filas cambiaron.
- La bitácora y los scripts de auditoría forman parte del producto, no son notas temporales.

## Pendientes para convertir esto en generador

- Extraer el shell de tienda/admin a paquete o plantilla white-label.
- Generar tenant desde un único manifiesto.
- Script de bootstrap: marca → Supabase → tablas/RLS → tienda → checkout → seguimiento → admin → tests → deploy.
- Pruebas E2E repetibles para móvil y desktop.
