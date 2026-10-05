export const money=(n,tenant={})=>new Intl.NumberFormat(tenant.locale||"es-CU").format(n)+" "+(tenant.currency||"CUP");
export function shipping(mode,municipality,locality,rates={}){if(mode==="pickup")return 0;if(!municipality)return null;const exact=rates[municipality+"|"+(locality||"")],general=rates[municipality+"|"];const n=typeof exact==="number"?exact:general;return typeof n==="number"&&Number.isFinite(n)&&n>=0?n:null}
export function whatsappUrl(phone,text){const n=String(phone||"").replace(/[^0-9]/g,"");return /^[1-9][0-9]{7,14}$/.test(n)?"https://wa.me/"+n+"?text="+encodeURIComponent(text):null}
function section(title,lines){const present=lines.filter(Boolean);return present.length?[`*${title}*`,...present]:[]}
export function orderMessage(order,tenant={}){
const pickupPoint=tenant.pickupPoint||"nuestra tienda",orderTitle=tenant.orderTitle||"PEDIDO";
const itemTypes=order.lines.length,unitCount=order.lines.reduce((sum,p)=>sum+(Number(p.quantity)||0),0);
const products=order.lines.map((p,i)=>[
`${i+1}. *${p.n}* ×${p.quantity} — ${money(p.p*p.quantity,tenant)}`,
p.d?`   _${p.d}_`:null
].filter(Boolean).join("\n"));
const map=order.location?`https://www.google.com/maps/search/?api=1&query=${order.location}`:null;
const shippingText=order.mode==="pickup"?"Sin costo":order.fee===null?"Por confirmar":money(order.fee,tenant);
const totalText=order.fee===null?"Pendiente de mensajería":money(order.subtotal+order.fee,tenant);
const modeSummary=order.mode==="delivery"
?["🚚 A domicilio",order.locality,order.municipality].filter(Boolean).join(" · ")
:`🏬 Recogida en tienda`;
const fulfillment=order.mode==="delivery"
?section("ENTREGA",[
order.locality&&order.municipality?`📍 ${order.locality}, ${order.municipality}`:order.municipality?`📍 ${order.municipality}`:null,
order.address&&`Dirección: ${order.address}`,
order.referenceAddress&&`Referencia: ${order.referenceAddress}`,
map&&`Ubicación: ${map}`
])
:section("RECOGIDA",[
`📍 ${pickupPoint}`,
"Te confirmaremos por este chat cuándo estará listo."
]);
return [
`🛍️ *${orderTitle}*`,
`*Pedido #${order.reference}*`,
"🟠 *PENDIENTE DE CONFIRMACIÓN*",
"",
`*TOTAL · ${totalText}*`,
`${itemTypes} ${itemTypes===1?"producto":"productos"} · ${unitCount} ${unitCount===1?"unidad":"unidades"}`,
modeSummary,
"",
...section("PRODUCTOS",products),
"",
...section("IMPORTES",[
`Subtotal: ${money(order.subtotal,tenant)}`,
order.mode==="pickup"?"Recogida: Sin costo":`Mensajería: ${shippingText}`
]),
"",
...fulfillment,
"",
...section("CLIENTE",[
`👤 ${order.fullName}`,
`📞 ${order.phone}`
]),
"",
"*PARA CONFIRMAR EL PEDIDO*",
"1. Disponibilidad de los productos",
"2. Total final",
order.mode==="delivery"?"3. Horario estimado de entrega":"3. Horario estimado de recogida",
"",
`_Pedido registrado en la tienda. Conserva la referencia #${order.reference}._`
].join("\n").replace(/\n{3,}/g,"\n\n")
}
