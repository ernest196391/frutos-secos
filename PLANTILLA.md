# Contrato reusable de tienda

La aplicación separa **código común** de **datos del comercio**.

- `config/tenant.json`: identidad, contacto, colores, asistente y tarifas.
- `lib/catalog.js`: inventario real.
- `public/brand/`: logotipos y recursos de marca.
- `app/`, `lib/commerce.mjs`, `lib/tenant.js`: lógica compartida.
- `config/localities.json`: geografía reusable.

Las clases internas del asistente usan el prefijo neutral `assistant*`. No deben introducirse nombres heredados de otros comercios en el código.

Antes de publicar:
1. completar datos reales del tenant;
2. cargar inventario real;
3. cargar fotos reales;
4. configurar tarifas desde la ubicación real del comercio;
5. ejecutar `npm test` y `npm run build`.
