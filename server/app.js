const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();


//DOTENV
dotenv.config({path:'./config.env'});

//UserSchema
const User = require('./model/userSchema'); 

//Connection String
require('./db/conn');

app.use(express.json());

//router to make route easily 
app.use(require('./router/auth'));


//PORT
const PORT = process.env.PORT;

//Middleware
const middleware = (req,res,next) =>{
    console.log('Middle ware');
    next(); 
}

app.get('/', (req,res) => {
    res.send('Hello World app');
});

app.get('/about',middleware,(req,res) => {
    res.send('About Page');
});

app.get('/contact',(req,res) => {
    res.send('Contact Page');
});

app.get('/login',(req,res) => {
    res.send('Login Page');
});

app.get('/signup',(req,res) => {
    res.send('SignUp Page');
});

//Hosting 
app.listen(PORT, () =>{
    console.log(`SERVER IS RUNNING AT NO.${PORT}`)
});
