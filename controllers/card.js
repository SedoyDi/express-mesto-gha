const Card = require("../models/card");
const {DEFAULT_ERROR, NOT_FOUND, INCORRECT_DATA} = require("../errors/errors_code");


const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .orFail()
    .then(() => {
      return Card.remove(req.params._id);
    })
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};
const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};
module.exports = { getCards, deleteCard, createCard, addLike, deleteLike };
