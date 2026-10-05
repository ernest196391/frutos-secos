"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {supabase} from "../../../lib/supabase";
import {tenant} from "../../../lib/tenant";
export default function NewPassword(){
 const [ready,setReady]=useState(false),[password,setPassword]=useState(""),[confirmation,setConfirmation]=useState(""),[busy,setBusy]=useState(false),[error,setError]=useState(""),[done,setDone]=useState(false);
 useEffect(()=>{let live=true;supabase.auth.getSession().then(({data})=>{if(live)setReady(Boolean(data.session))});const {data}=supabase.auth.onAuthStateChange((event,session)=>{if(live)setReady(Boolean(session))});return()=>{live=false;data.subscription.unsubscribe()}},[]);
 async function submit(e){e.preventDefault();setError("");if(password!==confirmation){setError("Las contraseñas no coinciden.");return}setBusy(true);const {error}=await supabase.auth.updateUser({password});setBusy(false);if(error){setError("No pudimos cambiar la contraseña. Solicita un nuevo enlace e inténtalo otra vez.");return}setDone(true)}
 return <main className="adminLogin"><section className="adminLoginCard"><img src={tenant.brand.logo} alt={tenant.name}/><h1>Nueva contraseña</h1>{done?<><p>Tu contraseña se actualizó.</p><Link href="/admin">Abrir el panel</Link></>:ready?<form onSubmit={submit}><label>Contraseña nueva<input type="password" autoComplete="new-password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)}/></label><label>Repetir contraseña<input type="password" autoComplete="new-password" minLength={8} required value={confirmation} onChange={e=>setConfirmation(e.target.value)}/></label><button className="adminPrimary" disabled={busy}>{busy?"Guardando…":"Guardar contraseña"}</button>{error&&<p role="alert">{error}</p>}</form>:<><p>Abre esta página desde el enlace de recuperación enviado a tu correo.</p><Link href="/admin/recuperar">Solicitar otro enlace</Link></>}</section></main>
}
