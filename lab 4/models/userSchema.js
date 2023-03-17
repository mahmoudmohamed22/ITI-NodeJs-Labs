const mongoose= require("mongoose")
const bcrpt= require('bcrypt')

const UserSchema = mongoose.Schema({
    username: { 
        type: String,
         required: true,
         minLength:3,
         maxLength: 20,
         unique:true

    },
    age: { type: Number
    },
    password:{
        type:String,
        required: true
    }
   
  });
  //middleware
  UserSchema.pre('save',async function(next){
    const userDocument=this;
    if(userDocument.isModified('password')){
        const hashedPassword=await bcrpt.hash(userDocument.password,12)
        userDocument.password=hashedPassword
    }
    next();
  })
//methods
  UserSchema.methods.comparePassword = function(password)
  {
    const userDocument=this;
    return bcrpt.compare(password,userDocument.password)
  }
  module.exports = mongoose.model('User', UserSchema);