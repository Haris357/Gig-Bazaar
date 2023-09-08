const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
app.use(cookieParser())

//DOTENV
dotenv.config({path:'./config.env'});

//Connection String
require('./db/conn');

app.use(express.json());

app.use(require('./router/auth'));

//PORT
const PORT = process.env.PORT;

app.get('/', (req,res) => {
    res.send('Hello World app');
});

if(process.env.NODE_ENV = "production"){
    app.use(express.static("client/build"));
}
//Hosting 
app.listen(PORT, () =>{
    console.log(`SERVER IS RUNNING AT NO.${PORT}`)
});
