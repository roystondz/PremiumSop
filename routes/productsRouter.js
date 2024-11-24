const express  = require('express')
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/product-model')

//testing the route
router.get("/",function(req,res){
    res.send("Hello World from products");
})

//route for creating a product
router.post("/create",upload.single('image'),async function(req,res){

    try{let {name,price,discount,bgcolor,textcolor,panelcolor} = req.body;
    let product = await productModel.create({
        //the type of image file is a buffer
        image : req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        textcolor,
        panelcolor
    })
    req.flash('uploadfile',"Product has been created");
    res.redirect("/owners/admin")
    
    }catch(err)
    {
        console.log(err.message);
        
    }
})



module.exports = router;

