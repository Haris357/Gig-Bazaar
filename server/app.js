const express = require('express');
const app = express();

//Middleware

const middleware = (req,res,next) =>{
    console.log('Middle ware');
    next();
}
middleware();

app.get('/', (req,res) => {
    res.send('Hello World');
});

app.get('/about', middleware,(req,res) => {
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

app.listen(3000, () =>{
    console.log('server is running at no 3000')
});