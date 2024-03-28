const express = require('express')
const cors = require('cors')
if(process.env.NODE_ENV == "development"){
    require('dotenv').config()
    const morgan = require('morgan')
}
require('./db.connection')
const PORT = process.env.PORT
const app = express()

app.get('/', (req,res)=>{
    res.send('hello jordan')
})

app.listen(PORT, ()=>{
    console.log(`You are now listening on port ${PORT}`)
})
