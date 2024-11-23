const cookieParser = require('cookie-parser');
const express =  require('express');
const app = express();

const expressSession= require('express-session');
const flash = require('connect-flash')

const db = require('./config/mongoose-connection')

//use data from the.env files
require("dotenv").config();

app.use(cookieParser());
const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')
const index =  require('./routes/index');


const path=require('path');


app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET,
     //set true only if https used
}))

app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");


app.use("/",index)
app.use("/owners",ownersRouter)
app.use("/users",usersRouter)
app.use("/products",productsRouter)



app.listen(3000,function(req,res){
    
})