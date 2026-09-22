# Bloque 0 — criterios de cierre

El bloque se considera cerrado cuando:

- identidad y datos de Frutos Secos Colo están separados del código reusable;
- no existe catálogo heredado de otro comercio;
- no quedan nombres internos `veci*` / `bessy*` en `app/` o `lib/`;
- dependencias están fijadas para builds reproducibles;
- `npm ci`, `npm test` y `npm run build` pasan en CI;
- WhatsApp, dirección, horarios y tarifas permanecen sin inventar hasta recibir datos reales;
- recursos SVG de marca viven en `public/brand/`.

La fase visual siguiente es **Bloque 1 — Home premium**.

## Resultado de cierre

QA ejecutado en GitHub Actions sobre Node.js 22: **PASS**.

- `npm ci`: PASS
- `npm test`: PASS
- `npm run build`: PASS
- guardia de nombres heredados: PASS

Bloque 0 cerrado.
