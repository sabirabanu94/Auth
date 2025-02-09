const express = require('express');

const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');


//creating Express Application
const app = express();

//Add middleware to parse JSON

app.use(express.json());
app.use(cookieParser());


//Mounting the Router
app.use('/api/v1/auth', authRouter);


//Listen Request

module.exports = app;