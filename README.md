# Frutos Secos Colo

Tienda online mobile-first con identidad y configuración propias, construida sobre una arquitectura reutilizable.

## Estado
**Bloques 0–2 cerrados. Bloque 3 en cierre técnico.**

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
- catálogo definitivo e imágenes propias pendientes de carga posterior

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

Estado actual: **Paso 1 en ejecución.**
