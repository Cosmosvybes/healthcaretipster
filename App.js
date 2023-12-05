const express = require("express");
const path = require("path");
const { urlencoded } = require("body-parser");
const port = process.env.PORT || 2201;
const app = express();
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.json());
app.use(urlencoded({ extended: true }));
const { getDailyDecisionTips } = require("./Api/tips");
app.get("/", (req, res) => {
  res.sendFile(__dirname, "dist", "index.html");
});
app.post("/api/subscribe/tips", getDailyDecisionTips);
app.listen(port, function () {
  console.log(`Server running on live port ${port}`);
});
