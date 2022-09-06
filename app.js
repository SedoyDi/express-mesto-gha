const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const cardRoutes = require('./routes/card');
const { NOT_FOUND } = require('./status/status_code');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '63139a119929a10f0a0bdc43', // вставьте сюда _id созданного пользователя
  };
  next();
});

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use('/*', (req, res) => {
  res.status(NOT_FOUND).send({
    message: 'Страница не найдена',
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на ${PORT} порту`);
});
