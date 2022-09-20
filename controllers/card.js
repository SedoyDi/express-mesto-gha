const Card = require('../models/card');
const {
  DEFAULT_ERROR,
  NOT_FOUND,
  INCORRECT_DATA,
  CREATED_CODE,
  DEFAULT_OK_CODE,
} = require('../status/status_code');

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
  const removeCard = () => {
    Card.remove(req.params.cardId)
      .then((card) => {
        res.send(card);
      })
      .catch(({ name }) => {
        if (name === 'CastError') {
          res.status(INCORRECT_DATA).send({ message: 'Некорректные данные' });
        } else {
          res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
        }
      });
  };

  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else if (req.user._id === !card.owner.toString()) {
        res.status(403).send({ message: 'Ошибка доступа. Действие не возможно' });
      } else {
        removeCard();
      }
    })
    .catch(() => {
      res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(CREATED_CODE).send(card);
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
        res.status(CREATED_CODE).send(card);
      } else {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
    })
    .catch(({ name }) => {
      if (name === 'CastError') {
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
        res.status(DEFAULT_OK_CODE).send(card);
      } else {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
    })
    .catch(({ name }) => {
      if (name === 'CastError') {
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
