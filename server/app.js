const mongoose = require('mongoose');
const express = require('express');
const app = express();

//Connection String
const DB = 'mongodb+srv://haris:haris7857@cluster0.ln0xcrm.mongodb.net/mernstack?retryWrites=true&w=majority';

//Connected TO Database
mongoose.connect(DB, { useUnifiedTopology : true, useNewUrlParser : true , }).then(() => {
    console.log("Connection Succeed");
 }).catch((e) => console.log("Connection Failed")) 

//Middleware
const middleware = (req,res,next) =>{
    console.log('Middle ware');
    next(); 
}

app.get('/', (req,res) => {
    res.send('Hello World');
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
app.listen(3000, () =>{
    console.log('server is running at no 3000')
});
