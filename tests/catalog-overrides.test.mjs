import test from 'node:test';
import assert from 'node:assert/strict';
import {mergeCatalog} from '../lib/catalog-overrides.mjs';
import {canonicalOrder} from '../lib/order-catalog.mjs';
const base=[{id:1,n:'Original',p:100,stock:10},{id:2,n:'Pendiente',p:null,stock:10}];
test('admin changes become canonical and hidden products disappear',()=>{
 const next=mergeCatalog(base,[{product_id:1,name:'Nuevo',description:'Unidad',category:'Aseo',price:150,stock:3,image:'/nuevo.webp',active:true}]);
 assert.equal(next[0].p,150);assert.equal(next[0].stock,3);assert.equal(next[0].n,'Nuevo');
 assert.equal(mergeCatalog(base,[{product_id:1,active:false}]).length,1);
});
test('unknown prices and quantities above stock cannot become orders',()=>{
 const order={items:[{id:1,price:100,quantity:11}],mode:'pickup',subtotal:1100,fee:0,total:1100,currency:'CUP'};
 assert.throws(()=>canonicalOrder(order,base,{currency:'CUP'}));
 assert.throws(()=>canonicalOrder({...order,items:[{id:2,price:null,quantity:1}],subtotal:0,total:0},base,{currency:'CUP'}));
});

test('new owner products enter the public catalog and hidden rows remain manageable',()=>{
 const row={product_id:1000000,name:'Producto nuevo',description:'Unidad',category:'Alimentos',price:250,stock:10,image:'https://example.com/product.webp',active:true};
 const next=mergeCatalog(base,[row]);assert.equal(next.length,3);assert.equal(next[2].id,1000000);assert.equal(next[2].p,250);
 assert.equal(mergeCatalog(base,[{...row,active:false}]).length,2);assert.equal(mergeCatalog(base,[{...row,active:false}],true).length,3);
 const order=canonicalOrder({items:[{id:1000000,price:250,quantity:1}],mode:'pickup',subtotal:250,fee:0,total:250,currency:'CUP'},next,{currency:'CUP'});assert.equal(order.items[0].name,'Producto nuevo');assert.equal(order.total,250);
});
test('replacing a shelf image removes its shelf-photo classification',()=>{
 const next=mergeCatalog([{...base[0],img:'/shelf.jpg',imageKind:'store-photo',provisional:true}],[{product_id:1,name:'Original',description:'Unidad',category:'Aseo',price:100,stock:10,image:'/owner.webp',active:true}]);
 assert.equal(next[0].imageKind,'owner');assert.equal(next[0].provisional,false);
});
