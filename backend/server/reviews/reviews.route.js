const express = require("express");
const router = express.Router();
const ReviewsController = require("./reviews.controller");

router.get("/", ReviewsController.getAllReviews);
router.get("/filter/", ReviewsController.getReviewsByFilter);
router.get("/trends/", ReviewsController.getTrendStats);

module.exports = router;