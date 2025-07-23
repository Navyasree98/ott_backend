const Movie = require("../models/movie");

// Create a new movie
exports.addMovie = async (req, res) => {
    try {
    const lastMovie = await Movie.findOne()
  .sort({ createdAt: -1 }) // most recent first
        .lean();
  let newCode = "MOV_001"; // default

  if (lastMovie && /^MOV_(\d+)$/.test(lastMovie.code)) {
    const match = lastMovie.code.match(/^MOV_(\d+)$/);
    const lastNumber = parseInt(match[1], 10);
    const nextNumber = lastNumber + 1;
  newCode = `MOV_${String(nextNumber).padStart(3, '0')}`;
}

console.log("New movie code:", newCode);
    const movie = new Movie({ ...req.body, code: newCode });
      await movie.save();
      res.status(201).json({ message: "Movie added successfully", movie });
    } catch (error) {
      console.error("Error adding movie:", error);
      res.status(400).json({ error: error.message });
    }
  };

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json({ message: "Movie updated", movie });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
