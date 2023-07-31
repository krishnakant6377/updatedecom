const express =require("express")
const app=express()
const mongoose=require("mongoose")
app.use(express.json())
const route=require("./route.js")
const cors=require("cors")

mongoose.connect("mongodb+srv://vermakrishnakant636:qwerty12345@cluster0.ntrbflr.mongodb.net/signup?retryWrites=true&w=majority",
{
    useNewUrlparser: true,
    useUnifiedTopology: true,
})
app.use(cors({
    origin:"*"
}))
app.use("/auth",route)
app.listen(4040,()=>{console.log("running")})