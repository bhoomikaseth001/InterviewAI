const  mongoose=require("mongoose")

//userSchema defines the structure of the user document in the database, it is like a blueprint for the user collection in MongoDB
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true, "username already taken"],
        required:true,
    },

    email:{
        type:String,
        unique:[true, "email already registered"],
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})

//userModel is the model that we will use to interact with the user collection in the database, it is like a class that we can use to create, read, update and delete user documents in the database
const userModel= mongoose.model("user", userSchema)
//creating a model named user using the structure defined in userSchema

module.exports=userModel