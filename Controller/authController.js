const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../utils/auth');
require('dotenv').config();




const authController = {
    register: async(request, response) => {
        try {
            //extract detail
            const { name, email, password, dateOfBirth, role } = request.body;
            //Check if the user is already registered

            const user = await User.findOne({ email });
            if (user) return response.status(400).json({ error: 'User already exists' });
            //Create a new user

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                dateOfBirth,
                role
            });
            await newUser.save();
            return response.status(201).json({ message: "User Created Successfully" });
        } catch (error) {
            response.status(400).json({ error: error.message })
        }

    },
    login: async(request, response) => {
        try {

            //get the username and password from request body
            const { email, password } = request.body;
            const user = await User.findOne({ email: email });
            if (!user) return response.status(400).json({ message: 'User does not exist' });
            const passwordIsValid = await bcrypt.compare(password, user.password);
            if (!passwordIsValid) {
                return response.status(400).json({ message: 'Invalid Password' });
            }
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
            console.log(token);
            //store the token in cookies
            response.cookie('token', token, { httpOnly: true });


            //Send Bearer token along with response
            return response.status(200).json({ message: 'Login successful! Now try the various endpoints like users and me', token });
        } catch (error) {
            response.status(400).json({ error: error.message });

        }

    },
    logout: async(request, response) => {
        try {
            //clear the cookie
            await response.clearCookie('token');
            response.status(200).json({ message: 'Logout Successfull' })

        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    },
    me: async(request, response) => {
        try {
            //get the user_Id after middleware parsed from token(Auth middleware)
            const userID = request.userID;
            //find the user by ID
            const user = await User.findById(userID).select('-password -_id -__v -createdAt');
            //return user details
            //    return response.status(200).json(user);
            return response.status(200).json({ Name: user.name, Email: user.email, Date_of_Birth: user.dateOfBirth, Role: user.role });
        } catch {
            return response.status(500).json({ message: error.message });
        }
    },
    users: async(request, response) => {
        try {
            const userID = request.userID;
            const user = await User.findById(userID).select('-password -_id -__v -createdAt');
            if (!user || user.role != 'admin') return response.status(400).json({ message: "You are not admin to fetch details" });
            const allUsers = await User.find().select('-password -__v -createdAt -_id');
            const usersList = allUsers.map(user => ({
                Name: user.name,
                Email: user.email,
                Date_of_Birth: user.dateOfBirth,
                Role: user.role
            }));
            return response.status(200).json(usersList);
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    },
    home: async(request, response) => {
        try {
            // Send an enhanced HTML form for login with JavaScript for custom POST request
            response.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Login</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            height: 100vh;
                            margin: 0;
                            background-color: #f0f2f5;
                        }
                        .login-container {
                            max-width: 400px;
                            padding: 20px;
                            background-color: #ffffff;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            text-align: center;
                        }
                        h2 {
                            margin-bottom: 20px;
                            color: #333;
                        }
                        label {
                            display: block;
                            margin: 10px 0 5px;
                            text-align: left;
                        }
                        input[type="email"],
                        input[type="password"] {
                            width: 100%;
                            padding: 10px;
                            margin-bottom: 15px;
                            border: 1px solid #ddd;
                            border-radius: 5px;
                            box-sizing: border-box;
                        }
                        button {
                            width: 100%;
                            padding: 10px;
                            background-color: #4CAF50;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            font-size: 16px;
                            cursor: pointer;
                        }
                        button:hover {
                            background-color: #45a049;
                        }
                        .error {
                            color: red;
                            margin-top: 10px;
                        }
                        .success {
                            color: green;
                            margin-top: 10px;
                        }
                    </style>
                </head>
                <body>
                
                    <div class="login-container">
                        <h2>Login</h2>
                        <p>This is a basic form to test the Authentication. The form is given to test the login. Similiarly the creating and other functions can be done using the postman</p>
                        <form onsubmit="return submitForm(event)">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" required>
                            
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" required>
                            
                            <button type="submit">Login</button>
                            <div id="error" class="error"></div>
                            <div id="success" class="success"></div>
                        </form>
                    </div>
                    
                    <script>
                        async function submitForm(event) {
                            event.preventDefault(); // Prevent the default form submission
                            
                            const email = document.getElementById("email").value;
                            const password = document.getElementById("password").value;
                            const error = document.getElementById("error");
                            const success = document.getElementById("success");
    
                            error.textContent = "";
                            success.textContent = "";
    
                            try {
                                const response = await fetch("https://userauthenticationapp-ccp1.onrender.com/api/v1/auth/login", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({ email, password })
                                });
    
                                const data = await response.json();
    
                                if (response.ok) {
                                    success.textContent = data.message || "Login successful! Now try the various endpoints like users and me";
                                } else {
                                    error.textContent = data.message || "Login failed. Please try again.";
                                }
                            } catch (err) {
                                error.textContent = "An error occurred. Please try again later.";
                            }
                        }
                    </script>
                </body>
                </html>
            `);
        } catch (error) {
            console.error(error);
            response.status(500).send("An error occurred while loading the login form.");
        }
    },
    deleteUser: async(request, response) => {
        try {
            const userID = request.userID;

            // Check if the request is from an admin
            const requestingUser = await User.findById(userID);
            if (!requestingUser || requestingUser.role !== 'admin') {
                return response.status(403).json({ message: "Access denied. Only admins can delete users." });
            }

            // Get the user ID to delete from the request params
            const { id } = request.params;

            const userToDelete = await User.findById(id);
            if (!userToDelete) {
                return response.status(404).json({ message: "User not found." });
            }

            await User.findByIdAndDelete(id);

            return response.status(200).json({ message: "User deleted successfully." });
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    },
    updateUser: async(request, response) => {
        try {
            const userID = request.userID;

            // Check if the request is from an admin
            const requestingUser = await User.findById(userID);
            if (!requestingUser || requestingUser.role !== 'admin') {
                return response.status(403).json({ message: "Access denied. Only admins can update user details." });
            }

            // Get the user ID to update from the request params and new data from the body
            const { id } = request.params;
            const { name, email, dateOfBirth, role } = request.body;

            const userToUpdate = await User.findById(id);
            if (!userToUpdate) {
                return response.status(404).json({ message: "User not found." });
            }

            // Replace all fields except sensitive ones like password
            userToUpdate.name = name;
            userToUpdate.email = email;
            userToUpdate.dateOfBirth = dateOfBirth;
            userToUpdate.role = role;

            await userToUpdate.save();

            return response.status(200).json({ message: "User updated successfully.", user: userToUpdate });
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }



}


module.exports = authController;