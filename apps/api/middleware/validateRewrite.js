const ALLOWED_TONES = ["formal", "casual", "persuasive", "concise", "friendly"];
const MAX_TEXT_LENGTH = 2000;

function validateRewrite(req, res, next) {
  const { text, tone } = req.body;

  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: "Text field is required and cannot be empty.",
    });
  }

  if (text.length > MAX_TEXT_LENGTH) {
    return res.status(400).json({
      success: false,
      error: `Text exceeds maximum length of ${MAX_TEXT_LENGTH} characters.`,
    });
  }

  if (!tone || !ALLOWED_TONES.includes(tone)) {
    return res.status(400).json({
      success: false,
      error: `Tone must be one of: ${ALLOWED_TONES.join(", ")}`,
    });
  }

  next();
}

module.exports = validateRewrite;
