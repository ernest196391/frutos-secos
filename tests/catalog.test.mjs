import test from "node:test";
import assert from "node:assert/strict";
import {existsSync,readFileSync} from "node:fs";
import {products} from "../lib/catalog.js";
const review=JSON.parse(readFileSync(new URL('../lib/catalog-review.json',import.meta.url)));
test("real catalog has unique products and valid assets",()=>{assert.equal(products.length,32);assert.equal(new Set(products.map(p=>p.id)).size,32);assert.equal(new Set(products.map(p=>p.sharedProductId)).size,32);for(const p of products){assert.equal(p.currency,'CUP');assert.equal(p.provisional,false);assert.ok(Number.isInteger(p.p)&&p.p>0);for(const path of [p.img,p.sourceImage])assert.ok(existsSync(new URL('../public'+path,import.meta.url)),path)}});
test("confirmed shelf prices are preserved",()=>{for(const [slug,price] of [['almendras-chocolate',25500],['papel-excelencia',1250],['peine-flexys',1000],['febreze-luxe',6000]])assert.equal(products.find(p=>p.sharedProductId===slug).p,price)});
test("uncertain products cannot be purchased",()=>{assert.equal(review.length,16);for(const p of review){assert.equal(p.status,'needs-review');assert.ok(p.reason);assert.ok(!products.some(x=>x.sharedProductId===p.sharedProductId))}});
