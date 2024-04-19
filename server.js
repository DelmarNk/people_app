const express = require('express')
const app = express()
const cors = require('cors')
const people_controller = require('./controllers/people_controller')
const auth_controller = require('./controllers/auth_controller')

if(process.env.NODE_ENV == "development"){
    require('dotenv').config()
    const morgan = require('morgan')
    app.use(morgan('dev'))
}
require('./db.connection')
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use('/people', people_controller)
app.use('/auth', auth_controller)

app.get('/', (req,res)=>{
    res.status(200).send('hello jordan')
})

app.listen(PORT, ()=>{
    console.log(`You are now listening on port ${PORT}`)
})
