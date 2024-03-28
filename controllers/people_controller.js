const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.status(200).json({message: 'people index route'})
})
router.post('/', (req,res)=>{
    res.status(201).json({message: 'people create route'})
})


module.exports = router