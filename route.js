const express=require("express")
const route=express.Router()
const bcrypt=require("bcryptjs")
const jwt = require("jsonwebtoken")
const usermodel=require("./model.js")
route.post("/register",async (req,res)=>{
    const {email,password}=req.body
    const user=await usermodel.findOne({email})
    if(user){
      return   res.json({message:"user alredy exits try to login"})

    }
    const hashp= await bcrypt.hash(password,10)
    const newuser=new usermodel({email,password:hashp})
    await newuser.save()
    return res.json({
        message:"user registered successfully"
    })



})
route.post("/login",async (req,res)=>{
    const {email,password}=req.body
    const user=await usermodel.findOne({email})
    if(!user){
      return   res.json({message:"user not exits try to register first"})

    }
    const vpass= await bcrypt.compare(password,user.password)
  
if(!vpass){
return res.json({message:"incorrect password"})
}
const token = jwt.sign({ id: user._id }, "secretkey");
    res.json({ token, userId: user._id })



})
module.exports=route