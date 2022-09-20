const router = require('express').Router();
const {
  getUsers,
  getUserById,
  patchProfile,
  patchAvatar,
} = require('../controllers/user');

router.get('/', getUsers);

router.get('/:userId', getUserById);

router.patch('/me', patchProfile);

router.patch('/me/avatar', patchAvatar);

module.exports = router;
