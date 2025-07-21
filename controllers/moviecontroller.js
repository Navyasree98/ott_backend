const Movie = require("../models/movie");

// Create a new movie
exports.addMovie = async (req, res) => {
    try {
        const lastMovie = await Movie.findOne({ code: { $regex: /^MOV_\d+$/ } })
        .sort({ code: -1 })
        .lean();
        let codeNumber = 1;
      if (lastMovie && lastMovie.code) {
        const match = lastMovie.code.match(/MOV_(\d+)/);
        if (match) {
          codeNumber = parseInt(match[1]) + 1;
        }
      }
     
      // Create a new movie with auto-generated code
      const movie = new Movie({
        ...req.body,
        code: `MOV_${codeNumber}`,
      });
  
  
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
