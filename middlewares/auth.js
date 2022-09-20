const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const handlerAuthError = (res) => {
  res.status(401).send({ messsage: 'ошибка авторизации' });
};

module.exports = (req, res, next) => {
  const cookieAuth = req.cookies.jwt;

  if (!cookieAuth) {
    return handlerAuthError(res);
  }

  let payload;

  try {
    payload = jwt.verify(cookieAuth, JWT_SECRET);
  } catch (err) {
    return handlerAuthError(res);
  }

  req.user = payload;
  return next();
};
