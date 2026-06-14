const jwt = require("jsonwebtoken") // JWT package for generating and verifying authentication tokens
const tokenBlacklistModel = require("../models/blacklist.model") // Blacklist model for storing invalidated tokens after logout


async function authUser(req, res, next){
    const token = req.cookies.token

    //if token is not provided
    if(!token){
        return res.status(401).json({
            message:"Token not provided"
        })
    }

    //checking if the provided token is blacklisted or not

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({token})

    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"Token is invalid"
        })
    }

    //if token is provided, verify the token
    try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store the decoded user information for later use
    req.user = decoded;  //we are storing the decoded data in a new property req.user

    next(); //passes the req to the controller
}
    //if the token is invalid or expired, jwt will throw an error
    catch(err){
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}

module.exports = {authUser}