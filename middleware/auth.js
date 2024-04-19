//npm i jsonwebtoken
// npm i passport passport-jwt
const passport = require('passport')
const {Strategy, ExtractJwt} = require('passport-jwt')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { Error } = require('mongoose')

if(process.env.NODE_ENV == "development"){
    require('dotenv').config() 
}
const secret = process.env.JWT_SECRET
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}
const verify = async (jwt_payload, done)=>{  //payload is the body of jwt
    try{
        const user = await User.findById(jwt_payload.id)
        return done(null, user)
    } catch(error){
        return done(error)
    }
}
const strategy = new Strategy(options, verify)
passport.use(strategy)
passport.initialize()

const requireToken = passport.authenticate('jwt', {session: false})

const handleValidateOwner = (req, doc)=>{
    const userId = doc.user._id
    if(!req.user._id.equals(userId)){
        throw new Error('Unauthorized Access')
    }
    return doc
}

const createUserToken = (req, user)=>{
    if(!user || !req.body.password || !bcrypt.compareSync(req.body.password, user.password)){
        const error = new Error('Username or password is not correct')
        error.statusCode = 422
        throw error
    }
    return jwt.sign({id: user._id}, secret, {expiresIn: 1000*60*60*24*7*2}) // here we create the token to use the api all over the website, and not have to login all the time we open the website. 
}


module.exports = {
    createUserToken,
    requireToken,
    handleValidateOwner
}