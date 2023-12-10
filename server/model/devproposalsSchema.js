const mongoose = require('mongoose');

const devproposalsSchema = new mongoose.Schema({

    proposalById:{
        type:String,
        required:true,
    },
    profileWork:{
        type:String,
        required:true,
    },
    hourlyRate:{
        type:String,
        required:true,
    },
    coverLetter:{
        type:String,
        required:true,
    },
    proposalOn:{
        type:String,
        required:true
    },
    jobID:{
        type:String,
        required:true,
    },
    jobByID:{
        type:String,
        required:true,
    }
})
const DevProp = mongoose.model('DevProps',devproposalsSchema);

module.exports = DevProp;