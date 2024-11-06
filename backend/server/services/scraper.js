const { classifyReview } = require("./phi3ai");

const ReviewHandler = require("../reviews/reviews.handler");
const { sanitizeReview } = require("../helpers/sanitize");

const APP_ID = "com.superplaystudios.dicedreams";

let evaluating = false;

async function fetchAndStoreReviews() {
  try {
    if(evaluating) {
      console.log("evaluating so skipped")
      return;
    }
    evaluating = true;
    console.log(`----------------------------`);
    console.log(`[${new Date().toISOString()}] Starting the scraping process...`);
    const gplay = await import("google-play-scraper");
    // get reviews
    const reviews = await gplay.default.reviews({
      appId: APP_ID,
      sort: gplay.default.sort.NEWEST,
      num: 20,
    });

    // filter by current date and date 7 days ago
    // maybe this needs to be CORRECTED
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
    console.log(newReviews);
    try {
      await ReviewHandler.addReviews(newReviews);
      console.log(`[${new Date().toISOString()}] ${newReviews.length} new reviews saved to the database.`);
    } catch (error) {
      // duplicate key error
      if (error.code === 11000) {
        console.log("Duplicate review detected; skipping duplicate entries.");
      } else {
        throw error;
      }
    }
    console.log(`----------------------------`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error fetching or saving reviews:`, error);
  } finally {
    console.log("done");
    evaluating = false;
  }
}

async function evaluateReviews(reviews) {
  try {
    for(let i=0;i<reviews.length;i++) {
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
