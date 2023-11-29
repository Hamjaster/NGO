const mongoose = require('mongoose');
const fs = require('fs');
const fastcsv = require('fast-csv');
const CarnaticMember = require('../models/CarnaticMember')
// Connection URL and Database Name
const url = 'mongodb+srv://carnatic:carnatic@carnatic-clustor.scs3ooc.mongodb.net/?retryWrites=true&w=majority';

module.exports = connectDB = async () => {
    try {
        const connection = await mongoose.connect(url)
        console.log('MongodB connected', connection.connection.host)

    } catch (error) {
        console.log('MongoDB not connected', error);
    }
}

