const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', (req,res) => {
     res.send('Hello World router');
});
//connection
require('../db/conn');
//model
const User = require('../model/userSchema');

//Javascript promising

// router.post('/register', async  (req,res) => {

//      const  {name,email,phone,work,password} = req.body;
//      if( !name || !email || !phone || !work || !password ){
//           return res.status(422).json({error: "Parameter Missing"});
//      }
//      User.findOne({email:email})
//           .then((userExist)=>{
//           if(userExist){
//                return res.status(422).json({error: "Email Already Exist"});
//           }
//           const user = new User({name,email,phone,work,password});

//           user.save().then(()=>{
//                res.status(201).json({ message: "User Registered Successfully" });
//           }).catch((err)=> res.status(500).json({error:"Registration Failed"}))
//      }).catch((err)=>{console.log(err);})

//  });

//Async Await

//Register
router.post('/register', async  (req,res) => {
     const  {name,email,phone,work,password} = req.body;
     if( !name || !email || !phone || !work || !password ){
          return res.status(422).json({error: "Please Add Missing Fields"});
     }
     try{
          const userExist = await User.findOne({email:email});

          if(userExist){
               return res.status(422).json({error: "Email Already Exist"});
          }
          const user = new User({name,email,phone,work,password});
          
          await user.save();

          res.status(201).json({ message: "User Registered Successfully" });
     }
     catch(err){
          console.log(err);
     }
 });

//Login
 router.post('/signIn', async (req,res)=>{
     try{
          const {email,password} = req.body;
          if(!email || !password){
               return res.status(400).json({error:"Please Provide Credentials"})
          }

          const userLogin = await User.findOne({email:email});
          //console.log(userLogin); 
         
          if(userLogin){

               //decrypting password
               const isMatch = await bcrypt.compare(password,userLogin.password);

               //Generating token
               let token = await userLogin.generateAuthToken();               
               // console.log(token);

               //Storing Token in cookie expires in 30 Days
               res.cookie("token",token,{
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly:true
               });

               if(!isMatch){
                    res.status(400).json({message:"Invalid Credentials"})
               }
               else{
                    res.json({message:"Login Successfully"})                   
               }
          }
          else{
               res.status(400).json({message:"Invalid Credentials"})
          }
          
     }
     catch(err){
          console.log(err);
     }
 })

module.exports = router;