// мидлвэр для авторизации
// const jwt = require('jsonwebtoken');
// const UnauthorizedError = require('../errors/unauthorized-error');

// const { NODE_ENV, JWT_SECRET } = process.env;

// const auth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   let payload;

//   try {
//     payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
//   } catch (err) {
//     next(new UnauthorizedError('Необходима авторизация'));
//   }

//   req.user = payload;

//   next();
// };

// module.exports = auth;




const jwt = require('jsonwebtoken');
const AuthError = require('../errors/unauthorized-error');

const { NODE_ENV, JWT_SECRET = 'some-secret-key' } = process.env;

// Промежуточное ПО (Middleware) для проверки аутентификации пользователя
module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	let payload;

	// Проверяем наличие и формат заголовка авторизации
	if (!authorization || !authorization.startsWith('Bearer ')) {
		return next(new AuthError('Необходима авторизация'));
	}

	const token = authorization.replace('Bearer ', '');
	try {
		// Проверяем валидность и расшифровываем JWT-токен
		payload = jwt.verify(
			token,
			NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
		);
	} catch (err) {
		return next(new AuthError('Необходима авторизация!'));
	}

	req.user = payload; // Записываем расшифрованные данные токена в объект запроса
	return next(); // Пропускаем запрос дальше
};
