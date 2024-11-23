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
            return res.status(401).send({message:"Email already exist"})
        }
        else{
        bcrypt.genSalt(12,function(err,salt){
            bcrypt.hash(password,salt,async function(err,hash){
                if(err) return res.send(err.message)
                let user = await userModel.create({
                    email,
                    fullname,
                    password:hash
                })
                let token = generateToken(user);
                res.cookie("token",token);
                res.send("User created succesfuly")
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
            return res.status(401).send({message:"Email not found"})
        }
        
            bcrypt.compare(password,userSearch.password,function(err,match){
                if(match){
                    let token = generateToken(userSearch);
                    res.cookie("token",token)
                    res.send("User can login")
                }else{
                    return res.status(401).send({message:"Password is incorrect"})
                }
            })
    }catch{
        console.log(err.message);
        
    }
}