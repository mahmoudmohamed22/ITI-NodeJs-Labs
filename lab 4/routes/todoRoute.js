const express=require('express');
const { model } = require('mongoose');
const router=express.Router();
const ToDo=require('../models/todoSchema')
const verify=require('../middlewares/verify')
//get all items
router.get('/',verify,async(req,res)=>{

    todolist=await ToDo.find({});
    res.send(todolist);
})
//get by id  
router.get('/:id',
verify
,async(req,res,next)=>{
    try{
    todolist=await ToDo.findById(req.params.id);
    res.send(todolist);
    }catch(error)
    {
        return res.status(404).send('Not Found');
    }

   
})
router.post('/',verify,async (req,res,next)=>{

    let todoitem = await ToDo.findOne({ title: req.body.title });
    if (todoitem) {
        return res.status(400).send('That todo item already exisits!');
    } else {
        // Insert the new todo item if they do not exist yet
        newtodo = new ToDo({
            title: req.body.title,
            status: req.body.status
        });
        await newtodo.save();
        res.send(newtodo);
    }

})
//update all attributes in element

router.put('/:id',verify,async(req,res,next)=>{
    const { title,status }=req.body
    try{
    await ToDo.findOneAndUpdate(req.params.id, {title,status});
    res.send("this todo item is updated")
    }catch(error){
        return res.status(404).send('Not Found');
    }
})

//update attribute in element
router.patch('/:title',verify,async (req,res,next)=>{
  const newstatus=req.body.status;
  try{
  await ToDo.findOneAndUpdate(req.params.title, newstatus, { new: true });
  res.send("this todo item status is updated ")
  }catch(error)
  {
    return res.status(404).send('Not Found');
  }

})

//delete by item
router.delete('/:id',verify,async (req,res,next)=>{

    try{
    await ToDo.deleteOne({ _id: req.body._id },{new: true});
    res.send("this todo item is deleted")
    }catch(error){
        return res.status(404).send('Not Found');
    }
})

//delete all items
router.delete('/',verify,async (req,res,next)=>{

    await ToDo.deleteMany({});
    res.send("All todo items are deleted")
})


module.exports=router