const { json } = require('express');
const mongoose = require('mongoose')
const {Schema, model} = mongoose;
const userSchema = new Schema({
    username: {type: String, required: true, unique: true}, //unique will check if the username entered exists already
    password: {type: String, required: true} //require is used to make it compulsory
}, {
    timestamps: true,
    toJSON: {   //to hide the hashed password returned from json after creating a user password
        virtuals: true,
        transform: (_doc,ret)=>{
            delete ret.password
            return ret
        }
    }
}
)
const User = model('User', userSchema)

module.exports = User