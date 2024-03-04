const mongoose = require("mongoose");
const { Donation } = require("../../models/DonationSchema");

const getDonations = async (req, res) => {
  try {
    // Extracting filters from request query
    const { donorType, projects, years, startMonth, endMonth } = req.query;

    // Constructing filter object based on provided filters
    const filter = {};
    if (donorType) {
      if (donorType === "guest") {
        filter.guestDonor = { $exists: true };
      } else if (donorType === "member") {
        filter.carnaticDonor = { $exists: true };
      }
    }
    if (years) {
      // Parse years into array if it's a comma-separated string
      const yearArray = years.split(",").map((year) => year);
      console.log(yearArray, "YEARS ARRAY");

      // Construct $or operator for multiple years
      filter.timestamp = {
        $gte: new Date(`${Math.min(...yearArray)}-01-01`),
        $lt: new Date(`${Math.max(...yearArray)}-12-31`),
      };
    }
    if (startMonth && endMonth) {
      filter.timestamp = {
        $gte: new Date(`${startMonth}-01`),
        $lt: new Date(`${endMonth}-31`),
      };
    }
    if (projects) {
      // Parse projects into array if it's a comma-separated string
      const projectArray = projects.split(",");
      filter.project = { $in: projectArray };
    }

    // Querying donations based on filters
    let donationsQuery = Donation.find(filter);

    // Populate carnaticDonor and guestDonor fields
    donationsQuery = donationsQuery
      .populate("carnaticDonor")
      .populate("guestDonor");

    const donations = await donationsQuery.exec();

    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getDonations };
