const express=require("express")
const authController = require("../controllers/auth.controller") //importing the auth controller to handle the logic of the auth routes
const authMiddleware = require("../middlewares/auth.middleware")

const authRouter = express.Router()

/**
 * @route POST/auth/register
 * @desc Register a new user
 * @access Public
 */

authRouter.post("/register",authController.registerUserController) //route to register a new user, it will call the registerUserController function in the auth controller to handle the logic of registering a new user
/**
 * @route POST/api/auth/login
 * @desc Login a user with email and password
 * @access Public
 */

authRouter.post("/login", authController.loginUserController) //route to login a user, it will call the loginUserController function in the auth controller to handle the logic of logging in a user with email and password

/**
 * @route GET/api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access Public
 */

authRouter.get("/logout", authController.logoutUserController) //route to logout a user, it will call the logoutUserController function in the auth controller to handle the logic of logging out a user by clearing the token from the user cookie and adding the token in the blacklist

/**
 * @route GET/api/auth/get-me
 * @description Get the details of the logged in user
 * @access Private
 */

authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController) //route to get the details of the logged in user, it will first call the authUser middleware to verify the token and then call the getMeController function in the auth controller to handle the logic of fetching the details of the logged in user using the decoded data from the token stored in req.user
module.exports=authRouter