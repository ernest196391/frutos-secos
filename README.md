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
