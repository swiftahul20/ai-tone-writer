const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function rewriteText(text, tone) {
  const res = await fetch(`${API_URL}/api/rewrite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, tone }),
  });
  return res.json();
}
