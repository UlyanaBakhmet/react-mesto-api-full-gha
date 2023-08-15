const mongoose = require('mongoose');
const Card = require('../models/card');

const ValidationError = require('../errors/ValidationError'); // 400
const ForbiddenError = require('../errors/ForbiddenError'); // 403
const NotFoundError = require('../errors/NotFoundError'); // 404

module.exports.getCards = (req, res, next) => {
  Card
    .find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card
    .create({ name, link, owner })
    .then((newCard) => res.status(201).send(newCard))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError('При создании карточки произошла ошибка'));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card
    .findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      if (card.owner.toString() !== userId) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }
      return Card.findByIdAndRemove(card)
        .then(() => res.status(200).send(card))
        .catch((err) => {
          if (err instanceof mongoose.Error.CastError) {
            next(new ValidationError('При создании карточки переданы некорректные данные'));
          }
          return next(err);
        });
    })
    .catch(next);
};

module.exports.addCardLike = (req, res, next) => {
  const userId = req.user._id;
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new NotFoundError('При добавлении лайка на карточу произошла ошибка'));
      }
      return next(err);
    });
};

module.exports.deleteCardLike = (req, res, next) => {
  const userId = req.user._id;
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: userId } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new NotFoundError('При удалении лайка с карточки произошла ошибка'));
      }

      return next(err);
    });
};
