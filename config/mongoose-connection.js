const mongoose = require('mongoose');
const debug = require("debug")("development:mongoose"); 
const config = require('config')


mongoose
.connect(`${config.get("MONGODB_URI")}/VividLuxury`)
.then(function(){
    debug("Connected");
})
.catch(function(err){
    debug(err);
})

module.exports = mongoose.connection;
