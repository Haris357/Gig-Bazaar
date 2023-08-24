const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate')
const multer = require('multer');
router.get('/', (req,res) => {
     res.send('Hello World router');
});

//connection
require('../db/conn');

//model
const DevUser = require("../model/devusersSchema");
const DevJob = require('../model/devjobpostingschema');

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
 //signup
 
 //Registration
 router.post('/signup', async  (req,res) => {
     const  {designation,firstname,lastname,email,password,location} = req.body;
     if( !designation || !firstname || !lastname || !email || !password || !location ){
          return res.status(422).json({error: "Please Add Missing Fields"});
     }
     try{
          const userExist = await DevUser.findOne({email:email});

          if(userExist){
               return res.status(422).json({error: "Email Already Exist"});
          }
          const user = new DevUser({designation,firstname,lastname,email,password,location});
          
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

          const userLogin = await DevUser.findOne({email:email});
          //console.log(userLogin); 
         
          if(userLogin){

               //decrypting password
               const isMatch = await bcrypt.compare(password,userLogin.password);

               //Generating token
               let token = await userLogin.generateAuthToken();               
               // console.log(token);

               //Storing Token in cookie expires in 30 Days
               res.cookie("jwtoken",token,{
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

 const storage = multer.diskStorage({
     destination: 'uploads/',
     filename: function (req, file, cb) {
       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
       cb(null, file.fieldname + '-' + uniqueSuffix);
     },
   });
   
   const upload = multer({ storage });

 //jobposting
 router.post('/jobposting',upload.single('file'),async (req,res)=>{
     const {job,skills,description,createdOn,createdBy,title,expertise,pricing} = req.body;
     
     if( !job || !skills || !description || !createdOn || !createdBy || !title || !expertise || !pricing ) {
         return res.status(422).json({error: "Please Add Missing Fields"});
     }
     try {
          const file = req.file;
          const fileInfo = file
            ? {
                filename: file.filename,
                originalname: file.originalname,
                mimetype: file.mimetype,
              }
            : null;
      
          const newJobPosting = new DevJob({
            job,
            skills,
            description,
            createdOn,
            createdBy,
            title,
            expertise,
            pricing,
            attachment: fileInfo,
          });
      
          await newJobPosting.save();
          res.status(201).json({ message: "Job Posted" });
        } catch (error) {
          console.error('Error posting job:', error);
          res.status(500).json({ error: 'Job posting failed.' });
        }
 });

 router.get('/jobpostings', async (req, res) => {
     try {
       const jobPostings = await DevJob.find();
       res.status(200).json(jobPostings);
     } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Internal server error' });
     }
   });

 //get about
     router.get('/about',authenticate,(req,res) => {
     res.send(req.rootUser);
});
//get contact && home
     router.get('/getdata',authenticate,(req,res)=>{
          res.send(req.rootUser);
     });
//logout
router.get('/logout', (req, res) => {
     res.clearCookie('jwtoken', { path: '/' });
     res.status(200).send('User Logout');
   });
   
module.exports = router;