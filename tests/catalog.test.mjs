import test from "node:test";
import assert from "node:assert/strict";
import {products} from "../lib/catalog.js";

test("demo catalog has 40 products",()=>assert.equal(products.length,40));
test("demo catalog has four balanced categories",()=>{
  const counts=Object.fromEntries([...new Set(products.map(p=>p.c))].map(c=>[c,products.filter(p=>p.c===c).length]));
  assert.deepEqual(counts,{
    "Carnes, Embutidos y Lácteos":10,
    "Bebidas":10,
    "Despensa y Bodega":10,
    "Snacks y Dulces":10
  });
});
test("demo catalog uses only local product assets",()=>{
  for(const p of products){
    assert.match(p.img,/^\/products\//);
    assert.equal(/^https?:\/\//.test(p.img),false);
  }
});
test("demo catalog is explicitly provisional",()=>{
  for(const p of products) assert.equal(p.provisional,true);
});
