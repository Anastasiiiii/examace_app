const mongoose = require('mongoose')

const MarksSchema = new mongoose.Schema({
    id: Number,
    username: String,
    marks: Array,
    mark: Number
})

const MarksModel = mongoose.model("marks", MarksSchema)
module.exports = MarksModel