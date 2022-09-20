const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;
const User = require('../models/user');

const {
  DEFAULT_ERROR,
  NOT_FOUND,
  INCORRECT_DATA,
  CREATED_CODE,
} = require('../status/status_code');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      });
      res.send({ token });
    })
    .catch(next);
};

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
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)

    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(CREATED_CODE).send(user);
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
        if (!user) {
          return res.status(NOT_FOUND).send({ message: 'пользователь не найден' });
        }
        return res.send(user);
      })
      .catch(({ name: err }) => {
        if (err === 'CastError') {
          return res.status(INCORRECT_DATA).send({ message: 'Некорректные данные' });
        }
        if (err === 'ValidationError') {
          return res.status(INCORRECT_DATA).send({ message: 'Некорректные данные' });
        }
        return res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
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
        if (!user) {
          return res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
        }
        return res.send(user);
      })
      .catch(({ name: err }) => {
        if (err === 'CastError') {
          return res.status(INCORRECT_DATA).send({ message: 'Некорректные данные' });
        }
        if (err === 'ValidationError') {
          return res.status(INCORRECT_DATA).send({ message: 'Некорректные данные' });
        }
        return res.status(DEFAULT_ERROR).send({ message: 'Ошибка сервера' });
      });
  } else {
    res.status(INCORRECT_DATA).send({ message: 'Некорректные данные' });
  }
};

module.exports = {
  login,
  getUsers,
  getUserById,
  createUser,
  patchProfile,
  patchAvatar,
};
