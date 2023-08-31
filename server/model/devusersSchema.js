const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const devusersSchema = new mongoose.Schema({
    designation: {
        type:String,
        required:true
    },
    firstname: {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    location: {
        type:String,
        required:true
    },
    tokens: [
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    UserProfileWork:[
        {
            work:{type:String,required:true},
            workHeading:{type:String,required:true},
            workSpecialization:{type:String,required:true},
            hourlyRate:{type:String,required:true},
            workDescription:{type:String,required:true}
        }
    ]


})

//Hashing Password
devusersSchema.pre('save', async function(next){
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
});
//JWT Token
devusersSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token; 
    }
    catch(err){
        console.log(err);
    }
}
//Storing UserProfileWork
devusersSchema.methods.addUserProfileWork = async function ( work, workHeading, workSpecialization, hourlyRate, workDescription, _id, firstname, designation ){
    try {
        this.UserProfileWork = this.UserProfileWork.concat({ work, workHeading, workSpecialization, hourlyRate, workDescription, _id, firstname, designation });
        await this.save();
        return this.UserProfileWork;
    } catch (error) {
        console.log(error)
    }
}

const DeverseUser = mongoose.model('DEVERSEUSER',devusersSchema);

module.exports = DeverseUser;
