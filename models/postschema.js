const mongoose = require('mongoose')

const postschema = mongoose.Schema({
    title: String,
    description: String,
    photo:String
})

module.exports = mongoose.model('post', postschema)