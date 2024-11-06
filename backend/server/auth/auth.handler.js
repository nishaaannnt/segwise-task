// call the schema and perform the actions
const dbModels = require("../models")
const User = dbModels.user;

async function addUser(body) {
    try {
        return await User.model.insertMany(body, { ordered: true });
    } catch (e) {
        throw e;
    }
}

//query -> condition to fetch on , fields -> what to fetch in thats 
async function getUserByQuery(query, fields = {}, skip=0, limit=10) {
    try {
        let items = [];
        items = await User.model.find(query, fields).skip(skip).limit(limit);
        return items;
    } catch (e) {
        throw e;
    }
}

async function getDistinctReviewByQuery(query, fields = {}) {
    try {
        let items = [];
        items = await User.model.findOne(query, fields);
        return items;
    } catch (e) {
        throw e;
    }
}

async function updateReviewDetails(query, update) {
    try {
        await User.model.updateMany(query, update);
        return true;
    } catch (e) {
        throw e;
    }
}
async function deleteReview(query) {
    try {
        await User.model.deleteOne(query);
        return true;
    } catch (e) {
        throw e;
    }
}

async function aggregateUser(pipeline) {
    try {
        return await User.model.aggregate(pipeline);
    } catch (e) {
        throw e;
    }
}

module.exports = {
    addUser: addUser,
    getUserByQuery: getUserByQuery,
    getDistinctReviewByQuery: getDistinctReviewByQuery,
    updateReviewDetails: updateReviewDetails,
    deleteReview: deleteReview,
    aggregateUser: aggregateUser,
    convertObjectId: dbModels.convertObjectId
}