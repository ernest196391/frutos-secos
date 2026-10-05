export function mergeCatalog(base, overrides = []) {
 const index = new Map(overrides.map(row => [Number(row.product_id), row]));
 return base.map(p => {
  const o=index.get(p.id);
  return o?{...p,n:o.name,d:o.description,c:o.category,p:o.price==null?null:Number(o.price),stock:o.stock,img:o.image,active:o.active}:p;
 }).filter(p=>p.active!==false);
}
