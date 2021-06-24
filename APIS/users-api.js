//create mini express app
const exp=require('express')
const userApi=exp.Router();
const expressErrorHandler=require("express-async-handler")
const multerObj=require("./middlewares/addfile")
const checkToken=require('./middlewares/verifyToken')
require('dotenv').config()


//bycrypt
const bcryptjs=require("bcryptjs")
//webtoken
const jwt=require("jsonwebtoken")
//body parsing middleware
userApi.use(exp.json())



//create new user register using await
userApi.post("/createuser",multerObj.single('photo'),expressErrorHandler(async(req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObject")
    //get user obj
    let newUser=JSON.parse(req.body.userObj);
    let user=await  userCollectionObject.findOne({username:newUser.username})
   //if user is existed
    if(user!==null){
        res.send({message:"user already existed"})
    }
    else{
        //hash the password
        let hashedPassword=await bcryptjs.hash(newUser.password,7)
        //replace plain pw with hashedpassword
        newUser.password=hashedPassword;
        //add CDN link of image
        newUser.profileImage=req.file.path;
        //insert user
        await userCollectionObject.insertOne(newUser)
        res.send({message:"user created"})
    }
}) )




//read all users using async and await over promise
userApi.get("/getusers",expressErrorHandler(async (req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObject")
    let userList=await userCollectionObject.find().toArray();
    res.send({message:userList})
}))


//get user by username
userApi.get("/getuser/:username",expressErrorHandler(async (req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObject")

    //get username from url params
    let un=req.params.username;
    //search for user
    let user=await  userCollectionObject.findOne({username:un})

    if(user === null){
        res.send({message:"user not existed"})
    }
    else{
        res.send({message:user})
    }

}))


//update user by async and wait
userApi.put("/updateuser/:username",expressErrorHandler( async (req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObject")
    let modifiedUser=req.body;
    await  userCollectionObject.updateOne({username: modifiedUser.username},{$set:{...modifiedUser}})
    res.send({message:"user updates"})
}))

//delete await
userApi.delete("/deleteuser/:username",expressErrorHandler(async(req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObject")
    //get username from url params
    let un=req.params.username;
    //find user
   // let user=await databaseObject.collection("usercollection").findOne({username:un})
   let user=await userCollectionObject.findOne({username:un})
    //if user not existed
    if(user===null){
        res.send({message:"user not existed"})
    }
    else{
    await databaseObject.collection("usercollection").deleteOne({username: un})
    res.send({message:"user removed"})
    }

}))

//user login
userApi.post("/login",expressErrorHandler(async(req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObject")
    let credentials=req.body;
    //verify username
    let user=await userCollectionObject.findOne({username:credentials.username})
//if user is not existed
if(user===null){
    res.send({message:"invalid username"})
}
//if user is existed
else{
    //compare passwords
    let result=await bcryptjs.compare(credentials.password,user.password)
    //if pws not matched
    if(result===false){
        res.send({message:"invalid password"})
    }
    //if passwords are matched
    else{
        //create a token and send it as result
        let token=await jwt.sign({username:credentials.username},process.env.SECRET,{expiresIn:120})

        //remove password from user
        delete user.password;
        res.send({message:"login-success",token:token,username:credentials.username,userObj:user})
    }

}
}))

//add to cart
userApi.post("/addtocart",expressErrorHandler(async(req,res,next)=>{
    let userCartCollectionObject=req.app.get("userCartCollectionObject")

    //get user cart obj
    let userCartObj=req.body;
    //find user in userCartCollection
    let userInCart=await userCartCollectionObject.findOne({username:userCartObj.username})

    //if user not existed in cart
    if(userInCart===null){
        //new usercartobject
        let products=[];
        products.push(userCartObj.productObj)
        let newUserCartObject={username:userCartObj.username,products:products};
       // console.log(newUserCartObject)

        //insert
        await userCartCollectionObject.insertOne(newUserCartObject)
        res.send({message:"product added to cart"})
    }
    //if user already existed in cart
    else{
        userInCart.products.push(userCartObj.productObj)
        //console.log(userInCart)
        
        //update
        await userCartCollectionObject.updateOne({username:userCartObj.username},{$set:{...userInCart}})
        res.send({message:"product updated"})

    }
}))

//protected dummy route
userApi.get("/testing",checkToken,expressErrorHandler((req,res)=>{
    res.send({message:"this is protected data"})
}))





module.exports=userApi;