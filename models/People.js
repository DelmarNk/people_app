const mongoose = require('mongoose')
const {Schema, model} = mongoose
const PeopleSchema = new Schema({
    name: {type: String, required: true},
    image: String,
    title: String,
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true} //get the id of the user that created the person
}, {timestamps: true})

const People = model('People', PeopleSchema)
module.exports = People