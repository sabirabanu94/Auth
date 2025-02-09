# User Authentication and Authorization using Token

This project implements user authentication and authorization using Bearer tokens in a Node.js application with Express.js, Mongoose, and JWT. The application is structured with the MVC pattern and includes API documentation in Postman.



## Render Deployment URL 
[Render Deployment](https://userauthenticationapp-ccp1.onrender.com/api/v1/auth/home)

Use the sample login :


`{
    "email":"krish@gmail.com",
    "password":"123456789"
}` for admin login.

`{
    "email":"alice.johnson@example.com",
    "password":"123456789"
}` for user login.


## Postman Documentation URL
[Postman Documentation URL:](https://documenter.getpostman.com/view/38692959/2sAYBUDsEf)

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Deployment](#deployment)


## Features
- **User Registration**: Register new users with hashed passwords.
- **User Login**: Authenticate users and issue JWTs for authorized access.
- **JWT-Based Authorization**: Protect routes using Bearer tokens.
- **Secure User Info Retrieval**: Users can retrieve their information using valid tokens.
- **Error Handling and Validation**: Proper error messages and input validations.
- **API Documentation**: Detailed documentation using Postman, with sample requests and responses.

## Tech Stack
- **Node.js**: JavaScript runtime for server-side applications.
- **Express.js**: Minimalist web framework for Node.js.
- **Mongoose**: MongoDB object modeling for Node.js.
- **JWT**: JSON Web Token for secure token-based authentication.
- **Postman**: API testing and documentation.

## Setup and Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yourrepository.git
   cd yourrepository

2. Install dependencies:

    ```bash 
    npm install express
    npm install bcrypt
    npm install nodemon --save-dev
    npm install cookie-parser
    npm install dotenv
    npm install jsonwebtoken 
    npm install mongoose

3. Setting up environment variables .
4. Run the Application
    ```bash
    npm run dev   // In VS Code
    npm start     // In Server Deployment

## Environment Variables

Both of these values were put under .gitignore concerning security.

- **MongoDB Database URL** - The URL for the database stored in Atlas
- **Secret Key** - Which is used in hashing the token in token encryption and decryption phase. 



## Folder Structure

.

├── controllers      # Contains controller functions

├── models           # Contains Mongoose models

├── routes           # Defines routes for the application

├── utils            # Middleware for JWT token verification

├── index.js         # Basefile (e.g., database connection)

└── README.md        # Project documentation

## API Endpoints

1. ` POST /api/v1/auth/register` **Register a User**: Send a POST request to `/api/v1/auth/register` with JSON payload containing username, email, and password.
2. `POST /api/v1/auth/login` **Login User**: Send a POST request to `/api/v1/auth/login` with username and password. You’ll receive a JWT if credentials are valid.
3.  `GET /api/v1/auth/me` **Access Protected Routes - Personal Information**: Send requests to protected routes with `Authorization: Bearer <token>` header `authorization header` after logging in.
Here we use a GET request to `/api/v1/auth/me`. If it is already logged in, we'll receive the details of the users.
> [!NOTE]
> In our program, incase of successful login, we return the details of the user.

4.`POST api/v1/auth/logout` **Logout User**: Send a POST request to `api/v1/auth/logout`. It clears the token which is stored in the browser and logged out from the browser. If it is logged out, then we can't use the protected route `api/v1/auth/me`.

5. `GET api/v1/auth/users` **Access Protected Routes - All Informations of the Users** : Send a get request to `api/v1/auth/users` with `Authorization: Bearer <token>` header after logging in. If it is already logged in with `role:admin`, it returns all the informations of the registered users. Else it prevents the users to get all informations. 

6.  `GET /api/v1/auth/home` **Home URL** : It shows basic form to log in and testing the APIs mentioned in the 3<sup>rd</sup> and 5<sup>th</sup> APIs. Remaining APIs can be checked using POSTMAN. `/api/v1/auth/home`.

7. `PUT /api/v1/auth/users/:id` **Update User** : To Update the user, we can use their id. Since it is a protected route, we could only access them after admin login. 

8. `DELETE /api/v1/auth/users/:id` **Delete an User** : Using the ID of an user, we can delete the user by admin login.



## Deployment

The application can be deployed to Render for public access.

1. Pushed the code to GitHub.
2. Deployed the application by connecting our GitHub repository to Render.
3. Use the [Render URL](https://userauthenticationapp-ccp1.onrender.com/api/v1/auth/home) to access your deployed API.


