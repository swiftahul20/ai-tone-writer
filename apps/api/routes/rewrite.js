const express = require("express");
const router = express.Router();
const { handleRewrite } = require("../controllers/rewriteController");
const validateRewrite = require("../middleware/validateRewrite");

router.post("/", validateRewrite, handleRewrite);

module.exports = router;
