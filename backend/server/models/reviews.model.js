const mongoose = require("mongoose");
const REVIEWS_MODEL = "Reviews";
const STRICT = false;
const STRICT_QUERY = false;

const Fields = {
    "REVIEW": "review",
    "REVIEW_ID": "reviewId",
    "REVIEW_BY": "reviewBy",
    "CATEGORY": "category",
    "DATE": "date",
    "EVALUATED": "evaluated",
    "CREATED_AT": "createdAt",
}

const SCHEMA = new mongoose.Schema({
    [Fields.REVIEW]: String,
    [Fields.REVIEW_BY]: String,
    [Fields.REVIEW_ID]: {type: String, unique: true},
    [Fields.CATEGORY]: String,
    [Fields.EVALUATED]: Boolean,
    [Fields.DATE]: Date,
}, {
    strict: STRICT, strictQuery: STRICT_QUERY, timestamps: {
        createdAt: Fields.CREATED_AT
    }
}
)

const Review = mongoose.model(
    REVIEWS_MODEL, SCHEMA
)

module.exports = {
    "modelName": REVIEWS_MODEL,
    "model": Review,
    "fields": Fields
}