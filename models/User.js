const mongoose = require('mongoose')
const { Schema } = mongoose
let userSchema = new Schema({
    uName: String,
    uPassword: String,
    uEmail: String,
    uMatches: [String],
    createdDate: {
        type: Date,
        default: Date.now
    }
})

let User = mongoose.model('User', userSchema)

module.exports =User