const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const userRoutes = require('./users');
const cardRoutes = require('./cards');

const NotFoundError = require('../errors/NotFoundError');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { urlRegex } = require('../utils/constants');

// краш-тест согласно ТЗ
// router.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

// авторизация пользователя с валидацией
router.post('/signin', celebrate({

  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

}), login);

// создание нового пользователя с валидацией
router.post('/signup', celebrate({

  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegex),
  }),
}), createUser);

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('/*', () => {
  throw new NotFoundError('Ошибка 404: страница не найдена');
});

module.exports = router;
