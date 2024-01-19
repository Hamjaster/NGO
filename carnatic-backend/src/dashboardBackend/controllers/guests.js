const { Donation } = require("../../models/DonationSchema");
const Guest = require("../../models/GuestSchema");




const getGuests = async (req, res) => {

    try {
        // Find all donations associated with the Carnatic member
        const donations = await Donation.find({ guestDonor: { $exists: true, $ne: null } }).populate('guestDonor')
        console.log(donations)

        const donationsT = donations.map(don => {
            return {
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

module.exports = { getGuests }