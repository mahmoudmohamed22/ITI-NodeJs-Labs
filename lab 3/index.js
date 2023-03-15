const express=require('express');
//require("express-async-errors"); //to apply try and catch in any block 
const morgan=require('morgan')
const app=express();
require('./db')
const todoRoute=require('./routes/todoRoute')
//create middleware 
app.use(express.json()) //because to hold body when post 
 //morgan to log the requests
app.use(morgan('combined'));

//middleware use routes todo route
app.use('/todo', todoRoute);





//middleware handle to occur error
app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    console.log("error from handler");
    res.status(500).send(err.statusCode<500 ? err.message: "internal server error");

})

 
app.listen(8000,()=>{
    console.log("listing to port 8000")
})