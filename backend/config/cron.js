
const cron = require('cron');
const { fetchAndStoreReviews } = require('../server/services/scraper');

const job = cron.CronJob.from({
    cronTime: '1 * * * * *', // Run every day at 1 AM
    onTick: fetchAndStoreReviews,
    start: false,
    timeZone: 'UTC'
});

module.exports = { job };
