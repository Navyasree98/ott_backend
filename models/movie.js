const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  action: String
},{
  timestamps: true // ➝ adds createdAt and updatedAt fields automatically
});
  module.exports = mongoose.model("Movie", movieSchema);