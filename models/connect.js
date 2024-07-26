const mongoose = require('mongoose')


exports.connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MONGODB ATLAS CONNECTED : ${conn.connection.host}`)
    } catch (error) {
        console.log(error.message)
    }
}