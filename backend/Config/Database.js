
const mongoose = require('mongoose')
require("dotenv").config();

exports.Database = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Database Connection SuccessFull ✅"))
    .catch((error) => {
        console.log("Database Connection Failed")
        console.error( "Error is => ", error);
    })
}