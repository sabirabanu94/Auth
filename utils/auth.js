const jwt=require('jsonwebtoken');
require('dotenv').config();

const auth = {
    isAuthenticate: (request, response,next) => {
        try {
            //Extraction of Token from Cookies
            // const token = request.cookies.token;

            const token=request.headers.authorization.split(' ')[1];
            console.log(token);
            
            if(!token) return response.status(401).json({message:"You don't have authorization to get Information"})
            const decoded=jwt.verify(token,process.env.SECRET_KEY);
            //set the user id in the request object
           console.log(request);
           
            console.log(decoded);
            
            request.userID=decoded.id;
            next();
        }
        catch(error){
            return response.status(500).json({message:error.message})

        }
        

    }


}

module.exports = auth;

