require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/profile", require("./routes/profile"));

// static files
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/auth", require("./routes/auth"));
app.use("/credential", require("./routes/credential"));

// home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// connect mongodb
const MONGO = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });
