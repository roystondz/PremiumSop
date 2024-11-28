const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router();
const flash = require('connect-flash')
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get("/",function(req,res){
    let error =  req.flash("error");
    res.render("index",{error});
})

router.get("/shop",isLoggedIn,async(req,res)=>{
    let msg = req.flash("addtocart");
    let products = await productModel.find();
    res.render("shop",{products,msg});
})

router.get("/addtocart/:id",isLoggedIn,async(req,res)=>{
    let user = await userModel.findOne({email:req.user.email});
    let products = await productModel.findOne({_id:req.params.id});
    user.cart.push(req.params.id);
    await user.save();
    req.flash("addtocart","Product added to cart")
    res.redirect("/shop");
    
})

router.get("/cart",isLoggedIn,async(req,res)=>{
    let products = await productModel.find();
    let user = await userModel
        .findOne({email:req.user.email})
        .populate("cart") //since cart is an array of product ids
    user.cart
    res.render("cart",{user})
})

router.get("/account",isLoggedIn,async function(req,res){
    let user  = await userModel.findOne({email:req.user.email});
    let msg = req.flash("done")
    res.render("myaccount",{user,msg});
})

router.post("/account/update",isLoggedIn,async function(req,res){
    let {email , fullname,contact} = req.body;
    let updatedUser = await userModel.findOneAndUpdate({email:req.user.email},{
        email,
        fullname,
        contact
    },{new:true})
    req.flash("done","Account updated")
    res.redirect("/account");
})
router.get("/account/deletion",isLoggedIn,async function(req,res){
    let user = await userModel.findOneAndDelete({email:req.user.email});
    req.flash("error","User successfully deleted")
    res.redirect("/");
})


module.exports = router;