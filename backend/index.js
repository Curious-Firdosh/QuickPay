const express = require("express");
const { Database } = require("./Config/Database");
const Mainrouter = require("./Routes/index");
require("dotenv").config();
const cors = require('cors');
const cookieParser = require("cookie-parser");

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["https://quiickkpay.netlify.app", "http://localhost:5173"],
  credentials: true,
}));

// ================= ROUTES =====================
app.use("/api/v1", Mainrouter);

app.get("/", (req, res) => {
  res.send("Helllo Fir Se Aaa Gayee Naaa 🚀");
});

// ================= DB CONNECT =================
Database();

// ✅ Export app for Vercel (instead of listen)
module.exports = app;
