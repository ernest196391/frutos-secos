"use client";
import {useEffect,useState} from "react";
import {useRouter} from "next/navigation";
import {supabase} from "./supabase";
export function useAdminAuth(){
 const router=useRouter(),[state,setState]=useState({loading:true,user:null});
 useEffect(()=>{let live=true;(async()=>{const {data}=await supabase.auth.getUser();if(!live)return;if(!data.user){setState({loading:false,user:null});router.replace("/admin/login");return}const {data:ok}=await supabase.rpc("colo_is_admin");if(!ok){await supabase.auth.signOut();setState({loading:false,user:null});router.replace("/admin/login");return}setState({loading:false,user:data.user})})();return()=>{live=false}},[router]);return state;
}
