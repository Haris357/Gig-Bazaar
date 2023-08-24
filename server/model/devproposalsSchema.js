const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');

const devproposalsSchema = new mongoose.Schema({
    
})
const DevProp = mongoose.model('DevProps',devproposalsSchema);

module.exports = DevProp;