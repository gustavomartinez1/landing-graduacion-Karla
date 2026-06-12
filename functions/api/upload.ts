// POST /api/upload - file upload + D1 insert
export async function onRequest(context) {
  const { request, env } = context;
  const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
  
  if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const name = formData.get("name")?.toString().trim() || "";
    const submittedBy = formData.get("submitted_by")?.toString().trim() || "";
    const note = formData.get("note")?.toString().trim() || "";

    if (!file || !(file instanceof File)) return new Response(JSON.stringify({ error: "Archivo requerido" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    if (file.size > 5 * 1024 * 1024) return new Response(JSON.stringify({ error: "Max 5MB" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return new Response(JSON.stringify({ error: "Tipo invalido" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    if (name.length < 2 || name.length > 100) return new Response(JSON.stringify({ error: "Nombre invalido" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });

    // Rate limit
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const { results: recent } = await env.DB.prepare("SELECT COUNT(*) as c FROM rate_limits WHERE ip = ? AND created_at >= datetime('now', '-10 minutes')").bind(ip).all();
    if (recent?.[0]?.c >= 3) return new Response(JSON.stringify({ error: "Demasiados intentos, espera 10 minutos" }), { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } });

    // Clean old
    await env.DB.prepare("DELETE FROM rate_limits WHERE created_at < datetime('now', '-1 hour')").run();

    // Generate key and upload to R2
    const ts = Date.now();
    const rand = Math.random().toString(36).substring(2, 8);
    const ext = file.name.split(".").pop().toLowerCase() || "jpg";
    const r2Key = "uploads/" + ts + "-" + rand + "." + ext;

    const arrayBuffer = await file.arrayBuffer();
    await env.IMAGES.put(r2Key, new Uint8Array(arrayBuffer), { httpMetadata: { contentType: file.type } });

    // Save to D1
    const idBytes = crypto.getRandomValues(new Uint8Array(8));
    const id = Array.from(idBytes).map(b => b.toString(36).padStart(2, "0")).join("").substring(0, 12);
    const now = new Date().toISOString().replace("T", " ").substring(0, 19);
    const publicUrl = "https://pub-38dd6ed8f1f745bab3a5a9c6d40d0845.r2.dev/" + r2Key;

    await env.DB.prepare("INSERT INTO graduates (id, name, photo_url, r2_key, created_at, submitted_by, note) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(id, name, publicUrl, r2Key, now, submittedBy, note).run();
    await env.DB.prepare("INSERT INTO rate_limits (ip, created_at) VALUES (?, ?)").bind(ip, now).run();

    return new Response(JSON.stringify({ id, name, photo_url: publicUrl, created_at: now }), {
      status: 201, headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  } catch (e) {
    console.error("Upload error:", e);
    return new Response(JSON.stringify({ error: "Error al subir foto" }), { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } });
  }
}
