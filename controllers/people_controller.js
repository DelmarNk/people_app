const express = require('express')
const router = express.Router()
const People = require('../models/People')

//index route
router.get('/', async (req,res)=>{ 
    try{
        const people = await People.find({})  
        res.status(200).json(people)                    
    } catch(error){
        res.status(400).json(error)
    }
})

//create route
router.post('/', async (req,res)=>{
    try{
        const person = await People.create(req.body)
        res.status(201).json(person)
    } catch(error){
        res.status(400).json(error)
    }
})

//show route
router.get('/:id', async (req,res)=>{
    try{
        const person = await People.findById(req.params.id)
        .populate('user') //get the information inside the id
        .exec() //to make .populate work
        res.status(200).json(person)
    } catch(error){
        res.status(400).json(error)
    }
})

//delete route
router.delete('/:id', async (req,res)=>{
    try{
        const person = await People.findByIdAndDelete(req.params.id)
        res.status(200).json(person)
    } catch(error){
        res.status(400).json(error)
    }
})

//update route
router.put('/:id', async (req,res)=>{
    try{
        const person = await People.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(person)
    } catch(error){
        res.status(400).json(error)
    }
})


module.exports = router