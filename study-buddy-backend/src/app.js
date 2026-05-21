const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

db.getConnection()
    .then(() => {
        console.log("MySQL Connected");
    })
    .catch((err) => {
        console.log("DB Connection Failed", err);
    });

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("StudyBuddy Backend Running");
});

module.exports = app;