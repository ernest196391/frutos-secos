export const normalizeSearch = value => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const tokens = value => normalizeSearch(value).split(/\s+/).filter(Boolean).map(t => t.length > 3 && t.endsWith("s") ? t.slice(0, -1) : t);
const aliases = {jugo: ["jugo", "nectar"], nectar: ["nectar", "jugo"], dulce: ["dulce", "caramelo", "chocolate", "galleta"], caramelo: ["caramelo", "dulce"], mani: ["mani", "peanut"], pistacho: ["pistacho", "pistachio"], detergente: ["detergente", "tide", "gain"]};
export function matchesSearch(product, query, subcategory = "") {
  const words = tokens([product.n, product.d, product.c, product.sharedProductId, subcategory].join(" "));
  return tokens(query).every(term => (aliases[term] || [term]).some(option => words.some(word => word.startsWith(option))));
}
