const mongoose = require('mongoose')
const { Schema } = mongoose

let matchSchema = new Schema({
    mName: String,
    mDescription: String,
    mOwner: String, //store email address
    mNumber: String, //the number of players
    mPlayers: [String],
    mWinner: String,
    mActiveTime: Date,
    mEndTime: Date,
    mIsActive: Boolean,
    mIsEnd: Boolean
})

let Match = mongoose.model('Match', matchSchema)

module.exports = Match