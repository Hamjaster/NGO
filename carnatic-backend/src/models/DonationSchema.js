const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    receipt: {
        type: Number,
        required: true
    },
    guestDonor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest',
    },
    carnaticDonor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carnatic',
    },
    amount: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    project: String

});

const Donation = mongoose.model('Donation', DonationSchema);

module.exports = Donation;
