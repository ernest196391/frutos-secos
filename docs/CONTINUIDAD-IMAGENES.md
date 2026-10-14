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

Validación local del lote 01: 24 pruebas aprobadas y compilación de producción correcta. Exactamente 10 fichas modificadas; todos los precios, nombres, IDs, existencias y fotos originales conservados. Publicado y verificado en producción: commit `44a8c1891c969cc9d86a4c247520eee744a1848c`, despliegue `dpl_5p8kxnghce3DGG9U44KPWG2gRkTN` READY. API pública: 581 productos, 490 imágenes individuales, 91 pendientes y 104 precios por confirmar. Los 10 archivos públicos coinciden byte por byte con los preparados. Contador de revisión confirmado. Evidencia: `verification-2026-10-12-lote-01.json`.


## Lote 02 — 12 de octubre de 2026

10 imágenes individuales provisionales: McDaniel’s Espresso, Nesquik en bolsa, té de limón, té de manzanilla, Sobisk Peanut Butter 18 Pack, Britannia Biscafé, Berry Croco Crunch, Quaker Fruit & Cream, Cocoa Pebbles vaso y Honey Bunches of Oats vaso. Registro de referencias y prompts: `image-batch-2026-10-12-02.json`.

Base pública comprobada: 490 individuales y 91 pendientes. Resultado preparado: 500 individuales, 81 pendientes, 104 precios por confirmar. Precios, nombres, IDs, stock, descripciones y fotos originales preservados. Reconstrucciones revisadas visualmente; correcciones puntuales de cantidades en Quaker y texto nutricional en Sobisk para coincidir con el original.

Correspondencias adicionales por aclarar: `coffee-whitener` dice Country pero la foto muestra Sunrise Coffee; `vima-albondigas-lata` está asociada a una foto de leche evaporada; `gourmet-double` muestra sobres de café soluble, no galletas; `bauducco-wafer-choco` tiene foto de sabores fresa y peanut butter; los tés combinados tampoco coinciden claramente con los nombres. No se modificaron estas fichas.

Antes del siguiente lote consultar la cola regenerada. Lote 02 publicado y verificado: commit `557a47563bf23c6900f41adb3e07b757dc658fc2`, despliegue `dpl_H3ibB8W5xAbNR6UTPPz5xZ7JsHiP` READY. 10 imágenes públicas coinciden byte por byte; API confirma 500 individuales, 81 pendientes y 104 precios por confirmar. Contador de revisión correcto. 24 pruebas y build aprobados. Evidencia: `verification-2026-10-12-lote-02.json`.


## Lote 03 — 12 de octubre de 2026

10 imágenes individuales provisionales: Frosted Flakes vaso, Rice Krispies mini, Corn Pops mini, Frosted Mini Wheats mini, Carr’s Assortment, Nerds Gummy Clusters Rainbow, Hershey’s Nuggets, Reese’s Pieces, M&M’s Honey Roasted Peanut y M&M’s Peanut frasco. Referencias y prompts: `image-batch-2026-10-12-03.json`.

Base pública: 500 individuales y 81 pendientes. Resultado preparado: 510 individuales y 71 pendientes; 104 precios por confirmar. Exactamente diez fichas modificadas; nombres, descripciones, precios, stock, IDs y fotos originales conservados. En M&M’s Honey se retiraron los pequeños indicadores nutricionales reconstruidos que no podían cotejarse con claridad. Las imágenes siguen marcadas como provisionales.

No resolver por conjetura: KitKat Minis muestra conejitos; Toblerone presenta varios tamaños; Reese’s barra podría corresponder a cups; Milano Double Milk parece Double Dark en la foto. Consultar cola regenerada antes del siguiente lote.

Lote 03 publicado y verificado: commit `44a5b25b344a55f3187f3a75bd7436c5bd51b4ee`, despliegue `dpl_A1zhd4gH2e7oPXsxK4cXkYwCDZqk` READY. Diez imágenes públicas coinciden byte por byte; API confirma 510 individuales, 71 pendientes y 104 precios por confirmar. Contador de revisión correcto. 24 pruebas y build aprobados. Evidencia: `verification-2026-10-12-lote-03.json`.

## Lote 04 — 12 de octubre de 2026

Base comprobada en API pública y main: 581 productos, 510 imágenes individuales, 71 pendientes y 104 precios por confirmar. Diez reconstrucciones provisionales con la herramienta integrada: Member’s Mark Cookie Thins; Lil’ Dutch Maid Oatmeal, Chocolate Chip y Almond Windmill; Fresko Butter Milky, Cappuccino y Coffee; Takis Fuego 28,4 g; Kar’s Sweet ’n Salty 128 g; Fan Fan Dried Apple 50 g.

Referencias, archivos y prompts: `image-batch-2026-10-12-04.json`. Marca, variante y formato cotejados visualmente. Resultado preparado: 520 imágenes individuales y 61 pendientes. Exactamente diez fichas cambian solo sus campos de imagen; nombres, precios, stock, descripciones, IDs y referencias originales preservados. Publicado y verificado: commit `192b292079298c3773830b6ec191b5cace699352`, despliegue `dpl_DM3b3LQtf6ZVkJD2vs6BzYtiaG7r` READY. Diez imágenes públicas coinciden byte por byte; API y contador confirman 520 individuales, 61 pendientes y 104 precios por confirmar. 24 pruebas y build aprobados. Evidencia: `verification-2026-10-12-lote-04.json`.

Observaciones adicionales para próximos lotes: `bentons-mint-cookies` dice Covered Cookies/caja, pero la referencia muestra Layered Cookies/bolsa; `crepel` debe cotejarse con la caja Wafer Master visible; Pica-Pau muestra tres sabores y necesita confirmar si la ficha los agrupa. No resolver estas diferencias por conjetura. Continuar desde la cola regenerada `docs/handoff/imagenes-pendientes.csv`.

## Lote 01 — 14 de octubre de 2026

Base comprobada en main y API: 581 productos, 520 imágenes individuales y 61 fotos de estante. Se integran siete imágenes provisionales revisadas: ensaladilla, maíz dulce Vima, nuggets C.Vale, papas Eurofrits Steakhouse, Lil’ Dutch Maid Lemon Creme y Vanilla Creme, y Benton’s Vanilla Sandwich Crème. Resultado preparado: 527 individuales, 54 pendientes, 104 precios por confirmar. Nombres, precios, IDs, stock y fuentes conservados. 24 pruebas y build aprobados. Registro y prompts: `image-batch-2026-10-14-01.json`.

La reconstrucción de Duplex no se publica: contenido visible de la ventana necesita cotejo adicional. Continúan las discrepancias documentadas en lotes anteriores.

Lote 01 del 14 de octubre publicado y verificado: commit 18c146cdf7858eda498c1f728e9c30c949c3ea28, despliegue dpl_qKJyTgB3rsRRDoZ5E7V99Bd8bWVS READY. API 581/527/54; siete archivos públicos coinciden byte por byte.

## Lote 02 — 14 de octubre de 2026

Siete cavas revisados: Solo Vida, Gran Juvé & Camps con estuche, Vallformosa Gala blanco y rosado, Classic Brut y rosado, e Ice. Referencias y prompts: image-batch-2026-10-14-02.json. Gala blanco utiliza la foto contigua 170943_1 para confirmar la variante; su fuente histórica se conserva. Resultado preparado: 534 individuales y 47 fotos de estante; precios, nombres, IDs y stock preservados.
