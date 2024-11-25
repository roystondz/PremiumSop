const mongoose = require('mongoose');
const debug = require("debug")("development:mongoose"); 
const config = require('config')

const dbcon = config.get("MONGODB_URI")

mongoose
.connect(dbcon)
.then(function(){
    debug("Connected");
})
.catch(function(err){
    debug(err);
})

module.exports = mongoose.connection;
