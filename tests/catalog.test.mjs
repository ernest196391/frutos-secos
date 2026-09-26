import test from "node:test";
import assert from "node:assert/strict";
import {products} from "../lib/catalog.js";

test("demo catalog has 40 products",()=>assert.equal(products.length,40));
test("demo catalog follows Colo Shop live product categories",()=>{
  const counts=Object.fromEntries([...new Set(products.map(p=>p.c))].sort().map(c=>[c,products.filter(p=>p.c===c).length]));
  assert.deepEqual(counts,{
    "Alimentos":12,
    "Bebidas":16,
    "Charcutería":3,
    "Conservas":3,
    "Cárnicos":4,
    "Lácteos":2
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
