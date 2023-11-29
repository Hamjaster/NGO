const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    PAN: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    address: String,
    isContacted: {
        type: Boolean
    }

});

const Guest = mongoose.model('Guest', GuestSchema);

module.exports = Guest;
