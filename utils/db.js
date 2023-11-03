const mongoose = require('mongoose');
require('dotenv').config();


const db = process.env.DATABASE_URL || "";

const connectDB = async () => {
    try {
        await mongoose.connect(db).then((data) => {
            console.log(`Database connected with ${data.connection.host}`);
        })
    } catch (error) {
        console.log(error.message);
        setTimeout(connectDB, 1000 * 5);
    }
}


module.exports = connectDB;