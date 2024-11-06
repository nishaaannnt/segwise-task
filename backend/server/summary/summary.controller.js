const ReviewsHandler = require("../reviews/reviews.handler");
const { generateSummary } = require("../services/phi3ai");
const SummaryHandler = require("./summary.handler");

async function getTodaySummary(req, res, next) {
    try {
        let skip = 0;
        let limit =20;
        if(req.query.hasOwnProperty('skip')) {
            skip = req.query['skip'];
        }
        if(req.query.hasOwnProperty('limit')) {
            limit = req.query['limit'];
        }
        const { date } = req.query;
        if(!date) {
            return res.status(403).json({message:"Invalid Format"})
        }
        const startDate = new Date(date);
        let filter = {date:startDate};
        const summary = await SummaryHandler.getSummaryByQuery(filter);
        console.log(summary);
        if(summary.length) {
            return res.json(summary);
        }

        const endDate = new Date(date);
        endDate.setDate(startDate.getDate() + 1);
        filter.date = { $gte: startDate, $lt: endDate };
        console.log("here", filter);
        let reviews = await ReviewsHandler.getReviewsByQuery(filter,{text:1, category:1, _id:0});
        if(!reviews.length) {
            return res.json({data:"No data for this date"})
        }
        console.log(reviews);
        const summarized = await generateSummary(reviews)
        if(!summarized) {
            return res.status(500).json({message:"Failed to summarize. Please try later"})
        }

        const data = await SummaryHandler.addSummaryDescription({summary:summarized, date: startDate});
        res.json(data);
    } catch (e) {
        next(e);
    }
}


module.exports = {
    getTodaySummary: getTodaySummary,
}