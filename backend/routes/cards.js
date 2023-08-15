const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('../utils/constants');

const {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  deleteCardLike,
} = require('../controllers/cards');

router.get('/', getCards);

// router.post('/', createCard);
router.post('/', celebrate({

  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(urlRegex).required(),
  }),

}), createCard);

// router.delete('/:cardId', deleteCard);
router.delete('/:cardId', celebrate({

  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),

}), deleteCard);

// router.put('/:cardId/likes', addCardLike);
router.put('/:cardId/likes', celebrate({

  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),

}), addCardLike);

// router.delete('/:cardId/likes', deleteCardLike);
router.delete('/:cardId/likes', celebrate({

  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),

}), deleteCardLike);

module.exports = router;
