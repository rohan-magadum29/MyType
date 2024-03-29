const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/MyType",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String
})
const User = new mongoose.model("User",userSchema)
//Routes
app.post("/login",(req,res)=>{
    const {email,password} = req.body
    User.findOne({email:email}).exec().then(user=> {
        if(user){
            if(password === user.password){
                res.send({message:"Login Successful",user:user})
            }
            else {
                res.send({message:"User Credentials are incorrect"})
            }
        }
        else{
            res.send({message:"User is not Registered"})
        }
    })
})
app.post("/register",(req,res)=>{
    const {username,email,password} = req.body
    User.findOne({email:email}).exec().then(user=>{
        if(user){
            res.send({message:"User already registered"})
        }
        else {
            const user = new User({
                username,
                email,
                password
            })
            user.save().then(savedInstance=>{
                res.send({message:"Successfully Registered"})
            }).catch(error=>{
                console.error('Error Saving Instance',error)
            })
        }
    })
})
app.listen(9002,()=>{
    console.log("Started at port 9002")
})