// call the schema and perform the actions
const dbModels = require("../models")
const Reviews = dbModels.reviews;

async function addReviews(body) {
    try {
        return await Reviews.model.insertMany(body, { ordered: true });
    } catch (e) {
        throw e;
    }
}

//query -> condition to fetch on , fields -> what to fetch in thats 
async function getReviewsByQuery(query, fields = {}, skip=0, limit=10) {
    try {
        let items = [];
        items = await Reviews.model.find(query, fields).skip(skip).limit(limit);
        return items;
    } catch (e) {
        throw e;
    }
}

async function getDistinctReviewByQuery(query, fields = {}) {
    try {
        let items = [];
        items = await Reviews.model.findOne(query, fields);
        return items;
    } catch (e) {
        throw e;
    }
}

async function updateReviewDetails(query, update) {
    try {
        await Reviews.model.updateMany(query, update);
        return true;
    } catch (e) {
        throw e;
    }
}
async function deleteReview(query) {
    try {
        await Reviews.model.deleteOne(query);
        return true;
    } catch (e) {
        throw e;
    }
}

async function aggregateReviews(pipeline) {
    try {
        return await Reviews.model.aggregate(pipeline);
    } catch (e) {
        throw e;
    }
}

module.exports = {
    addReviews: addReviews,
    getReviewsByQuery: getReviewsByQuery,
    getDistinctReviewByQuery: getDistinctReviewByQuery,
    updateReviewDetails: updateReviewDetails,
    deleteReview: deleteReview,
    aggregateReviews: aggregateReviews,
    convertObjectId: dbModels.convertObjectId
}