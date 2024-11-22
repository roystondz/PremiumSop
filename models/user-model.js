const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/VividLuxury")

const userScema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    isAdmin:Boolean,
    cart:[
        {
        type:Array,
        default:[]
        }
    ],
    orders:[
        {
            type:Array,
            default:[]
        }
    ],
    contact:Number,
    picture:String

})

module.exports = mongoose.model("user",userScema);