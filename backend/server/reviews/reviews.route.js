const express = require("express");
const router = express.Router();
const ReviewsController = require("./reviews.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, ReviewsController.getAllReviews);
router.get("/filter/", authMiddleware, ReviewsController.getReviewsByFilter);
router.get("/trends/", authMiddleware, ReviewsController.getTrendStats);

module.exports = router;