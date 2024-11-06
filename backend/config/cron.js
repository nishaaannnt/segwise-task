
const cron = require('cron');
const { fetchAndStoreReviews } = require('../server/services/scraper');

const job = cron.CronJob.from({
    cronTime: '* * * * *', // runn every day at 1 AM
    // cronTime: '0 1 * * * *', // runn every day at 1 AM
    onTick: fetchAndStoreReviews,
    start: false,
    timeZone: 'UTC'
});

module.exports = { job };
