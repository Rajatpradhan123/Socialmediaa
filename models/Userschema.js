const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

const Userschema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,

    post: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }]

})

Userschema.plugin(plm)

module.exports = mongoose.model('data', Userschema)