const mongoose = require("mongoose")

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"Token is required to be added in blacklist"]
    }
},{
    timestamps: true  //db will maintain the time at which the token was added to the blacklist
})

const tokenBlacklistModel = mongoose.model("blacklistTokens", blacklistTokenSchema)

module.exports = tokenBlacklistModel
