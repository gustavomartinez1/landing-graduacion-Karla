export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  try {
    const { filename, contentType } = await request.json();
    if (!filename || !contentType) return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400, headers: { "Content-Type": "application/json" } });
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(contentType)) return new Response(JSON.stringify({ error: "Invalid content type" }), { status: 400, headers: { "Content-Type": "application/json" } });
    const ts = Date.now();
    const rand = Math.random().toString(36).substring(2, 8);
    const ext = filename.split(".").pop().toLowerCase() || "jpg";
    const key = "uploads/" + ts + "-" + rand + "." + ext;
    const uploadUrl = `https://${env.IMAGES.name}.r2.cloudflarestorage.com/${env.IMAGES.name}/${key}`;
    return new Response(JSON.stringify({ uploadUrl, publicUrl: `https://pub-${env.IMAGES.name}.r2.dev/${key}`, r2Key: key }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch(e) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
