const express = require("express");
const router = express.Router();
const SummaryController = require("./summary.controller");

router.get("/", SummaryController.getTodaySummary);

module.exports = router;