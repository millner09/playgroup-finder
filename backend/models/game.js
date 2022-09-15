const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(result => { console.log('connected to MongoDB') }).catch((error) => { console.log('error connecting to MongoDB:', error.message) })
const gameSchema = new mongoose.Schema({
    name:
    {
        type: String,
        minLength: 4

    },
    publisher: {
        type: String,
        minLength: 4
    },
})

gameSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Game', gameSchema)