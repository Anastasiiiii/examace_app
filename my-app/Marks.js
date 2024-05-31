const mongoose = require('mongoose')

const MarksSchema = new mongoose.Schema({
    username: String,
    marks: Array,
})

const MarksModel = mongoose.model("marks", MarksSchema)
module.exports = MarksModel