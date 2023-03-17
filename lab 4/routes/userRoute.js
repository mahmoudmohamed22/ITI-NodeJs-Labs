const express=require('express');
const { model } = require('mongoose');
const router=express.Router();
const User=require('../models/userSchema')
const bcrpt= require('bcrypt')
const validator=require('../middlewares/validators')
const jwt=require('jsonwebtoken');
const {promisify}=require('util')
const verify=require('../middlewares/verify')
const signJwt=promisify(jwt.sign)
const checkRequiredFields=(params)=>(req,res,next)=>{
const receivedParams=Object.keys(req.body)
const missingParams=params.filter(param=>!receivedParams.includes(param))
if(missingParams.length){
    const error=new Error(`missing params ${missingParams.join(',')}`)
        error.statusCode=400;//bad request
        next(error)
}
}
router.post('/',async (req,res,next)=>{
    const {username,age,password }=req.body;
   
   try{
        
        const newUser = new User({
            username:username,
            age:age,
            password
        });
        await newUser.save();
        res.send(newUser);
    }catch(error)
    {
        console.log(error)
        next(error)
    }
    

})

router.post('/login',validator.validateSignin,async (req,res,next)=>{
    const {username,password }=req.body;
   
   try{
       const user=await User.findOne({username});
       if(!user){
        const error=new Error('invaild credentials')
        error.statusCode=400;//bad request
        next(error)
       }
       const isMatch=await user.comparePassword(password);
       if(!isMatch)
       {
        const error=new Error('invaild credentials')
        error.statusCode=400;//bad request
        next(error)
       }
       const payload={id:user}
       const token=await signJwt(payload,"mySecret",{expiresIn:"1h"})
       res.json({
        messege:"logged in",
        token,
        user
       })

    }catch(error)
    {
        console.log(error)
        next(error)
    }
    

})

router.get('/profile',
verify
,
async (req,res,next)=>{
    res.send('profile page');
})
module.exports=router