const express= require('express');
const authController = require('../Controller/authController');
const auth = require('../utils/auth');
require('dotenv').config();

const authRouter = express.Router();

//Public Routes
authRouter.post('/register',authController.register );
authRouter.get('/home',authController.home );
authRouter.post('/login',authController.login );
authRouter.post('/logout',authController.logout );


//Protected Routes
authRouter.get('/me',auth.isAuthenticate,authController.me);
authRouter.get('/users',auth.isAuthenticate,authController.users);
// Update and Delete Routes (Protected, Admin Only)
authRouter.put('/users/:id', auth.isAuthenticate, authController.updateUser); // Update user by ID
authRouter.delete('/users/:id', auth.isAuthenticate, authController.deleteUser); // Delete user by ID




module.exports =authRouter;