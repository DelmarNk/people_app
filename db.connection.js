const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection
    .on('open', ()=> console.log('connected to mongodb'))
    .on('close', ()=> console.log('disconnected from mongodb'))
    .on('error', (error)=> console.log(error))