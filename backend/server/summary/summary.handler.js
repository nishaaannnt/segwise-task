// call the schema and perform the actions
const dbModels = require("../models")
const Summary = dbModels.summary;

async function addSummaryDescription(body) {
    try {
        return await Summary.model.insertMany([body], { ordered: true });
    } catch (e) {
        throw e;
    }
}

//query -> condition to fetch on , fields -> what to fetch in thats 
async function getSummaryByQuery(query, fields = {}, skip=0, limit=10) {
    try {
        let items = [];
        items = await Summary.model.find(query, fields).skip(skip).limit(limit);
        return items;
    } catch (e) {
        throw e;
    }
}

async function getDistinctSummaryByQuery(query, fields = {}) {
    try {
        let items = [];
        items = await Summary.model.findOne(query, fields);
        return items;
    } catch (e) {
        throw e;
    }
}

async function updateSummaryDetails(query, update) {
    try {
        await Summary.model.updateMany(query, update);
        return true;
    } catch (e) {
        throw e;
    }
}
async function deleteSummary(query) {
    try {
        await Summary.model.deleteOne(query);
        return true;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    addSummaryDescription: addSummaryDescription,
    getSummaryByQuery: getSummaryByQuery,
    getDistinctSummaryByQuery: getDistinctSummaryByQuery,
    updateSummaryDetails: updateSummaryDetails,
    deleteSummary: deleteSummary,
    convertObjectId: dbModels.convertObjectId
}