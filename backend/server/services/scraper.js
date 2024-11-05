const {classifyReview}= require("./phi3ai");

const ReviewHandler = require("../reviews/reviews.handler");
const { sanitizeReview } = require("../helpers/sanitize");

const APP_ID = "com.superplaystudios.dicedreams"; 

async function fetchAndStoreReviews() {
  try {
    console.log(`----------------------------`);
    console.log(`[${new Date().toISOString()}] Starting the scraping process...`);
    const gplay = await import("google-play-scraper");  
    // get reviews
    const reviews = await gplay.default.reviews({
      appId: APP_ID,
      sort: gplay.default.sort.NEWEST,
      num: 10,
    });

    // filter by current date and date 7 days ago
    // maybe this needs to be CORRECTED
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    const newReviews = await reviews.data
      .filter(review => {
        const reviewDate = new Date(review.date);
        return reviewDate >= sevenDaysAgo;
      })
      .map((review) => {
        console.log(review)
        let sanitizedReview = sanitizeReview(review)
      // const category = await classifyReview(review.text);
      // if(!category) {
      //   console.log("not pulled yet",category) 
      //   return;   
      // } else{
      //   console.log(category);
      // }
        return {
         ...sanitizedReview,
         category: "bug"
        };
      });
      console.log(newReviews);
    await ReviewHandler.addReviews(newReviews);
    console.log(`[${new Date().toISOString()}] Finished scraping process.`);
    console.log(`[${new Date().toISOString()}] ${newReviews.length} reviews saved to the database.`);
    console.log(`----------------------------`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error fetching or saving reviews:`, error);
  }
}

module.exports = { fetchAndStoreReviews };
