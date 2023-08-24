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

const DeverseUser = mongoose.model('DEVERSEUSER',devusersSchema);

module.exports = DeverseUser;
