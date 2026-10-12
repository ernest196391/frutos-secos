# Colo Shop — continuidad de imágenes

## Lote 01 — 12 de octubre de 2026

Base comprobada en main y API pública: 581 productos; 480 con imagen individual; 101 fotos de tienda pendientes; 104 precios por confirmar.

Se prepararon e integraron 10 imágenes individuales provisionales, mediante la herramienta integrada de generación, basadas en las fotos originales. Marca, variante y tipo de envase revisados visualmente. Las reconstrucciones no sustituyen la etiqueta original como fuente de especificaciones. Se mantienen originales, precios, identificadores y existencias.

Productos: Lea & Perrins Worcestershire; Splenda French Vanilla; café Sebraz Extra Forte; Nesquik chocolate en bote; Nesquik fresa en bote; ColaCao Original; ColaCao Turbo; Choco Listo chocolate en bote; Choco Listo fresa en bolsa; cacao Macro Food.

Resultado del lote: 490 imágenes individuales y 91 fotos de tienda pendientes. La descripción de Splenda se precisa como crema para café French Vanilla según la foto. No se modifica el nombre usado por pedidos ni el precio.

Registro del lote y pauta de generación: `image-batch-2026-10-12-01.json`. Archivos finales: `../public/products/generated/*-20261012.webp`.

La página de revisión mostraba 216 pendientes porque su generador tenía ese número fijo. Ahora calcula el total desde el catálogo. `scripts/build-handoff.py` regenera los CSV y ambas páginas de revisión.

## Correspondencias que necesitan revisión antes de generar

- `purely-vanilla-granola`: la foto muestra Purely Elizabeth Chocolate Chip y Trader Joe’s Vanilla Almond; no confirma el nombre combinado de la ficha.
- `carmencita-pimientas`: en la foto aparecen pimienta negra y sal rosa con tres pimientas. Confirmar variante del molinillo grande.
- `kens-ranch` y `lime-juice`: no se identifican en la foto asociada de Worcestershire y condimentos.
- `carmencita-molinillo-pimienta`: la foto asociada muestra molinillos de marisco, barbacoa, picante y pollo; confirmar cuál corresponde.
- `milideas-vinagre`: la foto muestra Aldaketa, Vima, Gourmet y Varvello; no confirma Milideas.
- `welchs-grape`: se ve Pampa Grape y otro frasco parcialmente oculto; confirmar la correspondencia antes de sustituir.

Estas siete fichas conservan su foto y datos actuales; no se han resuelto por conjetura.

## Siguiente lote

Partir de `docs/handoff/imagenes-pendientes.csv` y cotejar con la API pública antes de editar. Priorizar bebidas en polvo y té con identidad comprobable. No regenerar los productos del lote 01. Cerrar cada lote con pruebas, publicación y comprobación del catálogo público y los archivos nuevos.

Validación local del lote 01: 24 pruebas aprobadas y compilación de producción correcta. Exactamente 10 fichas modificadas; todos los precios, nombres, IDs, existencias y fotos originales conservados. Publicación pendiente de comprobación en vivo.
