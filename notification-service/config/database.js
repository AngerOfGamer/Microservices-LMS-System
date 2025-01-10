const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Gunakan "mongodb" sebagai host, sesuai dengan nama service di docker-compose.yml
        const conn = await mongoose.connect('mongodb://mongodb:27017/notifications', {
            useNewUrlParser: true, // Opsional jika menggunakan driver MongoDB 4.0+
            useUnifiedTopology: true, // Opsional jika menggunakan driver MongoDB 4.0+
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
