const SummaryHandler = require("./summary.handler");

async function getTodaySummary(req, res, next) {
    try {
       
    } catch (e) {
        next(e);
    }
}

// async function getSummaryByDate(req, res, next) {
//     try {
       
//     } catch (e) {
//         next(e);
//     }
// }


module.exports = {
    getTodaySummary: getTodaySummary,
    // getSummaryByDate: getSummaryByDate,
}