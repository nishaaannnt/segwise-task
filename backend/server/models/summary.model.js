const mongoose = require("mongoose");
const SUMMARY_MODEL = "Summary";
const STRICT = false;
const STRICT_QUERY = false;

const Fields = {
    "SUMMARY": "summary",
    "DATE": "date",
    "CREATED_AT": "createdAt",
}

const SCHEMA = new mongoose.Schema({
    [Fields.SUMMARY]: String,
    [Fields.DATE]: Date,
}, {
    strict: STRICT, strictQuery: STRICT_QUERY, timestamps: {
        createdAt: Fields.CREATED_AT
    }
}
)

const Summary = mongoose.model(
    SUMMARY_MODEL, SCHEMA
)

module.exports = {
    "modelName": SUMMARY_MODEL,
    "model": Summary,
    "fields": Fields
}