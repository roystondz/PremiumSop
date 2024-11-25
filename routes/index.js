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

module.exports = router;