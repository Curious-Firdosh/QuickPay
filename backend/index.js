const express = require("express");
const { Database } = require("./Config/Database");   // ✅ Make sure Database is exported properly
const Mainrouter = require("./Routes/index");        // ✅ This must export a router object
require("dotenv").config();
const cors = require('cors');
const cookieParser = require("cookie-parser");

const app = express();
const Port = process.env.PORT || 5000; // ✅ fallback in case .env is missing

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(cookieParser()); // !This will let you read and set cookies easily in your routes.
app.use(cors())
// ================= Cors =================
app.use(cors({
  origin: ["https://quiickkpay.netlify.app" , "http://localhost:5173"],  // React frontend URL
  credentials: true,               // allow cookies / auth headers
}));

// ================= ROUTES =====================
app.use("/api/v1", Mainrouter);  // ✅ all routes inside /api/v1

// Test route
app.get("/", (req, res) => {
  res.send("Helllo Fir Se Aaa Gayee Naaa 🚀");
});

// ================= DB + SERVER START =============
Database(); // ✅ Connect to MongoDB

app.listen(Port, () => {
  console.log(`✅ App is running successfully at port ${Port}`);
});