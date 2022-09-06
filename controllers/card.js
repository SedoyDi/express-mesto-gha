const Card = require('../models/card');
const {
  DEFAULT_ERROR,
  NOT_FOUND,
  INCORRECT_DATA,
  CREATED_CODE,
} = require('../errors/errors_code');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
    })
    .catch(({ name }) => {
      if (name === 'ValidationError') {
        res.status(INCORRECT_DATA).send({ message: 'Некорректные данные' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(CREATED_CODE).send(card, { massage: 'Карточка создана' });
    })
    .catch(({ name: err }) => {
      if (err === 'ValidationError') {
        res.status(INCORRECT_DATA).send({ message: 'Некорректные данные' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};
const addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
    })
    .catch(({ name }) => {
      if (name === 'ValidationError') {
        res.status(INCORRECT_DATA).send({ message: 'Некорректные данные' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
    })
    .catch(({ name }) => {
      if (name === 'ValidationError') {
        res.status(INCORRECT_DATA).send({ message: 'Некорректные данные' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  addLike,
  deleteLike,
};
