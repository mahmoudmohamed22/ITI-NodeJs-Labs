const express=require('express');
//require("express-async-errors"); //to apply try and catch in any block 
const morgan=require('morgan')
const app=express();
require('./db')
const todoRoute=require('./routes/todoRoute')
const userRoute=require('./routes/userRoute')


//create middleware 
app.use(express.json()) //because to hold body when post 
 //morgan to log the requests
app.use(morgan('combined'));

//middleware use routes todo route
app.use('/todo', todoRoute);
app.use('/user', userRoute);




//middleware handle to occur error
app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message=err.message || "something went wrong"
    console.log("error from handler");
    res.status(err.statusCode).json({
        status:'error',
        message:err.message,
        err
    })
     

})

 
app.listen(8001,()=>{
    console.log("listing to port 8001")
})