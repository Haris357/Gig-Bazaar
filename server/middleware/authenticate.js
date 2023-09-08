const jwt = require("jsonwebtoken");
const DevUser = require('../model/devusersSchema');
const DevJob = require('../model/devjobpostingschema');

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await DevUser.findOne({_id: verifyToken._id, "tokens.token": token});
        if (!rootUser) {
            throw new Error('User not found');
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();

    } catch (error) {
        res.status(401).send('Unauthorized');
    }
};

module.exports = Authenticate;
