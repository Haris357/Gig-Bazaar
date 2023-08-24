const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');

const devjobpostingSchema = new mongoose.Schema({
    job:{
        type:String,
        required:true
    },
    skills:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true           
    },
    createdOn:{
        type:String,
        required:true
    },
    createdBy:{
        type:String,
        required:true   
    }
})
const DevJob = mongoose.model('DevJobs',devjobpostingSchema);

module.exports = DevJob;