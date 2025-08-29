
const mongoose = require('mongoose');
require("dotenv").config();

exports.Database = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000 // 10 sec timeout
    });
    console.log("✅ Database Connected Successfully");
  } catch (err) {
    console.error("❌ Database Connection Failed:", err.message);
    throw err; // Important: don’t call process.exit()
  }
};