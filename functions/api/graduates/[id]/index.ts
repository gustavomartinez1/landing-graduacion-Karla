// DELETE /api/graduates/:id - admin only
export async function onRequest(context) {
  const { request, env } = context;
  const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "DELETE, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, x-admin-password" };
  
  if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (request.method !== "DELETE") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  try {
    // Extract ID from URL: /api/graduates/SOME_ID
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    
    const adminPassword = request.headers.get("x-admin-password");
    if (!adminPassword || adminPassword !== env.ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    const graduate = await env.DB.prepare("SELECT id, r2_key FROM graduates WHERE id = ?").bind(id).first();
    if (!graduate) return new Response(JSON.stringify({ error: "No encontrado" }), { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } });

    await env.DB.prepare("DELETE FROM graduates WHERE id = ?").bind(id).run();

    try { await env.IMAGES.delete(graduate.r2_key); } catch (e) { console.error("R2 delete error:", e); }

    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json", ...corsHeaders } });
  } catch (e) {
    console.error("DELETE error:", e);
    return new Response(JSON.stringify({ error: "Error al borrar" }), { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } });
  }
}
