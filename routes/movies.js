// файл маршрутов карточек
const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
// const auth = require('../middleware/auth');
// const validateURL = require('../middleware/methods');

const { validateCreateMovie, validateMovie } = require('../middleware/validation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

// авторизация
// router.use(auth);

// роуты, требующие авторизации
router.get('/movies', getMovies);

router.post('/movies', validateCreateMovie, createMovie);

router.delete('/movies/:id', validateMovie, deleteMovie);

module.exports = router;
