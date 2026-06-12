// GET /api/graduates - list all graduates
export async function onRequest(context) {
  const { request, env } = context;
  const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, x-admin-password" };
  
  if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  
  if (request.method === "GET") {
    try {
      const { results } = await env.DB.prepare("SELECT id, name, photo_url, created_at, submitted_by, note FROM graduates ORDER BY created_at DESC").all();
      return new Response(JSON.stringify(results || []), { headers: { "Content-Type": "application/json", ...corsHeaders } });
    } catch (e) {
      return new Response(JSON.stringify({ error: "Error al obtener" }), { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
  }
  
  return new Response("Method not allowed", { status: 405, headers: corsHeaders });
}
