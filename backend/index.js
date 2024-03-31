const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const axios = require("axios")

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
const gameSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    accuracy:{
        type:Number,
    },
    speed:{
        type:Number,
        required:true
    }

})

const User = new mongoose.model("User",userSchema)
const Game = new mongoose.model("Game",gameSchema)

//Routes
app.post("/login",(req,res)=>{
    const {email,password} = req.body
    User.findOne({email:email}).exec().then(user=> {
        if(user){
            if(password === user.password){
                res.status(200).send({message:"Login Successful",user:user})
            }
            else {
                res.status(401).send({message:"User Credentials are incorrect"})
            }
        }
        else{
            res.status(404).send({message:"User is not Registered"})
        }
    })
    .catch(error => {
        res.status(500).send({message:"Internal Server Error"})
    })
})
app.post("/register",(req,res)=>{
    const {username,email,password} = req.body
    User.findOne({email:email}).exec().then(user=>{
        if(user){
            res.status(409).send({message:"User already registered"})
        }
        else {
            const user = new User({
                username,
                email,
                password
            })
            user.save().then(savedInstance=>{
                res.status(201).send({message:"Successfully Registered"})
            }).catch(error=>{
                console.error('Error Saving Instance',error)
                res.status(500).send({message:"Internal Server Error"})
            })
        }
    })
})
app.listen(9002,()=>{
    console.log("Started at port 9002")
})
app.get("/users",async (req,res)=>{
    try {
        const users = await User.find()
        res.json(users);
    }
    catch (error){
        console.log(error)
    }
})
app.post("/game",async (req,res) => {
    try {
        const {username,email,accuracy,speed} = req.body;
        const game = new Game({username,email,accuracy,speed})
        await game.save();
        res.status(201).json(game);
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
})

app.get("/games",async (req,res) => {
    const {email} = req.query;
    try {
        const recentGames = await Game.find({email}).sort({createdAt:-1}).limit(10);
        res.json(recentGames);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})

app.get("/leaderboard",async (req,res) => {
    try {
        const users = await User.find()
        const leaderboard = []
        for (const user of users)
        {
            const recentGames = await Game.find({email:user.email}).sort({createdAt:-1}).limit(10);
            let totalWPM = 0;
            recentGames.forEach(game => {
                totalWPM += game.speed
            });
            const averageWPM = recentGames.length > 0 ? Math.round(totalWPM /recentGames.length) : 0; 
            
            leaderboard.push({username:user.username , averageWPM});
        }
        leaderboard.sort((a, b) => b.averageWPM - a.averageWPM);
        res.json(leaderboard)
        
    }
    catch(error) {
        console.log(error)
    }
    // try {
    //     const games = await Game.find().sort({speed:-1}).limit(10);
    //     const leaderboard = games.map((game,index)=>({
    //         rank : index + 1,
    //         username:game.username,
    //         speed:game.speed
    //     }));
    //     res.json(leaderboard)
    // }
    // catch(error)
    // {
    //     console.log("Error fetching leaderboard",error);
    //     res.status(500).json({message:"Internal Server Error"})
    // }
})

app.get("/paragraph",async (req,res)=>{
    try {
        const response = await axios.get("http://metaphorpsum.com/paragraphs/3/4");
        const para = response.data;
        res.json(para);
        
    } catch (error) {
        console.error("Error fetching random text:", error);
        res.status(500).json({ error: "Error fetching random text" });
    }
})