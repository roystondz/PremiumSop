const cookieParser = require('cookie-parser');
const express =  require('express');
const app = express();

const path=require('path');

app.use(expressjson());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.use(cookieParser());

app.get("/",function(req,res){
    res.send("Hey");
})

app.listen(3000,function(req,res){
    console.log("Server is running");
})