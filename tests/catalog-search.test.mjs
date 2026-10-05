import test from "node:test";
import assert from "node:assert/strict";
import {matchesSearch} from "../lib/catalog-search.mjs";
test("search finds accents, brands, product types and English packaging",()=>{
 const p={n:"Maní tostado",d:"Southern Grove Honey Roasted Peanuts",c:"Frutos secos",sharedProductId:"southern-honey"};
 for(const q of ["mani", "maní", "southern", "peanuts", "mani southern", "frutos secos"])assert.ok(matchesSearch(p,q,"Maní"),q);
 assert.ok(!matchesSearch(p,"southern pistachos","Maní"));
 assert.ok(matchesSearch({n:"Salsa pesto",d:"Barilla",c:"Conservas"},"aderezos","Salsas y aderezos"));
 assert.ok(!matchesSearch({n:"Lentejas",d:"Del Campo",c:"Alimentos"},"frijoles"));
});
