
const cron = require('cron');
const { fetchAndStoreReviews } = require('../server/services/scraper');

// this is a scheduler in expressjs
// we will ask it to scrape everyday at 1AM

const job = cron.CronJob.from({
    // cronTime: '* * * * *', // runn every minute - for testing
    cronTime: '0 1 * * * *', // runn every day at 1 AM
    onTick: fetchAndStoreReviews,
    start: false,
    timeZone: 'UTC'
});

module.exports = { job };
