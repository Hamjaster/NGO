const Carnatic = require("../models/CarnaticMember");
const { Donation, Counter } = require("../models/DonationSchema");
const Guest = require("../models/GuestSchema");


const donate = async (req, res) => {
    // Incresing the auto - id
    const count = await Counter.findOneAndUpdate({ id: 'autoval' },
        { "$inc": { "sequence": 1 } },
        { new: true }
    )
    if (!count) return;
    try {
        if (req.body.member === "guest") {

            const { data } = await Donation.create({
                guestDonor: req.body.id,
                amount: req.body.amount,
                receipt: count.sequence,
                project: req.body.project
            })
            await Guest.findByIdAndUpdate(req.body.id,
                { $inc: { donation: req.body.amount } },
                { new: true, upsert: true }
            )
            return res.status(201).json({ success: true, data: data });
        } else {
            const data = await Donation.create({
                carnaticDonor: req.body.id,
                amount: req.body.amount,
                receipt: count.sequence,
                project: req.body.project
            })
            console.log(data)
            await Carnatic.findByIdAndUpdate(req.body.id,
                { $inc: { donation: req.body.amount } },
                { new: true, upsert: true }
            )
            return res.status(201).json({ success: true, data: data });
        }

    } catch (error) {
        return res.status(400).json({ success: false, data: error })
    }
}

module.exports = { donate }