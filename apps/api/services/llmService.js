const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const TONE_INSTRUCTIONS = {
  formal: "formal, professional, and polished",
  casual: "casual, relaxed, and conversational",
  persuasive: "persuasive and compelling, designed to convince the reader",
  concise: "concise and to the point, removing unnecessary words",
  friendly: "warm, friendly, and approachable",
};

async function rewriteText(text, tone) {
  const toneDescription = TONE_INSTRUCTIONS[tone];

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content:
          "You are a writing assistant. Rewrite the text given by the user in the requested tone. Keep the original meaning intact. Only return the rewritten text, with no preamble, no quotes, and no explanation.",
      },
      {
        role: "user",
        content: `Rewrite the following text in a ${toneDescription} tone:\n\n${text}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  return completion.choices[0].message.content.trim();
}

module.exports = { rewriteText };
