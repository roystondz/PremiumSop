const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router();
const flash = require('connect-flash')
const productModel = require('../models/product-model');

router.get("/",function(req,res){
    let error =  req.flash("error");
    res.render("index",{error});
})

router.get("/shop",isLoggedIn,async(req,res)=>{
    let products = await productModel.find();
    res.render("shop",{products});
})

module.exports = router;