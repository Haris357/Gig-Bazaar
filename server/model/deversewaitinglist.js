const mongoose = require('mongoose');

const deversewaitinglist = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
})


const DevWL = mongoose.model('DevWL',deversewaitinglist);

module.exports = DevWL;