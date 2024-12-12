const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.ATLAS_URI);
        console.log('Database Connected');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1); //  Exit the process if the connection fails
    }
};

// module.exports = dbConnect;