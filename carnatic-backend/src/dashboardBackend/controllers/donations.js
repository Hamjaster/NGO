const mongoose = require("mongoose");
const { Donation } = require("../../models/DonationSchema");

function getFirstDayOfMonth(month, year) {
  console.log(month, year);
  // Create a new Date object with the given month and year
  // Months in JavaScript are 0-indexed, so we subtract 1 from the month
  const date = new Date(year ? year : "2024", month - 1, 1);

  // Return the ISO date format of the 1st day of the month
  return date.toISOString();
}

const getDonations = async (req, res) => {
  try {
    // Extracting filters from request query
    const { donorType, projects, years, startMonth, endMonth } = req.query;

    // Constructing filter object based on provided filters
    const filter = {};
    if (donorType) {
      const donorArray = donorType.split(",");
      const donorFilter = []; // Array to hold individual donor type filters

      // Iterate through donor types and construct filters
      donorArray.forEach((donorType) => {
        if (donorType === "guest") {
          donorFilter.push({ guestDonor: { $exists: true } });
        } else if (donorType === "member") {
          donorFilter.push({ carnaticDonor: { $exists: true } });
        }
      });

      // If both member and guest donors are present, use $or operator
      if (donorFilter.length > 1) {
        filter.$or = donorFilter;
      } else {
        // If only one donor type is present, use it as filter
        Object.assign(filter, donorFilter[0]);
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
    if (startMonth || endMonth) {
      filter.timestamp = {}; // Initialize timestamp filter

      // If only startMonth is provided, apply greater than equal filter
      if (startMonth) {
        console.log("Provided start");
        filter.timestamp.$gte = getFirstDayOfMonth(
          startMonth,
          years.length > 1 ? null : years[0]
        );
      }

      // If only endMonth is provided, apply less than filter
      if (endMonth) {
        console.log("Provided end");
        filter.timestamp.$lt = getFirstDayOfMonth(
          endMonth,
          years.length > 1 ? null : years[0]
        );
      }

      console.log(filter);
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
