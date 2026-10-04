# Colo Shop

Tienda online mobile-first de Colo Shop, con identidad y configuración propias sobre una arquitectura reutilizable.

## Estado
**MVP funcional en cierre de entrega.**

- identidad y tenant propios
- home premium mobile-first
- búsqueda visual con sugerencias
- catálogo navegable y carrito persistente
- checkout con recogida o entrega
- WhatsApp de pedidos configurado
- punto de recogida configurado
- hero optimizado bajo `public/hero/`
- CI con tests y build
- tarifas de mensajería pendientes de datos comerciales reales
- taxonomía real de Colo Shop aplicada en home
- categorías Aseo y Frutos secos visibles y listas para recibir inventario real
- 84 productos reales con imágenes comerciales y precios CUP; 55 candidatos pendientes de revisión
- tabla de productos en `/admin/productos`, exportación CSV y trazabilidad de fotos
- base de Pictures en `pictures/` y `docs/pictures/README.md`

## Regla
La identidad vive en `config/tenant.json`, el inventario en `lib/catalog.js` y los recursos visuales en `public/`. No se inventan tarifas, horarios, stock ni datos comerciales.


## Ruta de cierre 1–10

1. Reparar CI.
2. Endurecer seguridad Supabase.
3. Completar catálogo provisional (objetivo: 10 productos por categoría) y hacer assets locales.
4. Crear/validar usuario administrador real.
5. Hacer prueba E2E de pedido completo y corregir total con mensajería pendiente.
6. Reparar y validar la IA.
7. Completar datos comerciales pendientes.
8. QA mobile-first completo.
9. SEO, indexación, dominio y publicación comercial.
10. Sustituir catálogo provisional por inventario/fotos/precios reales y cierre final.

Estado actual: **marca, hero, IA, checkout y navegación de categorías listos para inspección de MVP.**


## Paso 2 — Seguridad Supabase (cerrado)

- `colo_is_admin()` dejó de ser `SECURITY DEFINER` y ahora es `SECURITY INVOKER`.
- ejecución revocada para `anon`; permitida solo a `authenticated` y `service_role`.
- `colo_admin_accounts`: sin privilegios para anónimos; lectura autenticada protegida por RLS.
- `colo_orders`: sin acceso anónimo directo; lectura/actualización autenticada solo vía RLS de administrador.
- se creó `colo_order_rate_limits`, accesible solo por `service_role`.
- Edge Function `colo-orders` v3 endurecida con:
  - límite de tamaño de request;
  - validación estricta de referencia, teléfono, modalidad, productos, precios y cantidades;
  - límites de longitud;
  - rate limiting por hash de IP;
  - respuestas `no-store`;
  - eliminación de CORS abierto innecesario.

La función de pedidos sigue con `verify_jwt=false` porque el checkout público debe aceptar compras sin cuenta. La protección se realiza mediante validación, rate limiting y aislamiento de base de datos.


## Paso 3 — Catálogo provisional local (cerrado)

- 40 productos de muestra.
- 4 categorías, 10 productos por categoría.
- precios provisionales reutilizados del catálogo de 23 y 28 para inspección.
- las 40 imágenes están copiadas al repositorio de Colo bajo `public/products/`.
- la web ya no depende de URLs `raw.githubusercontent.com` del repo de 23 y 28.
- todos los productos llevan `provisional: true` para evitar confundirlos con el inventario definitivo.
- se auditó también la biblioteca de Zaldívar; sus imágenes de mercado están disponibles allí, pero la mayoría supera el límite de contenido binario del conector de GitHub. Para este MVP se priorizaron los recursos web ya optimizados de 23 y 28 y alojados localmente.


## Categorías Colo Shop

La navegación principal ya no depende de las categorías heredadas del catálogo demo. Colo Shop expone su estructura comercial propia:

- Alimentos
- Cárnicos
- Charcutería
- Frutos secos
- Lácteos
- Conservas
- Aseo
- Bebidas

Las categorías sin inventario demo se muestran como próximas en lugar de inventar productos.
