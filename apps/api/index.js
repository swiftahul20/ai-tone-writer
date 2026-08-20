const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const rewriteRoutes = require("./routes/rewrite");

const app = express();
const PORT = process.env.PORT || 4000;
const allowedOrigins = ["http://localhost:3000", process.env.FRONTEND_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Express server is running" });
});

app.use("/api/rewrite", rewriteRoutes);

app.listen(PORT, () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
});
