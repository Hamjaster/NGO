const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    PAN: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    isContacted: {
        type: Boolean
    }

});

const Member = mongoose.model('Member', MemberSchema);

module.exports = Member;
