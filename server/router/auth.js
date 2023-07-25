const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
     res.send('Hello World router');
});

require('../db/conn');
const User = require('../model/userSchema');

router.post('/register',  (req,res) => {

     const  {name,email,phone,work,password} = req.body;
     if( !name || !email || !phone || !work || !password ){
          return res.status(422).json({error: "Parameter Missing"});
     }
     User.findOne({email:email})
          .then((userExist)=>{
          if(userExist){
               return res.status(422).json({error: "Email Already Exist"});
          }
          const user = new User({name,email,phone,work,password});

          user.save().then(()=>{
               res.status(201).json({ message: "User Registered Successfully" });
          }).catch((err)=> res.status(500).json({error:"Registration Failed"}))
     }).catch((err)=>{console.log(err);})

 });

module.exports = router;