const jwt = require('jsonwebtoken')
const userModel = require('../models/user-model')

module.exports = async function(req,res,next){
    console.log(req.cookies.token);
    
    if(!req.cookies || !req.cookies){
        //req.flash("You must log in first");
        return res.redirect("/")
    }
    try{
        let decoded = jwt.verify(req.cookies.token,process.env.JWT_KEY)
        let user = await userModel.findOne({email:decoded.email}).select("-password");
        req.user = user
        next();
    }catch(err){
        //req.flash("Error","Something went Wrong")
        res.redirect("/")
    }
}