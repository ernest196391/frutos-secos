import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,readdirSync,statSync,existsSync} from "node:fs";
import {join} from "node:path";
const root=new URL("..",import.meta.url).pathname;
const tenant=JSON.parse(readFileSync(join(root,"config/tenant.json"),"utf8"));
const DATA=["config/tenant.json","lib/catalog.js"];
function code(dir,out=[]){for(const name of readdirSync(join(root,dir))){const rel=join(dir,name);if(statSync(join(root,rel)).isDirectory()){code(rel,out);continue}if(!/\.(js|mjs|css|json)$/.test(name))continue;if(DATA.includes(rel))continue;out.push(rel)}return out}
const files=[...code("app"),...code("lib"),"package.json"];
test("no legacy business naming remains in code",()=>{const forbidden=["Mercado 23 y 28","23 y 28","Bessy","bessy","Veci","veci"];const hits=[];for(const f of files){const s=readFileSync(join(root,f),"utf8");for(const x of forbidden)if(s.includes(x))hits.push(f+" → "+x)}assert.deepEqual(hits,[])});
test("tenant defines reusable storefront contract",()=>{for(const k of ["slug","name","shortName","tagline","seo","hero","theme","assistant","orderPrefix","brand","shippingRates"])assert.ok(tenant[k]!==undefined,"falta "+k);assert.equal(typeof tenant.shippingRates,"object")});
test("tenant images are served from public/",()=>{const paths=[tenant.hero.image,tenant.hero.imageSmall,...Object.values(tenant.brand)].filter(Boolean);const missing=paths.filter(p=>!p.startsWith("/")||!existsSync(join(root,"public",p)));assert.deepEqual(missing,[],"Las imágenes deben estar dentro de public/ y la ruta en tenant.json empezar por / (sin 'public')")});
