const mongoose = require('mongoose');

const deversecontact = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
})


const DevC = mongoose.model('DevC',deversecontact);

module.exports = DevC;