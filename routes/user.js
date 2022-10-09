const router = require('express').Router();
const {
  getUser,
  getUsers,
  getUserById,
  patchProfile,
  patchAvatar,
} = require('../controllers/user');
const {
  validateUser,
  validateUserId,
  validateAvatar,
} = require('../middlewares/validation');

router.get('/', getUsers);

router.get('/me', getUser);

router.get('/:userId', validateUserId, getUserById);

router.patch('/me', validateUser, patchProfile);

router.patch('/me/avatar', validateAvatar, patchAvatar);

module.exports = router;
