const mongoose = require('mongoose')
const {Schema, model} = mongoose
const PeopleSchema = new Schema({
    name: {type: String, required: true},
    image: String,
    title: String
}, {timestamps: true})

const People = model('People', PeopleSchema)
module.exports = People