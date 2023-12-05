const express = require("express");
const { urlencoded } = require("body-parser");
const port = process.env.PORT || 2201;
const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));
const { getDailyDecisionTips } = require("./Api/tips");

app.post("/api/subscribe/tips", getDailyDecisionTips);
app.listen(port, function () {
  console.log(`Server running on live port ${port}`);
});
