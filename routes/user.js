const router = require('express').Router();
const {
  getUser,
  getUsers,
  getUserById,
  patchProfile,
  patchAvatar,
} = require('../controllers/user');

router.get('/', getUsers);

router.get('/me', getUser);

router.get('/:userId', getUserById);

router.patch('/me', patchProfile);

router.patch('/me/avatar', patchAvatar);

module.exports = router;
