const mongoose= require("mongoose")

const ToDoSchema = mongoose.Schema({
    title: { 
        type: String,
         required: true,
         minLength:3,
         maxLength: 20

    },
    status: { type: String, 
        enum : ["waiting","in-progess","done"], 
        required: true 
    },
   
  });
  
  module.exports = mongoose.model('ToDo', ToDoSchema);