
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {}
db.mongoose = mongoose;
db.user = require("./user.model");
db.reviews = require("./reviews.model");
db.summary = require("./summary.model");

db.convertObjectId = (id =>{
    return new mongoose.Types.ObjectId(`${id}`)
})

db.generateObjectId = (() => {
    return new mongoose.Types.ObjectId();
})

module.exports = db;