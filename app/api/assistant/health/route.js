import {assistantStatus} from "../../../../lib/ai-config";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(){
  const status=assistantStatus();
  return Response.json({ok:true,service:"assistant",...status},{headers:{"Cache-Control":"no-store"}});
}
