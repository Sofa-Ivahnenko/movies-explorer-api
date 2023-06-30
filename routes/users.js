// файл маршрутов пользователя
const router = require('express').Router();

const { validateSignup, validateSignin, validateUserProfile } = require('../middleware/validation');
const {
  createUser, login, getUser, updateUser, signout,
} = require('../controllers/users');

// роуты, не требующие авторизации, регистрация и логин
router.post('/signup', validateSignup, createUser);

router.post('/signin', validateSignin, login);

router.get('/signout', signout);

// роуты, требующие авторизации

router.get('/users/me', getUser);

router.patch('/users/me', validateUserProfile, updateUser);

module.exports = router;
