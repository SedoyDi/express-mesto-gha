const User = require('../models/user');
const {
  DEFAULT_ERROR,
  NOT_FOUND,
  INCORRECT_DATA,
  CREATED_CODE,
} = require('../status/status_code');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res
          .status(NOT_FOUND)
          .send({ message: 'Запрашиваемый пользователь не найден' });
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

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(CREATED_CODE).send(user, { massage: 'Пользователь создан' });
    })
    .catch(({ name: err }) => {
      if (err === 'ValidationError') {
        res.status(INCORRECT_DATA).send({ message: 'Некорректные данные' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

const patchProfile = (req, res) => {
  const { name, about } = req.body;

  if (name && about) {
    User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
      .then((user) => {
        res.send(user);
      })
      // eslint-disable-next-line consistent-return
      .catch(({ name: err }) => {
        if (err === 'ValidationError') {
          return res.status(INCORRECT_DATA).send({ message: 'Некорректные данные' });
        }
        if (err === 'NotFoundError') {
          res
            .status(NOT_FOUND)
            .send({ message: 'Запрашиваемый пользователь не найден' });
        }
        res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
      });
  } else {
    res.status(INCORRECT_DATA).send({ message: 'Некорректные данные' });
  }
};

const patchAvatar = (req, res) => {
  const { avatar } = req.body;

  if (avatar) {
    User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
      .then((user) => {
        res.send(user);
      })
      // eslint-disable-next-line consistent-return
      .catch(({ name: err }) => {
        if (err === 'ValidationError') {
          return res.status(INCORRECT_DATA).send({ message: 'Некорректные данные' });
        }
        if (err === 'NotFoundError') {
          res
            .status(NOT_FOUND)
            .send({ message: 'Запрашиваемый пользователь не найден' });
        } else {
          res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
        }
      });
  } else {
    // eslint-disable-next-line no-undef
    res.status(DATA_ERROR_CODE).send({ message: 'Некорректные данные' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  patchProfile,
  patchAvatar,
};
