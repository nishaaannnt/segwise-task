const { classifyReview } = require("./phi3ai");
require('dotenv').config()
const ReviewHandler = require("../reviews/reviews.handler");
const { sanitizeReview } = require("../helpers/sanitize");

const APP_ID = process.env.APP_ID; // we can add this in env if required

// we will be using this manage the scraping state
let evaluating = false;

async function fetchAndStoreReviews() {
  try {
    if (evaluating) {
      console.log("evaluation in process. skipping for now...")
      return;
    }
    evaluating = true;
    // this library only supports ES6 
    const gplay = await import("google-play-scraper");

    const reviews = await gplay.default.reviews({
      appId: APP_ID,
      sort: gplay.default.sort.NEWEST,
      num: 30,
    });
    let newReviews = await formatReviews(reviews);

    // store reviews
    try {
      await ReviewHandler.addReviews(newReviews);
    } catch (error) {
      // throw duplicate key error
      if (error.code === 11000) {
        console.log("Duplicate review detected; skipping duplicate entries.");
      } else {
        throw error;
      }
    }
    evaluating = false;
    console.log(`----------------------------`);
  } catch (error) {
    evaluating = false;
    console.error(`[${new Date().toISOString()}] Error fetching or saving reviews:`, error);
  }
}

async function formatReviews(reviews) {
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  let newReviews = await reviews.data
    .filter(review => {
      const reviewDate = new Date(review.date);
      return reviewDate >= sevenDaysAgo;
    })
    .map((review) => {
      let sanitizedReview = sanitizeReview(review)
      return sanitizedReview
    });
  newReviews = await evaluateReviews(newReviews);
  return newReviews;
}

async function evaluateReviews(reviews) {
  try {
    for (let i = 0; i < reviews.length; i++) {
      const category = await classifyReview(reviews[i].text);
      if (!category) {
        console.log("not pulled yet", category)
        break;
      } else {
        reviews[i]['category'] = category
        reviews[i]['evaluated'] = true
      }
    }
    return reviews
  } catch (e) {
    console.error(`[${new Date().toISOString()}] Error fetching or saving reviews:`, e);
  }
}

module.exports = { fetchAndStoreReviews };
