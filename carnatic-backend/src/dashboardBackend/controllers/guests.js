const mongoose = require("mongoose");
const { Donation } = require("../../models/DonationSchema");
const Guest = require("../../models/GuestSchema");




const getGuests = async (req, res) => {

    try {
        // Find all donations associated with the Carnatic member
        const donations = await Donation.find({ guestDonor: { $exists: true, $ne: null } }).populate('guestDonor')
        console.log(donations)

        const donationsT = donations.map(don => {
            return {
                id: don._id,
                receipt: don.receipt,
                timestamp: don.timestamp,
                amount: don.amount,
                name: don.guestDonor.name,
                email: don.guestDonor.email,
                phone: don.guestDonor.phone,
                PAN: don.guestDonor.PAN,
                address: don.guestDonor.address,
                isContacted: don.guestDonor.isContacted,
            }
        })

        res.status(200).json({ success: true, message: donationsT });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const deleteGuests = async (req, res) => {
    const { ids } = req.body
    // Convert array of string IDs to mongoose ObjectIds
    // const Ids = ids.map(id => mongoose.Types.ObjectId(id));
    // console.log(guestIds)
    console.log(ids)
    try {
        const result = await Donation.deleteMany({ _id: { $in: ids } });

        if (result.deletedCount > 0) {
            return res.json({ success: true, message: 'Guests deleted successfully.' });
        } else {
            return res.status(404).json({ success: false, message: 'No matching guests found for deletion.' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

module.exports = { getGuests, deleteGuests }