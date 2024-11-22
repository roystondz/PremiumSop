const mongoose = require('mongoose')

const ownerSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    picture:String,
    gstin:Number,
    products:
        {
            type:Array,
            default:[]
        }
    ,
})

module.exports = mongoose.model("owner",ownerSchema);