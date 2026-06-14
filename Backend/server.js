require("dotenv").config() //using this we can access the environment variables in our .env file using process.env.VARIABLE_NAME

const app = require("./src/app")
const connectToDB = require("./src/config/database")

connectToDB() //connect to the database before starting the server.....function call


app.listen(3000,() => {
    console.log("Server is running on port 3000")
})



