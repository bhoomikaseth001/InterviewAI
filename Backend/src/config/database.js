const mongoose = require("mongoose")  //importing mongoose to connect to our MongoDB database
//Mongoose is a package that helps Node.js comm with MongoDB
//Node.js  ←→  Mongoose  ←→  MongoDB
//Application
//    ↓
//Mongo URI
//    ↓
//MongoDB Atlas

async function connectToDB(){ //function to connect the application to the db
    try{
        await mongoose.connect(process.env.MONGO_URI)

        console.log("Connected to Database")
    } catch (error) {
        console.error("Error connecting to Database:", error)
    }
}

module.exports= connectToDB