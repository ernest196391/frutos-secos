import {currentCatalog} from '../../../lib/catalog-server';
export async function GET(){try{return Response.json({products:await currentCatalog()},{headers:{'Cache-Control':'no-store'}})}catch{return Response.json({error:'No se pudo consultar el catálogo.'},{status:503})}}
