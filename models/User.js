const mongoose = require('mongoose')
const {Schema, model} = mongoose;
const userSchema = new Schema({
    username: {type: String, required: true, unique: true}, //unique will check if the username entered exists already
    password: {type: String, required: true} //require is used to make it compulsory
}, {
    timestamps: true
}
)
const User = model('User', userSchema)

module.exports = User