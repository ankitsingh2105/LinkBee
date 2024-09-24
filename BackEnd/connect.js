const mongoose = require("mongoose");

async function connectToMongoDB(url) {
    return mongoose.connect("mongodb://localhost:27017");
}

module.exports = connectToMongoDB;
 