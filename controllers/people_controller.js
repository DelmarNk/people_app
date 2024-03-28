const express = require('express')
const router = express.Router()
const People = require('../models/People')

router.get('/', (req,res)=>{
    res.status(200).json({message: 'people index route'})
})
router.post('/', (req,res)=>{
    res.status(201).json({message: 'people create route'})
})
router.get('/:id', (req,res)=>{
    res.status(200).json({message: `people show route ${req.params.id}`})
})
router.delete('/:id', (req,res)=>{
    res.status(200).json({message: `people delete route ${req.params.id}`})
})
router.put('/:id', (req,res)=>{
    res.status(200).json({message: `people update route ${req.params.id}`})
})


module.exports = router