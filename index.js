/*
 * Title: Root Server File 
 * Description: Handle All Root Server Related things
 * Author: Md abdullah
 * Date: 11/03/23
 */



const express = require('express');
const path = require("path");
const connectDB = require('./utils/db');
const listingRouter = require('./routes/listing.route.js');
const app = express();
require('dotenv').config();


app.use(express.json());
app.use('/api/listing', listingRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is connected on PORT ${process.env.PORT}`);
    connectDB();
});

//Serve client:
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})


//Global Error Middleware:
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internel server error';

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})