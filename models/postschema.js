const mongoose = require('mongoose')

const postschema = mongoose.Schema({
    title: String,
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "data"


    }
})

module.exports = mongoose.model('post', postschema)