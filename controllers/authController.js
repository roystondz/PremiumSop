const userModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
//we have specified a named function
const {generateToken} = require("../utils/generateToken")

module.exports.registerUser = async function(req,res){
    try{
        let { email,fullname,password} = req.body

        let userSearch = await userModel.findOne({email});
        if(userSearch){
            req.flash('error','Email already exists')
            return res.status(401).redirect("/")
        }
        else{
        bcrypt.genSalt(12,function(err,salt){
            bcrypt.hash(password,salt,async function(err,hash){
                if(err) return res.send(err.message)
                let user = await userModel.create({
                    
                    fullname,
                    email,
                    password:hash
                })
                let token = generateToken(user);
                res.cookie("token",token);
                res.redirect("/shop")
            })
        })
        
    }
    }catch(err)
    {
        console.log(err.message);
    }

}

module.exports.loginUser = async function(req,res){
    try{
        let {email,password} = req.body;
        let userSearch = await userModel.findOne({email});
        if(!userSearch){
             req.flash('error',"Email or password incorrect")
             return res.status(401).redirect("/") 
            //.send({message:"Email not found"})
        }
        
        
            bcrypt.compare(password,userSearch.password,function(err,match){
                if(match){
                    let token = generateToken(userSearch);
                    res.cookie("token",token)
                    res.redirect("/shop")
                }else{
                    req.flash('error',"Email or password incorrect")
                     return res.status(401).redirect("/")
                     //.send({message:"Password is incorrect"})
                }
            })
    }catch(err){
        console.log(err.message);
        
    }
}

module.exports.logOut  = function(req,res){
        res.cookie("token","")
        res.redirect("/")
}