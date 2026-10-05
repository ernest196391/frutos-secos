import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import {products} from "./catalog.js";
import tenant from "./tenant.json" with {type:"json"};
import {canonicalOrder} from "./order-catalog.mjs";

const jsonHeaders={"Content-Type":"application/json","Cache-Control":"no-store"};
const digits=(v:any)=>String(v||"").replace(/\D/g,"");
const trim=(v:any,max=250)=>String(v||"").trim().slice(0,max);
const bad=(status=400)=>new Response(JSON.stringify({ok:false}),{status,headers:jsonHeaders});
const reply=(body:any,status=200)=>new Response(JSON.stringify(body),{status,headers:jsonHeaders});

async function hash(value:string){
  const bytes=new TextEncoder().encode(value);
  const digest=await crypto.subtle.digest("SHA-256",bytes);
  return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("");
}
async function allowed(db:any,req:Request,action:"create"|"track"){
  const forwarded=req.headers.get("x-forwarded-for")||req.headers.get("cf-connecting-ip")||req.headers.get("x-real-ip")||"unknown";
  const ip=forwarded.split(",")[0].trim();
  const key=await hash(ip);
  const now=Date.now(),windowMs=10*60*1000,limit=action==="create"?30:40;
  const {data}=await db.from("colo_order_rate_limits").select("window_start,request_count").eq("client_hash",key).eq("action",action).maybeSingle();
  let start=data?.window_start?new Date(data.window_start).getTime():0;
  let count=Number(data?.request_count||0);
  if(!start||now-start>=windowMs){start=now;count=0}
  count++;
  await db.from("colo_order_rate_limits").upsert({
    client_hash:key,action,window_start:new Date(start).toISOString(),request_count:count,updated_at:new Date(now).toISOString()
  },{onConflict:"client_hash,action"});
  return count<=limit;
}

Deno.serve(async(req)=>{
  if(req.method!=="POST")return bad(405);
  const size=Number(req.headers.get("content-length")||0);
  if(size>100000)return bad(413);
  try{
    const body=await req.json();
    const db=createClient(Deno.env.get("SUPABASE_URL")!,Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const action=body.action as "create"|"track";
    if(action!=="create"&&action!=="track")return bad();
    if(!(await allowed(db,req,action)))return bad(429);

    if(action==="create"){
      let p;
      try { p=canonicalOrder(body.payload,products,tenant); }
      catch { return reply({ok:false,error:"Revisa el carrito y los precios actuales."},409); }
      const reference=trim(p.reference,32).toUpperCase();
      const phone=trim(p.phone,24);
      const fullName=trim(p.fullName,100);
      const mode=p.mode==="delivery"?"delivery":p.mode==="pickup"?"pickup":"";
      const items=Array.isArray(p.items)?p.items.slice(0,100):[];
      if(!/^COLO-[A-Z0-9-]{4,24}$/.test(reference)||digits(phone).length<8||!fullName||!mode||!items.length)return bad();

      const safeItems=[];
      for(const item of items){
        const quantity=Math.max(1,Math.min(99,Math.trunc(Number(item.quantity)||0)));
        const price=Number(item.price);
        const id=Number(item.id);
        const name=trim(item.name,120);
        if(!Number.isFinite(id)||!Number.isFinite(price)||price<0||price>100000000||!name)return bad();
        safeItems.push({id,name,price:Math.round(price*100)/100,quantity});
      }
      const subtotal=Number(p.subtotal),total=Number(p.total);
      if(!Number.isFinite(subtotal)||subtotal<0||subtotal>100000000||!Number.isFinite(total)||total<0||total>100000000)return bad();
      const shipping=p.fee==null?null:Number(p.fee);
      if(shipping!==null&&(!Number.isFinite(shipping)||shipping<0||shipping>100000000))return bad();

      const row={
        reference,phone,full_name:fullName,mode,
        municipality:mode==="delivery"?trim(p.municipality,100)||null:null,
        locality:mode==="delivery"?trim(p.locality,120)||null:null,
        address:mode==="delivery"?trim(p.address,250)||null:null,
        address_reference:mode==="delivery"?trim(p.referenceAddress,200)||null:null,
        location_url:mode==="delivery"?trim(p.location,120)||null:null,
        items:safeItems,subtotal,
        shipping:shipping??0,total,
        currency:trim(p.currency,8)||"CUP"
      };
      if(mode==="delivery"&&(!row.municipality||!row.locality||!row.address))return bad();
      const {data,error}=await db.from("colo_orders").upsert(row,{onConflict:"reference",ignoreDuplicates:true}).select("reference,status,created_at").single();
      if(error)throw error;
      return reply({ok:true,order:data});
    }

    const reference=trim(body.reference,32).toUpperCase();
    const phone=digits(body.phone);
    if(!/^COLO-[A-Z0-9-]{4,24}$/.test(reference)||phone.length<8)return bad();
    const {data}=await db.from("colo_orders")
      .select("reference,phone,status,full_name,mode,municipality,locality,address,items,subtotal,shipping,total,currency,created_at,updated_at")
      .eq("reference",reference).limit(1).maybeSingle();
    if(!data||digits(data.phone)!==phone)return reply({ok:false,order:null},404);
    const {phone:_,...order}=data;
    return reply({ok:true,order});
  }catch{
    return bad(500);
  }
});
