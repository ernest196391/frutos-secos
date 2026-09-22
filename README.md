# Frutos Secos Colo

Tienda online mobile-first construida sobre la arquitectura reutilizable de Mercado 23 y 28, pero con identidad, configuración y datos completamente separados.

## Estado
**Bloque 0 — Fundación técnica iniciado.**

- tenant propio de Frutos Secos Colo
- identidad SVG en `public/brand/`
- clases internas del asistente neutralizadas a `assistant*`
- catálogo real aún pendiente: no se arrastran productos de otro comercio
- WhatsApp, dirección, horarios y tarifas pendientes de datos reales
- checkout conserva la lógica reusable de entrega/recogida
- IA preparada, desactivada hasta configurar proveedor/clave

## Regla
El código reusable no debe contener nombres de negocios concretos. La identidad vive en `config/tenant.json`, el inventario en `lib/catalog.js` y los recursos visuales en `public/brand/`.
