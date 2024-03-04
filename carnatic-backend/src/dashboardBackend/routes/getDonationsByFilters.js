const express = require("express");
const { getDonations } = require("../controllers/donations");

const router = express.Router();

router.route("/").get(getDonations);

module.exports = router;
