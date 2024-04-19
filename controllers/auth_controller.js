const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt') //require bcrypt installed(npm i bcrypt) to incrypt the password
const {createUserToken} = require('../middleware/auth')

router.post('/register', async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10) // to create salt
        const passwordHash = await bcrypt.hash(req.body.password, salt) //to create the hashed password mixed with salt
        req.body.password = passwordHash //replace the old password by the new
        const user = await User.create(req.body)
        res.status(201).json(user)
    } catch(error){
        res.status(400).json(error)
    }
})

router.post('/login', async (req,res)=>{
    try{
        const loggingUser = req.body.username
        const foundUser = await User.findOne({username: loggingUser}) //we first find the user with the username typed in req.body
        const token = await createUserToken(req, foundUser)  //then use createUserToken to compapre the password and create a token
        res.status(200).json({user: foundUser, isLoggedIn: true, token})
    } catch(error){
        res.status(400).json(error.message)
    }
})

module.exports = router