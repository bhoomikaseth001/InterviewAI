const userModel = require("../models/user.model") //importing the user model to interact with the user collection in the database
const bcrypt = require("bcryptjs") // Used to hash passwords and verify them during login
const jwt = require("jsonwebtoken") // JWT package for generating and verifying authentication tokens
const tokenBlacklistModel = require("../models/blacklist.model") // Blacklist model for storing invalidated tokens after logout

/**
 * Helper function to get cookie options based on environment
 * @returns {Object} Cookie options object
 */
function getCookieOptions() {
    const isProduction = process.env.NODE_ENV === "production";

    return {
        httpOnly: true,                          // Prevent XSS attacks
        secure: isProduction,                    // HTTPS only in production, HTTP allowed in development
        sameSite: isProduction ? "none" : "lax", // "none" for cross-site (production), "lax" for localhost
        maxAge: 24 * 60 * 60 * 1000             // 1 day
    };
}

/**
 * 
 * @name registerUserController
 * @description 'Register a new user' 
 * @access Public
 */
async function registerUserController(req, res) {
    // function to register a new user
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide all the required fields"
        })
    }

    //if the user already exists
    //finding the user
    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Username or email already exists"
        })
    }

    //if the user does not exist, create a new user
    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, getCookieOptions());

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })
}


/**
 * @name loginUserController
 * @description 'Login a user' 
 * @access Public
 */
async function loginUserController(req, res) {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        })
    }

    //finding the user
    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    //if the user exists by the same email, compare the password 
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    // ✅ FIXED: Use getCookieOptions() instead of hardcoded secure: true
    res.cookie("token", token, getCookieOptions());

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })
}

/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access Public
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token

    if (token) {
        //add token to the blacklist
        await tokenBlacklistModel.create({ token })
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
}

/**
 * @name getMeController
 * @description Get the details of the logged in user
 * @access Private
 */
async function getMeController(req, res) {

    //req.user stores the decoded info
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })
}


module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}