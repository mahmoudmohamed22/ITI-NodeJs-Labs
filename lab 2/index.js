import Express  from "express";
import op from "./helpers/operationfun.mjs";

const app=Express();

app.use(Express.json()) //require to hold body in post 

//end point to get all data by asychronz
app.get("/users",async (req,res)=>{
     res.send(await op.getAllDataFromFile("db.json"));
    
})
//end point get user by id 
app.get("/users/:id",async (req,res)=>{
    const id = parseInt(req.params.id)
    res.send(await op.getUserById('db.json',id));
  
})
//end point delete user by id 
app.delete("/users/:id",async(req,res)=>{
    const id = parseInt(req.params.id)
   res.send(await op.deleteUserFromFile('db.json',id))
})
//endpoint add user 
app.post("/users",async (req,res)=>{
    const { name, email } = req.body
    res.send(await op.addUserToFile('db.json',name,email));
})

//endpoint update user by id 
app.put("/users/:id/:name",async (req,res)=>{
    const id = parseInt(req.params.id)
    req.params.name
   res.send(await op.UpdateById('db.json',id,req.params.name))
})




app.listen(8000);