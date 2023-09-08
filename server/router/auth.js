const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
     res.send('Hello World router');
});

//connection
require('../db/conn');

//model
const DevWL = require('../model/deversewaitinglist');
const DevC = require('../model/deversecontact');

 
 router.post('/deversewaitinglist',async(req,res) => {
     const {name,email} = req.body;
     if(!name || !email){
          return res.status(422).json({error:"Please add Name OR Email"});
     }
     try {
          const userExist = await DevWL.findOne({email:email});
          if(userExist){
               return res.status(422).json({error: "Email Already Exist"});
          }
          const user = new DevWL({name,email});
          await user.save();
          res.status(201).json({message: "Added for WaitingList"})
     } catch (error) {
          console.log(err)
     }
 })
 router.post('/deversecontact',async(req,res) => {
     const {name,email,description} = req.body;
     if(!name || !email || !description){
          return res.status(422).json({error:"Please add Name, Email and Description"});
     }
     try {
          // const userExist = await DevC.findOne({email:email});
          // if(userExist){
          //      return res.status(422).json({error: "Email Already Exist"});
          // }
          const user = new DevC({name,email,description});
          await user.save();
          res.status(201).json({message: "Message Sent Successfully"})
     } catch (error) {
          console.log(err)
     }
 })
 router.post('/deversewaitinglist/check-email', async (req, res) => {
     const { email } = req.body;
     
     try {
       const userExist = await DevWL.findOne({ email });
   
       if (userExist) {
         return res.status(422).json({ error: "Email Already Exist" });
       }
   
       res.status(200).json({ message: "Email is available" });
     } catch (error) {
       console.error(error);
       res.status(500).json({ error: "Internal Server Error" });
     }
   });
 
   
module.exports = router;