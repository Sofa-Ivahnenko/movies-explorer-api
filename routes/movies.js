// файл маршрутов карточек
const router = require('express').Router();

const { validateCreateMovie, validateMovie } = require('../middleware/validation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

// роуты, требующие авторизации
router.get('/movies', getMovies);

router.post('/movies', validateCreateMovie, createMovie);

router.delete('/movies/:id', validateMovie, deleteMovie);

module.exports = router;
