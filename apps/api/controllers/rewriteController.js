const { rewriteText } = require("../services/llmService");

async function handleRewrite(req, res) {
  const { text, tone } = req.body;

  try {
    const rewritten = await rewriteText(text, tone);

    return res.status(200).json({
      success: true,
      original: text,
      rewritten,
      tone,
    });
  } catch (error) {
    console.error("Rewrite error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to generate rewrite. Please try again.",
    });
  }
}

module.exports = { handleRewrite };
