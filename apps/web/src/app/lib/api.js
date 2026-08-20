export async function rewriteText(text, tone) {
  const res = await fetch("http://localhost:4000/api/rewrite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, tone }),
  });
  return res.json();
}
