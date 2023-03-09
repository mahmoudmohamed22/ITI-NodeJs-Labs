import {readUsersFromFile,writeUserIntoFile} from "./IO.mjs"
//generate id 
function generateNewId(users) {
    let id;
    if (!users.length) id = 1;
    else id = users[users.length - 1].id + 1;
    return id;
}
//add user to json file 
async function addUserToFile(filename, name, email) {
    const users = JSON.parse(await readUsersFromFile(filename));
    let id = generateNewId(users);
    const user = {
        id,
        name,
        email,
    };
    users.push(user);
    writeUserIntoFile(filename, JSON.stringify(users));
}

// to delete element 
// i need hold this element by id 
// i search in array by elememt by id 
async function deleteUserFromFile(filename,userId){
    const users = JSON.parse(await readUsersFromFile(filename));
    if(users.length>0){
    
    const getUser =users.find(users => users.id == userId);
    if(getUser!=undefined){ //if user is exist in database
    const index = users.indexOf(getUser); //know index for removal user
    const removeUser = users.splice(index, 1); //remove user by index 
    //apply removing user in json file
    writeUserIntoFile(filename, JSON.stringify(users));
    
     }else{console.log("this user is not found")}
    }else 
    {
        console.log("No Exist Users in Database")
    }
}

async function getAllDataFromFile(filename){
   
    const users = JSON.parse(await readUsersFromFile(filename));
    return new Promise((resolve, reject) => {
        try{
        resolve(users);
         }catch(error)
         {
             reject(error);
         }
    }) 
   
}

async function getUserById(filename,userId){
    const users = JSON.parse(await readUsersFromFile(filename));
    return new Promise((resolve, reject) => {
                    try{
           
            if(users.length>0){
            const getUser =users.find(users => users.id == userId);
                        // console.log(getUser);
                                if(getUser!=undefined){ //if user is exist in database

                                        resolve(getUser);
                                
                                        
                                }else 
                                {
                                    console.log("this user is not found")
                                }

                            }else 
                            {
                                console.log("No Exist Users in Database")
                            }
                     }catch(error)
                     {
                         reject(error);
                     }
    }) 
            
}


async function UpdateById(filename,userId,newName){
    const users = JSON.parse(await readUsersFromFile(filename));
    return new Promise((resolve, reject) => {
        try{

if(users.length>0){
const getUser =users.find(users => users.id == userId);
            // console.log(getUser);
                    if(getUser!=undefined){ //if user is exist in database
                           getUser.name=newName;
                           writeUserIntoFile(filename, JSON.stringify(users));
                            resolve(getUser);
                    
                            
                    }else 
                    {
                        console.log("this user is not found")
                    }

                }else 
                {
                    console.log("No Exist Users in Database")
                }
         }catch(error)
         {
             reject(error);
         }

        })
       // 
}




function diplayUser(users){
    console.log(users)
}

export default{addUserToFile,deleteUserFromFile,getAllDataFromFile,getUserById,UpdateById,diplayUser}