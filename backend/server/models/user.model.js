const mongoose = require("mongoose");
const USER_MODEL = "User";
const STRICT = false;
const STRICT_QUERY = false;

const Fields = {
    "EMAIL": "email",
    "PASSWORD": "password",
    "CREATED_AT": "createdAt",
}

const SCHEMA = new mongoose.Schema({
    [Fields.USER_NAME]: String,
    [Fields.EMAIL]: String,
    [Fields.PASSWORD]: String,
}, {
    strict: STRICT, strictQuery: STRICT_QUERY, timestamps: {
        createdAt: Fields.CREATED_AT
    }
}
)

const User = mongoose.model(
    USER_MODEL, SCHEMA
)

module.exports = {
    "modelName": USER_MODEL,
    "model": User,
    "fields": Fields
}