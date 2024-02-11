const mongoose = require("mongoose");

// Schema
const problemSchema = mongoose.Schema({
  title: {
    type: String,
  },
  problem: {
    type: String,
  },
  difficulty: {
    type: String,
  },
  input: {
    type: String,
  },
  output_format: {
    type: String,
  },
  testcases: {
    type: String,
  },
  output: {
    type: String,
  },
  byAdmin: {
    type: Boolean,
    default: false,
  },
});

// model
const Problem = mongoose.model("problem", problemSchema); //collection will be created as 'users'

module.exports = Problem;
