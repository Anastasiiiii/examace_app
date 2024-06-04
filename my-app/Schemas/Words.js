const mongoose = require("mongoose");

const WordsSchema = new mongoose.Schema({
  id: Number,
  username: String,
  words: Array,
  word: String,
  definitions: Array,
  definition: String,
});

const WordsModel = mongoose.model("vocabulary", WordsSchema);
module.exports = WordsModel;
