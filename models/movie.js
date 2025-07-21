const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  action: String
});
  module.exports = mongoose.model("Movie", movieSchema);

  movieSchema.pre("save", async function (next) {
    if (this.isNew) {
      try {
        // Find the highest code number
        const lastMovie = await mongoose
          .model("Movie")
          .findOne({})
          .sort({ code: -1 });
  
        let lastNumber = 0;
  
        if (lastMovie && lastMovie.code) {
          const match = lastMovie.code.match(/^MOV_(\d+)$/);
          if (match) {
            lastNumber = parseInt(match[1]);
          }
        }
  
        this.code = `MOV_${lastNumber + 1}`;
        next();
      } catch (err) {
        next(err);
      }
    } else {
      next();
    }
  });
  
  module.exports = mongoose.model("Movie", movieSchema);