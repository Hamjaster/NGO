const mongoose = require('mongoose');

// Connection URL and Database Name
const url = 'mongodb+srv://carnatic:carnatic@carnaticcluster.rqf0eae.mongodb.net/?retryWrites=true&w=majority';

module.exports = connectDB = async () => {
    try {
        const connection = await mongoose.connect(url)

        console.log('MongoDB connected', connection.connection.host);

    } catch (error) {
        console.log('MongoDB not connected', error);
    }
}

