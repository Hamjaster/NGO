const mongoose = require('mongoose');

const CarnaticMember = new mongoose.Schema({
    name: { type: String, required: true, },
    PAN: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    display_name: String,
    timestamp: Date,
    address: String,
});

const Carnatic = mongoose.model('carnatic', CarnaticMember);

module.exports = Carnatic;
