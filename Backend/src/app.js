//this file has the main code of our server, we will import all the routes here and start the server here as well
const express=require("express");
const cookieParser = require("cookie-parser") // Middleware to parse cookies from incoming requests



const app = express();

app.use(express.json()) //middleware that allow us to read the data in req.body
app.use(cookieParser()) //using the cookie parser middleware to parse the cookies from the incoming requests

const authRouter=require("./routes/auth.routes") //importing the auth routes

app.use("/api/auth", authRouter) //using the auth routes with the prefix /api/auth

module.exports=app;