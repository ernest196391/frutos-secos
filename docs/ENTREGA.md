# Colo Shop

Tienda: https://frutos-secos-drab.vercel.app/
Panel: https://frutos-secos-drab.vercel.app/admin

## Catálogo y operación

581 productos en 10 categorías. Se conservan los 477 precios anteriores y se añaden 104 fichas con «Precio por confirmar». Estos productos se consultan por WhatsApp y no se cobran como gratuitos. Una observación Southern Dry Roasted sigue pendiente de identificar como variante o duplicado, por lo que no se ha duplicado la ficha.

Todos los productos parten de 10 unidades por indicación del propietario. El panel permite añadir productos y cambiar existencias, precios, nombres, categorías, visibilidad e imágenes. Las existencias limitan la cantidad solicitada y se editan manualmente; no hay descuento automático de inventario al confirmar un pedido.

Horario: 9:00 a. m. a 9:00 p. m. Los pedidos se registran antes de continuar a WhatsApp, donde se confirma disponibilidad y entrega.

## Administración

Acceso habilitado para ernest196391@gmail.com con su cuenta existente. La contraseña se introduce únicamente en la tienda. El enlace «¿Olvidaste la contraseña?» permite solicitar recuperación. Los cambios del catálogo se guardan con permisos limitados a administradores autorizados.

## Imágenes y revisión

Se mantienen 183 imágenes comerciales existentes y se publicaron 244 imágenes generadas provisionales basadas en las fuentes originales. Quedan 154 fotos individuales pendientes; conservan su foto de tienda original. La revisión y sustitución de las fotos de estante sigue en curso. Las imágenes generadas están marcadas como provisionales y pueden reemplazarse desde el panel. El personaje El Colo es un cartoon 3D pelirrojo, sonriente y animado, con movimiento reducido respetado.

Los CSV de `docs/handoff` enumeran el catálogo, los precios por confirmar, las imágenes provisionales y las 154 imágenes pendientes. `/revision-catalogo.html` ofrece una revisión visual con enlaces a las etiquetas originales. Los archivos de auditorías anteriores se conservan como histórico.

## Validación

`npm test` comprueba catálogo, precios canónicos, límites de cantidad y cambios de administración. `npm run build` verifica la compilación de producción. El catálogo público y la función de pedidos aplican las mismas modificaciones persistentes del panel.
