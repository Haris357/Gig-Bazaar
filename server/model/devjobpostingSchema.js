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
    },
    title:{
        type:String,
        required:true,
    },
    expertise:{
        type:String,
        required:true,
    },
    pricing:{
        type:Number,
        required:true, 
    },
    flexibility:{
        type:String,
        required:true,
    },
    estimatedtime:{
        type:String,
        required:true,
    },
    attachment: {
        filename: String,
        originalname: String,
        mimetype: String,
      },
    Proposals:[
        {
            proposalById:{type:String,required:true},
            proposalByName:{type:String,required:true},
            profileWork:{type:String,required:true},
            hourlyRate:{type:String,required:true},
            coverLetter:{type:String,required:true},
            proposalOn:{type:String,required:true},
        }
    ]
})

//storing proposals
devjobpostingSchema.methods.addProposals = async function ( proposalById, proposalByName, profileWork, hourlyRate, coverLetter, proposalOn ){
    try {
        this.Proposals = this.Proposals.concat({ proposalById, proposalByName, profileWork, hourlyRate, coverLetter, proposalOn });
        await this.save();
        return this.Proposals;
    } catch (error) {
        console.log(error)
    }
}

const DevJob = mongoose.model('DevJobs',devjobpostingSchema);

module.exports = DevJob;