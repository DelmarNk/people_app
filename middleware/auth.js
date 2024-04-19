//npm i jsonwebtoken
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
if(process.env.NODE_ENV == "development"){
    require('dotenv').config() 
}
const secret = process.env.JWT_SECRET

const createUserToken = (req, user)=>{
    if(!user || !req.body.password || !bcrypt.compareSync(req.body.password, user.password)){
        const error = new Error('Username or password is not correct')
        error.statusCode = 422
        throw error
    }
    return jwt.sign({id: user._id}, secret, {expiresIn: 36000}) // here we create the token to use the api all over the website, and not have to login all the time we open the website. 
}

module.exports = {createUserToken}