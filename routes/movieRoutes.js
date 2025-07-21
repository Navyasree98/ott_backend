const express = require('express');
const router = express.Router();
const { addMovie,getAllMovies,getMovieById,deleteMovie,updateMovie} = require('../controllers/moviecontroller');

router.post("/movies",addMovie);
router.get("/movies", getAllMovies);
router.get("/movies/:id",getMovieById);
router.put("/movies/:id",updateMovie);
router.delete("/movies/:id",deleteMovie);

module.exports = router;