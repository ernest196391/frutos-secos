import {products} from './catalog';
import {supabase} from './supabase';
import {mergeCatalog} from './catalog-overrides.mjs';
export async function currentCatalog(){
 const {data,error}=await supabase.from('colo_product_overrides').select('*');
 if(error)throw new Error('No se pudo consultar el catálogo actual.');
 return mergeCatalog(products,data||[]);
}
