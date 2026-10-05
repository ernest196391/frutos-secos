import {shipping} from "./commerce.mjs";
export function canonicalOrder(payload,products,tenant){
 const invalid=()=>{throw new Error("El carrito cambió. Actualiza la tienda y vuelve a intentarlo.")};
 if(!payload||!Array.isArray(payload.items)||!payload.items.length||payload.items.length>100||!['pickup','delivery'].includes(payload.mode))invalid();
 const seen=new Set();const items=payload.items.map(x=>{const p=products.find(p=>p.id===x.id);if(!p||p.p==null||seen.has(x.id)||!Number.isInteger(x.quantity)||x.quantity<1||x.quantity>(p.stock??99)||x.price!==p.p)invalid();seen.add(x.id);return {id:p.id,name:p.n,price:p.p,quantity:x.quantity}});
 const subtotal=items.reduce((s,x)=>s+x.price*x.quantity,0),fee=shipping(payload.mode,payload.municipality,payload.locality,tenant.shippingRates),total=subtotal+(fee??0);
 if(payload.currency!==tenant.currency||payload.subtotal!==subtotal||payload.fee!==fee||payload.total!==total)invalid();
 return {...payload,items,lines:items.map(x=>({...products.find(p=>p.id===x.id),quantity:x.quantity})),subtotal,fee,total,currency:tenant.currency};
}
