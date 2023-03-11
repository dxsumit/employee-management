require("dotenv").config();
const mongoose = require('mongoose');

const { MONGO_DB_URL } = process.env

const connectToDB = async () => {

    return mongoose.connect(MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => {
        console.log("Successully connected to DB..");
    })
    .catch( (err) => {
        console.log("Error in database connection \n", err);
    })
}

module.exports = {connectToDB};



