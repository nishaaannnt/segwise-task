const ReviewsHandler = require("./reviews.handler");

async function getAllReviews(req, res, next) {
    try {
        let skip = 0;
        let limit =10;
        if(req.query.hasOwnProperty('skip')) {
            skip = req.query['skip'];
        }
        if(req.query.hasOwnProperty('limit')) {
            limit = req.query['limit'];
        }
        const data = await ReviewsHandler.getReviewsByQuery({},{},skip,limit);
        res.json({ data });
    } catch (e) {
        next(e);
    }
}

async function getReviewsByFilter(req, res, next) {
    try {
        const { date, category } = req.query;
        let skip = 0;
        let limit =20;
        if(req.query.hasOwnProperty('skip')) {
            skip = req.query['skip'];
        }
        if(req.query.hasOwnProperty('limit')) {
            limit = req.query['limit'];
        }
        let filter = {};
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(startDate.getDate() + 1);
            // start and end is given so that all timing under that can come
            filter.date = { $gte: startDate, $lt: endDate };
        }
        if (category) {
            filter.category = category;
        }
        const filteredReviews = await ReviewsHandler.getReviewsByQuery(filter,{},skip,limit);
        res.json({ data: filteredReviews });
    } catch (e) {
        next(e);
    }
}

async function getTrendStats(req, res, next) {
    try {
        const currentDate = new Date();
        const sevenDaysAgo = new Date();
        // go 7 days back
        sevenDaysAgo.setDate(currentDate.getDate() - 7);
        // aggregation
        const trendData = await ReviewsHandler.aggregateReviews([
            {
                $match: {
                    date: { $gte: sevenDaysAgo, $lt: currentDate },
                }
            },
            {
                // group in _id such that - each days - each category - and its count
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                        category: "$category"
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.date": 1 }
            }
        ]);

        // formatting trend data
        // {} is initial accumulator
        // for each day we collect it's review type
        const trendStats = trendData.reduce((acc, item) => {
            const { date, category } = item._id;
            if (!acc[date]) acc[date] = {};
            acc[date][category] = item.count;
            return acc;
        }, {});

        res.json({ trendStats });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getAllReviews,
    getReviewsByFilter,
    getTrendStats,
};
