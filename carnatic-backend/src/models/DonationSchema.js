const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    txnid: {
        type: String,
        required: true
    },
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

const CounterSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    sequence: {
        type: Number,
        required: true
    }
})

const Donation = mongoose.model('Donation', DonationSchema);
const Counter = mongoose.model('Counter', CounterSchema);

module.exports = { Donation, Counter };
