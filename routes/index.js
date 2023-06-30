const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middleware/auth');
const NotFoundError = require('../errors/not-found-error');
const { validateSignup, validateSignin } = require('../middleware/validation');

// роуты, не требующие авторизации
// роут регистрации
router.post('/signup', validateSignup, createUser);
// роут логина
router.post('/signin', validateSignin, login);

// мидлвэр авторизации
router.use(auth);

// роуты требующие авторизации
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use((req, res, next) => {
  next(new NotFoundError(`Запрашиваемый ресурс по адресу '${req.path}' не найден`));
});

module.exports = router;
