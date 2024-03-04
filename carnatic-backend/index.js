const express = require("express");
const cors = require("cors");
const connectDB = require("./src/utils/db");
const bodyParser = require("body-parser");
const port = 5000;
const app = express();
const mailRoutes = require("./src/routes/mailRotues");
const pdfRoutes = require("./src/routes/pdfRoutes");
const memberRoutes = require("./src/routes/memberRoutes");
const donationRoutes = require("./src/routes/donationRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const { sendMail } = require("./src/controllers/sendMail");
const dashboardMemberRoutes = require("./src/dashboardBackend/routes/memberRoutes");
const guestRoutes = require("./src/dashboardBackend/routes/guestRoutes");
const getDonationsByFilters = require("./src/dashboardBackend/routes/getDonationsByFilters");

require("dotenv").config();

app.use(
  cors({
    origin: "*",
  })
);
connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// All the routes
app.use("/member", memberRoutes);
app.use("/mail", mailRoutes);
app.use("/pdf", pdfRoutes);
app.use("/donate", donationRoutes);
app.use("/projects", projectRoutes);

// Dashbaord Routes
app.use("/dashboard/members", dashboardMemberRoutes);
app.use("/dashboard/guests", guestRoutes);
app.use("/dashboard/donations", getDonationsByFilters);

app.get("/", (req, res) => {
  res.send("APi is running successfully");
});

app.get("/test", function (req, res) {
  res.send("API is testing successfuly");
});

//initiate_payment API
app.post("/pay", function (req, res) {
  let data = req.body;
  var config = {
    key: process.env.EASEBUZ_KEY,
    salt: process.env.EASEBUZ_SALT,
    env: "prod",
    enable_iframe: 1,
  };
  console.log(config, "thats config");
  var initiate_payment = require("./Easebuzz/initiate_payment.js");
  initiate_payment.initiate_payment(data, config, res);
});

app.listen(port, () => {
  console.log(`'Server listening at ${port}`);
});
