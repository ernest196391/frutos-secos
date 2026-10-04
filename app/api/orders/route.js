import {products} from "../../../lib/catalog";
import {tenant} from "../../../lib/tenant";
import {canonicalOrder} from "../../../lib/order-catalog.mjs";
const ENDPOINT="https://viwwlriwlwodrfukbgbj.supabase.co/functions/v1/colo-orders";
export async function POST(req){let payload;try{payload=canonicalOrder(await req.json(),products,tenant)}catch{return Response.json({ok:false,error:"Revisa el carrito y los precios actuales."},{status:409})}try{const r=await fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"create",payload}),cache:"no-store"});return Response.json(await r.json(),{status:r.status})}catch{return Response.json({ok:false},{status:502})}}
