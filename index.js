const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();


//connect to database

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to the database');
        app.listen(5002, () => {
            console.log("Server is running @ http://localhost:5002");

        });
    })
    .catch((error) => {
        console.log('Connection failed');
        console.log(error);
    })