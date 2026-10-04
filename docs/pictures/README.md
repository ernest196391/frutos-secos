# Pictures: primer lote de tienda

Objetivo: recibir fotos del móvil, reconocer productos y etiquetas, proponer reutilización de imágenes, preparar fotografías comerciales y publicar ofertas de varias tiendas.

Este lote contiene 20 fotos fuente, 32 productos publicables y 16 candidatos pendientes. Los precios son CUP, confirmados por el propietario. No se inventa stock ni se asignan precios de etiquetas ambiguas. `lib/catalog.js` alimenta la tienda; `lib/catalog-review.json` registra lo pendiente. `/admin/productos` ofrece búsqueda, comparación con la foto fuente y exportación CSV, con la autenticación administrativa existente. La edición persistente de precios todavía no está implementada.

## Flujo reproducible

1. Guardar originales y calcular SHA-256 antes de cualquier transformación. `manifest.json` registra origen, dimensiones y hashes; las copias públicas se reducen para consulta y no reemplazan los originales del móvil.
2. Separar candidatos por producto y variante. Leer marca, presentación, cantidad, precio y moneda. Guardar dudas explícitas.
3. Buscar coincidencias por GTIN cuando sea legible; después marca, variante y tamaño. Comparar visualmente las sugerencias. Una foto parecida no demuestra que sea el mismo producto.
4. Reutilizar únicamente una imagen revisada del mismo producto, variante, tamaño y envase, con derechos de uso entre tiendas. Mantener el precio por tienda separado de la imagen.
5. Generar una imagen por producto con el original como referencia. Conservar forma, envase, marca, etiqueta y unidades. Fondo blanco, sombra suave, sin decoración ni precios sobre la imagen. Verificar el resultado contra la referencia; corregir cambios de envase antes de publicarlo. El texto generado no es fuente de ingredientes o instrucciones.
6. Optimizar a WebP de 900 px, guardar hash del resultado y aprobar precio. Publicar solamente productos revisados.
7. Ejecutar pruebas, compilación y revisión visual. Registrar el commit de publicación.

## Datos de la futura aplicación

- `Product`: ID global, GTIN opcional, marca, variante, tamaño, unidad, estado de revisión.
- `Asset`: producto, original, imagen comercial, hashes, versión, proveedor, instrucción y derechos de reutilización.
- `StoreOffer`: tienda, producto global, precio, moneda, disponibilidad y ID externo. Nunca guardar precio dentro de la imagen compartida.
- `Observation`: foto fuente, producto candidato, etiqueta de precio, evidencia y confianza.
- `Review`: decisiones humanas y motivo.
- `PublishJob`: oferta, destino, versión, resultado y clave de idempotencia para no duplicar publicaciones.

## Primer componente ejecutable

`pictures/index_images.py` crea un índice SHA-256 y dHash y sugiere duplicados exactos o visuales:

```sh
python -m pip install -r pictures/requirements.txt
python pictures/index_images.py carpeta_fotos --output indice.json
```

dHash sirve para imágenes casi idénticas; no reconoce de forma fiable el mismo producto desde otros ángulos ni dentro de una estantería. Las sugerencias requieren revisión y no mezclan registros automáticamente. Próximos componentes: subida móvil, extracción de productos/OCR, recortes por objeto, búsqueda por GTIN y similitud semántica, base persistente con permisos por tienda, revisión de imágenes/precios y adaptadores de publicación.

La carpeta `pictures/` y esta documentación pueden trasladarse al repo Pictures cuando exista. No hay todavía una aplicación completa ni un conector genérico para otras tiendas.
