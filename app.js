const cookieParser = require('cookie-parser');
const express =  require('express');
const app = express();
const db = require('./config/mongoose-connection')

//use data from the.env files
require("dotenv").config();


const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')
const index =  require('./routes/index');

app.use("/",index)
const path=require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.use(cookieParser());

app.use("/owners",ownersRouter)
app.use("/users",usersRouter)
app.use("/products",productsRouter)



app.listen(3000,function(req,res){
    
})