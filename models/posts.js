const mongoose = require('mongoose')

const postSchema = mongoose.Schema({

    _id: {
        type: String,
        require: true
    }
    ,
    name: {
        type: String,
        require: true
    },
    photo: {
        type: String,
        require: true
    },
    photo2: {
        type: String,
        require: true
    },
    contact: {
        type: Number,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    Business: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    }
})
module.exports = mongoose.model('Post', postSchema)