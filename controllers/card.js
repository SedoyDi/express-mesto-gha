const Card = require("../models/card");
const NotFoundErr = require("../errors/not_found_error_class");

const getCards = (req, res, next) => {
  Card.find({})
    .populate("owner")
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .orFail(new NotFoundErr("Запрашиваемая карточка не найдена"))
    .populate("owner")
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
    .orFail(new NotFoundErr("Карточка не найдена"))
    .populate("owner")
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
    .orFail(new NotFoundErr("Карточка не найдена"))
    .populate("owner")
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};
module.exports = { getCards, deleteCard, createCard, addLike, deleteLike };
