const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt') //require bcrypt installed(npm i bcrypt) to incrypt the password
const {createUserToken, requireToken} = require('../middleware/auth')

router.post('/register', async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10) // to create salt
        const passwordHash = await bcrypt.hash(req.body.password, salt) //to create the hashed password mixed with salt
        const storePassword = req.body.password
        req.body.password = passwordHash //replace the old password by the new
        const user = await User.create(req.body)
        if (user){
            req.body.password = storePassword
            const token = await createUserToken(req, user)
            res.status(201).json({user: user, isLoggedIn: true, token})
        }
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

router.get('/user/:id', requireToken, async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(201).json({id: user._id, username: user.username})
    } catch(error){
        res.status(400).json(error)
    }
})

module.exports = router