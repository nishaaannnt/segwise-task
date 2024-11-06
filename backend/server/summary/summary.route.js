const express = require("express");
const router = express.Router();
const SummaryController = require("./summary.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, SummaryController.getTodaySummary);

module.exports = router;