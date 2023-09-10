const mongoose = require('mongoose');

const devuserprofileSchema = new mongoose.Schema({
    work:{
        type:String,required:true
    },
    workHeading:{
        type:String,required:true
    },
    workSpecialization:{
        type:String,required:true
    },
    hourlyRate:{
        type:String,required:true
    },
    workDescription:{
        type:String,required:true
    },
    userID:{
        type:String,required:true
    }
})

const DevProf = mongoose.model('DevProf',devuserprofileSchema);
module.exports = DevProf;