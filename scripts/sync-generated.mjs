import {readFileSync,writeFileSync,existsSync} from 'node:fs';
const path='lib/catalog.js';
const text=readFileSync(path,'utf8');
const products=JSON.parse(text.slice(text.indexOf('['),text.lastIndexOf(']')+1));
let count=0;
for(const p of products){
 const asset='/products/generated/'+p.sharedProductId+'.webp';
 if(existsSync('public'+asset)){p.img=asset;p.imageKind='generated';p.provisional=true;count++}
}
const next='// Catálogo de tienda. Los precios pendientes requieren consulta.\nexport const products='+JSON.stringify(products,null,2)+';\n';
writeFileSync(path,next);writeFileSync('supabase/functions/colo-orders/catalog.js',next);
console.log(JSON.stringify({products:products.length,generated:count,remaining:products.filter(p=>p.imageKind==='store-photo').length,pendingPrices:products.filter(p=>p.p==null).length}));
