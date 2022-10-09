const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
} = require('../controllers/card');

const {
  validateCard,
  validateCardId,
} = require('../middlewares/validation');

router.get('/', getCards);

router.post('/', validateCard, createCard);

router.delete('/:cardId', validateCardId, deleteCard);

router.put('/:cardId/likes', validateCardId, addLike);

router.delete('/:cardId/likes', validateCardId, deleteLike);

module.exports = router;
