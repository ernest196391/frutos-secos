export function mergeCatalog(base, overrides = [], includeHidden = false) {
 const index = new Map(overrides.map(row => [Number(row.product_id), row]));
 const originalIds = new Set(base.map(p => p.id));
 const extra = overrides.filter(o => !originalIds.has(Number(o.product_id))).map(o => ({id:Number(o.product_id),sharedProductId:`custom-${o.product_id}`,n:o.name,d:o.description,c:o.category,p:o.price==null?null:Number(o.price),stock:o.stock,img:o.image,sourceImage:o.image,imageKind:"owner",provisional:false,active:o.active}));
 return [...base.map(p => {
  const o=index.get(p.id);
  if(!o)return p;
  const imageChanged=o.image!==p.img;
  return {...p,n:o.name,d:o.description,c:o.category,p:o.price==null?null:Number(o.price),priceStatus:o.price==null?"pending":"confirmed",stock:o.stock,img:o.image,active:o.active,...(imageChanged?{imageKind:"owner",provisional:false}:{})};
 }),...extra].filter(p=>includeHidden||p.active!==false);
}
